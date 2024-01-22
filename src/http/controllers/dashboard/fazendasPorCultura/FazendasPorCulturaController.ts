import { Request, Response } from "express";
import FazendasPorCulturaService from "../../../../domain/dashboard/services/fazendasPorCultura/FazendasPorCulturaService";

export default class FazendasPorCulturaController {
  constructor(
    private readonly fazendasPorCulturaService: FazendasPorCulturaService
  ) {}

  async fazendasPorCultura(request: Request, response: Response) {
    const fazendasPorCultura = await this.fazendasPorCulturaService.calcular();

    return response.status(200).send(fazendasPorCultura);
  }
}
