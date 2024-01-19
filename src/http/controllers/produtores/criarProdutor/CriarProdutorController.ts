import { Request, Response } from "express";
import { CriarProdutorService } from "../../../../domain/produtores/services/criarProdutor/CriarProdutorService";

export default class CriarProdutorController {
  private criarProdutorService: CriarProdutorService;

  constructor(criarProdutorService: CriarProdutorService) {
    this.criarProdutorService = criarProdutorService;
  }

  async criar(request: Request, response: Response) {
    const dto = request.body;
    const produtor = await this.criarProdutorService.criar(dto);
    return response.status(201).send(produtor);
  }
}
