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

## Deploy

Para fazer o deploy da aplicação, siga os passos abaixo:

#### Encontrar usuário e senha do Azure CR

Os administradores podem encontrar o usuário e senha do Azure CR acessando o portal do Azure, navegando até o Container Registry desejado e clicando em "Acess keys". É necessário utilizar o "Username" e o "Password" para completar o login no Container Registry.

#### Executar o deploy

Dentro das pastas `client-app` e `core-api`, você encontrará um arquivo chamado `deploy.sh` que fica dentro da pasta `scripts`. Para executá-lo, siga os passos abaixo:

1. Faça o login no Docker:

```bash
docker login <nome-do-registry>.azurecr.io
```

2. Execute o script de deploy:

```bash
./deploy.sh
```

Lembre-se de que é necessário ter o Docker instalado na máquina para realizar o deploy e que todas aplicações precisam estar completando o build.

#### Problemas durante o deploy

Durante o processo de deploy, podem surgir alguns problemas comuns, tais como:

- **DevDependencies**: Caso haja dependências que são utilizadas em todos os ambientes, e que constam apenas em `devDependencies`, pode ocorrer problemas ao enviar a aplicação para produção. Certifique-se de mover essas dependências para `dependencies` antes do deploy.

- **Configuração do Prettier**: Ao rodar o comando `docker build .`, verifique se o container está sendo construído com sucesso. Problemas relacionados à formatação do código pelo Prettier podem causar erros durante o build do Docker.

- **Build da aplicação**: Antes de realizar o deploy, certifique-se de testar o build da aplicação localmente rodando o comando `npm run build`. Problemas durante o processo de build podem gerar falhas no deploy da aplicação. Certifique-se de corrigir quaisquer erros ou alertas que surjam durante o build local antes de prosseguir com o deploy.

## Acessando ao Banco de Dados de produção na Azure de forma externa

Para acessar um Banco de Dados PostgreSQL na Azure de forma externa, será necessário adicionar o seu IP local nas configurações de firewall. Abaixo estão os passos para realizar essa configuração:

#### Adicionar o IP local nas configurações de firewall

1. Acesse o portal do Azure e faça login na conta.

2. No painel de navegação à esquerda, procure por "Grupos de recursos" e selecione o grupo de recursos onde está localizado o seu Banco de Dados PostgreSQL.

3. Dentro do grupo de recursos, encontre o Banco de Dados PostgreSQL que deseja acessar externamente e clique nele.

4. No menu lateral esquerdo, clique em "Set server firewall".

5. Em seguida, você verá uma lista de regras de firewall. Para adicionar o seu IP local, clique em "Adicionar endereço de IP" na seção "Firewall rules".

6. Você pode encontrar o seu endereço de IP público pesquisando no Google por "Qual é o meu IP" ou se a opção "Add your client IPv4 address" estiver disponível, basta clicar no botão.

7. Após adicionar o seu IP local, clique em "Salvar" para aplicar as alterações.

#### Acessar o Banco de Dados externamente

Agora que o seu IP local foi adicionado às configurações de firewall do Banco de Dados PostgreSQL na Azure, você pode acessá-lo externamente utilizando um cliente de PostgreSQL, como o pgAdmin ou o psql.

Certifique-se de que a string de conexão do seu cliente inclui o host (endereço do servidor), porta, nome do banco de dados, nome de usuário e senha corretos.

## Links Úteis

- Admin: https://seupc-client-app.azurewebsites.net/admin
- Notion, com mais explicações sobre o sistema: https://seupc.notion.site/Nosso-c-digo-63dfa3881fa648d1831cf38ea54a36f7?pvs=74
- Mapa mental: https://mm.tt/app/map/2902173144?t=QfEc6RrDnk
- Swagger UI: https://seupc-core-api.azurewebsites.net/
- Estrutura Schema: https://lucid.app/lucidchart/11622696-62da-4f87-bdcc-d195ca619ddc/edit?viewport_loc=-741%2C-526%2C2640%2C1660%2C0_0&invitationId=inv_36e06db8-4f32-4199-977c-579bb31dac11
- ChatGPT4: pegar acesso com Administradores para acessar "SeuPC GPT"
