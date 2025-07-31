(function() {
  "use strict";
  function UntarWorker() {
  }
  UntarWorker.prototype = {
    onmessage: function(msg) {
      try {
        if (msg.data.type === "extract") {
          this.untarBuffer(msg.data.buffer);
        } else {
          throw new Error("Unknown message type: " + msg.data.type);
        }
      } catch (err) {
        this.postError(err);
      }
    },
    postError: function(err) {
      this.postMessage({ type: "error", data: { message: err.message } });
    },
    postLog: function(level, msg) {
      this.postMessage({ type: "log", data: { level, msg } });
    },
    untarBuffer: function(arrayBuffer) {
      try {
        const tarFileStream = new UntarFileStream(arrayBuffer);
        while (tarFileStream.hasNext()) {
          const file = tarFileStream.next();
          this.postMessage({ type: "extract", data: file }, [file.buffer]);
        }
        this.postMessage({ type: "complete" });
      } catch (err) {
        this.postError(err);
      }
    },
    postMessage: function(msg, transfers) {
      self.postMessage(msg, transfers);
    }
  };
  if (typeof self !== "undefined") {
    const worker = new UntarWorker();
    self.onmessage = function(msg) {
      worker.onmessage(msg);
    };
  }
  function decodeUTF8(bytes) {
    let s = "";
    let i = 0;
    while (i < bytes.length) {
      let c = bytes[i++];
      if (c > 127) {
        if (c > 191 && c < 224) {
          if (i >= bytes.length) throw new Error("UTF-8 decode: incomplete 2-byte sequence");
          c = (c & 31) << 6 | bytes[i] & 63;
        } else if (c > 223 && c < 240) {
          if (i + 1 >= bytes.length) throw new Error("UTF-8 decode: incomplete 3-byte sequence");
          c = (c & 15) << 12 | (bytes[i] & 63) << 6 | bytes[++i] & 63;
        } else if (c > 239 && c < 248) {
          if (i + 2 >= bytes.length) throw new Error("UTF-8 decode: incomplete 4-byte sequence");
          c = (c & 7) << 18 | (bytes[i] & 63) << 12 | (bytes[++i] & 63) << 6 | bytes[++i] & 63;
        } else throw new Error("UTF-8 decode: unknown multibyte start 0x" + c.toString(16) + " at index " + (i - 1));
        ++i;
      }
      if (c <= 65535) s += String.fromCharCode(c);
      else if (c <= 1114111) {
        c -= 65536;
        s += String.fromCharCode(c >> 10 | 55296);
        s += String.fromCharCode(c & 1023 | 56320);
      } else throw new Error("UTF-8 decode: code point 0x" + c.toString(16) + " exceeds UTF-16 reach");
    }
    return s;
  }
  function PaxHeader(fields) {
    this._fields = fields;
  }
  PaxHeader.parse = function(buffer) {
    let bytes = new Uint8Array(buffer);
    const fields = [];
    while (bytes.length > 0) {
      const fieldLength = parseInt(decodeUTF8(bytes.subarray(0, bytes.indexOf(32))));
      const fieldText = decodeUTF8(bytes.subarray(0, fieldLength));
      const fieldMatch = fieldText.match(/^\d+ ([^=]+)=(.*)\n$/);
      if (fieldMatch === null) {
        throw new Error("Invalid PAX header data format.");
      }
      const fieldName = fieldMatch[1];
      let fieldValue = fieldMatch[2];
      if (fieldValue.length === 0) {
        fieldValue = null;
      } else if (fieldValue.match(/^\d+$/) !== null) {
        fieldValue = parseInt(fieldValue);
      }
      const field = {
        name: fieldName,
        value: fieldValue
      };
      fields.push(field);
      bytes = bytes.subarray(fieldLength);
    }
    return new PaxHeader(fields);
  };
  PaxHeader.prototype = {
    applyHeader: function(file) {
      this._fields.forEach(function(field) {
        let fieldName = field.name;
        const fieldValue = field.value;
        if (fieldName === "path") {
          fieldName = "name";
          if (file.prefix !== void 0) {
            delete file.prefix;
          }
        } else if (fieldName === "linkpath") {
          fieldName = "linkname";
        }
        if (fieldValue === null) {
          delete file[fieldName];
        } else {
          file[fieldName] = fieldValue;
        }
      });
    }
  };
  function LongFieldHeader(fieldName, fieldValue) {
    this._fieldName = fieldName;
    this._fieldValue = fieldValue;
  }
  LongFieldHeader.parse = function(fieldName, buffer) {
    const bytes = new Uint8Array(buffer);
    return new LongFieldHeader(fieldName, decodeUTF8(bytes));
  };
  LongFieldHeader.prototype = {
    applyHeader: function(file) {
      file[this._fieldName] = this._fieldValue;
    }
  };
  function TarFile() {
  }
  function UntarStream(arrayBuffer) {
    this._bufferView = new DataView(arrayBuffer);
    this._position = 0;
  }
  UntarStream.prototype = {
    readString: function(charCount) {
      const charSize = 1;
      const byteCount = charCount * charSize;
      const charCodes = [];
      for (let i = 0; i < charCount; ++i) {
        const charCode = this._bufferView.getUint8(this.position() + i * charSize, true);
        if (charCode !== 0) {
          charCodes.push(charCode);
        } else {
          break;
        }
      }
      this.seek(byteCount);
      return String.fromCharCode.apply(null, charCodes);
    },
    readBuffer: function(byteCount) {
      let buf;
      if (typeof ArrayBuffer.prototype.slice === "function") {
        buf = this._bufferView.buffer.slice(this.position(), this.position() + byteCount);
      } else {
        buf = new ArrayBuffer(byteCount);
        const target = new Uint8Array(buf);
        const src = new Uint8Array(this._bufferView.buffer, this.position(), byteCount);
        target.set(src);
      }
      this.seek(byteCount);
      return buf;
    },
    seek: function(byteCount) {
      this._position += byteCount;
    },
    peekUint32: function() {
      return this._bufferView.getUint32(this.position(), true);
    },
    position: function(newpos) {
      if (newpos === void 0) {
        return this._position;
      } else {
        this._position = newpos;
      }
    },
    size: function() {
      return this._bufferView.byteLength;
    }
  };
  function UntarFileStream(arrayBuffer) {
    this._stream = new UntarStream(arrayBuffer);
    this._globalPaxHeader = null;
  }
  UntarFileStream.prototype = {
    hasNext: function() {
      return this._stream.position() + 4 < this._stream.size() && this._stream.peekUint32() !== 0;
    },
    next: function() {
      return this._readNextFile();
    },
    _readNextFile: function() {
      const stream = this._stream;
      let file = new TarFile();
      let isHeaderFile = false;
      let header = null;
      const headerBeginPos = stream.position();
      const dataBeginPos = headerBeginPos + 512;
      file.name = stream.readString(100);
      file.mode = stream.readString(8);
      file.uid = parseInt(stream.readString(8));
      file.gid = parseInt(stream.readString(8));
      file.size = parseInt(stream.readString(12), 8);
      file.mtime = parseInt(stream.readString(12), 8);
      file.checksum = parseInt(stream.readString(8));
      file.type = stream.readString(1);
      file.linkname = stream.readString(100);
      file.ustarFormat = stream.readString(6);
      if (file.ustarFormat.indexOf("ustar") > -1) {
        file.version = stream.readString(2);
        file.uname = stream.readString(32);
        file.gname = stream.readString(32);
        file.devmajor = parseInt(stream.readString(8));
        file.devminor = parseInt(stream.readString(8));
        file.namePrefix = stream.readString(155);
        if (file.namePrefix.length > 0) {
          file.name = file.namePrefix + "/" + file.name;
        }
      }
      stream.position(dataBeginPos);
      switch (file.type) {
        case "0":
        // Normal file is either "0" or "\0".
        case "":
          file.buffer = stream.readBuffer(file.size);
          break;
        case "1":
          break;
        case "2":
          break;
        case "3":
          break;
        case "4":
          break;
        case "5":
          break;
        case "6":
          break;
        case "7":
          break;
        case "g":
          isHeaderFile = true;
          this._globalHeader = PaxHeader.parse(stream.readBuffer(file.size));
          break;
        case "K":
          isHeaderFile = true;
          header = LongFieldHeader.parse("linkname", stream.readBuffer(file.size));
          break;
        case "L":
          isHeaderFile = true;
          header = LongFieldHeader.parse("name", stream.readBuffer(file.size));
          break;
        case "x":
          isHeaderFile = true;
          header = PaxHeader.parse(stream.readBuffer(file.size));
          break;
      }
      if (file.buffer === void 0) {
        file.buffer = new ArrayBuffer(0);
      }
      let dataEndPos = dataBeginPos + file.size;
      if (file.size % 512 !== 0) {
        dataEndPos += 512 - file.size % 512;
      }
      stream.position(dataEndPos);
      if (isHeaderFile) {
        file = this._readNextFile();
      }
      if (this._globalPaxHeader !== null) {
        this._globalPaxHeader.applyHeader(file);
      }
      if (header !== null) {
        header.applyHeader(file);
      }
      return file;
    }
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW50YXItd29ya2VyLUdlXy1zMlYxLmpzIiwic291cmNlcyI6WyIuLi9zcmMvc2hhcmVkL2xpYi91dGlscy91bnRhci91bnRhci13b3JrZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxuZnVuY3Rpb24gVW50YXJXb3JrZXIgKCkge31cblxuVW50YXJXb3JrZXIucHJvdG90eXBlID0ge1xuICBvbm1lc3NhZ2U6IGZ1bmN0aW9uIChtc2cpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKG1zZy5kYXRhLnR5cGUgPT09ICdleHRyYWN0Jykge1xuICAgICAgICB0aGlzLnVudGFyQnVmZmVyKG1zZy5kYXRhLmJ1ZmZlcilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBtZXNzYWdlIHR5cGU6ICcgKyBtc2cuZGF0YS50eXBlKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5wb3N0RXJyb3IoZXJyKVxuICAgIH1cbiAgfSxcblxuICBwb3N0RXJyb3I6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAvLyBjb25zb2xlLmluZm8oXCJwb3N0RXJyb3IoXCIgKyBlcnIubWVzc2FnZSArIFwiKVwiICsgXCIgXCIgKyBKU09OLnN0cmluZ2lmeShlcnIpKTtcbiAgICB0aGlzLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2Vycm9yJywgZGF0YTogeyBtZXNzYWdlOiBlcnIubWVzc2FnZSB9IH0pXG4gIH0sXG5cbiAgcG9zdExvZzogZnVuY3Rpb24gKGxldmVsLCBtc2cpIHtcbiAgICAvLyBjb25zb2xlLmluZm8oXCJwb3N0TG9nXCIpO1xuICAgIHRoaXMucG9zdE1lc3NhZ2UoeyB0eXBlOiAnbG9nJywgZGF0YTogeyBsZXZlbDogbGV2ZWwsIG1zZzogbXNnIH0gfSlcbiAgfSxcblxuICB1bnRhckJ1ZmZlcjogZnVuY3Rpb24gKGFycmF5QnVmZmVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHRhckZpbGVTdHJlYW0gPSBuZXcgVW50YXJGaWxlU3RyZWFtKGFycmF5QnVmZmVyKVxuICAgICAgd2hpbGUgKHRhckZpbGVTdHJlYW0uaGFzTmV4dCgpKSB7XG4gICAgICAgIGNvbnN0IGZpbGUgPSB0YXJGaWxlU3RyZWFtLm5leHQoKVxuXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2UoeyB0eXBlOiAnZXh0cmFjdCcsIGRhdGE6IGZpbGUgfSwgW2ZpbGUuYnVmZmVyXSlcbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3N0TWVzc2FnZSh7IHR5cGU6ICdjb21wbGV0ZScgfSlcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMucG9zdEVycm9yKGVycilcbiAgICB9XG4gIH0sXG5cbiAgcG9zdE1lc3NhZ2U6IGZ1bmN0aW9uIChtc2csIHRyYW5zZmVycykge1xuICAgIC8vIGNvbnNvbGUuaW5mbyhcInBvc3RNZXNzYWdlKFwiICsgbXNnICsgXCIsIFwiICsgSlNPTi5zdHJpbmdpZnkodHJhbnNmZXJzKSArIFwiKVwiKTtcbiAgICBzZWxmLnBvc3RNZXNzYWdlKG1zZywgdHJhbnNmZXJzKVxuICB9XG59XG5cbmlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgLy8gV2UncmUgcnVubmluZyBpbiBhIHdvcmtlciB0aHJlYWRcbiAgY29uc3Qgd29ya2VyID0gbmV3IFVudGFyV29ya2VyKClcbiAgc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAobXNnKSB7IHdvcmtlci5vbm1lc3NhZ2UobXNnKSB9XG59XG5cbi8vIFNvdXJjZTogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGFzY2FsZGVrbG9lLzYyNTQ2MTAzYTE1NzY4MDNkYWRlOTI2OWNjZjc2MzMwXG4vLyBVbm1hcnNoYWxzIGFuIFVpbnQ4QXJyYXkgdG8gc3RyaW5nLlxuZnVuY3Rpb24gZGVjb2RlVVRGOCAoYnl0ZXMpIHtcbiAgbGV0IHMgPSAnJ1xuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBieXRlcy5sZW5ndGgpIHtcbiAgICBsZXQgYyA9IGJ5dGVzW2krK11cbiAgICBpZiAoYyA+IDEyNykge1xuICAgICAgaWYgKGMgPiAxOTEgJiYgYyA8IDIyNCkge1xuICAgICAgICBpZiAoaSA+PSBieXRlcy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcignVVRGLTggZGVjb2RlOiBpbmNvbXBsZXRlIDItYnl0ZSBzZXF1ZW5jZScpXG4gICAgICAgIGMgPSAoYyAmIDMxKSA8PCA2IHwgYnl0ZXNbaV0gJiA2M1xuICAgICAgfSBlbHNlIGlmIChjID4gMjIzICYmIGMgPCAyNDApIHtcbiAgICAgICAgaWYgKGkgKyAxID49IGJ5dGVzLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKCdVVEYtOCBkZWNvZGU6IGluY29tcGxldGUgMy1ieXRlIHNlcXVlbmNlJylcbiAgICAgICAgYyA9IChjICYgMTUpIDw8IDEyIHwgKGJ5dGVzW2ldICYgNjMpIDw8IDYgfCBieXRlc1srK2ldICYgNjNcbiAgICAgIH0gZWxzZSBpZiAoYyA+IDIzOSAmJiBjIDwgMjQ4KSB7XG4gICAgICAgIGlmIChpICsgMiA+PSBieXRlcy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcignVVRGLTggZGVjb2RlOiBpbmNvbXBsZXRlIDQtYnl0ZSBzZXF1ZW5jZScpXG4gICAgICAgIGMgPSAoYyAmIDcpIDw8IDE4IHwgKGJ5dGVzW2ldICYgNjMpIDw8IDEyIHwgKGJ5dGVzWysraV0gJiA2MykgPDwgNiB8IGJ5dGVzWysraV0gJiA2M1xuICAgICAgfSBlbHNlIHRocm93IG5ldyBFcnJvcignVVRGLTggZGVjb2RlOiB1bmtub3duIG11bHRpYnl0ZSBzdGFydCAweCcgKyBjLnRvU3RyaW5nKDE2KSArICcgYXQgaW5kZXggJyArIChpIC0gMSkpXG4gICAgICArK2lcbiAgICB9XG5cbiAgICBpZiAoYyA8PSAweGZmZmYpIHMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjKVxuICAgIGVsc2UgaWYgKGMgPD0gMHgxMGZmZmYpIHtcbiAgICAgIGMgLT0gMHgxMDAwMFxuICAgICAgcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMgPj4gMTAgfCAweGQ4MDApXG4gICAgICBzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyAmIDB4M0ZGIHwgMHhkYzAwKVxuICAgIH0gZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ1VURi04IGRlY29kZTogY29kZSBwb2ludCAweCcgKyBjLnRvU3RyaW5nKDE2KSArICcgZXhjZWVkcyBVVEYtMTYgcmVhY2gnKVxuICB9XG4gIHJldHVybiBzXG59XG5cbmZ1bmN0aW9uIFBheEhlYWRlciAoZmllbGRzKSB7XG4gIHRoaXMuX2ZpZWxkcyA9IGZpZWxkc1xufVxuXG5QYXhIZWFkZXIucGFyc2UgPSBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gIC8vIGh0dHBzOi8vd3d3LmlibS5jb20vc3VwcG9ydC9rbm93bGVkZ2VjZW50ZXIvZW4vU1NMVEJXXzIuMy4wL2NvbS5pYm0uem9zLnYycjMuYnB4YTUwMC9wYXhleC5odG1cbiAgLy8gQW4gZXh0ZW5kZWQgaGVhZGVyIHNoYWxsIGNvbnNpc3Qgb2Ygb25lIG9yIG1vcmUgcmVjb3JkcywgZWFjaCBjb25zdHJ1Y3RlZCBhcyBmb2xsb3dzOlxuICAvLyBcIiVkICVzPSVzXFxuXCIsIDxsZW5ndGg+LCA8a2V5d29yZD4sIDx2YWx1ZT5cblxuICAvLyBUaGUgZXh0ZW5kZWQgaGVhZGVyIHJlY29yZHMgc2hhbGwgYmUgZW5jb2RlZCBhY2NvcmRpbmcgdG8gdGhlIElTTy9JRUMxMDY0Ni0xOjIwMDAgc3RhbmRhcmQgKFVURi04KS5cbiAgLy8gVGhlIDxsZW5ndGg+IGZpZWxkLCA8Ymxhbms+LCBlcXVhbHMgc2lnbiwgYW5kIDxuZXdsaW5lPiBzaG93biBzaGFsbCBiZSBsaW1pdGVkIHRvIHRoZSBwb3J0YWJsZSBjaGFyYWN0ZXIgc2V0LCBhc1xuICAvLyBlbmNvZGVkIGluIFVURi04LiBUaGUgPGtleXdvcmQ+IGFuZCA8dmFsdWU+IGZpZWxkcyBjYW4gYmUgYW55IFVURi04IGNoYXJhY3RlcnMuIFRoZSA8bGVuZ3RoPiBmaWVsZCBzaGFsbCBiZSB0aGVcbiAgLy8gZGVjaW1hbCBsZW5ndGggb2YgdGhlIGV4dGVuZGVkIGhlYWRlciByZWNvcmQgaW4gb2N0ZXRzLCBpbmNsdWRpbmcgdGhlIHRyYWlsaW5nIDxuZXdsaW5lPi5cblxuICBsZXQgYnl0ZXMgPSBuZXcgVWludDhBcnJheShidWZmZXIpXG4gIGNvbnN0IGZpZWxkcyA9IFtdXG5cbiAgd2hpbGUgKGJ5dGVzLmxlbmd0aCA+IDApIHtcbiAgICAvLyBEZWNvZGUgYnl0ZXMgdXAgdG8gdGhlIGZpcnN0IHNwYWNlIGNoYXJhY3RlcjsgdGhhdCBpcyB0aGUgdG90YWwgZmllbGQgbGVuZ3RoXG4gICAgY29uc3QgZmllbGRMZW5ndGggPSBwYXJzZUludChkZWNvZGVVVEY4KGJ5dGVzLnN1YmFycmF5KDAsIGJ5dGVzLmluZGV4T2YoMHgyMCkpKSlcbiAgICBjb25zdCBmaWVsZFRleHQgPSBkZWNvZGVVVEY4KGJ5dGVzLnN1YmFycmF5KDAsIGZpZWxkTGVuZ3RoKSlcbiAgICBjb25zdCBmaWVsZE1hdGNoID0gZmllbGRUZXh0Lm1hdGNoKC9eXFxkKyAoW149XSspPSguKilcXG4kLylcblxuICAgIGlmIChmaWVsZE1hdGNoID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgUEFYIGhlYWRlciBkYXRhIGZvcm1hdC4nKVxuICAgIH1cblxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IGZpZWxkTWF0Y2hbMV1cbiAgICBsZXQgZmllbGRWYWx1ZSA9IGZpZWxkTWF0Y2hbMl1cblxuICAgIGlmIChmaWVsZFZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZmllbGRWYWx1ZSA9IG51bGxcbiAgICB9IGVsc2UgaWYgKGZpZWxkVmFsdWUubWF0Y2goL15cXGQrJC8pICE9PSBudWxsKSB7XG4gICAgICAvLyBJZiBpdCdzIGEgaW50ZWdlciBmaWVsZCwgcGFyc2UgaXQgYXMgaW50XG4gICAgICBmaWVsZFZhbHVlID0gcGFyc2VJbnQoZmllbGRWYWx1ZSlcbiAgICB9XG4gICAgLy8gRG9uJ3QgcGFyc2UgZmxvYXQgdmFsdWVzIHNpbmNlIHByZWNpc2lvbiBpcyBsb3N0XG5cbiAgICBjb25zdCBmaWVsZCA9IHtcbiAgICAgIG5hbWU6IGZpZWxkTmFtZSxcbiAgICAgIHZhbHVlOiBmaWVsZFZhbHVlXG4gICAgfVxuXG4gICAgZmllbGRzLnB1c2goZmllbGQpXG5cbiAgICBieXRlcyA9IGJ5dGVzLnN1YmFycmF5KGZpZWxkTGVuZ3RoKSAvLyBDdXQgb2ZmIHRoZSBwYXJzZWQgZmllbGQgZGF0YVxuICB9XG5cbiAgcmV0dXJuIG5ldyBQYXhIZWFkZXIoZmllbGRzKVxufVxuXG5QYXhIZWFkZXIucHJvdG90eXBlID0ge1xuICBhcHBseUhlYWRlcjogZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAvLyBBcHBseSBmaWVsZHMgdG8gdGhlIGZpbGVcbiAgICAvLyBJZiBhIGZpZWxkIGlzIG9mIHZhbHVlIG51bGwsIGl0IHNob3VsZCBiZSBkZWxldGVkIGZyb20gdGhlIGZpbGVcbiAgICAvLyBodHRwczovL3d3dy5ta3Nzb2Z0d2FyZS5jb20vZG9jcy9tYW40L3BheC40LmFzcFxuXG4gICAgdGhpcy5fZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICBsZXQgZmllbGROYW1lID0gZmllbGQubmFtZVxuICAgICAgY29uc3QgZmllbGRWYWx1ZSA9IGZpZWxkLnZhbHVlXG5cbiAgICAgIGlmIChmaWVsZE5hbWUgPT09ICdwYXRoJykge1xuICAgICAgICAvLyBUaGlzIG92ZXJyaWRlcyB0aGUgbmFtZSBhbmQgcHJlZml4IGZpZWxkcyBpbiB0aGUgZm9sbG93aW5nIGhlYWRlciBibG9jay5cbiAgICAgICAgZmllbGROYW1lID0gJ25hbWUnXG5cbiAgICAgICAgaWYgKGZpbGUucHJlZml4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgZmlsZS5wcmVmaXhcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChmaWVsZE5hbWUgPT09ICdsaW5rcGF0aCcpIHtcbiAgICAgICAgLy8gVGhpcyBvdmVycmlkZXMgdGhlIGxpbmtuYW1lIGZpZWxkIGluIHRoZSBmb2xsb3dpbmcgaGVhZGVyIGJsb2NrLlxuICAgICAgICBmaWVsZE5hbWUgPSAnbGlua25hbWUnXG4gICAgICB9XG5cbiAgICAgIGlmIChmaWVsZFZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIGRlbGV0ZSBmaWxlW2ZpZWxkTmFtZV1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbGVbZmllbGROYW1lXSA9IGZpZWxkVmFsdWVcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIExvbmdGaWVsZEhlYWRlciAoZmllbGROYW1lLCBmaWVsZFZhbHVlKSB7XG4gIHRoaXMuX2ZpZWxkTmFtZSA9IGZpZWxkTmFtZVxuICB0aGlzLl9maWVsZFZhbHVlID0gZmllbGRWYWx1ZVxufVxuXG5Mb25nRmllbGRIZWFkZXIucGFyc2UgPSBmdW5jdGlvbiAoZmllbGROYW1lLCBidWZmZXIpIHtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShidWZmZXIpXG4gIHJldHVybiBuZXcgTG9uZ0ZpZWxkSGVhZGVyKGZpZWxkTmFtZSwgZGVjb2RlVVRGOChieXRlcykpXG59XG5cbkxvbmdGaWVsZEhlYWRlci5wcm90b3R5cGUgPSB7XG4gIGFwcGx5SGVhZGVyOiBmdW5jdGlvbiAoZmlsZSkge1xuICAgIGZpbGVbdGhpcy5fZmllbGROYW1lXSA9IHRoaXMuX2ZpZWxkVmFsdWVcbiAgfVxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uXG5mdW5jdGlvbiBUYXJGaWxlICgpIHt9XG5cbmZ1bmN0aW9uIFVudGFyU3RyZWFtIChhcnJheUJ1ZmZlcikge1xuICB0aGlzLl9idWZmZXJWaWV3ID0gbmV3IERhdGFWaWV3KGFycmF5QnVmZmVyKVxuICB0aGlzLl9wb3NpdGlvbiA9IDBcbn1cblxuVW50YXJTdHJlYW0ucHJvdG90eXBlID0ge1xuICByZWFkU3RyaW5nOiBmdW5jdGlvbiAoY2hhckNvdW50KSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJyZWFkU3RyaW5nOiBwb3NpdGlvbiBcIiArIHRoaXMucG9zaXRpb24oKSArIFwiLCBcIiArIGNoYXJDb3VudCArIFwiIGNoYXJzXCIpO1xuICAgIGNvbnN0IGNoYXJTaXplID0gMVxuICAgIGNvbnN0IGJ5dGVDb3VudCA9IGNoYXJDb3VudCAqIGNoYXJTaXplXG5cbiAgICBjb25zdCBjaGFyQ29kZXMgPSBbXVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyQ291bnQ7ICsraSkge1xuICAgICAgY29uc3QgY2hhckNvZGUgPSB0aGlzLl9idWZmZXJWaWV3LmdldFVpbnQ4KHRoaXMucG9zaXRpb24oKSArIChpICogY2hhclNpemUpLCB0cnVlKVxuICAgICAgaWYgKGNoYXJDb2RlICE9PSAwKSB7XG4gICAgICAgIGNoYXJDb2Rlcy5wdXNoKGNoYXJDb2RlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNlZWsoYnl0ZUNvdW50KVxuXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgY2hhckNvZGVzKVxuICB9LFxuXG4gIHJlYWRCdWZmZXI6IGZ1bmN0aW9uIChieXRlQ291bnQpIHtcbiAgICBsZXQgYnVmXG5cbiAgICBpZiAodHlwZW9mIEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYnVmID0gdGhpcy5fYnVmZmVyVmlldy5idWZmZXIuc2xpY2UodGhpcy5wb3NpdGlvbigpLCB0aGlzLnBvc2l0aW9uKCkgKyBieXRlQ291bnQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihieXRlQ291bnQpXG4gICAgICBjb25zdCB0YXJnZXQgPSBuZXcgVWludDhBcnJheShidWYpXG4gICAgICBjb25zdCBzcmMgPSBuZXcgVWludDhBcnJheSh0aGlzLl9idWZmZXJWaWV3LmJ1ZmZlciwgdGhpcy5wb3NpdGlvbigpLCBieXRlQ291bnQpXG4gICAgICB0YXJnZXQuc2V0KHNyYylcbiAgICB9XG5cbiAgICB0aGlzLnNlZWsoYnl0ZUNvdW50KVxuICAgIHJldHVybiBidWZcbiAgfSxcblxuICBzZWVrOiBmdW5jdGlvbiAoYnl0ZUNvdW50KSB7XG4gICAgdGhpcy5fcG9zaXRpb24gKz0gYnl0ZUNvdW50XG4gIH0sXG5cbiAgcGVla1VpbnQzMjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9idWZmZXJWaWV3LmdldFVpbnQzMih0aGlzLnBvc2l0aW9uKCksIHRydWUpXG4gIH0sXG5cbiAgcG9zaXRpb246IGZ1bmN0aW9uIChuZXdwb3MpIHtcbiAgICBpZiAobmV3cG9zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wb3NpdGlvbiA9IG5ld3Bvc1xuICAgIH1cbiAgfSxcblxuICBzaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2J1ZmZlclZpZXcuYnl0ZUxlbmd0aFxuICB9XG59XG5cbmZ1bmN0aW9uIFVudGFyRmlsZVN0cmVhbSAoYXJyYXlCdWZmZXIpIHtcbiAgdGhpcy5fc3RyZWFtID0gbmV3IFVudGFyU3RyZWFtKGFycmF5QnVmZmVyKVxuICB0aGlzLl9nbG9iYWxQYXhIZWFkZXIgPSBudWxsXG59XG5cblVudGFyRmlsZVN0cmVhbS5wcm90b3R5cGUgPSB7XG4gIGhhc05leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBBIHRhciBmaWxlIGVuZHMgd2l0aCA0IHplcm8gYnl0ZXNcbiAgICByZXR1cm4gdGhpcy5fc3RyZWFtLnBvc2l0aW9uKCkgKyA0IDwgdGhpcy5fc3RyZWFtLnNpemUoKSAmJiB0aGlzLl9zdHJlYW0ucGVla1VpbnQzMigpICE9PSAwXG4gIH0sXG5cbiAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWFkTmV4dEZpbGUoKVxuICB9LFxuXG4gIF9yZWFkTmV4dEZpbGU6IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBzdHJlYW0gPSB0aGlzLl9zdHJlYW1cbiAgICBsZXQgZmlsZSA9IG5ldyBUYXJGaWxlKClcbiAgICBsZXQgaXNIZWFkZXJGaWxlID0gZmFsc2VcbiAgICBsZXQgaGVhZGVyID0gbnVsbFxuXG4gICAgY29uc3QgaGVhZGVyQmVnaW5Qb3MgPSBzdHJlYW0ucG9zaXRpb24oKVxuICAgIGNvbnN0IGRhdGFCZWdpblBvcyA9IGhlYWRlckJlZ2luUG9zICsgNTEyXG5cbiAgICAvLyBSZWFkIGhlYWRlclxuICAgIGZpbGUubmFtZSA9IHN0cmVhbS5yZWFkU3RyaW5nKDEwMClcbiAgICBmaWxlLm1vZGUgPSBzdHJlYW0ucmVhZFN0cmluZyg4KVxuICAgIGZpbGUudWlkID0gcGFyc2VJbnQoc3RyZWFtLnJlYWRTdHJpbmcoOCkpXG4gICAgZmlsZS5naWQgPSBwYXJzZUludChzdHJlYW0ucmVhZFN0cmluZyg4KSlcbiAgICBmaWxlLnNpemUgPSBwYXJzZUludChzdHJlYW0ucmVhZFN0cmluZygxMiksIDgpXG4gICAgZmlsZS5tdGltZSA9IHBhcnNlSW50KHN0cmVhbS5yZWFkU3RyaW5nKDEyKSwgOClcbiAgICBmaWxlLmNoZWNrc3VtID0gcGFyc2VJbnQoc3RyZWFtLnJlYWRTdHJpbmcoOCkpXG4gICAgZmlsZS50eXBlID0gc3RyZWFtLnJlYWRTdHJpbmcoMSlcbiAgICBmaWxlLmxpbmtuYW1lID0gc3RyZWFtLnJlYWRTdHJpbmcoMTAwKVxuICAgIGZpbGUudXN0YXJGb3JtYXQgPSBzdHJlYW0ucmVhZFN0cmluZyg2KVxuXG4gICAgaWYgKGZpbGUudXN0YXJGb3JtYXQuaW5kZXhPZigndXN0YXInKSA+IC0xKSB7XG4gICAgICBmaWxlLnZlcnNpb24gPSBzdHJlYW0ucmVhZFN0cmluZygyKVxuICAgICAgZmlsZS51bmFtZSA9IHN0cmVhbS5yZWFkU3RyaW5nKDMyKVxuICAgICAgZmlsZS5nbmFtZSA9IHN0cmVhbS5yZWFkU3RyaW5nKDMyKVxuICAgICAgZmlsZS5kZXZtYWpvciA9IHBhcnNlSW50KHN0cmVhbS5yZWFkU3RyaW5nKDgpKVxuICAgICAgZmlsZS5kZXZtaW5vciA9IHBhcnNlSW50KHN0cmVhbS5yZWFkU3RyaW5nKDgpKVxuICAgICAgZmlsZS5uYW1lUHJlZml4ID0gc3RyZWFtLnJlYWRTdHJpbmcoMTU1KVxuXG4gICAgICBpZiAoZmlsZS5uYW1lUHJlZml4Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgZmlsZS5uYW1lID0gZmlsZS5uYW1lUHJlZml4ICsgJy8nICsgZmlsZS5uYW1lXG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RyZWFtLnBvc2l0aW9uKGRhdGFCZWdpblBvcylcblxuICAgIC8vIERlcml2ZWQgZnJvbSBodHRwczovL3d3dy5ta3Nzb2Z0d2FyZS5jb20vZG9jcy9tYW40L3BheC40LmFzcFxuICAgIC8vIGFuZCBodHRwczovL3d3dy5pYm0uY29tL3N1cHBvcnQva25vd2xlZGdlY2VudGVyL2VuL1NTTFRCV18yLjMuMC9jb20uaWJtLnpvcy52MnIzLmJweGE1MDAvcHhhcmNoZm0uaHRtXG4gICAgc3dpdGNoIChmaWxlLnR5cGUpIHtcbiAgICAgIGNhc2UgJzAnOiAvLyBOb3JtYWwgZmlsZSBpcyBlaXRoZXIgXCIwXCIgb3IgXCJcXDBcIi5cbiAgICAgIGNhc2UgJyc6IC8vIEluIGNhc2Ugb2YgXCJcXDBcIiwgcmVhZFN0cmluZyByZXR1cm5zIGFuIGVtcHR5IHN0cmluZywgdGhhdCBpcyBcIlwiLlxuICAgICAgICBmaWxlLmJ1ZmZlciA9IHN0cmVhbS5yZWFkQnVmZmVyKGZpbGUuc2l6ZSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJzEnOiAvLyBMaW5rIHRvIGFub3RoZXIgZmlsZSBhbHJlYWR5IGFyY2hpdmVkXG4gICAgICAgIC8vIFRPRE8gU2hvdWxkIHdlIGRvIGFueXRoaW5nIHdpdGggdGhlc2U/XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICcyJzogLy8gU3ltYm9saWMgbGlua1xuICAgICAgICAvLyBUT0RPIFNob3VsZCB3ZSBkbyBhbnl0aGluZyB3aXRoIHRoZXNlP1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnMyc6IC8vIENoYXJhY3RlciBzcGVjaWFsIGRldmljZSAod2hhdCBkb2VzIHRoaXMgbWVhbj8/KVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnNCc6IC8vIEJsb2NrIHNwZWNpYWwgZGV2aWNlXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICc1JzogLy8gRGlyZWN0b3J5XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICc2JzogLy8gRklGTyBzcGVjaWFsIGZpbGVcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJzcnOiAvLyBSZXNlcnZlZFxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnZyc6IC8vIEdsb2JhbCBQQVggaGVhZGVyXG4gICAgICAgIGlzSGVhZGVyRmlsZSA9IHRydWVcbiAgICAgICAgdGhpcy5fZ2xvYmFsSGVhZGVyID0gUGF4SGVhZGVyLnBhcnNlKHN0cmVhbS5yZWFkQnVmZmVyKGZpbGUuc2l6ZSkpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdLJzpcbiAgICAgICAgaXNIZWFkZXJGaWxlID0gdHJ1ZVxuICAgICAgICBoZWFkZXIgPSBMb25nRmllbGRIZWFkZXIucGFyc2UoJ2xpbmtuYW1lJywgc3RyZWFtLnJlYWRCdWZmZXIoZmlsZS5zaXplKSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ0wnOiAvLyBJbmRpY2F0ZXMgdGhhdCB0aGUgbmV4dCBmaWxlIGhhcyBhIGxvbmcgbmFtZSAob3ZlciAxMDAgY2hhcnMpLCBhbmQgdGhlcmVmb3JlIGtlZXBzIHRoZSBuYW1lIG9mIHRoZSBmaWxlIGluIHRoaXMgYmxvY2sncyBidWZmZXIuIGh0dHA6Ly93d3cuZ251Lm9yZy9zb2Z0d2FyZS90YXIvbWFudWFsL2h0bWxfbm9kZS9TdGFuZGFyZC5odG1sXG4gICAgICAgIGlzSGVhZGVyRmlsZSA9IHRydWVcbiAgICAgICAgaGVhZGVyID0gTG9uZ0ZpZWxkSGVhZGVyLnBhcnNlKCduYW1lJywgc3RyZWFtLnJlYWRCdWZmZXIoZmlsZS5zaXplKSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3gnOiAvLyBQQVggaGVhZGVyXG4gICAgICAgIGlzSGVhZGVyRmlsZSA9IHRydWVcbiAgICAgICAgaGVhZGVyID0gUGF4SGVhZGVyLnBhcnNlKHN0cmVhbS5yZWFkQnVmZmVyKGZpbGUuc2l6ZSkpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OiAvLyBVbmtub3duIGZpbGUgdHlwZVxuICAgICAgICBicmVha1xuICAgIH1cblxuICAgIGlmIChmaWxlLmJ1ZmZlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBmaWxlLmJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcigwKVxuICAgIH1cblxuICAgIGxldCBkYXRhRW5kUG9zID0gZGF0YUJlZ2luUG9zICsgZmlsZS5zaXplXG5cbiAgICAvLyBGaWxlIGRhdGEgaXMgcGFkZGVkIHRvIHJlYWNoIGEgNTEyIGJ5dGUgYm91bmRhcnk7IHNraXAgdGhlIHBhZGRlZCBieXRlcyB0b28uXG4gICAgaWYgKGZpbGUuc2l6ZSAlIDUxMiAhPT0gMCkge1xuICAgICAgZGF0YUVuZFBvcyArPSA1MTIgLSAoZmlsZS5zaXplICUgNTEyKVxuICAgIH1cblxuICAgIHN0cmVhbS5wb3NpdGlvbihkYXRhRW5kUG9zKVxuXG4gICAgaWYgKGlzSGVhZGVyRmlsZSkge1xuICAgICAgZmlsZSA9IHRoaXMuX3JlYWROZXh0RmlsZSgpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2dsb2JhbFBheEhlYWRlciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fZ2xvYmFsUGF4SGVhZGVyLmFwcGx5SGVhZGVyKGZpbGUpXG4gICAgfVxuXG4gICAgaWYgKGhlYWRlciAhPT0gbnVsbCkge1xuICAgICAgaGVhZGVyLmFwcGx5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
