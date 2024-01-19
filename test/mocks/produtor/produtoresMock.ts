const produtorMock = jest.fn().mockReturnValue({
  id: "a4d73e8e-d90d-4663-b290-c6a89d431f32",
  nomeProdutor: "João",
  cpf: "097.772.810-21",
  cnpj: null,
  ativo: true,
});

const produtorNaoEncontrado = jest.fn().mockReturnValue(null);

export { produtorMock, produtorNaoEncontrado };
