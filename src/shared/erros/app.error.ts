export class AppError extends Error {
  public statusHttp: number;

  constructor(statusHttp: number, mensagem: string) {
    super(mensagem);

    this.statusHttp = statusHttp;
  }
}
