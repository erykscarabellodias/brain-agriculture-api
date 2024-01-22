import { Request, Response } from "express";
import AreaTotalDeFazendasService from "../../../../domain/dashboard/services/areaTotalDeFazendas/AreaTotalDeFazendasService";

export default class AreaTotalDeFazendasController {
  constructor(
    private readonly areaTotalDeFazendasService: AreaTotalDeFazendasService
  ) {}

  async areaTotalDeFazendas(request: Request, response: Response) {
    const areaTotal = await this.areaTotalDeFazendasService.calcular();

    return response.status(200).send({ areaTotalDeFazendas: areaTotal });
  }
}
