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

const fazendaNaoEncontrada = jest.fn().mockReturnValue(null);

export { fazendaMock, fazendaNaoEncontrada };
