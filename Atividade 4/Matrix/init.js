let ctx;
let CANVAS;
const FRAMES = 1;

console.log("Initialize Canvas")
CANVAS = document.querySelector('canvas')
ctx = CANVAS.getContext('2d')

const letras = ["田","由","甲","申","甴","电","甶","男","甸","甹","町","画","甼","甽"]
var frase = "CSTSI";
frase = frase.split("");
// console.log(frase)
const tamanho = 20;


const colunas = CANVAS.width / tamanho;
const drops = new Array(Math.floor(colunas)).fill(1);

const init = () => {

    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);

    ctx.font = `${tamanho}px arial`;


    for (let i = 0; i < drops.length; i++) {

        const texto = letras[Math.floor(Math.random() * letras.length)];
        ctx.fillStyle = "#0F0";
        ctx.fillText(texto, i * tamanho, drops[i] * tamanho);

        if (drops[i] * tamanho > CANVAS.height && Math.random() > 0.99) {
            drops[i] = 0;
        }

        drops[i]++;
    

    for (let j = 0; j < drops.length; j++) {

        for (let f = 0; f < 5; f++) {
            setTimeout(() => {
                ctx.fillStyle = "#FFF"
                ctx.fillText(frase[f], j * tamanho, drops[j] * tamanho);
                console.log(frase[f])
                
                
                
                if (drops[j] * tamanho > CANVAS.height && Math.random() > 0.999) {
                    drops[j] = 0;
                }
                
                drops[j]++;
            }, 1000/FRAMES);
        }
    }
}


    window.requestAnimationFrame(init)
}



export { init }