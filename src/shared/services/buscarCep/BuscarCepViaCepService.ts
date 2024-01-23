import axios from "axios";
import CidadeEEstadoOutput from "./dto/CidadeEEstadoOutput";
import { AppError } from "../../erros/app.error";
import BuscarCepServiceInterface from "./BuscarCepServiceInterface";

export default class BuscarCepServiceViaCep
  implements BuscarCepServiceInterface
{
  async buscar(cep: string): Promise<CidadeEEstadoOutput> {
    const resultado = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (resultado.status !== 200) {
      throw new AppError(
        400,
        "Houve um problema ao buscar a localidade da sua fazenda"
      );
    }

    if (resultado.data.erro) {
      throw new AppError(400, "O CEP que você enviou não existe");
    }

    const { localidade: cidade, uf: estado } = resultado.data;

    return { cidade, estado };
  }
}
