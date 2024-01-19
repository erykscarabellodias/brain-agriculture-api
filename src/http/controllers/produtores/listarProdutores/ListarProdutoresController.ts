import { Request, Response } from "express";
import ListarProdutoresService from "../../../../domain/produtores/services/listarProdutores/ListarProdutoresService";

export default class ListarProdutoresController {
  private listarProdutoresService: ListarProdutoresService;

  constructor(listarProdutoresService: ListarProdutoresService) {
    this.listarProdutoresService = listarProdutoresService;
  }

  async listar(request: Request, response: Response) {
    const desativadasQueryParam = request.query.desativadas as string;

    const desativadas = desativadasQueryParam === "true";

    const produtores = await this.listarProdutoresService.listar(
      Boolean(desativadas)
    );

    return response.send(produtores);
  }
}
