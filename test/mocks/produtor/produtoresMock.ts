const produtorMock = jest.fn().mockReturnValue({
  id: "a4d73e8e-d90d-4663-b290-c6a89d431f32",
  nomeProdutor: "João",
  cpf: "097.772.810-21",
  cnpj: null,
  deletedAt: null,
});

const produtorNaoEncontrado = jest.fn().mockReturnValue(null);

const listaDeProdutoresAtivosMock = jest.fn().mockReturnValue([
  {
    id: "a4d73e8e-d90d-4663-b290-c6a89d431f32",
    nomeProdutor: "João",
    cpf: "097.772.810-21",
    cnpj: null,
    deletedAt: null,
  },
  {
    id: "2d8838cb-2023-472f-83b5-58ce370659f1",
    nomeProdutor: "Maria",
    cpf: null,
    cnpj: "09.630.813/0001-30",
    deletedAt: null,
  },
]);

const listaDeProdutoresVazia = jest.fn().mockReturnValue([]);

export {
  produtorMock,
  produtorNaoEncontrado,
  listaDeProdutoresAtivosMock,
  listaDeProdutoresVazia,
};
