(function() {
  "use strict";
  let workerPort = void 0;
  const workerConnect = async () => {
    const ports = await navigator.serial.getPorts().catch((error) => {
      postMessage({
        message: "connectionStatus",
        operation: "connect",
        error
      });
      return [];
    });
    workerPort = ports[0];
    await workerOpenPort();
  };
  const workerOpenPort = async ({ reopen = false } = {}) => {
    if (!workerPort) {
      postMessage({
        message: "connectionStatus",
        operation: reopen ? "reopenConnect" : "connect",
        error: "No port selected"
      });
      return;
    }
    await workerPort.open({ baudRate: 1 }).then(() => {
      postMessage({
        message: "connectionStatus",
        operation: reopen ? "reopenConnect" : "connect",
        status: "success"
      });
      if (workerPort) {
        if (workerPort.readable) {
          postMessage(
            {
              message: "getReadableStream",
              stream: workerPort.readable
            },
            // eslint-disable-next-line
            // @ts-ignore
            [workerPort.readable]
          );
        }
        if (workerPort.writable) {
          postMessage(
            {
              message: "getWritableStream",
              stream: workerPort.writable
            },
            // eslint-disable-next-line
            // @ts-ignore
            [workerPort.writable]
          );
        }
        workerPort.ondisconnect = () => {
          postMessage({
            message: "connectionStatus",
            operation: "portDisconnect",
            status: "success"
          });
          workerPort = void 0;
        };
      }
    }).catch((error) => {
      postMessage({
        message: "connectionStatus",
        operation: reopen ? "reopenConnect" : "connect",
        error
      });
    });
  };
  let attempts = 1;
  const workerClosePort = async ({ reopen = false } = {}) => {
    if (!workerPort) {
      postMessage({
        message: "connectionStatus",
        operation: "disconnect",
        error: "No port selected"
      });
      return;
    }
    try {
      await workerPort.close().then(() => {
        attempts = 1;
        postMessage({
          message: "connectionStatus",
          operation: reopen ? "reopenDisconnect" : "disconnect",
          status: "success"
        });
      }).catch((error) => {
        if (attempts < 3) {
          attempts++;
          return setTimeout(
            () => workerClosePort({
              reopen
            }),
            100
          );
        }
        postMessage({
          message: "connectionStatus",
          operation: reopen ? "reopenDisconnect" : "disconnect",
          error
        });
      });
    } catch (error) {
      postMessage({
        message: "connectionStatus",
        operation: "disconnect",
        error: "Error closing port: " + error
      });
    }
  };
  async function workerReopenPort() {
    await workerClosePort({
      reopen: true
    });
    await workerOpenPort({
      reopen: true
    });
  }
  onmessage = async (event) => {
    const { operation } = event.data;
    switch (operation) {
      case "connect":
        await workerConnect();
        break;
      case "openPort":
        await workerOpenPort();
        break;
      case "disconnect":
        await workerClosePort();
        break;
      case "reopenPort":
        await workerReopenPort();
        break;
      default:
        postMessage({
          message: "error",
          operation: "onmessage",
          error: "Unknown operation"
        });
    }
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyLTNhekpDOGZOLmpzIiwic291cmNlcyI6WyIuLi9zcmMvc2hhcmVkL2xpYi9mbGlwcGVySnMvd29ya2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCB3b3JrZXJQb3J0OiBTZXJpYWxQb3J0IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXG5cbmNvbnN0IHdvcmtlckNvbm5lY3QgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHBvcnRzOiBTZXJpYWxQb3J0W10gPSBhd2FpdCBuYXZpZ2F0b3Iuc2VyaWFsXG4gICAgLmdldFBvcnRzKClcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBwb3N0TWVzc2FnZSh7XG4gICAgICAgIG1lc3NhZ2U6ICdjb25uZWN0aW9uU3RhdHVzJyxcbiAgICAgICAgb3BlcmF0aW9uOiAnY29ubmVjdCcsXG4gICAgICAgIGVycm9yXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gW11cbiAgICB9KVxuICB3b3JrZXJQb3J0ID0gcG9ydHNbMF1cbiAgYXdhaXQgd29ya2VyT3BlblBvcnQoKVxufVxuXG5jb25zdCB3b3JrZXJPcGVuUG9ydCA9IGFzeW5jICh7IHJlb3BlbiA9IGZhbHNlIH0gPSB7fSkgPT4ge1xuICBpZiAoIXdvcmtlclBvcnQpIHtcbiAgICBwb3N0TWVzc2FnZSh7XG4gICAgICBtZXNzYWdlOiAnY29ubmVjdGlvblN0YXR1cycsXG4gICAgICBvcGVyYXRpb246IHJlb3BlbiA/ICdyZW9wZW5Db25uZWN0JyA6ICdjb25uZWN0JyxcbiAgICAgIGVycm9yOiAnTm8gcG9ydCBzZWxlY3RlZCdcbiAgICB9KVxuICAgIHJldHVyblxuICB9XG5cbiAgYXdhaXQgd29ya2VyUG9ydFxuICAgIC5vcGVuKHsgYmF1ZFJhdGU6IDEgfSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBwb3N0TWVzc2FnZSh7XG4gICAgICAgIG1lc3NhZ2U6ICdjb25uZWN0aW9uU3RhdHVzJyxcbiAgICAgICAgb3BlcmF0aW9uOiByZW9wZW4gPyAncmVvcGVuQ29ubmVjdCcgOiAnY29ubmVjdCcsXG4gICAgICAgIHN0YXR1czogJ3N1Y2Nlc3MnXG4gICAgICB9KVxuXG4gICAgICBpZiAod29ya2VyUG9ydCkge1xuICAgICAgICBpZiAod29ya2VyUG9ydC5yZWFkYWJsZSkge1xuICAgICAgICAgIHBvc3RNZXNzYWdlKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtZXNzYWdlOiAnZ2V0UmVhZGFibGVTdHJlYW0nLFxuICAgICAgICAgICAgICBzdHJlYW06IHdvcmtlclBvcnQucmVhZGFibGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIFt3b3JrZXJQb3J0LnJlYWRhYmxlXVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICBpZiAod29ya2VyUG9ydC53cml0YWJsZSkge1xuICAgICAgICAgIHBvc3RNZXNzYWdlKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBtZXNzYWdlOiAnZ2V0V3JpdGFibGVTdHJlYW0nLFxuICAgICAgICAgICAgICBzdHJlYW06IHdvcmtlclBvcnQud3JpdGFibGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIFt3b3JrZXJQb3J0LndyaXRhYmxlXVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExpc3RlbiBmb3IgZGlzY29ubmVjdHNcbiAgICAgICAgd29ya2VyUG9ydC5vbmRpc2Nvbm5lY3QgPSAoKSA9PiB7XG4gICAgICAgICAgcG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgbWVzc2FnZTogJ2Nvbm5lY3Rpb25TdGF0dXMnLFxuICAgICAgICAgICAgb3BlcmF0aW9uOiAncG9ydERpc2Nvbm5lY3QnLFxuICAgICAgICAgICAgc3RhdHVzOiAnc3VjY2VzcydcbiAgICAgICAgICB9KVxuICAgICAgICAgIHdvcmtlclBvcnQgPSB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgcG9zdE1lc3NhZ2Uoe1xuICAgICAgICBtZXNzYWdlOiAnY29ubmVjdGlvblN0YXR1cycsXG4gICAgICAgIG9wZXJhdGlvbjogcmVvcGVuID8gJ3Jlb3BlbkNvbm5lY3QnIDogJ2Nvbm5lY3QnLFxuICAgICAgICBlcnJvclxuICAgICAgfSlcbiAgICB9KVxufVxuXG5sZXQgYXR0ZW1wdHMgPSAxXG5jb25zdCB3b3JrZXJDbG9zZVBvcnQgPSBhc3luYyAoeyByZW9wZW4gPSBmYWxzZSB9ID0ge30pID0+IHtcbiAgaWYgKCF3b3JrZXJQb3J0KSB7XG4gICAgcG9zdE1lc3NhZ2Uoe1xuICAgICAgbWVzc2FnZTogJ2Nvbm5lY3Rpb25TdGF0dXMnLFxuICAgICAgb3BlcmF0aW9uOiAnZGlzY29ubmVjdCcsXG4gICAgICBlcnJvcjogJ05vIHBvcnQgc2VsZWN0ZWQnXG4gICAgfSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIHRyeSB7XG4gICAgYXdhaXQgd29ya2VyUG9ydFxuICAgICAgLmNsb3NlKClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgYXR0ZW1wdHMgPSAxXG5cbiAgICAgICAgcG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgIG1lc3NhZ2U6ICdjb25uZWN0aW9uU3RhdHVzJyxcbiAgICAgICAgICBvcGVyYXRpb246IHJlb3BlbiA/ICdyZW9wZW5EaXNjb25uZWN0JyA6ICdkaXNjb25uZWN0JyxcbiAgICAgICAgICBzdGF0dXM6ICdzdWNjZXNzJ1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gaW4gY2FzZSByZWFkZXIgYW5kIHdyaXRlciBkb24ndCBnZXQgdW5sb2NrZWQgZXZlbiB3aXRoIHRoZSBhZGRlZCBkZWxheSBvZiAxbXNcbiAgICAgICAgaWYgKGF0dGVtcHRzIDwgMykge1xuICAgICAgICAgIGF0dGVtcHRzKytcbiAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChcbiAgICAgICAgICAgICgpID0+XG4gICAgICAgICAgICAgIHdvcmtlckNsb3NlUG9ydCh7XG4gICAgICAgICAgICAgICAgcmVvcGVuXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgMTAwXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHBvc3RNZXNzYWdlKHtcbiAgICAgICAgICBtZXNzYWdlOiAnY29ubmVjdGlvblN0YXR1cycsXG4gICAgICAgICAgb3BlcmF0aW9uOiByZW9wZW4gPyAncmVvcGVuRGlzY29ubmVjdCcgOiAnZGlzY29ubmVjdCcsXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcG9zdE1lc3NhZ2Uoe1xuICAgICAgbWVzc2FnZTogJ2Nvbm5lY3Rpb25TdGF0dXMnLFxuICAgICAgb3BlcmF0aW9uOiAnZGlzY29ubmVjdCcsXG4gICAgICBlcnJvcjogJ0Vycm9yIGNsb3NpbmcgcG9ydDogJyArIGVycm9yXG4gICAgfSlcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiB3b3JrZXJSZW9wZW5Qb3J0KCkge1xuICBhd2FpdCB3b3JrZXJDbG9zZVBvcnQoe1xuICAgIHJlb3BlbjogdHJ1ZVxuICB9KVxuICBhd2FpdCB3b3JrZXJPcGVuUG9ydCh7XG4gICAgcmVvcGVuOiB0cnVlXG4gIH0pXG59XG5cbm9ubWVzc2FnZSA9IGFzeW5jIChldmVudCkgPT4ge1xuICBjb25zdCB7IG9wZXJhdGlvbiB9ID0gZXZlbnQuZGF0YVxuXG4gIHN3aXRjaCAob3BlcmF0aW9uKSB7XG4gICAgY2FzZSAnY29ubmVjdCc6XG4gICAgICBhd2FpdCB3b3JrZXJDb25uZWN0KClcbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdvcGVuUG9ydCc6XG4gICAgICBhd2FpdCB3b3JrZXJPcGVuUG9ydCgpXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAnZGlzY29ubmVjdCc6XG4gICAgICBhd2FpdCB3b3JrZXJDbG9zZVBvcnQoKVxuICAgICAgYnJlYWtcblxuICAgIGNhc2UgJ3Jlb3BlblBvcnQnOlxuICAgICAgYXdhaXQgd29ya2VyUmVvcGVuUG9ydCgpXG4gICAgICBicmVha1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHBvc3RNZXNzYWdlKHtcbiAgICAgICAgbWVzc2FnZTogJ2Vycm9yJyxcbiAgICAgICAgb3BlcmF0aW9uOiAnb25tZXNzYWdlJyxcbiAgICAgICAgZXJyb3I6ICdVbmtub3duIG9wZXJhdGlvbidcbiAgICAgIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQUksYUFBcUM7QUFFekMsUUFBTSxnQkFBZ0IsWUFBWTtBQUNoQyxVQUFNLFFBQXNCLE1BQU0sVUFBVSxPQUN6QyxXQUNBLE1BQU0sQ0FBQyxVQUFVO0FBQ2hCLGtCQUFZO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxXQUFXO0FBQUEsUUFDWDtBQUFBLE1BQUEsQ0FDRDtBQUVELGFBQU8sQ0FBQTtBQUFBLElBQ1QsQ0FBQztBQUNILGlCQUFhLE1BQU0sQ0FBQztBQUNwQixVQUFNLGVBQUE7QUFBQSxFQUNSO0FBRUEsUUFBTSxpQkFBaUIsT0FBTyxFQUFFLFNBQVMsTUFBQSxJQUFVLENBQUEsTUFBTztBQUN4RCxRQUFJLENBQUMsWUFBWTtBQUNmLGtCQUFZO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxXQUFXLFNBQVMsa0JBQWtCO0FBQUEsUUFDdEMsT0FBTztBQUFBLE1BQUEsQ0FDUjtBQUNEO0FBQUEsSUFDRjtBQUVBLFVBQU0sV0FDSCxLQUFLLEVBQUUsVUFBVSxHQUFHLEVBQ3BCLEtBQUssTUFBTTtBQUNWLGtCQUFZO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxXQUFXLFNBQVMsa0JBQWtCO0FBQUEsUUFDdEMsUUFBUTtBQUFBLE1BQUEsQ0FDVDtBQUVELFVBQUksWUFBWTtBQUNkLFlBQUksV0FBVyxVQUFVO0FBQ3ZCO0FBQUEsWUFDRTtBQUFBLGNBQ0UsU0FBUztBQUFBLGNBQ1QsUUFBUSxXQUFXO0FBQUEsWUFBQTtBQUFBO0FBQUE7QUFBQSxZQUlyQixDQUFDLFdBQVcsUUFBUTtBQUFBLFVBQUE7QUFBQSxRQUV4QjtBQUNBLFlBQUksV0FBVyxVQUFVO0FBQ3ZCO0FBQUEsWUFDRTtBQUFBLGNBQ0UsU0FBUztBQUFBLGNBQ1QsUUFBUSxXQUFXO0FBQUEsWUFBQTtBQUFBO0FBQUE7QUFBQSxZQUlyQixDQUFDLFdBQVcsUUFBUTtBQUFBLFVBQUE7QUFBQSxRQUV4QjtBQUdBLG1CQUFXLGVBQWUsTUFBTTtBQUM5QixzQkFBWTtBQUFBLFlBQ1YsU0FBUztBQUFBLFlBQ1QsV0FBVztBQUFBLFlBQ1gsUUFBUTtBQUFBLFVBQUEsQ0FDVDtBQUNELHVCQUFhO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUMsRUFDQSxNQUFNLENBQUMsVUFBVTtBQUNoQixrQkFBWTtBQUFBLFFBQ1YsU0FBUztBQUFBLFFBQ1QsV0FBVyxTQUFTLGtCQUFrQjtBQUFBLFFBQ3RDO0FBQUEsTUFBQSxDQUNEO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDTDtBQUVBLE1BQUksV0FBVztBQUNmLFFBQU0sa0JBQWtCLE9BQU8sRUFBRSxTQUFTLE1BQUEsSUFBVSxDQUFBLE1BQU87QUFDekQsUUFBSSxDQUFDLFlBQVk7QUFDZixrQkFBWTtBQUFBLFFBQ1YsU0FBUztBQUFBLFFBQ1QsV0FBVztBQUFBLFFBQ1gsT0FBTztBQUFBLE1BQUEsQ0FDUjtBQUNEO0FBQUEsSUFDRjtBQUVBLFFBQUk7QUFDRixZQUFNLFdBQ0gsUUFDQSxLQUFLLE1BQU07QUFDVixtQkFBVztBQUVYLG9CQUFZO0FBQUEsVUFDVixTQUFTO0FBQUEsVUFDVCxXQUFXLFNBQVMscUJBQXFCO0FBQUEsVUFDekMsUUFBUTtBQUFBLFFBQUEsQ0FDVDtBQUFBLE1BQ0gsQ0FBQyxFQUNBLE1BQU0sQ0FBQyxVQUFVO0FBRWhCLFlBQUksV0FBVyxHQUFHO0FBQ2hCO0FBQ0EsaUJBQU87QUFBQSxZQUNMLE1BQ0UsZ0JBQWdCO0FBQUEsY0FDZDtBQUFBLFlBQUEsQ0FDRDtBQUFBLFlBQ0g7QUFBQSxVQUFBO0FBQUEsUUFFSjtBQUNBLG9CQUFZO0FBQUEsVUFDVixTQUFTO0FBQUEsVUFDVCxXQUFXLFNBQVMscUJBQXFCO0FBQUEsVUFDekM7QUFBQSxRQUFBLENBQ0Q7QUFBQSxNQUNILENBQUM7QUFBQSxJQUNMLFNBQVMsT0FBTztBQUNkLGtCQUFZO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxXQUFXO0FBQUEsUUFDWCxPQUFPLHlCQUF5QjtBQUFBLE1BQUEsQ0FDakM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUVBLGlCQUFlLG1CQUFtQjtBQUNoQyxVQUFNLGdCQUFnQjtBQUFBLE1BQ3BCLFFBQVE7QUFBQSxJQUFBLENBQ1Q7QUFDRCxVQUFNLGVBQWU7QUFBQSxNQUNuQixRQUFRO0FBQUEsSUFBQSxDQUNUO0FBQUEsRUFDSDtBQUVBLGNBQVksT0FBTyxVQUFVO0FBQzNCLFVBQU0sRUFBRSxjQUFjLE1BQU07QUFFNUIsWUFBUSxXQUFBO0FBQUEsTUFDTixLQUFLO0FBQ0gsY0FBTSxjQUFBO0FBQ047QUFBQSxNQUVGLEtBQUs7QUFDSCxjQUFNLGVBQUE7QUFDTjtBQUFBLE1BRUYsS0FBSztBQUNILGNBQU0sZ0JBQUE7QUFDTjtBQUFBLE1BRUYsS0FBSztBQUNILGNBQU0saUJBQUE7QUFDTjtBQUFBLE1BRUY7QUFDRSxvQkFBWTtBQUFBLFVBQ1YsU0FBUztBQUFBLFVBQ1QsV0FBVztBQUFBLFVBQ1gsT0FBTztBQUFBLFFBQUEsQ0FDUjtBQUFBLElBQUE7QUFBQSxFQUVQOzsifQ==
