/**
 * Sends a JSON response with the given status code and data.
 *
 * @param {Object} res - The Express response object
 * @param {number} statusCode - The HTTP status code to send
 * @param {Object} data - The data to include in the response
 * @returns {Object} - The response object
 */
exports.sendResponse = (res, statusCode, data) => {
  return res.status(statusCode).json(data);
};

/**
 * Sends a JSON error response with the given status code and message.
 *
 * @param {Object} res - The Express response object
 * @param {number} statusCode - The HTTP status code to send
 * @param {string} message - The error message to include in the response
 * @returns {Object} - The error response object
 */
exports.sendError = (res, statusCode, message) => {
  // Optional: log the error for debugging purposes
  console.error(`Error ${statusCode}: ${message}`);

  return res.status(statusCode).json({ error: message });
};
