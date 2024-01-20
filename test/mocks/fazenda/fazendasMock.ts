const fazendaMock = jest.fn().mockReturnValue({
  id: "2b28cfe3-2167-48d9-a2ed-1a1dd17331c4",
  nomeFazenda: "Fazenda Aliança",
  cidade: "São João da Boa Vista",
  estado: "SP",
  hectaresAgricultaveis: 1000,
  hectaresVegetacao: 400,
  totalDeHectares: 800,
  deletedAt: null,
  produtor: {
    id: "a4d73e8e-d90d-4663-b290-c6a89d431f32",
    nomeProdutor: "João",
    cpf: "097.772.810-21",
    cnpj: null,
    deletedAt: null,
  },
});

const fazendaApagadaMock = jest.fn().mockReturnValue({
  id: "2b28cfe3-2167-48d9-a2ed-1a1dd17331c4",
  nomeFazenda: "Fazenda Aliança",
  cidade: "São João da Boa Vista",
  estado: "SP",
  hectaresAgricultaveis: 1000,
  hectaresVegetacao: 400,
  totalDeHectares: 800,
  deletedAt: "2024-01-20T14:08:04.832Z",
  produtor: {
    id: "a4d73e8e-d90d-4663-b290-c6a89d431f32",
    nomeProdutor: "João",
    cpf: "097.772.810-21",
    cnpj: null,
    deletedAt: null,
  },
});

const fazendaNaoEncontradaMock = jest.fn().mockReturnValue(null);

const listaVaziaDeFazendasMock = jest.fn().mockReturnValue([]);

export {
  fazendaMock,
  fazendaNaoEncontradaMock,
  fazendaApagadaMock,
  listaVaziaDeFazendasMock,
};
