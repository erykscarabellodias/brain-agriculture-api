import { Request, Response } from "express";
import ApagarFazendaService from "../../../../domain/fazendas/services/apagarFazenda/ApagarFazendaService";

export default class ApagarFazendaController {
  constructor(private readonly apagarFazendaService: ApagarFazendaService) {}

  async apagar(request: Request, response: Response) {
    const idFazenda = request.params.idFazenda;

    await this.apagarFazendaService.apagar(idFazenda);

    return response.status(204).send();
  }
}
