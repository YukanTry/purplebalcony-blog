export class AppError extends Error {
  constructor(code, message, status = 400) {
    super(message);
    Object.assign(this, { name: 'AppError', code, status });
  }
}
