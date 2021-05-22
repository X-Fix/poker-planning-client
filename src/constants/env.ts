export const NODE_ENV = process.env.NODE_ENV;
export const SERVER_ORIGIN =
  NODE_ENV === 'development' ? 'http://localhost:3000' : window.location.origin;
