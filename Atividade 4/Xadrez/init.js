let ctx;
let CANVAS;
let FRAME = 15
let width = 150;
let height = 200;
let x = 0;
let y = 0;
let i = 0;

console.log("Initialize Canvas")
CANVAS = document.querySelector('canvas')
ctx = CANVAS.getContext('2d')

let lado = CANVAS.width * 0.34

// let colunas = CANVAS.width / width;
// const drops = new Array(Math.floor(colunas)).fill(1);

const init = () => {
    ctx.fillStyle = 'DarkOrchid'
    ctx.fillRect(0, 0, CANVAS.width, CANVAS.height)

    loop()

}

const loop = () => {

    setTimeout(() => {
        if (i % 2 == 0) {
            ctx.fillStyle = 'black'
            ctx.shadowColor = 'black'
            ctx.shadowBlur = 15;

        } else {
            ctx.fillStyle = 'purple'
            ctx.shadowColor = 'purple'
            ctx.shadowBlur = 15;
        }

        ctx.fillRect(x, y, lado, lado)

        x += lado

        if (x > CANVAS.width){
            x = 0
            y += lado
            if (lado > 13)
            lado /=2
        }

        i ++

        if (y >400) {
            cancelAnimationFrame(loop)
        }
            requestAnimationFrame(loop)
        }, 1000 / FRAME);

}

export { init }