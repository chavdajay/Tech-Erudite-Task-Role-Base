const handleSuccess = (res, message, data) => {
    return res.status(200).json({
      success: true,
      message,
      data
    });
  };
  
  const handleError = (res, message, status=500) => {
    return res.status(status).json({
      success: false,
      message
    });
  };
  
  module.exports = { handleSuccess, handleError };
  