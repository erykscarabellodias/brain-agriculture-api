const produtorMock = jest.fn().mockReturnValue({
  id: "a4d73e8e-d90d-4663-b290-c6a89d431f32",
  nomeProdutor: "João",
  cpf: "097.772.810-21",
  cnpj: null,
  deletedAt: null,
  fazendas: [],
});

const produtorApagadoMock = jest.fn().mockReturnValue({
  id: "a4d73e8e-d90d-4663-b290-c6a89d431f32",
  nomeProdutor: "João",
  cpf: "097.772.810-21",
  cnpj: null,
  deletedAt: "2024-01-20T11:51:27.467Z",
  fazendas: [],
});

const produtorNaoEncontradoMock = jest.fn().mockReturnValue(null);

const listaDeProdutoresAtivosMock = jest.fn().mockReturnValue([
  {
    id: "a4d73e8e-d90d-4663-b290-c6a89d431f32",
    nomeProdutor: "João",
    cpf: "097.772.810-21",
    cnpj: null,
    deletedAt: null,
    fazendas: [
      {
        id: "c03104f8-d49b-406f-ab40-a5f122785709",
        nomeFazenda: "Fazenda Aliança",
        estado: "SP",
        cidade: "São João da Boa Vista",
        totalDeHectares: 100,
        hectaresAgricultaveis: 20,
        hectaresVegetacao: 30,
        deletedAt: null,
      },
    ],
  },
  {
    id: "2d8838cb-2023-472f-83b5-58ce370659f1",
    nomeProdutor: "Maria",
    cpf: null,
    cnpj: "09.630.813/0001-30",
    deletedAt: null,
    fazendas: [],
  },
]);

const listaDeProdutoresVaziaMock = jest.fn().mockReturnValue([]);

export {
  produtorMock,
  produtorNaoEncontradoMock,
  listaDeProdutoresAtivosMock,
  listaDeProdutoresVaziaMock,
  produtorApagadoMock,
};
