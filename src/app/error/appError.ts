const AppError = (statusCode: number, message: string) => {
  return {
    statusCode,
    message,
  };
};

//exporting the AppError function as the default export of the module
export default AppError;
