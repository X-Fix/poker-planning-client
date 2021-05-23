import { faviconBusy, faviconDone, faviconIdle } from '../constants/dataUri';
import { SessionPhase } from '../types';

const _favicon = document.getElementById('favicon') as HTMLLinkElement;

function getDataUrl(sessionPhase: SessionPhase) {
  switch (sessionPhase) {
    case 'voting':
      return faviconBusy;
    case 'result':
      return faviconDone;
    default:
      return faviconIdle;
  }
}

export function setFaviconStatus(sessionPhase: SessionPhase) {
  const newDataUrl = getDataUrl(sessionPhase);

  if (newDataUrl && _favicon.href !== newDataUrl) {
    _favicon.href = newDataUrl;
  }
}
