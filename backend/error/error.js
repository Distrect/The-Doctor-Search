class DoctorNotFoundError extends Error {
  constructor() {
    super();
    this.errorCode = 404;
    this.errorMessage =
      "The Doctor you are looking for not found. Please try again later";
  }
}

export default DoctorNotFoundError;
