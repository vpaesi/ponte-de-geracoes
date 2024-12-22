<!--
Obrigado por usar este modelo de README.
Se você tiver sugestões, faça um fork deste projeto e crie uma pull request ou abra uma issue com o rótulo "enhancement".
-->
<div align="center">

  <img src="https://github.com/user-attachments/assets/be576345-bd57-43ea-95f8-05970528aac9" alt="logo" width="200" height="auto" />
  <h1>Ponte de Gerações</h1>

  <p>
    Detalhes sobre o back-end do nosso projeto.
  </p>

<!-- Badges -->
<p>
  <a href="https://github.com/lucasdemattos8/project-ponte_de_geracoes/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/lucasdemattos8/project-ponte_de_geracoes" alt="contributors" />
  </a>
  <a href="https://github.com/lucasdemattos8/project-ponte_de_geracoes/commits">
    <img src="https://img.shields.io/github/last-commit/lucasdemattos8/project-ponte_de_geracoes" alt="última atualização" />
  </a>
  <a href="https://github.com/lucasdemattos8/project-ponte_de_geracoes/issues/">
    <img src="https://img.shields.io/github/issues/lucasdemattos8/project-ponte_de_geracoes" alt="issues abertas" />
  </a>
  <a href="https://github.com/lucasdemattos8/project-ponte_de_geracoes/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/lucasdemattos8/project-ponte_de_geracoes" alt="licença" />
  </a>
</p>

<h4>
    <a href="https://github.com/lucasdemattos8/project-ponte_de_geracoes">Documentação</a>
  <span> · </span>
    <a href="https://github.com/lucasdemattos8/project-ponte_de_geracoes/issues/">Reportar Bug</a>
  <span> · </span>
    <a href="https://github.com/lucasdemattos8/project-ponte_de_geracoes/issues/">Solicitar Funcionalidade</a>
  </h4>
</div>

<br />

<!-- Sobre o Projeto -->
## :star2: Sobre o Projeto

Este projeto é um desafio para integrar tecnologias modernas de desenvolvimento web. A proposta é construir um **backend** usando **Spring Boot** e **JPA/Hibernate** com persistência em memória e banco de dados PostgreSQL, além de integrar com **Swagger** para documentação da API. O frontend é construído utilizando **React** e **TypeScript** para proporcionar uma interface interativa e dinâmica.

<!-- Capturas de Tela -->
### :camera: Capturas de Tela

<div align="center">
  <img src="https://github.com/user-attachments/assets/c22001b2-f677-46b8-8058-5190c8d2b347"
 alt="captura de tela" />
  <hr>
  <img src="https://github.com/user-attachments/assets/b4b51fbb-8750-46fd-b3b4-9cbdfefcc442"
 alt="captura de tela2" />
</div>

<!-- Tecnologias -->
### :desktop_computer: Tecnologias

<details>
  <summary>Backend</summary>
  <ul>
    <li><a href="https://spring.io/projects/spring-boot">Spring Boot</a></li>
    <li><a href="https://www.h2database.com/html/main.html">H2 (Banco de dados em memória)</a></li>
    <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
    <li><a href="https://swagger.io/">Swagger</a></li>
  </ul>
</details>

<details>
  <summary>Ferramentas</summary>
  <ul>
    <li><a href="https://code.visualstudio.com/">VS Code</a></li>
    <li><a href="https://git-scm.com/">Git</a></li>
    <li><a href="https://www.postman.com/">Postman</a></li>
  </ul>
</details>

<!-- Funcionalidades -->
### :dart: Funcionalidades

- **Esturação baseada em POO:** Estrutura do código criada com princípios de design orientado a objetos.
- **Integração entre Frontend e Backend:** Comunicação entre as camadas utilizando REST APIs.
- **Testes automatizados**: Testes de unidade e integração com JUnit 5, com isolamento e cobertura de código.
- - **API Documentada com Swagger**: A documentação da API pode ser acessada diretamente no endpoint `/swagger-ui.html`, proporcionando uma interface amigável para testar e visualizar os endpoints.
- **Configuração de Perfis**: Criado diferentes perfis para configuração de diferentes tipos de ambientes (produção, dev).

