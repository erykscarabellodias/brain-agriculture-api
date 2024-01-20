import { Request, Response } from "express";
import ApagarProdutorService from "../../../../domain/produtores/services/apagarProdutor/ApagarProdutorService";

export default class ApagarProdutorController {
  constructor(private readonly apagarProdutorService: ApagarProdutorService) {}

  async apagar(request: Request, response: Response) {
    const idProdutor = request.params.idProdutor;

    await this.apagarProdutorService.apagar(idProdutor);

    return response.status(204).send();
  }
}
