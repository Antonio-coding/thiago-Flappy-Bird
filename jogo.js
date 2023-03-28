console.log("[Thiago] Flappy Bird");

const sprites = new Image();
sprites.src = "./imagens.sprite.png";

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

//[flappyBird]
const flappyBird = {
  spriteX: 33,
  spriteY: 806,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  gravidade: 0.25,
  velocidade: 0,
  atualiza() {
    flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
    flappyBird.y = flappyBird.y + flappyBird.velocidade;
  },
  desenho() {
    contexto.drawImage(
      sprites,
      flappyBird.spriteX,
      flappyBird.spriteY,
      flappyBird.largura,
      flappyBird.altura,
      flappyBird.x,
      flappyBird.y,
      flappyBird.largura,
      flappyBird.altura
    );
  },
};

//[chao]
const chao = {
  spriteX: 486,
  spriteY: 39,
  largura: 263,
  altura: 89,
  x: -0,
  y: 393,

  desenho() {
    contexto.drawImage(
      sprites,
      chao.spriteX,
      chao.spriteY,
      chao.largura,
      chao.altura,
      chao.x,
      chao.y,
      chao.largura,
      chao.altura
    );
    contexto.drawImage(
      sprites,
      chao.spriteX,
      chao.spriteY,
      chao.largura,
      chao.altura,
      chao.x + chao.largura,
      chao.y,
      chao.largura,
      chao.altura
    );
  },
};
//[mensagemGetReady]
const mensagemGetReady = {
  spriteX: 491,
  spriteY: 134,
  largura: 133,
  altura: 32,
  x: 100,
  y: 130,

  desenho() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.spriteX,
      mensagemGetReady.spriteY,
      mensagemGetReady.largura,
      mensagemGetReady.altura,
      mensagemGetReady.x,
      mensagemGetReady.y,
      mensagemGetReady.largura,
      mensagemGetReady.altura
    );
  },
};
//[mensagemFlappyBird]
const mensagemFlappyBird = {
  spriteX: 580,
  spriteY: 184,
  largura: 133,
  altura: 32,
  x: 100,
  y: 50,

  desenho() {
    contexto.drawImage(
      sprites,
      mensagemFlappyBird.spriteX,
      mensagemFlappyBird.spriteY,
      mensagemFlappyBird.largura,
      mensagemFlappyBird.altura,
      mensagemFlappyBird.x,
      mensagemFlappyBird.y,
      mensagemFlappyBird.largura,
      mensagemFlappyBird.altura
    );
  },
};
//[mensagemTapInstrucao]
const mensagemTapInstrucao = {
  spriteX: 513,
  spriteY: 180,
  largura: 62,
  altura: 80,
  x: 150,
  y: 180,

  desenho() {
    contexto.drawImage(
      sprites,
      mensagemTapInstrucao.spriteX,
      mensagemTapInstrucao.spriteY,
      mensagemTapInstrucao.largura,
      mensagemTapInstrucao.altura,
      mensagemTapInstrucao.x,
      mensagemTapInstrucao.y,
      mensagemTapInstrucao.largura,
      mensagemTapInstrucao.altura
    );
  },
};

//[plano de fundo]
const planoDeFundo = {
  spriteX: 30,
  spriteY: 40,
  largura: 220,
  altura: 400,
  x: 0,
  y: 0,

  desenho() {
    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX,
      planoDeFundo.spriteY,
      planoDeFundo.largura,
      planoDeFundo.altura,
      planoDeFundo.x,
      planoDeFundo.y,
      planoDeFundo.largura,
      planoDeFundo.altura
    );
    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX,
      planoDeFundo.spriteY,
      planoDeFundo.largura,
      planoDeFundo.altura,
      planoDeFundo.x + planoDeFundo.largura,
      planoDeFundo.y,
      planoDeFundo.largura,
      planoDeFundo.altura
    );
  },
};

//
//[Telas]
//

let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;
}

const Telas = {
  INICIO: {
    desenho() {
      planoDeFundo.desenho();
      chao.desenho();
      flappyBird.desenho();
      mensagemGetReady.desenho();
      mensagemFlappyBird.desenho();
      mensagemTapInstrucao.desenho();
    },
    click() {
      mudaParaTela(Telas.JOGO);
    },
    atualiza() {},
  },
};

Telas.JOGO = {
  desenho() {
    planoDeFundo.desenho();
    chao.desenho();
    flappyBird.desenho();
  },
  atualiza() {
    flappyBird.atualiza();
  },
};

function loop() {
  telaAtiva.desenho();
  telaAtiva.atualiza();

  requestAnimationFrame(loop);
}

window.addEventListener("click", function () {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
});

mudaParaTela(Telas.INICIO);

loop();
