import { Request, Response } from "express";
import VincularCulturaDto from "../../../../domain/fazendas/services/vincularCultura/dto/VincularCulturaDto";
import VincularCulturaService from "../../../../domain/fazendas/services/vincularCultura/VincularCulturaService";

export default class VincularCulturaController {
  constructor(
    private readonly vincularCulturaService: VincularCulturaService
  ) {}

  async vincularCultura(request: Request, response: Response) {
    const idFazenda = request.params.idFazenda;
    const vincularCulturaDto: VincularCulturaDto = request.body;

    const fazenda = await this.vincularCulturaService.vincularCultura(
      idFazenda,
      vincularCulturaDto
    );

    return response.send(fazenda);
  }
}
