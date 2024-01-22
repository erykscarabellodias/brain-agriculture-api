import { Request, Response } from "express";
import AreaTotalDeFazendasService from "../../../../domain/dashboard/services/areaTotalDeFazendas/AreaTotalDeFazendasService";
import PercentualDeUsoDeSoloService from "../../../../domain/dashboard/services/percentualDeUsoDeSolo/PercentualDeUsoDeSoloService";

export default class PercentualDeUsoDeSoloController {
  constructor(
    private readonly percentualDeUsoDeSoloService: PercentualDeUsoDeSoloService
  ) {}

  async percentualDeUsoDeSolo(request: Request, response: Response) {
    const percentualDeUsoDeSolo =
      await this.percentualDeUsoDeSoloService.calcular();

    return response.status(200).send({ percentualDeUsoDeSolo });
  }
}
