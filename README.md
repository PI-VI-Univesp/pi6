# QueroPet

Sistema on-line para busca por animais para adoção, para ter uma ideia do ponto de partida e dicas de como executar o código, assista esse vídeo: 

https://www.youtube.com/watch?v=F0L7L5fTDgg

## O Download app pode ser feito em: 

https://drive.google.com/drive/folders/1cE5G4ZV-mHlA6BLjthXgo1mysNGBVJdN?usp=sharing

## Instalação via PlayStore

https://play.google.com/store/apps/details?id=com.queropetapp

## Instruções para desenvolvimento do Backend

### Conexão com o banco de dados

O backend se conecta com banco de dados Postgres em sua porta padrão *5432*, usando o usuário *postgres* e senha *docker*. Por conveniência o nome do banco de dados é *pi6* A configuração da conexão com o banco é feita no arquivo *backend/ormconfig.json* . 

Recomendo o provisionamento do banco de dados usando o [Docker](https://www.docker.com/), para gerenciamento de tabelas e visualização recomendo o software 
[DBeaver](https://dbeaver.io/).

### Instalação das dependências de desenvolvimento

Para instalar as dependências do projeto abra um terminal na raiz do projeto e digite:

`cd backend`

Instale as dependencias do projeto

`yarn`

Com o banco de dados rodando, execute as migrações

`yarn typeorm migration:run`

Para iniciar o servidor de desenvolvimento:

`yarn dev:server`

Observe a saída do terminal, se tudo correr bem ele vai exibir a porta onde onde serão feitas as requisições, por padrão a porta 3333.

O backend é uma implementação de API REST, ela aceita conexões e requisições como GET, POST, DELETE, PUT, PATCH etc. Recomendo o uso do software [Insomnia Core](https://insomnia.rest/download/). Mais sobre sua utilização veja aqui: https://youtu.be/cvVsbfj8UQ0

## Instruções para desenvolvimento do Frontend

Para instalar as dependências do projeto abra um terminal na raiz do projeto e digite:

`cd web`

Instale as dependências do projeto

`yarn`

Com o banco de dados e o backend rodando, execute o server de desenvolvimento:

`yarn start`

Observe a saída do terminal, se tudo correr bem ele vai exibir a porta onde onde serão feitas as requisições, por padrão a porta 3000. Normalmente ele vai abrir uma tab no seu navegador de internet.

## Instruções para desenvolvimento do App Mobile

Para instalar as dependências do projeto abra um terminal na raiz do projeto e digite:

`cd app`

Instale as dependências do projeto

`yarn`

Com o banco de dados e o backend rodando, execute o server de desenvolvimento:

`yarn start`

Em outro terminal ou aba do terminal rode: 

`yarn android`

Observe a saída do terminal, se tudo correr bem ele vai abrir o emulador do android na versão mais recente de API que você tem instalado em sua máquina. Durante o processo ele vai instalar o APK do app no emulador e executar a Activity correta.

Caso você tenha algum dispositivo android conectado por cabo USB e com o modo desenvolvedor ativado, o react-native vai usar esse dispositivo como device para o desenvolvimento, dispensando assim o uso do Emulador.
