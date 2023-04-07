console.log("[Thiago] Flappy Bird");

let frames = 0;
const som_HIT = new Audio();
som_HIT.src = "./efeitos/death_hit.wav";

const sprites = new Image();
sprites.src = "./imagens.sprite.png";

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

//[flappyBird]

function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;

  if (flappyBirdY >= chaoY) {
    return true;
  }
  return false;
}

function criaFlappyBird() {
  const flappyBird = {
    spriteX: 33,
    spriteY: 806,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      console.log("devo pular");
      console.log("[antes]", flappyBird.velocidade);
      flappyBird.velocidade = -flappyBird.pulo;
      console.log("[depois]", flappyBird.velocidade);
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
      if (fazColisao(globais.flappyBird, globais.chao)) {
        console.log("fez colisão");
        som_HIT.play();
        setTimeout(() => {
          mudaParaTela(Telas.INICIO);
        }, 500);
        return;
      }

      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    movimentos: [
      { spriteX: 33, spriteY: 808 }, //asa para cima
      { spriteX: 79, spriteY: 808 }, //asa para meio
      { spriteX: 122, spriteY: 808 }, //asa para baixo
      { spriteX: 165, spriteY: 808 }, //asa para volta
    ],
    frameAtual: 0,
    atualizaOFrameAtual() {
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if (passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao;
      }
    },
    desenho() {
      flappyBird.atualizaOFrameAtual();
      const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

      contexto.drawImage(
        sprites,
        spriteX,
        spriteY,
        flappyBird.largura,
        flappyBird.altura,
        flappyBird.x,
        flappyBird.y,
        flappyBird.largura,
        flappyBird.altura
      );
    },
  };
  return flappyBird;
}

//[chao]
function criaChao() {
  const chao = {
    spriteX: 486,
    spriteY: 39,
    largura: 263,
    altura: 89,
    x: -0,
    y: 393,
    atualiza() {
      const movimentoDoChao = 1;
      const repeteEm = chao.largura / 2;
      const movimentacao = chao.x - movimentoDoChao;

      //console.log('[chao.x]', chao.x);
      //console.log('[repeteEm]', repeteEm);
      //console.log('[Calculo maluco]', movimentacao % repeteEm);

      chao.x = movimentacao % repeteEm;
    },

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
  return chao;
}

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

//[Canos]

function criaCanos() {
  const canos = {
    largura: 41,
    altura: 250,
    chao: {
      spriteX: 72,
      spriteY: 545,
    },
    ceu: {
      spriteX: 117,
      spriteY: 545,
    },
    espaco: 80,

    desenho() {
      canos.pares.forEach(function (par) {
        const yRandom = par.y;
        const espacamentoEntreCanos = 90;

        // [cano do Céu]
        const canoCeuX = par.x;
        const canoCeuY = yRandom;
        contexto.drawImage(
          sprites,
          canos.ceu.spriteX,
          canos.ceu.spriteY,
          canos.largura,
          canos.altura,
          canoCeuX,
          canoCeuY,
          canos.largura,
          canos.altura
        );

        // [cano do Chão]
        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
        contexto.drawImage(
          sprites,
          canos.chao.spriteX,
          canos.chao.spriteY,
          canos.largura,
          canos.altura,
          canoChaoX,
          canoChaoY,
          canos.largura,
          canos.altura,
        );
        par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY
        }
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY
        }
      });
    },
    temColisaoComOFlappyBird(par) {
      const cabecaDoFlappy = globais.flappyBird.y;
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
     
      if (globais.flappyBird.x >= par.x) {
      

        if (cabecaDoFlappy <= par.canoCeu.y) {
          return true;
        }

        if (peDoFlappy >= par.canoChao.y) {
          return true;
        }
      }
      return false;
    },

    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0;
      if (passou100Frames) {
        console.log("passou 100 frames");
        canos.pares.push({
          x: canvas.width,          
          y: -50 * (Math.random() + 1),
        });
      }
      canos.pares.forEach(function (par) {
        par.x = par.x - 2;
        if (canos.temColisaoComOFlappyBird(par)) {
          console.log("Você perdeu !!!");
          mudaParaTela(Telas.INICIO);
        }

        if (par.x + canos.largura <= 0) {
          canos.pares.shift();
        }
      });
    },
  };
  return canos;
}

//
//[Telas]
//
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if (telaAtiva.inicializa && telaAtiva.inicializa()) {
    inicializa();
  }
}

const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },
    desenho() {
      planoDeFundo.desenho();
      globais.canos.desenho();
      globais.chao.desenho();
      globais.flappyBird.desenho();
      mensagemGetReady.desenho();
      mensagemFlappyBird.desenho();
      mensagemTapInstrucao.desenho();
    },
    click() {
      mudaParaTela(Telas.JOGO);
    },
    atualiza() {
      globais.chao.atualiza();

    },
  },
};

Telas.JOGO = {
  desenho() {
    planoDeFundo.desenho();
    globais.canos.desenho();
    globais.chao.desenho();
    globais.flappyBird.desenho();
  },
  click() {
    globais.flappyBird.pula();
  },
  atualiza() {
    globais.flappyBird.atualiza();
    globais.chao.atualiza();
    globais.canos.atualiza();
  },
};

function loop() {
  telaAtiva.desenho();
  telaAtiva.atualiza();

  frames = frames + 1;

  requestAnimationFrame(loop);
}

window.addEventListener("click", function () {
  if (telaAtiva.click) {
    telaAtiva.click();
  }
});

mudaParaTela(Telas.INICIO);

loop();
