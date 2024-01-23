# Brain Agriculture API

API para cadastro de produtores rurais, fazendas e seus tipos de culturas.

# Principais tecnologias utilizadas

- `NodeJS` v20.11.0
- `express` v4.18.2
- `typeorm` v0.3.19

# Organização do domínio

Os produtores são pessoas físicas e jurídicas que contam com seu CPF ou CNPJ e o nome completo. Cada produtor pode ter uma ou mais fazendas, que por sua vez registram informações relativas à sua área em hectares, localização e identificação. Além disso, cada fazenda também conta com diversas culturas de plantio, inicialmente com cinco opções: (Soja, Milho, Algodão, Café, Cana de Açucar).

# Como executar o projeto

Para executar o projeto é necessário estar com a versão 20.11.0 do NodeJS instalado e rodar os seguintes passos:

- Clonar a aplicação.
- Criar um arquivo .env com base no .env.example com as variáveis de ambiente necessárias para a conexão com o banco de dados.
- Executar o comando `docker-compose up -d` para iniciar o container com o banco de dados PostgreSQL que é utilizado pela aplicação para persistir os dados.
- Instalar as dependências do projeto com o comando `npm install`.
- Rodar as migrations do projeto com o comando `npm run run-migrations`.
- Rodar os seeds do projeto com o comando `npm run seed`. Este comando populará as tabelas do banco com quatro produtores, oito fazendas, as cinco culturas e alguns vínculos entre fazendas e culturas. É crucial executar esta etapa, pois é nela que as culturas são cadastradas. Se quiser, você pode apagar os dados das demais tabelas posteriormente.
- rodar o comando `npm run dev` para iniciar o servidor da aplicação.

# Testes do projeto

Com a aplicação clonada e as dependências instaladas é possível executar os testes unitários da aplicação com o comando `npm run test`. Todos os services de domínio da aplicação foram testados de forma unitária (com exceção dos relatórios), e maioria dos services compartilhados também.

# Próximos passos que eu faria no projeto

- Documentar a API com Swagger
- Escrever testes de integração para a aplicação
- Abstrairia o CPF e o CNPJ dos produtores para outras tabelas com acesso controlado
- Criaria um mecanismo de autenticação para a aplicação
- Criaria um ambiente dockerizado para a API
