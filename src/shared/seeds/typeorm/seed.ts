import { appDataSource } from "../../../config/database/typeorm/data-source";
import Cultura from "../../../domain/fazendas/entities/Cultura";
import Fazenda from "../../../domain/fazendas/entities/Fazenda";
import { Produtor } from "../../../domain/produtores/entities/Produtor";

const produtores = [
  {
    id: "e0ff52f1-7e28-45f0-8c2a-57d7dcd81df5",
    nomeProdutor: "João Silva",
    cnpj: "12.345.678/0001-00",
  },
  {
    id: "6c3c6f39-0fe3-4f0a-a5bb-16a1c824c44e",
    nomeProdutor: "Maria Souza",
    cpf: "123.456.789-09",
  },
  {
    id: "b63c1d34-fbcd-44c9-a552-9f9b831e654f",
    nomeProdutor: "Carlos Oliveira",
    cnpj: "98.765.432/0001-21",
  },
  {
    id: "12baab36-1f65-4f35-96d8-bb1e14b6d458",
    nomeProdutor: "Ana Santos",
    cpf: "987.654.321-09",
  },
];

const fazendas = [
  {
    id: "4aa1b92e-110c-4e7d-93e3-6d10397e7a53",
    nomeFazenda: "Fazenda Silva",
    cidade: "São João da Boa Vista",
    estado: "SP",
    totalDeHectares: 800,
    hectaresAgricultaveis: 499,
    hectaresVegetacao: 300,
    produtor: produtores[0],
  },
  {
    id: "e5b6c1c2-7c11-44a3-ba27-fa57c4c73956",
    nomeFazenda: "Fazenda Progresso",
    cidade: "Águas da Prata",
    estado: "SP",
    totalDeHectares: 1200,
    hectaresAgricultaveis: 650,
    hectaresVegetacao: 500,
    produtor: produtores[0],
  },
  {
    id: "c04b3654-93bf-4d67-8a74-c35dd3a8de8c",
    nomeFazenda: "Fazenda Alegria",
    cidade: "Poços de Caldas",
    estado: "MG",
    totalDeHectares: 500,
    hectaresAgricultaveis: 400,
    hectaresVegetacao: 100,
    produtor: produtores[1],
  },
  {
    id: "20fb59e9-55d3-4f4f-80f4-2e7b1b88096f",
    nomeFazenda: "Fazenda Esperança",
    cidade: "Belo Horizonte",
    estado: "MG",
    totalDeHectares: 100,
    hectaresAgricultaveis: 30,
    hectaresVegetacao: 40,
    produtor: produtores[1],
  },
  {
    id: "c6bf8e04-d6fc-4c24-87f1-0de17f5c3440",
    nomeFazenda: "Fazenda Oliveira",
    cidade: "Curitiba",
    estado: "PR",
    totalDeHectares: 300,
    hectaresAgricultaveis: 20,
    hectaresVegetacao: 170,
    produtor: produtores[2],
  },
  {
    id: "937d981d-e097-43cc-a32f-c5ccf30a3147",
    nomeFazenda: "Fazenda Progressiva",
    cidade: "Londrinha",
    estado: "PR",
    totalDeHectares: 1000,
    hectaresAgricultaveis: 600,
    hectaresVegetacao: 400,
    produtor: produtores[2],
  },
  {
    id: "d6db4d7e-b0de-4f34-bc68-5c64bea733b5",
    nomeFazenda: "Fazenda Feliz",
    cidade: "Salvador",
    estado: "BA",
    totalDeHectares: 600,
    hectaresAgricultaveis: 400,
    hectaresVegetacao: 200,
    produtor: produtores[3],
  },
  {
    id: "091ec5eb-e0c3-4290-a569-e406036fd810",
    nomeFazenda: "Fazenda Verde",
    cidade: "Ilhéus",
    estado: "BA",
    totalDeHectares: 1200,
    hectaresAgricultaveis: 800,
    hectaresVegetacao: 400,
    produtor: produtores[3],
  },
];

const culturasParaCadastro = [
  {
    id: "28b0d18a-efd6-4745-b0a7-93e2efd06872",
    tipo: "Soja",
  },
  {
    id: "b45ce5b2-8600-491d-8fcc-bdb44bb53c82",
    tipo: "Milho",
  },
  {
    id: "5c970ca2-97a7-46fa-8cc2-c6b01383a93e",
    tipo: "Algodão",
  },
  {
    id: "61bddc75-71b2-4540-89a5-6460d7af7124",
    tipo: "Café",
  },
  {
    id: "e79b0304-f805-4262-ac20-ddf8370399a3",
    tipo: "Cana de Açucar",
  },
];

