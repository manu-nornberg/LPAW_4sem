import Smile from './smile' //importando o personagem principal
import Enemy from './enemy' //importando o inimigo
import { keypress, key } from './keypress' //importando a funcao das teclas
import Bolinha from './bolinha' //importando a bolinha

//criando as variaveis
let CTX
let CANVAS

const FRAMES = 60
const qntEnemy = 4 //qnt de inimigos
const qntBolinha = 6 //qnt de bolinhas
const smile = new Smile(300, 100, 15, 5, 'lightpink', 3) //especificaçao do smile

let inimigos = Array.from({ length: qntEnemy }); //faz um array com a qnt de inimigos
let bolinhas = Array.from({ length: qntBolinha }); //faz um array com a qnt de inimigos
let gameover = false
let mortinho
let parede
let pontuacao = 0

const init = () => {
    //criando canvas
    console.log("Inicializando o canvas")
    CANVAS = document.querySelector('canvas')
    CTX = CANVAS.getContext('2d')

    parede = {
        width: CANVAS.width,
        height: CANVAS.height
    }

    inimigos = inimigos.map(i => new Enemy(
        Math.random() * CANVAS.width,
        Math.random() * CANVAS.height,
        15, 2, `#${Math.floor(Math.random() * 4096).toString(16).padStart(6, '0')}`
    ))

    bolinhas = bolinhas.map(b => new Bolinha(
        Math.random() * CANVAS.width,
        Math.random() * CANVAS.height,
        6, 0, 'purple'
    ))

    keypress(window) //teclar ou clicar na window
    loop() //chama funcao loop

}

const loop = () => {
    setTimeout(() => {

        CTX.clearRect(0, 0, CANVAS.width, CANVAS.height) //limpar a tela

        smile.move(parede, key)//move o smile
        smile.paint(CTX) //desenha o smile

        inimigos.forEach(i => {
            i.move(parede, smile)
            i.draw(CTX)
            if(i.colisao(smile)){
                smile.vidinha -= 1
                i.x = Math.random()*CANVAS.width
                i.y = Math.random()*CANVAS.height
                i.color = `#${Math.floor(Math.random() * 4096 ).toString(16).padStart(6, '0')}`
            }
            
            gameover = smile.vidinha == 0
                ? true
                : false
        })

        
        // inimigos.forEach(i =>{
            //     i.move(parede, smile)
            //     i.draw(CTX)
            //     gameover = !gameover
            //         ? i.colisao(smile)
            //         : true
            // })
            
            // var = teste? verdadeiro:falso;
            bolinhas.forEach(b => {
                b.move(parede, 0)
            b.draw(CTX)
            if (b.colisao(smile)) {
                b.x = Math.random()*CANVAS.width
                b.y = Math.random()*CANVAS.height
                pontuacao += 1;
                smile.size = smile.size + 1;
            }
        })
        
        let textSize = 18;
        CTX.font = `bold ${textSize}px sans`;
        CTX.textBaseline = "top";
        let texto = (`Pontuação: ${pontuacao} Vidas: ${smile.vidinha}`);
        let textMetric = CTX.measureText(texto);       
        CTX.fillStyle = "#fff";
        CTX.fillText(
            texto,
            CANVAS.width / 2 - textMetric.width / 2,
            CANVAS.height / 10 - textSize
        )
        // CTX.fillText(
        //     texto1,
        //     CANVAS.width / 2 - textMetric.width / 2,
        //     CANVAS.height / 10 - textSize
        // )

        //se morrer cancela animaçao, se nao ele ta vivo 
        if (gameover) {
            cancelAnimationFrame(mortinho)
        } else mortinho = requestAnimationFrame(loop)

    }, 1000 / FRAMES)

}



export { init }
