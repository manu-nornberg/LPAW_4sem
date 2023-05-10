import Bolha from './bolha';

let CANVAS;
let CTX;
let FRAMES = 50;
let parede

const qntCirculo = 20;

let bolhas = Array.from({ length: qntCirculo });

const init = () => {
    console.log("Initialize Canvas")
    CANVAS = document.querySelector('canvas')
    CTX = CANVAS.getContext('2d')

    parede = {
        width: CANVAS.width,
        height: CANVAS.height
    }

    bolhas = bolhas.map(b => new Bolha(
        Math.random() * CANVAS.width,
        Math.random() * CANVAS.height,
        Math.random() * 50, Math.random() * 25, `#${Math.floor(Math.random() * 5000).toString(16)}`
    ))

    loop()
}

const loop = () => {
    setTimeout(() => {

        CTX.fillStyle = "rgba(255, 255, 255, 0.15)";
        CTX.fillRect(0, 0, CANVAS.width, CANVAS.height)
        
        bolhas.forEach(b => {
            b.move(parede)
            b.draw(CTX)
        })
        

        requestAnimationFrame(loop)

    }, 1000 / FRAMES)
}



export { init }
