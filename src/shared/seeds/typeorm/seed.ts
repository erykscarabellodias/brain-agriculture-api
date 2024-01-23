import { appDataSource } from "../../../config/database/typeorm/data-source";
import Cultura from "../../../domain/fazendas/entities/Cultura";

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

culturasSeed();
