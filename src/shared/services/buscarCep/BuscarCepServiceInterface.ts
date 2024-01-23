import CidadeEEstadoOutput from "./dto/CidadeEEstadoOutput";

export default interface BuscarCepServiceInterface {
  buscar(cep: string): Promise<CidadeEEstadoOutput>;
}
