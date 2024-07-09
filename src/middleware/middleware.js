// src/middleware.js
const loggingMiddleware = (store) => (next) => (action) => {
  console.log("Action:", action.type);
  console.log("Payload:", action.payload);
  return next(action);
};
export default loggingMiddleware;
