const handleError = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: "please add a text in the text feild",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = handleError;
