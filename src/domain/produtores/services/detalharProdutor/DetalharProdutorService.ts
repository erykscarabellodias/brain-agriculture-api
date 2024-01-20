import { AppError } from "../../../../shared/erros/app.error";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import { Produtor } from "../../entities/Produtor";
import ProdutorRepository from "../../repositories/ProdutorRepository";

export default class DetalharProdutorService {
  private produtorRepository: ProdutorRepository;
  private validarUuidService: ValidarUuidService;

  constructor(
    produtorRepository: ProdutorRepository,
    validarUuidService: ValidarUuidService
  ) {
    this.produtorRepository = produtorRepository;
    this.validarUuidService = validarUuidService;
  }

  async detalhar(idProdutor: string): Promise<Produtor> {
    this.validarUuidService.validar(idProdutor);

    const produtor = await this.produtorRepository.buscarPorId(idProdutor);

    if (!produtor) {
      throw new AppError(404, "Este produtor não existe");
    }

    return produtor;
  }
}
