import { Request, Response } from "express";
import FazendasPorEstadoService from "../../../../domain/dashboard/services/fazendasPorEstado/FazendasPorEstadoService";

export default class FazendasPorEstadoController {
  constructor(
    private readonly fazendasPorEstadoService: FazendasPorEstadoService
  ) {}

  async fazendasPorEstado(request: Request, response: Response) {
    const fazendasPorEstado = await this.fazendasPorEstadoService.calcular();

    return response.status(200).send(fazendasPorEstado);
  }
}
