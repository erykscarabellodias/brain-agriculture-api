import { Request, Response } from "express";
import CriarFazendaService from "../../../../domain/fazendas/services/criarFazenda/CriarFazendaService";

export default class CriarFazendaController {
  private criarFazendaService: CriarFazendaService;

  constructor(criarFazendaService: CriarFazendaService) {
    this.criarFazendaService = criarFazendaService;
  }

  async criar(request: Request, response: Response) {
    const dto = request.body;
    const idProdutor = request.params.idProdutor;
    const fazenda = await this.criarFazendaService.criar(idProdutor, dto);
    return response.status(201).send(fazenda);
  }
}
