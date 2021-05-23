import { SessionPhase } from '../types';

let _favicon: HTMLLinkElement,
  _idleDataUrl: string,
  _busyDataUrl: string,
  _doneDataUrl: string;

const _canvasSize = 32;

function initDynamicFavicon() {
  _favicon = document.getElementById('favicon-svg') as HTMLLinkElement;

  if (_favicon === null) {
    console.warn('Favicon element not found');
    return;
  }

  const idleCanvas = createCanvas();
  const busyCanvas = createCanvas();
  const doneCanvas = createCanvas();

  const defaultImage = document.createElement('img');
  defaultImage.src = _favicon.href;
  defaultImage.onload = () => {
    if (typeof idleCanvas.getContext !== 'function') {
      console.warn('Canvas context feature unavailable');
      return;
    }

    drawStatusIdle(idleCanvas.getContext('2d'), defaultImage);
    drawStatusBusy(busyCanvas.getContext('2d'), defaultImage);
    drawStatusDone(doneCanvas.getContext('2d'), defaultImage);

    _idleDataUrl = idleCanvas.toDataURL('idle');
    _busyDataUrl = busyCanvas.toDataURL('busy');
    _doneDataUrl = doneCanvas.toDataURL('done');
  };
}

function createCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = _canvasSize;
  canvas.height = _canvasSize;

  return canvas;
}

function drawStatusDone(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement
) {
  drawCanvasBackground(context, image);
  drawStatusCircle(context);
  drawStatusCheckmark(context);
}

function drawStatusBusy(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement
) {
  drawCanvasBackground(context, image);
  drawStatusCircle(context);
  drawStatusHourglass(context);
}

function drawStatusIdle(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement
) {
  drawCanvasBackground(context, image);
}

function drawCanvasBackground(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement
) {
  // Draw original favicon as background
  context.drawImage(image, 0, 0, _canvasSize, _canvasSize);
}

function drawStatusCircle(context: CanvasRenderingContext2D) {
  context.beginPath();
  context.lineWidth = 2;
  context.fillStyle = '#FFFFFF';
  context.strokeStyle = '#1D60BE';
  context.arc(21.5, 21.5, 8, 0, 2 * Math.PI);
  context.fill();
  context.stroke();
}

function drawStatusCheckmark(context: CanvasRenderingContext2D) {
  context.beginPath();
  context.lineWidth = 2.5;
  context.strokeStyle = '#00914C';
  context.moveTo(17.26, 21.835);
  context.lineTo(19.87, 24.45);
  context.lineTo(25.955, 18.37);
  context.stroke();
}

function drawStatusHourglass(context: CanvasRenderingContext2D) {
  context.beginPath();
  context.fillStyle = '#000000';
  context.strokeStyle = '#000000';
  context.lineWidth = 0.5;
  context.moveTo(19.3333, 16.2188);
  context.bezierCurveTo(18.7375, 16.2188, 18.25, 16.7063, 18.25, 17.3021);
  context.lineTo(18.25, 19.0192);
  context.bezierCurveTo(18.25, 19.3063, 18.3638, 19.5825, 18.5696, 19.7883);
  context.lineTo(20.4167, 21.6354);
  context.lineTo(18.5642, 23.4879);
  context.bezierCurveTo(18.3637, 23.6938, 18.25, 23.97, 18.25, 24.2571);
  context.lineTo(18.25, 25.9688);
  context.bezierCurveTo(18.25, 26.5646, 18.7375, 27.0521, 19.3333, 27.0521);
  context.lineTo(23.6667, 27.0521);
  context.bezierCurveTo(24.2625, 27.0521, 24.75, 26.5646, 24.75, 25.9688);
  context.lineTo(24.75, 24.2571);
  context.bezierCurveTo(24.75, 23.97, 24.6363, 23.6938, 24.4358, 23.4933);
  context.lineTo(22.5833, 21.6354);
  context.lineTo(24.4304, 19.7938);
  context.bezierCurveTo(24.6363, 19.5879, 24.75, 19.3117, 24.75, 19.0246);
  context.lineTo(24.75, 17.3021);
  context.bezierCurveTo(24.75, 16.7063, 24.2625, 16.2188, 23.6667, 16.2188);
  context.lineTo(19.3333, 16.2188);
  context.closePath();
  context.moveTo(23.6667, 24.0729);
  context.lineTo(23.6667, 25.4271);
  context.bezierCurveTo(23.6667, 25.725, 23.4229, 25.9688, 23.125, 25.9688);
  context.lineTo(19.875, 25.9688);
  context.bezierCurveTo(19.5771, 25.9688, 19.3333, 25.725, 19.3333, 25.4271);
  context.lineTo(19.3333, 24.0729);
  context.lineTo(21.5, 21.9063);
  context.lineTo(23.6667, 24.0729);
  context.closePath();
  context.moveTo(21.5, 21.3646);
  context.lineTo(19.3333, 19.1979);
  context.lineTo(19.3333, 17.8438);
  context.bezierCurveTo(19.3333, 17.5458, 19.5771, 17.3021, 19.875, 17.3021);
  context.lineTo(23.125, 17.3021);
  context.bezierCurveTo(23.4229, 17.3021, 23.6667, 17.5458, 23.6667, 17.8438);
  context.lineTo(23.6667, 19.1979);
  context.lineTo(21.5, 21.3646);
  context.fill();
  context.stroke();
}

function getDataUrl(sessionPhase: SessionPhase) {
  switch (sessionPhase) {
    case 'voting':
      return _busyDataUrl;
    case 'result':
      return _doneDataUrl;
    default:
      return _idleDataUrl;
  }
}

initDynamicFavicon();

export function setFaviconStatus(sessionPhase: SessionPhase) {
  const newDataUrl = getDataUrl(sessionPhase);

  if (newDataUrl && _favicon.href !== newDataUrl) {
    _favicon.href = newDataUrl;
  }
}