const iniciarConexao = async () => {
  await appDataSource.initialize();
};

const culturasSeed = async () => {
  await iniciarConexao();
  const repository = appDataSource.getRepository(Cultura);

  culturasParaCadastro.forEach(async (cultura) => {
    const { id } = cultura;

    const culturaJaFoiCadastrada = await repository.findOne({
      where: { id },
    });

    if (!culturaJaFoiCadastrada) {
      await repository.save(cultura);
    }
  });
};

const produtoresSeed = async () => {
  await iniciarConexao();

  const repository = appDataSource.getRepository(Produtor);

  produtores.forEach(async (produtor) => {
    const { id } = produtor;

    const produtorJaFoiCadastrado = await repository.findOne({
      where: { id },
    });

    if (!produtorJaFoiCadastrado) {
      await repository.save(produtor);
    }
  });
};

const fazendasSeed = async () => {
  await iniciarConexao();

  const repository = appDataSource.getRepository(Fazenda);

  fazendas.forEach(async (fazenda) => {
    const { id } = fazenda;

    const fazendaJaFoiCadastrada = await repository.findOne({
      where: {
        id,
      },
    });

    if (!fazendaJaFoiCadastrada) {
      await repository.save(fazenda);
    }
  });
};

const vincularCulturaAFazendaSeed = async () => {
  await iniciarConexao();

  const repository = appDataSource.getRepository(Fazenda);

  const vinculoJaFoiCadastrado = await repository
    .createQueryBuilder()
    .select("fc.*")
    .from("fazendas_culturas", "fc")
    .limit(1)
    .getRawOne();

  if (!vinculoJaFoiCadastrado) {
    const sql = `
    INSERT INTO fazendas_culturas ("fazendaId", "culturaId") 
    VALUES
    ('e5b6c1c2-7c11-44a3-ba27-fa57c4c73956', '28b0d18a-efd6-4745-b0a7-93e2efd06872'),
    ('c04b3654-93bf-4d67-8a74-c35dd3a8de8c', 'e79b0304-f805-4262-ac20-ddf8370399a3'),
    ('d6db4d7e-b0de-4f34-bc68-5c64bea733b5', 'b45ce5b2-8600-491d-8fcc-bdb44bb53c82'),
    ('4aa1b92e-110c-4e7d-93e3-6d10397e7a53', '5c970ca2-97a7-46fa-8cc2-c6b01383a93e'),
    ('c6bf8e04-d6fc-4c24-87f1-0de17f5c3440', '61bddc75-71b2-4540-89a5-6460d7af7124'),
    ('091ec5eb-e0c3-4290-a569-e406036fd810', '28b0d18a-efd6-4745-b0a7-93e2efd06872'),
    ('20fb59e9-55d3-4f4f-80f4-2e7b1b88096f', 'e79b0304-f805-4262-ac20-ddf8370399a3'),
    ('937d981d-e097-43cc-a32f-c5ccf30a3147', 'b45ce5b2-8600-491d-8fcc-bdb44bb53c82'),
    ('e5b6c1c2-7c11-44a3-ba27-fa57c4c73956', '5c970ca2-97a7-46fa-8cc2-c6b01383a93e'),
    ('c04b3654-93bf-4d67-8a74-c35dd3a8de8c', '61bddc75-71b2-4540-89a5-6460d7af7124'),
    ('d6db4d7e-b0de-4f34-bc68-5c64bea733b5', '28b0d18a-efd6-4745-b0a7-93e2efd06872'),
    ('4aa1b92e-110c-4e7d-93e3-6d10397e7a53', 'e79b0304-f805-4262-ac20-ddf8370399a3'),
    ('c6bf8e04-d6fc-4c24-87f1-0de17f5c3440', 'b45ce5b2-8600-491d-8fcc-bdb44bb53c82'),
    ('091ec5eb-e0c3-4290-a569-e406036fd810', '5c970ca2-97a7-46fa-8cc2-c6b01383a93e'),
    ('20fb59e9-55d3-4f4f-80f4-2e7b1b88096f', '61bddc75-71b2-4540-89a5-6460d7af7124'),
    ('937d981d-e097-43cc-a32f-c5ccf30a3147', '61bddc75-71b2-4540-89a5-6460d7af7124');`;

    repository.query(sql);
  }
};

culturasSeed();
produtoresSeed();
fazendasSeed();
vincularCulturaAFazendaSeed();
