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
  culturas: [{ id: "0bee6ab9-44d6-4916-b208-dede0de028b9", tipo: "Milho" }],
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

const fazendaJaTemCulturaMock = jest.fn().mockReturnValue({
  culturaId: "b45ce5b2-8600-491d-8fcc-bdb44bb53c82",
  fazendaId: "4b311af6-69ac-4deb-b934-950d2669c602",
});

const fazendaNaoTemCulturaCadastradaMock = jest.fn().mockReturnValue(null);

export {
  fazendaMock,
  fazendaNaoEncontradaMock,
  fazendaApagadaMock,
  listaVaziaDeFazendasMock,
  fazendaJaTemCulturaMock,
  fazendaNaoTemCulturaCadastradaMock,
};
