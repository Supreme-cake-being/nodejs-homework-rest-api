const messageList = {
  400: "Missing required name field",
  404: "Not Found",
};

const HttpError = (status, message = messageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;
