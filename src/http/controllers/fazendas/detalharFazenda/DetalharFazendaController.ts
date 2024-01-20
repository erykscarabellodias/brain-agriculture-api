import { Request, Response } from "express";
import DetalharFazendaService from "../../../../domain/fazendas/services/detalharFazenda/DetalharFazendaService";

export default class DetalharFazendaController {
  constructor(
    private readonly detalharFazendaService: DetalharFazendaService
  ) {}

  async detalhar(request: Request, response: Response) {
    const idFazenda = request.params.idFazenda;

    const fazenda = await this.detalharFazendaService.detalhar(idFazenda);

    return response.send(fazenda);
  }
}
