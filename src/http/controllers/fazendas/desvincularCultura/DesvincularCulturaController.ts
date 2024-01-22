import { Request, Response } from "express";
import DesvincularCulturaService from "../../../../domain/fazendas/services/desvincularCultura/DesvincularCulturaService";

export default class DesvincularCulturaController {
  constructor(
    private readonly desvincularCulturaService: DesvincularCulturaService
  ) {}

  async desvincularCultura(request: Request, response: Response) {
    const idFazenda = request.params.idFazenda;
    const idCultura = request.params.idCultura;

    await this.desvincularCulturaService.desvincularCultura(
      idFazenda,
      idCultura
    );

    return response.status(204).send();
  }
}
