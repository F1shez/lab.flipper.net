(function() {
  "use strict";
  const defaults = {
    margin: {
      top: 50,
      bottom: 50
    },
    breakpoints: {
      zoom: 10,
      pulseInOneX: 75
    }
  };
  const getBoundaries = (data2, width2, transform) => {
    const maxRightSide = width2 * transform.k;
    const pulseInOneX = data2.width / maxRightSide;
    const leftSide = ~~(transform.x * -1);
    const rightSide = ~~(transform.x * -1 + width2);
    const leftPulse = leftSide * pulseInOneX;
    const rightPulse = rightSide * pulseInOneX;
    return { leftPulse, rightPulse, pulseInOneX };
  };
  const combiningPulses = (data2, pulseInOneX) => {
    const pulses2 = [];
    let prevX = 0;
    for (let i = 0; i < data2.pulses.length; i++) {
      if (i % 2 !== 0) {
        if (data2.pulses[i] >= pulseInOneX * 10) {
          pulses2.push(prevX);
          pulses2.push(data2.pulses[i]);
          prevX = 0;
          continue;
        }
      }
      prevX += data2.pulses[i];
    }
    if (prevX !== 0) {
      pulses2.push(prevX);
    }
    return pulses2;
  };
  const filterPulses = (data2, sum, prevX, skipPulse, leftPulse, rightPulse) => {
    const pulses2 = data2.filter((d) => {
      const minX = sum;
      sum += d;
      const maxX = sum;
      if (maxX >= leftPulse && minX <= rightPulse) return true;
      if (minX < leftPulse) {
        prevX += d;
        skipPulse += 1;
      }
      return false;
    });
    return { pulses: pulses2, sum, prevX, skipPulse };
  };
  const drawFill = (context2, x, y, width2, height2, color) => {
    context2.beginPath();
    context2.fillStyle = color;
    context2.fillRect(x, y, width2, height2);
    context2.closePath();
  };
  const drawLine = (context2, coordinates, options) => {
    context2.beginPath();
    context2.lineWidth = options.lineWidth;
    context2.strokeStyle = options.strokeStyle;
    context2.moveTo(...coordinates.start);
    context2.lineTo(...coordinates.end);
    context2.stroke();
    context2.closePath();
  };
  const drawText = (context2, text, x, y, options) => {
    context2.beginPath();
    context2.fillStyle = options.color;
    context2.font = options.font;
    context2.textAlign = options.align;
    context2.textBaseline = options.baseline;
    context2.fillText(text, x, y);
    context2.closePath();
  };
  const drawHint = (context2, x, height2, options) => {
    context2.lineWidth = options.hintLine;
    context2.strokeStyle = options.hintStroke;
    context2.setLineDash(options.hintDash);
    context2.beginPath();
    context2.moveTo(x, 0);
    context2.lineTo(x, height2);
    context2.stroke();
    context2.setLineDash([]);
  };
  const margin = defaults.margin;
  let width, height, dpi = null;
  let data = null;
  let theme = null;
  let context, labelContext, hintsContext = null;
  let pulses = [];
  let altHints = [];
  let barHeight = null;
  const breakpointZoom = defaults.breakpoints.zoom;
  const breakpointPulseInOneX = defaults.breakpoints.pulseInOneX;
  let maxZoom = null;
  self.onmessage = (e) => {
    switch (e.data.message) {
      case "setConfigContext":
        width = e.data.width;
        height = e.data.height;
        dpi = e.data.dpi;
        break;
      case "setData":
        data = JSON.parse(e.data.data);
        break;
      case "setTheme":
        theme = e.data.theme;
        break;
      case "setMaxZoom":
        maxZoom = e.data.maxZoom;
        break;
      case "setBarHeight":
        barHeight = e.data.barHeight;
        break;
      case "setAltHints":
        altHints = JSON.parse(e.data.altHints);
        break;
      case "getContext":
        context = context2d(e.data.canvas, width, height, dpi);
        break;
      case "getLabelContext":
        labelContext = context2d(e.data.canvas, width, height, dpi);
        break;
      case "getHintsContext":
        hintsContext = context2d(e.data.canvas, width, height, dpi);
        break;
      case "redrawHintsCanvas":
        redrawHintsCanvas(e.data.transform);
        break;
      case "zoomed":
        zoomed(e.data.transform);
        break;
    }
  };
  const context2d = (canvas, width2, height2, dpi2) => {
    const context2 = canvas.getContext("2d", { desynchronized: true });
    canvas.width = Math.floor(width2 * dpi2);
    canvas.height = Math.floor(height2 * dpi2);
    context2.scale(dpi2, dpi2);
    return context2;
  };
  const drawAllHints = (transform) => {
    const { leftPulse, rightPulse } = getBoundaries(data, width, transform);
    const hints = data.hints.filter((d) => {
      const x0 = d[0];
      const x1 = d[1];
      if (x0 >= leftPulse && x0 <= rightPulse) return true;
      if (x1 >= leftPulse && x1 <= rightPulse) return true;
      return false;
    });
    let prevHint;
    for (let i = 0; i < hints.length; i += 1) {
      const hint = hints[i];
      const x0 = hint[0];
      const x1 = hint[1];
      if (prevHint !== x0 && x0 >= 0 && x0 < data.width) {
        drawHint(
          hintsContext,
          x0 * (transform.k / maxZoom) + transform.x,
          height,
          {
            hintLine: theme.hintLine,
            hintStroke: theme.hintStroke,
            hintDash: theme.hintDash
          }
        );
      }
      if (x1 >= 0 && x1 < data.width) {
        drawHint(
          hintsContext,
          x1 * (transform.k / maxZoom) + transform.x,
          height,
          {
            hintLine: theme.hintLine,
            hintStroke: theme.hintStroke,
            hintDash: theme.hintDash
          }
        );
      }
      prevHint = x1;
    }
    const filteredAltHints = altHints.filter((d) => {
      const x0 = d[0];
      const x1 = d[1];
      if (x0 >= leftPulse && x0 <= rightPulse) return true;
      if (x1 >= leftPulse && x1 <= rightPulse) return true;
      return false;
    });
    prevHint = null;
    for (let i = 0; i < filteredAltHints.length; i += 1) {
      const hint = filteredAltHints[i];
      const x0 = hint[0];
      const x1 = hint[1];
      if (prevHint !== x0 && x0 >= 0 && x0 < data.width) {
        drawHint(
          hintsContext,
          x0 * (transform.k / maxZoom) + transform.x,
          height,
          {
            hintLine: theme.hintAltLine,
            hintStroke: theme.hintAltStroke,
            hintDash: theme.hintAltDash
          }
        );
      }
      if (x1 >= 0 && x1 < data.width) {
        drawHint(
          hintsContext,
          x1 * (transform.k / maxZoom) + transform.x,
          height,
          {
            hintLine: theme.hintAltLine,
            hintStroke: theme.hintAltStroke,
            hintDash: theme.hintAltDash
          }
        );
      }
      prevHint = x1;
    }
  };
  const redrawHintsCanvas = (transform) => {
    hintsContext.save();
    hintsContext.clearRect(0, 0, width, height);
    drawAllHints(transform);
    hintsContext.restore();
  };
  const zoomed = (transform) => {
    labelContext.save();
    labelContext.clearRect(0, 0, width, height);
    hintsContext.save();
    hintsContext.clearRect(0, 0, width, height);
    context.save();
    context.clearRect(0, 0, width, height);
    drawFill(
      context,
      0,
      -1,
      width,
      barHeight + margin.top + margin.bottom,
      theme.spaceFill
    );
    let prevX = 0;
    let skipPulse = 0;
    let sum = 0;
    const { leftPulse, rightPulse, pulseInOneX } = getBoundaries(
      data,
      width,
      transform
    );
    if (transform.k < breakpointZoom) {
      pulses = combiningPulses(data, pulseInOneX);
      ({ pulses, sum, prevX, skipPulse } = filterPulses(
        pulses,
        sum,
        prevX,
        skipPulse,
        leftPulse,
        rightPulse
      ));
    } else {
      ({ pulses, sum, prevX, skipPulse } = filterPulses(
        data.pulses,
        sum,
        prevX,
        skipPulse,
        leftPulse,
        rightPulse
      ));
    }
    for (let i = 0; i < pulses.length; i++) {
      const x = pulses[i];
      if (x) {
        if ((i + skipPulse) % 2 === 0) {
          drawFill(
            context,
            prevX * (transform.k / maxZoom) + transform.x,
            margin.top,
            x * (transform.k / maxZoom),
            barHeight,
            transform.k < breakpointZoom ? theme.combiningFill : theme.hiFill
          );
          drawLine(
            context,
            {
              start: [
                prevX * (transform.k / maxZoom) + transform.x,
                height - barHeight - margin.top + theme.hiLine / 2
              ],
              end: [
                (prevX + x) * (transform.k / maxZoom) + transform.x,
                height - barHeight - margin.top + theme.hiLine / 2
              ]
            },
            {
              lineWidth: theme.hiLine,
              strokeStyle: theme.hiStroke
            }
          );
        } else {
          drawLine(
            context,
            {
              start: [
                prevX * (transform.k / maxZoom) + transform.x,
                height - margin.top - theme.loLine / 2
              ],
              end: [
                (prevX + x) * (transform.k / maxZoom) + transform.x,
                height - margin.top - theme.loLine / 2
              ]
            },
            {
              lineWidth: theme.loLine,
              strokeStyle: theme.loStroke
            }
          );
        }
        const w = x * (width * transform.k / data.width);
        if (w > theme.fontSize * 4) {
          drawText(
            labelContext,
            x,
            (prevX + x / 2) * (transform.k / maxZoom) + transform.x,
            height / 2,
            {
              color: theme.fontColor,
              font: `${theme.fontSize}px sans-serif`,
              align: theme.fontAlign,
              baseline: theme.fontBaseline
            }
          );
        }
        if (pulseInOneX <= breakpointPulseInOneX && transform.k >= breakpointZoom && (i + skipPulse) % 2 === 0) {
          drawLine(
            context,
            {
              start: [
                prevX * (transform.k / maxZoom) + transform.x,
                height - margin.top
              ],
              end: [
                prevX * (transform.k / maxZoom) + transform.x,
                height - barHeight - margin.top
              ]
            },
            {
              lineWidth: theme.edgeLine,
              strokeStyle: theme.hiStroke
            }
          );
          drawLine(
            context,
            {
              start: [
                (prevX + x) * (transform.k / maxZoom) + transform.x,
                height - barHeight - margin.top
              ],
              end: [
                (prevX + x) * (transform.k / maxZoom) + transform.x,
                height - margin.top
              ]
            },
            {
              lineWidth: theme.edgeLine,
              strokeStyle: theme.loStroke
            }
          );
        }
        prevX = prevX + x;
      }
    }
    drawAllHints(transform);
    labelContext.restore();
    hintsContext.restore();
    context.restore();
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyLURxNEsyVkc2LmpzIiwic291cmNlcyI6WyIuLi9zcmMvZW50aXRpZXMvUHVsc2VQbG90dGVyL2xpYi9jb25zdGFudHMuanMiLCIuLi9zcmMvZW50aXRpZXMvUHVsc2VQbG90dGVyL2xpYi91dGlscy5qcyIsIi4uL3NyYy9lbnRpdGllcy9QdWxzZVBsb3R0ZXIvbGliL3dvcmtlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkZWZhdWx0cyA9IHtcbiAgc2VsZWN0b3I6ICcjZmxpcHBlclBsb3R0ZXInLFxuICBoZWlnaHQ6IDMwMCxcbiAgbWFyZ2luOiB7XG4gICAgdG9wOiA1MCxcbiAgICByaWdodDogMCxcbiAgICBib3R0b206IDUwLFxuICAgIGxlZnQ6IDBcbiAgfSxcbiAgYnJlYWtwb2ludHM6IHtcbiAgICB6b29tOiAxMCxcbiAgICBwdWxzZUluT25lWDogNzVcbiAgfSxcbiAgdGhlbWU6IHtcbiAgICBzcGFjZUZpbGw6ICcjZmFmYWZhJyxcbiAgICBjb21iaW5pbmdGaWxsOiAnI2U2ZWNlZScsXG4gICAgaGlGaWxsOiAnI2UwZWZlMCcsXG4gICAgaGlTdHJva2U6ICcjM2MzJyxcbiAgICBoaUxpbmU6IDQsXG4gICAgbG9TdHJva2U6ICcjYzMzJyxcbiAgICBsb0xpbmU6IDQsXG4gICAgZWRnZVN0cm9rZTogJyNjY2MnLFxuICAgIGVkZ2VMaW5lOiAxLFxuICAgIGhpbnRMaW5lOiAxLFxuICAgIGhpbnRTdHJva2U6ICcjYWFmJyxcbiAgICBoaW50RGFzaDogWzMsIDJdLFxuICAgIGhpbnRBbHRMaW5lOiAzLFxuICAgIGhpbnRBbHRTdHJva2U6ICcjYzU1JyxcbiAgICBoaW50QWx0RGFzaDogWzMsIDJdLFxuICAgIHlIaW50TG86IDExNSxcbiAgICB5SGludEhpOiAzNSxcbiAgICBmb250U2l6ZTogMTAsXG4gICAgZm9udENvbG9yOiAnYmxhY2snLFxuICAgIGZvbnRBbGlnbjogJ2NlbnRlcicsXG4gICAgZm9udEJhc2VsaW5lOiAnbWlkZGxlJ1xuICB9XG59XG5cbmNvbnN0IHN0eWxlcyA9IHtcbiAgcmVsYXRpdmVQb3NpdGlvbjogJ3Bvc2l0aW9uOiByZWxhdGl2ZTsnLFxuICBmdWxsV2lkdGg6XG4gICAgJ3dpZHRoOiAxMDAlICFpbXBvcnRhbnQ7IG1hcmdpbi1sZWZ0OiAwICFpbXBvcnRhbnQ7IG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50OycsXG4gIGFic29sdXRlVG9wTGVmdDogJ3Bvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOydcbn1cblxuLy8gY29uc3QgU2xpY2VycyA9IHtcbi8vICAgUENNOiAnUENNJyxcbi8vICAgUFdNOiAnUFdNJyxcbi8vICAgUFBNOiAnUFBNJyxcbi8vICAgTUM6ICdNQycsXG4vLyAgIERNOiAnRE0nLFxuLy8gICBOUlpJOiAnTlJaSScsXG4vLyAgIENNSTogJ0NNSScsXG4vLyAgIFBJV006ICdQSVdNJ1xuLy8gfVxuXG5jb25zdCBzbGljZXJPcHRpb25zID0gW1xuICAvLyB7IHRleHQ6ICdvZmYnLCB2YWx1ZTogJycgfSxcbiAgeyB0ZXh0OiAnUENNJywgdmFsdWU6ICdQQ00nIH0sXG4gIHsgdGV4dDogJ1BXTScsIHZhbHVlOiAnUFdNJyB9LFxuICB7IHRleHQ6ICdQUE0nLCB2YWx1ZTogJ1BQTScgfSxcbiAgeyB0ZXh0OiAnTUMnLCB2YWx1ZTogJ01DJyB9LFxuICB7IHRleHQ6ICdETScsIHZhbHVlOiAnRE0nIH0sXG4gIHsgdGV4dDogJ05SWkknLCB2YWx1ZTogJ05SWkknIH0sXG4gIHsgdGV4dDogJ0NNSScsIHZhbHVlOiAnQ01JJyB9LFxuICB7IHRleHQ6ICdQSVdNJywgdmFsdWU6ICdQSVdNJyB9XG5dXG5cbmV4cG9ydCB7IGRlZmF1bHRzLCBzdHlsZXMsIHNsaWNlck9wdGlvbnMgfVxuIiwiY29uc3Qgc2VsZWN0b3IgPSAoZWxlbWVudE9yU2VsZWN0b3IpID0+IHtcbiAgaWYgKCFlbGVtZW50T3JTZWxlY3Rvcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBpZiAodHlwZW9mIGVsZW1lbnRPclNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnRPclNlbGVjdG9yKVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnRPclNlbGVjdG9yXG59XG5cbmNvbnN0IGdldEJvdW5kYXJpZXMgPSAoZGF0YSwgd2lkdGgsIHRyYW5zZm9ybSkgPT4ge1xuICAvLyBjb25zdCBtaW5MZWZ0U2lkZSA9IDBcbiAgY29uc3QgbWF4UmlnaHRTaWRlID0gd2lkdGggKiB0cmFuc2Zvcm0ua1xuICBjb25zdCBwdWxzZUluT25lWCA9IGRhdGEud2lkdGggLyBtYXhSaWdodFNpZGVcbiAgY29uc3QgbGVmdFNpZGUgPSB+fih0cmFuc2Zvcm0ueCAqIC0xKVxuICBjb25zdCByaWdodFNpZGUgPSB+fih0cmFuc2Zvcm0ueCAqIC0xICsgd2lkdGgpXG4gIC8vIGNvbnN0IHB1bHNlUmF0ZSA9IGRhdGEud2lkdGggLyB0cmFuc2Zvcm0ua1xuICBjb25zdCBsZWZ0UHVsc2UgPSBsZWZ0U2lkZSAqIHB1bHNlSW5PbmVYXG4gIGNvbnN0IHJpZ2h0UHVsc2UgPSByaWdodFNpZGUgKiBwdWxzZUluT25lWFxuXG4gIHJldHVybiB7IGxlZnRQdWxzZSwgcmlnaHRQdWxzZSwgcHVsc2VJbk9uZVggfVxufVxuXG5jb25zdCBjb21iaW5pbmdQdWxzZXMgPSAoZGF0YSwgcHVsc2VJbk9uZVgpID0+IHtcbiAgY29uc3QgcHVsc2VzID0gW11cbiAgbGV0IHByZXZYID0gMFxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5wdWxzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaSAlIDIgIT09IDApIHtcbiAgICAgIGlmIChkYXRhLnB1bHNlc1tpXSA+PSBwdWxzZUluT25lWCAqIDEwKSB7XG4gICAgICAgIHB1bHNlcy5wdXNoKHByZXZYKVxuICAgICAgICBwdWxzZXMucHVzaChkYXRhLnB1bHNlc1tpXSlcbiAgICAgICAgcHJldlggPSAwXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJldlggKz0gZGF0YS5wdWxzZXNbaV1cbiAgfVxuXG4gIGlmIChwcmV2WCAhPT0gMCkge1xuICAgIHB1bHNlcy5wdXNoKHByZXZYKVxuICB9XG5cbiAgcmV0dXJuIHB1bHNlc1xufVxuXG5jb25zdCBmaWx0ZXJQdWxzZXMgPSAoZGF0YSwgc3VtLCBwcmV2WCwgc2tpcFB1bHNlLCBsZWZ0UHVsc2UsIHJpZ2h0UHVsc2UpID0+IHtcbiAgY29uc3QgcHVsc2VzID0gZGF0YS5maWx0ZXIoKGQpID0+IHtcbiAgICBjb25zdCBtaW5YID0gc3VtXG4gICAgc3VtICs9IGRcbiAgICBjb25zdCBtYXhYID0gc3VtXG4gICAgaWYgKG1heFggPj0gbGVmdFB1bHNlICYmIG1pblggPD0gcmlnaHRQdWxzZSkgcmV0dXJuIHRydWVcbiAgICBpZiAobWluWCA8IGxlZnRQdWxzZSkge1xuICAgICAgcHJldlggKz0gZFxuICAgICAgc2tpcFB1bHNlICs9IDFcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG5cbiAgcmV0dXJuIHsgcHVsc2VzLCBzdW0sIHByZXZYLCBza2lwUHVsc2UgfVxufVxuXG5jb25zdCBkcmF3RmlsbCA9IChjb250ZXh0LCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvcikgPT4ge1xuICBjb250ZXh0LmJlZ2luUGF0aCgpXG4gIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3JcbiAgY29udGV4dC5maWxsUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KVxuICBjb250ZXh0LmNsb3NlUGF0aCgpXG59XG5cbmNvbnN0IGRyYXdMaW5lID0gKGNvbnRleHQsIGNvb3JkaW5hdGVzLCBvcHRpb25zKSA9PiB7XG4gIGNvbnRleHQuYmVnaW5QYXRoKClcbiAgY29udGV4dC5saW5lV2lkdGggPSBvcHRpb25zLmxpbmVXaWR0aFxuICBjb250ZXh0LnN0cm9rZVN0eWxlID0gb3B0aW9ucy5zdHJva2VTdHlsZVxuICBjb250ZXh0Lm1vdmVUbyguLi5jb29yZGluYXRlcy5zdGFydClcbiAgY29udGV4dC5saW5lVG8oLi4uY29vcmRpbmF0ZXMuZW5kKVxuICBjb250ZXh0LnN0cm9rZSgpXG4gIGNvbnRleHQuY2xvc2VQYXRoKClcbn1cblxuY29uc3QgZHJhd1RleHQgPSAoY29udGV4dCwgdGV4dCwgeCwgeSwgb3B0aW9ucykgPT4ge1xuICBjb250ZXh0LmJlZ2luUGF0aCgpXG4gIGNvbnRleHQuZmlsbFN0eWxlID0gb3B0aW9ucy5jb2xvclxuICBjb250ZXh0LmZvbnQgPSBvcHRpb25zLmZvbnRcbiAgY29udGV4dC50ZXh0QWxpZ24gPSBvcHRpb25zLmFsaWduXG4gIGNvbnRleHQudGV4dEJhc2VsaW5lID0gb3B0aW9ucy5iYXNlbGluZVxuICBjb250ZXh0LmZpbGxUZXh0KHRleHQsIHgsIHkpXG4gIGNvbnRleHQuY2xvc2VQYXRoKClcbn1cblxuY29uc3QgZHJhd0hpbnQgPSAoY29udGV4dCwgeCwgaGVpZ2h0LCBvcHRpb25zKSA9PiB7XG4gIGNvbnRleHQubGluZVdpZHRoID0gb3B0aW9ucy5oaW50TGluZVxuICBjb250ZXh0LnN0cm9rZVN0eWxlID0gb3B0aW9ucy5oaW50U3Ryb2tlXG4gIGNvbnRleHQuc2V0TGluZURhc2gob3B0aW9ucy5oaW50RGFzaClcbiAgY29udGV4dC5iZWdpblBhdGgoKVxuICBjb250ZXh0Lm1vdmVUbyh4LCAwKVxuICBjb250ZXh0LmxpbmVUbyh4LCBoZWlnaHQpXG4gIGNvbnRleHQuc3Ryb2tlKClcbiAgY29udGV4dC5zZXRMaW5lRGFzaChbXSlcbn1cblxuZXhwb3J0IHtcbiAgc2VsZWN0b3IsXG4gIGdldEJvdW5kYXJpZXMsXG4gIGNvbWJpbmluZ1B1bHNlcyxcbiAgZmlsdGVyUHVsc2VzLFxuICBkcmF3RmlsbCxcbiAgZHJhd0xpbmUsXG4gIGRyYXdUZXh0LFxuICBkcmF3SGludFxufVxuIiwiaW1wb3J0IHsgZGVmYXVsdHMgfSBmcm9tICcuL2NvbnN0YW50cy5qcydcbmltcG9ydCB7XG4gIGdldEJvdW5kYXJpZXMsXG4gIGNvbWJpbmluZ1B1bHNlcyxcbiAgZmlsdGVyUHVsc2VzLFxuICBkcmF3RmlsbCxcbiAgZHJhd0xpbmUsXG4gIGRyYXdUZXh0LFxuICBkcmF3SGludFxufSBmcm9tICcuL3V0aWxzLmpzJ1xuY29uc3QgbWFyZ2luID0gZGVmYXVsdHMubWFyZ2luXG5cbmxldCB3aWR0aCxcbiAgaGVpZ2h0LFxuICBkcGkgPSBudWxsXG5sZXQgZGF0YSA9IG51bGxcbmxldCB0aGVtZSA9IG51bGxcblxubGV0IGNvbnRleHQsXG4gIGxhYmVsQ29udGV4dCxcbiAgaGludHNDb250ZXh0ID0gbnVsbFxuXG5sZXQgcHVsc2VzID0gW11cbmxldCBhbHRIaW50cyA9IFtdXG5sZXQgYmFySGVpZ2h0ID0gbnVsbFxuY29uc3QgYnJlYWtwb2ludFpvb20gPSBkZWZhdWx0cy5icmVha3BvaW50cy56b29tXG5jb25zdCBicmVha3BvaW50UHVsc2VJbk9uZVggPSBkZWZhdWx0cy5icmVha3BvaW50cy5wdWxzZUluT25lWFxubGV0IG1heFpvb20gPSBudWxsXG5cbnNlbGYub25tZXNzYWdlID0gKGUpID0+IHtcbiAgc3dpdGNoIChlLmRhdGEubWVzc2FnZSkge1xuICAgIGNhc2UgJ3NldENvbmZpZ0NvbnRleHQnOlxuICAgICAgd2lkdGggPSBlLmRhdGEud2lkdGhcbiAgICAgIGhlaWdodCA9IGUuZGF0YS5oZWlnaHRcbiAgICAgIGRwaSA9IGUuZGF0YS5kcGlcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnc2V0RGF0YSc6XG4gICAgICBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEuZGF0YSlcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnc2V0VGhlbWUnOlxuICAgICAgdGhlbWUgPSBlLmRhdGEudGhlbWVcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnc2V0TWF4Wm9vbSc6XG4gICAgICBtYXhab29tID0gZS5kYXRhLm1heFpvb21cbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnc2V0QmFySGVpZ2h0JzpcbiAgICAgIGJhckhlaWdodCA9IGUuZGF0YS5iYXJIZWlnaHRcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnc2V0QWx0SGludHMnOlxuICAgICAgYWx0SGludHMgPSBKU09OLnBhcnNlKGUuZGF0YS5hbHRIaW50cylcbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdnZXRDb250ZXh0JzpcbiAgICAgIGNvbnRleHQgPSBjb250ZXh0MmQoZS5kYXRhLmNhbnZhcywgd2lkdGgsIGhlaWdodCwgZHBpKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdnZXRMYWJlbENvbnRleHQnOlxuICAgICAgbGFiZWxDb250ZXh0ID0gY29udGV4dDJkKGUuZGF0YS5jYW52YXMsIHdpZHRoLCBoZWlnaHQsIGRwaSlcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnZ2V0SGludHNDb250ZXh0JzpcbiAgICAgIGhpbnRzQ29udGV4dCA9IGNvbnRleHQyZChlLmRhdGEuY2FudmFzLCB3aWR0aCwgaGVpZ2h0LCBkcGkpXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAncmVkcmF3SGludHNDYW52YXMnOlxuICAgICAgcmVkcmF3SGludHNDYW52YXMoZS5kYXRhLnRyYW5zZm9ybSlcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnem9vbWVkJzpcbiAgICAgIHpvb21lZChlLmRhdGEudHJhbnNmb3JtKVxuICAgICAgYnJlYWtcbiAgfVxufVxuXG5jb25zdCBjb250ZXh0MmQgPSAoY2FudmFzLCB3aWR0aCwgaGVpZ2h0LCBkcGkpID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcsIHsgZGVzeW5jaHJvbml6ZWQ6IHRydWUgfSlcbiAgY2FudmFzLndpZHRoID0gTWF0aC5mbG9vcih3aWR0aCAqIGRwaSlcbiAgY2FudmFzLmhlaWdodCA9IE1hdGguZmxvb3IoaGVpZ2h0ICogZHBpKVxuICBjb250ZXh0LnNjYWxlKGRwaSwgZHBpKVxuICByZXR1cm4gY29udGV4dFxufVxuXG5jb25zdCBkcmF3QWxsSGludHMgPSAodHJhbnNmb3JtKSA9PiB7XG4gIGNvbnN0IHsgbGVmdFB1bHNlLCByaWdodFB1bHNlIH0gPSBnZXRCb3VuZGFyaWVzKGRhdGEsIHdpZHRoLCB0cmFuc2Zvcm0pXG5cbiAgY29uc3QgaGludHMgPSBkYXRhLmhpbnRzLmZpbHRlcigoZCkgPT4ge1xuICAgIGNvbnN0IHgwID0gZFswXVxuICAgIGNvbnN0IHgxID0gZFsxXVxuICAgIGlmICh4MCA+PSBsZWZ0UHVsc2UgJiYgeDAgPD0gcmlnaHRQdWxzZSkgcmV0dXJuIHRydWVcbiAgICBpZiAoeDEgPj0gbGVmdFB1bHNlICYmIHgxIDw9IHJpZ2h0UHVsc2UpIHJldHVybiB0cnVlXG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG5cbiAgbGV0IHByZXZIaW50XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaGludHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBoaW50ID0gaGludHNbaV1cbiAgICBjb25zdCB4MCA9IGhpbnRbMF1cbiAgICBjb25zdCB4MSA9IGhpbnRbMV1cblxuICAgIGlmIChwcmV2SGludCAhPT0geDAgJiYgeDAgPj0gMCAmJiB4MCA8IGRhdGEud2lkdGgpIHtcbiAgICAgIGRyYXdIaW50KFxuICAgICAgICBoaW50c0NvbnRleHQsXG4gICAgICAgIHgwICogKHRyYW5zZm9ybS5rIC8gbWF4Wm9vbSkgKyB0cmFuc2Zvcm0ueCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICB7XG4gICAgICAgICAgaGludExpbmU6IHRoZW1lLmhpbnRMaW5lLFxuICAgICAgICAgIGhpbnRTdHJva2U6IHRoZW1lLmhpbnRTdHJva2UsXG4gICAgICAgICAgaGludERhc2g6IHRoZW1lLmhpbnREYXNoXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gICAgaWYgKHgxID49IDAgJiYgeDEgPCBkYXRhLndpZHRoKSB7XG4gICAgICBkcmF3SGludChcbiAgICAgICAgaGludHNDb250ZXh0LFxuICAgICAgICB4MSAqICh0cmFuc2Zvcm0uayAvIG1heFpvb20pICsgdHJhbnNmb3JtLngsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAge1xuICAgICAgICAgIGhpbnRMaW5lOiB0aGVtZS5oaW50TGluZSxcbiAgICAgICAgICBoaW50U3Ryb2tlOiB0aGVtZS5oaW50U3Ryb2tlLFxuICAgICAgICAgIGhpbnREYXNoOiB0aGVtZS5oaW50RGFzaFxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICAgIHByZXZIaW50ID0geDFcbiAgfVxuXG4gIGNvbnN0IGZpbHRlcmVkQWx0SGludHMgPSBhbHRIaW50cy5maWx0ZXIoKGQpID0+IHtcbiAgICBjb25zdCB4MCA9IGRbMF1cbiAgICBjb25zdCB4MSA9IGRbMV1cbiAgICBpZiAoeDAgPj0gbGVmdFB1bHNlICYmIHgwIDw9IHJpZ2h0UHVsc2UpIHJldHVybiB0cnVlXG4gICAgaWYgKHgxID49IGxlZnRQdWxzZSAmJiB4MSA8PSByaWdodFB1bHNlKSByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiBmYWxzZVxuICB9KVxuXG4gIHByZXZIaW50ID0gbnVsbFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlcmVkQWx0SGludHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBoaW50ID0gZmlsdGVyZWRBbHRIaW50c1tpXVxuICAgIGNvbnN0IHgwID0gaGludFswXVxuICAgIGNvbnN0IHgxID0gaGludFsxXVxuXG4gICAgaWYgKHByZXZIaW50ICE9PSB4MCAmJiB4MCA+PSAwICYmIHgwIDwgZGF0YS53aWR0aCkge1xuICAgICAgZHJhd0hpbnQoXG4gICAgICAgIGhpbnRzQ29udGV4dCxcbiAgICAgICAgeDAgKiAodHJhbnNmb3JtLmsgLyBtYXhab29tKSArIHRyYW5zZm9ybS54LFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIHtcbiAgICAgICAgICBoaW50TGluZTogdGhlbWUuaGludEFsdExpbmUsXG4gICAgICAgICAgaGludFN0cm9rZTogdGhlbWUuaGludEFsdFN0cm9rZSxcbiAgICAgICAgICBoaW50RGFzaDogdGhlbWUuaGludEFsdERhc2hcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgICBpZiAoeDEgPj0gMCAmJiB4MSA8IGRhdGEud2lkdGgpIHtcbiAgICAgIGRyYXdIaW50KFxuICAgICAgICBoaW50c0NvbnRleHQsXG4gICAgICAgIHgxICogKHRyYW5zZm9ybS5rIC8gbWF4Wm9vbSkgKyB0cmFuc2Zvcm0ueCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICB7XG4gICAgICAgICAgaGludExpbmU6IHRoZW1lLmhpbnRBbHRMaW5lLFxuICAgICAgICAgIGhpbnRTdHJva2U6IHRoZW1lLmhpbnRBbHRTdHJva2UsXG4gICAgICAgICAgaGludERhc2g6IHRoZW1lLmhpbnRBbHREYXNoXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBwcmV2SGludCA9IHgxXG4gIH1cbn1cblxuY29uc3QgcmVkcmF3SGludHNDYW52YXMgPSAodHJhbnNmb3JtKSA9PiB7XG4gIGhpbnRzQ29udGV4dC5zYXZlKClcbiAgaGludHNDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KVxuXG4gIGRyYXdBbGxIaW50cyh0cmFuc2Zvcm0pXG5cbiAgaGludHNDb250ZXh0LnJlc3RvcmUoKVxufVxuXG5jb25zdCB6b29tZWQgPSAodHJhbnNmb3JtKSA9PiB7XG4gIGxhYmVsQ29udGV4dC5zYXZlKClcbiAgbGFiZWxDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KVxuXG4gIGhpbnRzQ29udGV4dC5zYXZlKClcbiAgaGludHNDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KVxuXG4gIGNvbnRleHQuc2F2ZSgpXG4gIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpXG5cbiAgZHJhd0ZpbGwoXG4gICAgY29udGV4dCxcbiAgICAwLFxuICAgIC0xLFxuICAgIHdpZHRoLFxuICAgIGJhckhlaWdodCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tLFxuICAgIHRoZW1lLnNwYWNlRmlsbFxuICApXG5cbiAgbGV0IHByZXZYID0gMFxuICBsZXQgc2tpcFB1bHNlID0gMFxuICBsZXQgc3VtID0gMFxuXG4gIGNvbnN0IHsgbGVmdFB1bHNlLCByaWdodFB1bHNlLCBwdWxzZUluT25lWCB9ID0gZ2V0Qm91bmRhcmllcyhcbiAgICBkYXRhLFxuICAgIHdpZHRoLFxuICAgIHRyYW5zZm9ybVxuICApXG5cbiAgaWYgKHRyYW5zZm9ybS5rIDwgYnJlYWtwb2ludFpvb20pIHtcbiAgICBwdWxzZXMgPSBjb21iaW5pbmdQdWxzZXMoZGF0YSwgcHVsc2VJbk9uZVgpXG4gICAgOyh7IHB1bHNlcywgc3VtLCBwcmV2WCwgc2tpcFB1bHNlIH0gPSBmaWx0ZXJQdWxzZXMoXG4gICAgICBwdWxzZXMsXG4gICAgICBzdW0sXG4gICAgICBwcmV2WCxcbiAgICAgIHNraXBQdWxzZSxcbiAgICAgIGxlZnRQdWxzZSxcbiAgICAgIHJpZ2h0UHVsc2VcbiAgICApKVxuICB9IGVsc2Uge1xuICAgIDsoeyBwdWxzZXMsIHN1bSwgcHJldlgsIHNraXBQdWxzZSB9ID0gZmlsdGVyUHVsc2VzKFxuICAgICAgZGF0YS5wdWxzZXMsXG4gICAgICBzdW0sXG4gICAgICBwcmV2WCxcbiAgICAgIHNraXBQdWxzZSxcbiAgICAgIGxlZnRQdWxzZSxcbiAgICAgIHJpZ2h0UHVsc2VcbiAgICApKVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwdWxzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB4ID0gcHVsc2VzW2ldXG5cbiAgICBpZiAoeCkge1xuICAgICAgaWYgKChpICsgc2tpcFB1bHNlKSAlIDIgPT09IDApIHtcbiAgICAgICAgZHJhd0ZpbGwoXG4gICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICBwcmV2WCAqICh0cmFuc2Zvcm0uayAvIG1heFpvb20pICsgdHJhbnNmb3JtLngsXG4gICAgICAgICAgbWFyZ2luLnRvcCxcbiAgICAgICAgICB4ICogKHRyYW5zZm9ybS5rIC8gbWF4Wm9vbSksXG4gICAgICAgICAgYmFySGVpZ2h0LFxuICAgICAgICAgIHRyYW5zZm9ybS5rIDwgYnJlYWtwb2ludFpvb20gPyB0aGVtZS5jb21iaW5pbmdGaWxsIDogdGhlbWUuaGlGaWxsXG4gICAgICAgIClcblxuICAgICAgICBkcmF3TGluZShcbiAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0YXJ0OiBbXG4gICAgICAgICAgICAgIHByZXZYICogKHRyYW5zZm9ybS5rIC8gbWF4Wm9vbSkgKyB0cmFuc2Zvcm0ueCxcbiAgICAgICAgICAgICAgaGVpZ2h0IC0gYmFySGVpZ2h0IC0gbWFyZ2luLnRvcCArIHRoZW1lLmhpTGluZSAvIDJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBlbmQ6IFtcbiAgICAgICAgICAgICAgKHByZXZYICsgeCkgKiAodHJhbnNmb3JtLmsgLyBtYXhab29tKSArIHRyYW5zZm9ybS54LFxuICAgICAgICAgICAgICBoZWlnaHQgLSBiYXJIZWlnaHQgLSBtYXJnaW4udG9wICsgdGhlbWUuaGlMaW5lIC8gMlxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGluZVdpZHRoOiB0aGVtZS5oaUxpbmUsXG4gICAgICAgICAgICBzdHJva2VTdHlsZTogdGhlbWUuaGlTdHJva2VcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRyYXdMaW5lKFxuICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhcnQ6IFtcbiAgICAgICAgICAgICAgcHJldlggKiAodHJhbnNmb3JtLmsgLyBtYXhab29tKSArIHRyYW5zZm9ybS54LFxuICAgICAgICAgICAgICBoZWlnaHQgLSBtYXJnaW4udG9wIC0gdGhlbWUubG9MaW5lIC8gMlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGVuZDogW1xuICAgICAgICAgICAgICAocHJldlggKyB4KSAqICh0cmFuc2Zvcm0uayAvIG1heFpvb20pICsgdHJhbnNmb3JtLngsXG4gICAgICAgICAgICAgIGhlaWdodCAtIG1hcmdpbi50b3AgLSB0aGVtZS5sb0xpbmUgLyAyXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IHRoZW1lLmxvTGluZSxcbiAgICAgICAgICAgIHN0cm9rZVN0eWxlOiB0aGVtZS5sb1N0cm9rZVxuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjb25zdCB3ID0geCAqICgod2lkdGggKiB0cmFuc2Zvcm0uaykgLyBkYXRhLndpZHRoKVxuICAgICAgaWYgKHcgPiB0aGVtZS5mb250U2l6ZSAqIDQpIHtcbiAgICAgICAgZHJhd1RleHQoXG4gICAgICAgICAgbGFiZWxDb250ZXh0LFxuICAgICAgICAgIHgsXG4gICAgICAgICAgKHByZXZYICsgeCAvIDIpICogKHRyYW5zZm9ybS5rIC8gbWF4Wm9vbSkgKyB0cmFuc2Zvcm0ueCxcbiAgICAgICAgICBoZWlnaHQgLyAyLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbG9yOiB0aGVtZS5mb250Q29sb3IsXG4gICAgICAgICAgICBmb250OiBgJHt0aGVtZS5mb250U2l6ZX1weCBzYW5zLXNlcmlmYCxcbiAgICAgICAgICAgIGFsaWduOiB0aGVtZS5mb250QWxpZ24sXG4gICAgICAgICAgICBiYXNlbGluZTogdGhlbWUuZm9udEJhc2VsaW5lXG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgcHVsc2VJbk9uZVggPD0gYnJlYWtwb2ludFB1bHNlSW5PbmVYICYmXG4gICAgICAgIHRyYW5zZm9ybS5rID49IGJyZWFrcG9pbnRab29tICYmXG4gICAgICAgIChpICsgc2tpcFB1bHNlKSAlIDIgPT09IDBcbiAgICAgICkge1xuICAgICAgICBkcmF3TGluZShcbiAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0YXJ0OiBbXG4gICAgICAgICAgICAgIHByZXZYICogKHRyYW5zZm9ybS5rIC8gbWF4Wm9vbSkgKyB0cmFuc2Zvcm0ueCxcbiAgICAgICAgICAgICAgaGVpZ2h0IC0gbWFyZ2luLnRvcFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGVuZDogW1xuICAgICAgICAgICAgICBwcmV2WCAqICh0cmFuc2Zvcm0uayAvIG1heFpvb20pICsgdHJhbnNmb3JtLngsXG4gICAgICAgICAgICAgIGhlaWdodCAtIGJhckhlaWdodCAtIG1hcmdpbi50b3BcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxpbmVXaWR0aDogdGhlbWUuZWRnZUxpbmUsXG4gICAgICAgICAgICBzdHJva2VTdHlsZTogdGhlbWUuaGlTdHJva2VcbiAgICAgICAgICB9XG4gICAgICAgIClcblxuICAgICAgICBkcmF3TGluZShcbiAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0YXJ0OiBbXG4gICAgICAgICAgICAgIChwcmV2WCArIHgpICogKHRyYW5zZm9ybS5rIC8gbWF4Wm9vbSkgKyB0cmFuc2Zvcm0ueCxcbiAgICAgICAgICAgICAgaGVpZ2h0IC0gYmFySGVpZ2h0IC0gbWFyZ2luLnRvcFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGVuZDogW1xuICAgICAgICAgICAgICAocHJldlggKyB4KSAqICh0cmFuc2Zvcm0uayAvIG1heFpvb20pICsgdHJhbnNmb3JtLngsXG4gICAgICAgICAgICAgIGhlaWdodCAtIG1hcmdpbi50b3BcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxpbmVXaWR0aDogdGhlbWUuZWRnZUxpbmUsXG4gICAgICAgICAgICBzdHJva2VTdHlsZTogdGhlbWUubG9TdHJva2VcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcHJldlggPSBwcmV2WCArIHhcbiAgICB9XG4gIH1cblxuICBkcmF3QWxsSGludHModHJhbnNmb3JtKVxuXG4gIGxhYmVsQ29udGV4dC5yZXN0b3JlKClcbiAgaGludHNDb250ZXh0LnJlc3RvcmUoKVxuICBjb250ZXh0LnJlc3RvcmUoKVxufVxuIl0sIm5hbWVzIjpbImRhdGEiLCJ3aWR0aCIsInB1bHNlcyIsImNvbnRleHQiLCJoZWlnaHQiLCJkcGkiXSwibWFwcGluZ3MiOiI7O0FBQUEsUUFBTSxXQUFXO0FBQUEsSUFHZixRQUFRO0FBQUEsTUFDTixLQUFLO0FBQUEsTUFFTCxRQUFRO0FBQUEsSUFFVjtBQUFBLElBQ0EsYUFBYTtBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLElBQ2pCO0FBQUEsRUF3QkE7QUN4QkEsUUFBTSxnQkFBZ0IsQ0FBQ0EsT0FBTUMsUUFBTyxjQUFjO0FBRWhELFVBQU0sZUFBZUEsU0FBUSxVQUFVO0FBQ3ZDLFVBQU0sY0FBY0QsTUFBSyxRQUFRO0FBQ2pDLFVBQU0sV0FBVyxDQUFDLEVBQUUsVUFBVSxJQUFJO0FBQ2xDLFVBQU0sWUFBWSxDQUFDLEVBQUUsVUFBVSxJQUFJLEtBQUtDO0FBRXhDLFVBQU0sWUFBWSxXQUFXO0FBQzdCLFVBQU0sYUFBYSxZQUFZO0FBRS9CLFdBQU8sRUFBRSxXQUFXLFlBQVksWUFBVztBQUFBLEVBQzdDO0FBRUEsUUFBTSxrQkFBa0IsQ0FBQ0QsT0FBTSxnQkFBZ0I7QUFDN0MsVUFBTUUsVUFBUyxDQUFBO0FBQ2YsUUFBSSxRQUFRO0FBRVosYUFBUyxJQUFJLEdBQUcsSUFBSUYsTUFBSyxPQUFPLFFBQVEsS0FBSztBQUMzQyxVQUFJLElBQUksTUFBTSxHQUFHO0FBQ2YsWUFBSUEsTUFBSyxPQUFPLENBQUMsS0FBSyxjQUFjLElBQUk7QUFDdEMsVUFBQUUsUUFBTyxLQUFLLEtBQUs7QUFDakIsVUFBQUEsUUFBTyxLQUFLRixNQUFLLE9BQU8sQ0FBQyxDQUFDO0FBQzFCLGtCQUFRO0FBQ1I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVB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
