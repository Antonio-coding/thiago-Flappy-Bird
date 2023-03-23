console.log('[Thiago] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

contexto.drawImage(
    sprites,
    sx,sy,
    sWidth, sHeght,
    dx,dy,
    dWidth, dHeght
)