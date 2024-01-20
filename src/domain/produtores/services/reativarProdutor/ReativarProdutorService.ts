import { AppError } from "../../../../shared/erros/app.error";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import { Produtor } from "../../entities/Produtor";
import ProdutorRepository from "../../repositories/ProdutorRepository";

export default class ReativarProdutorService {
  constructor(
    private readonly produtorRepository: ProdutorRepository,
    private readonly validarUuidService: ValidarUuidService
  ) {}

  async reativar(idProdutor: string): Promise<Produtor> {
    this.validarUuidService.validar(idProdutor);

    const produtor = await this.produtorRepository.buscarPorId(idProdutor);

    if (!produtor) {
      throw new AppError(404, "Este produtor não existe");
    }

    if (!produtor.deletedAt) {
      throw new AppError(400, "Este produtor já está ativo");
    }

    return await this.produtorRepository.reativar(produtor);
  }
}
