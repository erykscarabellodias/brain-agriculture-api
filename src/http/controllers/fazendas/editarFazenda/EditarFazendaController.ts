import { Request, Response } from "express";
import EditarFazendaService from "../../../../domain/fazendas/services/editarFazenda/EditarFazendaService";

export default class EditarFazendaController {
  constructor(private readonly editarFazendaService: EditarFazendaService) {}

  async editar(request: Request, response: Response) {
    const dto = request.body;

    const idFazenda = request.params.idFazenda;

    const fazenda = await this.editarFazendaService.editar(idFazenda, dto);

    return response.status(200).send(fazenda);
  }
}