### :handshake: Diagrama de relacionamentos


<div align="center">
  <img src="https://www.plantuml.com/plantuml/png/pL9DQzj04BthLsnzR55ehoM4XDgaXk2Oc1vwAYDf8Y_P3x4pQabB_djN6eju13K5N-A3T-VflT6RDxecXiIzTyKxtgD7ax1f4XAL3QIdolLOr0w8p8t0vazXyk_3NGojiOqKEqusbxNbPmNyjjsNsA32Y1CYAoZqliAaMqNVEVGO1kPBaVymiymsnNPmiMFWVlAolD-inijwysFxS7_xiDhjndgxsYpNczkfms4E8aiCeSQxsCwccOeQt18OZKVax6QuowFP-sayvD5NT1qcinyFWUHLs1WuNEPE13qLQG2FSrULJRmVRegPMXrWzwXgz62TGhfz3AWH8FeLqym1OaE2L34wX23GCAzMf_Xe7QuzjFWjkODhItmfX2i3Fy4wg1mkuPcK5ghOy_VO2pXzQY3dKIUrlDpmk2IThkpZRMTBJzQvMRYMRgQOpeZmr4xEZ7UIBpujp6LPciN7YultYzUl-REfOs2mWVvDbkLewjHWpbMciiI95sdndsGD3zmiAykhGVvgPfYt3Ta1nzEQuscLwgMunj3qtlq5"
 alt="Diagrama de classes" />
</div>



<!-- Início Rápido -->
## :toolbox: Início Rápido

<!-- Pré-requisitos -->
### :exclamation: Pré-requisitos

Certifique-se de ter os seguintes programas instalados:

- Java 21+
- Maven

<!-- Instalação -->
### :gear: Instalação

1. Clone o repositório:
```bash
  git clone https://github.com/your-repo/project-name.git
```

2. Acesse o diretório do projeto:
```bash
  cd project-name
```

4. Instale as dependências do backend:
```bash
  mvn install
```

<!-- Rodando Testes -->
### :test_tube: Rodando Testes

Execute o seguinte comando para rodar os testes:
```bash
  mvn test
```

<!-- Rodando Localmente -->
### :running: Rodando Localmente

Inicie o backend:
```bash
  mvn spring-boot:run
```

A API estará disponível em `http://localhost:8080` e a documentação do Swagger pode ser acessada em `http://localhost:8080/swagger-ui.html`.

<!-- Uso -->
## :eyes: Uso

Este projeto oferece um fluxo básico entre **React** e **Spring Boot** para demonstrar a comunicação entre o frontend e o backend. A API foi documentada utilizando **Swagger**, e o backend oferece endpoints RESTful. A solução pode ser usada como um modelo para projetos semelhantes ou como recurso educativo.

<!-- Roteiro -->
## :compass: Roteiro

- [x] Concluir o desenvolvimento do backend
- [ ] Adicionar funcionalidades avançadas (ex: autenticação)
- [ ] Melhorar a documentação
- [ ] Implementar testes mais abrangentes

<!-- Contribuindo -->
## :wave: Contribuindo

Contribuições são bem-vindas! Por favor, envie uma pull request ou abra uma issue para sugerir melhorias.

<!-- FAQ -->
## :grey_question: FAQ

**Como configurar o Swagger?**
- O Swagger é configurado automaticamente com o Spring Boot. Para visualizar a documentação da API, acesse o endpoint `http://localhost:8080/swagger-ui.html`.

**Posso usar MySQL em vez de PostgreSQL?**
- Sim, mas será necessário atualizar as dependências e configurações do banco de dados.

<!-- Licença -->
## :warning: Licença

Distribuído sob a Licença MIT. Consulte o arquivo `LICENSE` para mais informações.

<!-- Contato -->
## :handshake: Contato

Lucas Miranda - [@Linkedin](https://www.linkedin.com/in/lucas-de-mattos-miranda/)
Vitória de Camargo - [@Linkedin](https://www.linkedin.com/in/vpaesi/)

Link do Projeto: [https://github.com/lucasdemattos8/project-ponte_de_geracoes](https://github.com/lucasdemattos8/project-ponte_de_geracoes)
