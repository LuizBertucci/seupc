## Scraping Service Validator

Este código é uma POC para validação do serviço scraping de dados que deve ser utilizado. Ele faz requisições para obter o conteúdo HTML de uma página qualquer, extrai informações específicas com base em um seletor XPath e registra o resultado das ocorrências em um arquivo TXT. A POC foi necessária para verificar se o serviço utilizado consegue contornar os mecanismos de bloqueio de scraping de dados em sites. Esses bloqueios são implementados pelos sites para evitar a extração automatizada de informações, comumente utilizada por bots para coletar dados em grande escala.

**Como Executar:**

1. Certifique-se de ter o Node.js e npm instalados em seu sistema.
2. Clone o repositório e acesse a pasta do POC.
3. Instale as dependências necessárias executando `npm install`.
4. Execute o POC digitando `node index.js`.

Observação: Certifique-se de ter uma chave de API válida para acessar a API de scraping ou se for utilizado apenas um serviço de proxy, certifique-se de ter o usuário, senha e a URL do serviço. Você pode ajustar as configurações no início do arquivo, como o URL de destino, o número de solicitações e as palavras-chave excluídas, conforme necessário.

Esta POC é destinado apenas para fins de demonstração e validação.
