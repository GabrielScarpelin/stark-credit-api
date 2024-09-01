# CREDITIA API

## Visão Geral

&emsp;CREDITIA é uma empresa inovadora que veio para transformar o setor de crédito no Brasil. Nossa missão é abrir oportunidades para várias empresas que buscam crédito para expandir seus horizontes. Com uma análise de crédito mais justa, transparente, especializada, personalizada e rápida, a CREDITIA é a solução para quem busca análise de crédito.

## Índice

- [Introdução](#introdução)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Introdução

&emsp;A ideia surgiu durante o hackathon do Stark Bank, onde a equipe pensou na CREDITIA como uma solução para facilitar a análise de crédito, inicialmente para a Stark Bank, mas com potencial para ser utilizada por outras empresas. Hoje as ferramentas de análise de crédito ou são generalistas ou muito específicas, e a CREDITIA veio para preencher essa lacuna, oferecendo uma análise de crédito especialista e modular, que pode ser adaptada para diferentes necessidades.

## Problema

&emsp;O processo de análise de crédito é um gargalo para muitas empresas, que precisam de uma resposta rápida e eficiente para poderem tomar decisões. As ferramentas disponíveis no mercado são geralmente muito generalistas ou muito específicas, e muitas vezes não atendem às necessidades específicas de cada empresa. A CREDITIA veio para preencher essa lacuna, oferecendo uma análise de crédito especialista e modular, que pode ser adaptada para diferentes necessidades.

## Solução

Uma plataforma de análise de crédito especialista e modular, com diferentes plugins que podem ser ativados para atender às necessidades específicas de cada empresa. Durante a jornada do usuário, ele pode sentir a necessidade de uma análise de crédito mais detalhada, e a CREDITIA oferece essa possibilidade, com plugins especializados em diferentes áreas, como análise de crédito para empresas de agropecuária, análise de crédito para empresas de varejo, análise de crédito para empresas de serviços, entre outros.

## Diferenciais competitivos

- Análise de crédito especialista e modular
- Plugins especializados em diferentes áreas
- Análise de crédito mais justa, transparente, especializada, personalizada e rápida
- Facilidade de integração com outras empresas (Sistema com API REST para integração de outras empresas)
- Modelo escalável e adaptável para diferentes necessidades, diferentes bancos e diferentes empresas que cedem crédito

## Modelo de Negócio

&emsp;A CREDITIA é uma plataforma de análise de crédito especialista e modular, com diferentes plugins que podem ser ativados para atender às necessidades específicas de cada empresa. A CREDITIA cobra uma taxa de licenciamento mensal para o uso da plataforma ou por cada requisição de análise de crédito na API.

- Taxa de licenciamento mensal de R$ 1200,00 para o uso da plataforma CREDITIA
- Taxa de R$ 20,00 por requisição de análise de crédito na API CREDITIA, caso queira integrar a API em seu sistema

## Público-Alvo

&emsp; Empresas que cedem crédito para outras empresas, como bancos, fintechs, empresas de factoring, entre outros.

## Arquitetura pensada para a solução

&emsp;A arquitetura da solução foi pensada para ser escalar e modular para atender as necessidades de diferentes empresas. Neste caso, trataremos apenas da API REST que será utilizada para integração com outras empresas e com a plataforma CREDITIA.

1. Cliente faz uma requisição para a API REST da CREDITIA, através da API ou da plataforma CREDITIA
2. Neste tempo, o cliente abre uma conexão websocket com a API REST da CREDITIA para receber atualizações em tempo real sobre o status da análise de crédito.
3. A CREDITIA recebe a requisição e a encaminha para o plugin correspondente
4. Quando todos os plugins terminam a análise, a CREDITIA retorna o resultado da análise de crédito para o cliente através da conexão websocket
5. O cliente recebe o resultado da análise de crédito e pode tomar a decisão de conceder ou não o crédito

## Instalação

Siga os passos abaixo para clonar o repositório e configurar o ambiente:

```bash
# Clone o repositório
git clone git@github.com:GabrielScarpelin/stark-credit-api.git

# Entre no diretório do projeto
cd stark-credit-api

# Instale as dependências
npm install
```

## Configuração

&emsp;Na variável de ambiente, deve-se criar uma variável chamada `DATABASE_URL` com a URL do banco de dados PostgreSQL.

## Uso

Inicie o servidor da API com o comando:

```bash
npm run start:dev
```

A API estará disponível em http://localhost:3000.

## Endpoints

### POST /predictions

### GET /predictions/:id

### GET /predictions

### GET /predictions/:enterpriseId

### POST /plugins

### GET /plugins/:id

### GET /plugins

### POST /enterprises

### GET /enterprises/:id

### GET /enterprises

Tecnologias Utilizadas
Node.js: Para o backend.
NestJS: Para criar a API.
Prisma: Para a conexão com o banco de dados.
PostgreSQL: Banco de dados utilizado.
AWS BedRock: IAs.
Inteligência Artificial: [Descrever como a AI está sendo utilizada na solução].

## Equipe

- Gabriel Scarpelin
- Gabriel Coletto
- Wellington Martins
- Larissa Carvalho
- Jonathan Batista
- Pedro Torrezani

## Próximos Passos

&emsp;A integração com a inteligência artificial não foi totalmente construida, por isso, o próximo passo é finalizar a integração com a IA e treinar o modelo com o máximo de dados possíveis para fazer a análise de crédito. Ademais, o mapeamento de plugins através do postgres, integração com Websocket e um plugin de imagem para análise de safra já estão implementados, mas ainda não estão totalmente funcionais. O próximo passo é finalizar a implementação desses plugins e adicionar mais plugins para atender as necessidades de diferentes empresas. Além disso, a API precisa passar por um processo de autenticação e autorização para garantir a segurança dos dados dos usuários, até o momento, a API não possui autenticação e qualquer pessoa pode fazer requisições para a API. Por fim, outro fator importante é terminar a integração com a plataforma CREDITIA, que ainda não está totalmente funcional, pois como o modelo preditivo ainda não está pronto, a plataforma CREDITIA não consegue fazer a análise de crédito.
