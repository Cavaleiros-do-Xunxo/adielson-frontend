# Adielson Frontend

Este é o repositório do projeto da faculdade "Restaurante e Pastelaria do Adielson", cujo objetivo é criar um simples sistema de delivery, no qual seja possível realizar pedidos e visualizar o cardápio do dia do Restaurante e Pastelaria do Adielson, além de também fornecer uma interface para o administrador do sistema (Sr. Adielson), para poder gerenciar os produtos qu estarão no cardápio do dia, e também os pedidos que estão em aberto.

## Tecnologias utilizadas:

- **React**: Framework web feito em cima da linguagem de programação Javascript para criar toda a interface web do sistema;
- **Docker**: Ferramenta de "virtualização" utilizada para criar uma imagem da nossa aplicação e realizar o deploy;
- **Bulma CSS**: Biblioteca de componentes CSS que facilita na estilização da aplicação.

## Rodando a aplicação no local

Para rodar a aplicação no local, será necessário possuir o [back-end da aplicação](https://github.com/Cavaleiros-do-Xunxo/adielson-backend) rodando na porta 8080. Além disso, você deverá possuir o NodeJS configurado no seu ambiente local de desenvolvimento, nós aconselhamos o uso da ferramenta [nvm](https://github.com/nvm-sh/nvm) para baixar e gerenciar suas versões de Node, pois o mesmo será necessário para baixar as dependências do projeto a partir do `npm`. Abaixo irei demonstrar como se realizar a instalação da versão `14.16.1` do NodeJS para rodar nossa aplicação utilizando o nvm, mas caso você prefira instalar direto pelo site ignore os próximos passos:

```bash
# Instalando a versão do NodeJS
$ nvm install v14.16.1
# Utilizando a versão instalada
$ nvm use
# Conferindo se foi instalado com sucesso e se está tuilizando a versão de node correta
$ node -v
```

Agora que você possui o NodeJS configurado, vamos partir para o download das dependências:

```bash
# Instalando as dependências utilizando a propriedade --force para baixar a lib de cartão de crédito que ainda não possui suporte para a nova versão do React
$ npm install --force
```

Após ter baixado as dependências, basta rodar então:

```bash
$ npm start
```

E a aplicação irá começar a rodar no endereço: `http://localhost:8081`.
