import { Request, Response } from "express";
import ReativarFazendaService from "../../../../domain/fazendas/services/reativarFazenda/ReativarFazendaService";

export default class ReativarFazendaController {
  constructor(
    private readonly reativarFazendaService: ReativarFazendaService
  ) {}

  async apagar(request: Request, response: Response) {
    const idFazenda = request.params.idFazenda;

    const fazenda = await this.reativarFazendaService.reativar(idFazenda);

    return response.send(fazenda);
  }
}
