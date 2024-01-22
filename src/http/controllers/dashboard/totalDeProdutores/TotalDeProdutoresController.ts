import { Request, Response } from "express";
import TotalDeProdutoresService from "../../../../domain/dashboard/services/totalDeProdutores/TotalDeProdutoresService";

export default class TotalDeProdutoresController {
  constructor(
    private readonly totalDeProdutoresService: TotalDeProdutoresService
  ) {}

  async totalDeProdutores(request: Request, response: Response) {
    const produtores = await this.totalDeProdutoresService.calcular();

    return response.status(200).send({ totalDeProdutores: produtores });
  }
}
