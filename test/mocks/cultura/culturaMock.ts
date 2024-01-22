const culturaMock = jest.fn().mockReturnValue({
  id: "0bee6ab9-44d6-4916-b208-dede0de028b9",
  tipo: "Milho",
});

const culturaNaoEncontradaMock = jest.fn().mockReturnValue(null);

export { culturaMock, culturaNaoEncontradaMock };
