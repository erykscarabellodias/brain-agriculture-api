import { AppError } from "../../../../shared/erros/app.error";
import ValidarUuidService from "../../../../shared/services/validarUuid/ValidarUuidService";
import Fazenda from "../../entities/Fazenda";
import FazendaRepository from "../../repositories/FazendaRepository";

export default class DetalharFazendaService {
  constructor(
    private readonly fazendaRepository: FazendaRepository,
    private readonly validarUuidService: ValidarUuidService
  ) {}

  async detalhar(idFazenda: string): Promise<Fazenda> {
    if (!idFazenda) {
      throw new AppError(400, "O campo idFazenda é obrigatório");
    }

    this.validarUuidService.validar(idFazenda);

    const fazenda = await this.fazendaRepository.buscarPorId(idFazenda);

    if (!fazenda) {
      throw new AppError(404, "Esta fazenda não existe");
    }

    return fazenda;
  }
}
