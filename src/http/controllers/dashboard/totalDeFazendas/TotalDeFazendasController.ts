import { Request, Response } from "express";
import TotalDeFazendasService from "../../../../domain/dashboard/services/totalDeFazendas/TotalDeFazendasService";

export default class TotalDeFazendasController {
  constructor(
    private readonly totalDeFazendasService: TotalDeFazendasService
  ) {}

  async totalDeFazendas(request: Request, response: Response) {
    const fazendas = await this.totalDeFazendasService.calcular();

    return response.status(200).send({ totalDeFazendas: fazendas });
  }
}
