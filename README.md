# Projeto custom countries

Projeto em React e .Net core que lista países vindo de uma api [countries graphql](https://countries-274616.ew.r.appspot.com)
As informações vindo de [countries graphql](https://countries-274616.ew.r.appspot.com), é confrontada com uma outra api custom, para buscar informações editadas.

## Pré requisitos para roda local

- Visual Studio ou algum outro IDE que rode .Net Core 3.1
- Conexão com banco de dados NoSql MongoDB
- Docker
- SDK .Net Core 3.1
- Node js
 
## Scripts para realizar build local

Foi criado alguns arquivos em powershell, para realizar o build de forma mais fácil

```sh
.\PrivateBuild.ps1
```
ou simplesmente clica no arquivo build.bat

## Scripts para realizar deploy local em docker

Para realizar o deploy localmente, deve se alterar a seguinte env no docker-compose.yml, ConnectionStringMongo, e rodar o seguinte script

```sh
.\PrivateDeploy.ps1
```
ou simplesmente clica no arquivo deploy.bat

## Arquitetura da API
- Utilizando injeção de dependências nas classes
- Padrão singleton utilizando uma instância somente
- Repositórios para abstrair o acesso a camada do banco de dados
- Services onde é feita toda a lógica da aplicação
- Validações na camada domain do projeto

## Arquitetura do WebApp
- Redux para controlar o estado geral da aplicação
- Actions que realiza interação com estado da aplicação

## Basic Auth
A Api está protegida por uma autenticação simples, o usuário prédefinido é admin - 123456, no swagger em Authorize tem dois campos para setar username -> admin, password -> 123456.
Ou se preferir, para fazer requisições passar o seguinte cabeçalho - -H  "Authorization: Basic YWRtaW46MTIzNDU2"
