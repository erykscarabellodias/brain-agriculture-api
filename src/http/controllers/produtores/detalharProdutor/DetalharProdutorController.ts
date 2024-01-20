import { Request, Response } from "express";
import DetalharProdutorService from "../../../../domain/produtores/services/detalharProdutor/DetalharProdutorService";

export default class DetalharProdutorController {
  private detalharProdutorService: DetalharProdutorService;

  constructor(detalharProdutorService: DetalharProdutorService) {
    this.detalharProdutorService = detalharProdutorService;
  }

  async detalhar(request: Request, response: Response) {
    const idProdutor = request.params.idProdutor;

    const produtor = await this.detalharProdutorService.detalhar(idProdutor);

    return response.send(produtor);
  }
}
