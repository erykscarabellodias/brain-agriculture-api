import { Request, Response } from "express";
import { EditarProdutorService } from "../../../../domain/produtores/services/editarProdutor/EditarProdutorService";

export default class EditarProdutorController {
  constructor(private readonly editarProdutorService: EditarProdutorService) {}

  async editar(request: Request, response: Response) {
    const dto = request.body;
    const idProdutor = request.params.idProdutor;

    const produtor = await this.editarProdutorService.editar(idProdutor, dto);

    return response.status(201).send(produtor);
  }
}
