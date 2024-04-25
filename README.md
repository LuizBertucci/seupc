# SeuPC

SeuPC é um projeto que permite ao usuário encontrar a melhor configuração de notebooks, com base em seu perfil de uso. O projeto abrange um back-end desenvolvido com Node.js e um front-end construído com Next.js. Diversas bibliotecas são utilizadas para fornecer a funcionalidade do projeto, incluindo express, typescript, knex, swagger e zod. O banco de dados usado é Postgres. O repositório é estruturado como um monorepo e inclui um arquivo docker-compose.yml na raiz do repositório.

## Começando

Para começar a usar este projeto, você precisa cloná-lo do repositório no GitHub. Você pode fazer isso usando o seguinte comando na linha de comando:

```bash
git clone https://github.com/{usuario}/seupc.git
```

É claro, você precisará substituir "{usuario}" pelo nome de usuário do repositório.

## Rodando o Projeto

### Com Docker

Se você tem o Docker e Docker-compose instalados na sua máquina, você pode usar o arquivo docker-compose.yml incluso para iniciar o projeto. Para fazer isso, navegue até o diretorio raiz do projeto (onde o arquivo docker-compose.yml está localizado) e execute o seguinte comando:

```bash
docker-compose up
```

Se tudo estiver configurado corretamente, o projeto começará a rodar.

### Com Docker (Aplicações Separadas)

Além disso, é possível executar cada aplicação do projeto de maneira separada utilizando o Docker. Cada aplicação possui seu próprio arquivo Dockerfile na respectiva subpasta.

Para executar cada aplicação de maneira individual, navegue até a subpasta do projeto da aplicação que você deseja executar, e em seguida, execute o seguinte comando:

```bash
docker build -t nomeDaAplicação .
```

Isso irá construir uma imagem Docker para a aplicação a partir do Dockerfile. Você pode substituir "nomeDaAplicação" pelo nome que você desejar para identificar a imagem criada.

Depois de construir a imagem Docker, você pode executar a imagem com o seguinte comando:

```bash
docker run -p 8080:8080 nomeDaAplicação
```

Isso iniciará um container Docker a partir da imagem construída e mapeará a porta 8080 do host para a porta 8080 do container. Agora você deve ser capaz de acessar a aplicação pelo navegador na porta 8080.

Lembre-se de substituir "nomeDaAplicação" pelo nome que você escolheu na etapa anterior e atente-se com a porta mapeada.

Repita esse processo para cada aplicação que deseja rodar de maneira separada.

### Sem Docker

Se você não tem ou não quer usar o Docker, você ainda pode rodar o projeto nativamente. Para fazer isso, é necessário algumas configurações prévias:

1. Certifique-se de que você tem Node.js e o gerenciador de pacotes npm instalados.

2. É necessário também a instalação do PostgreSQL. Ele pode ser baixado a partir [deste link](https://www.postgresql.org/download/). Após a instalação do PostgreSQL, crie um novo banco de dados e se necessário altere o arquivo .env do back-end.

3. Depois de confirmar a instalação do Node.js e do PostgreSQL, navegue até cada subpasta do projeto e instale as dependências com npm:

```bash
npm install
```

Uma vez que todas as dependências estejam instaladas, você pode iniciar o projeto com o seguinte comando:

```bash
npm run dev
```

Agora o projeto deve estar rodando localmente em sua máquina.

## Contribuindo

Ao realizar qualquer modificação, seja ela uma nova funcionalidade ou correção, é necessário criar uma nova branch seguindo a seguinte nomenclatura:

Para adição de uma nova funcionalidade:

```bash
git checkout -b feature/nome-da-funcionalidade
```

Para correção de algum problema:

```bash
git checkout -b fix/nome-da-correção
```

Esta estrutura de nomes nos permite entender facilmente o propósito de cada branch e mantém o repositório organizado.

Após completar as modificações na sua branch, certifique-se de que seu código segue os padrões adotados no projeto e de que todos os testes estão passando.

Feito isso, é necessário abrir um Pull Request (PR). No início do projeto, por padrão, todos os PRs devem ser feitos diretamente para a branch `main`. Certifique-se de fornecer uma descrição detalhada do que foi feito em sua branch na descrição do PR.

## Links Úteis
- Admin: https://seupc-client-app.azurewebsites.net/admin
- Notion, com mais explicações sobre o sistema: https://seupc.notion.site/Nosso-c-digo-63dfa3881fa648d1831cf38ea54a36f7?pvs=74
- Mapa mental: https://mm.tt/app/map/2902173144?t=QfEc6RrDnk
- Swagger UI: https://seupc-core-api.azurewebsites.net/
- Estrutura Schema: https://lucid.app/lucidchart/11622696-62da-4f87-bdcc-d195ca619ddc/edit?viewport_loc=-741%2C-526%2C2640%2C1660%2C0_0&invitationId=inv_36e06db8-4f32-4199-977c-579bb31dac11
- ChatGPT4: pegar acesso com Administradores para acessar "SeuPC GPT" 
