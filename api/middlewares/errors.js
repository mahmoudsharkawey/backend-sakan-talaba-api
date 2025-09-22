// 404 handler
export function notFound(req, res, next) {
  res.status(404).json({ error: "Not Found", path: req.originalUrl });
}

// Centralized error handler
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const code = err.code || "INTERNAL_ERROR";
  const message = err.message || "Internal Server Error";

  // Avoid leaking stack in production
  const response = {
    error: message,
    code,
  };

  // Avoid environment checks in serverless path; omit stack by default

  res.status(status).json(response);
}

export default { notFound, errorHandler };


