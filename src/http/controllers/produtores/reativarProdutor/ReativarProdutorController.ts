import { Request, Response } from "express";
import ReativarProdutorService from "../../../../domain/produtores/services/reativarProdutor/ReativarProdutorService";

export default class ReativarProdutorController {
  constructor(
    private readonly reativarProdutorService: ReativarProdutorService
  ) {}

  async reativar(request: Request, response: Response) {
    const idProdutor = request.params.idProdutor;

    const produtor = await this.reativarProdutorService.reativar(idProdutor);

    return response.send(produtor);
  }
}
