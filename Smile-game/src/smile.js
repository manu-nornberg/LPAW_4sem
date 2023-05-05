import Circle from "./circle.js" //importando o circulo pra fazer o personagem

export default class Smile extends Circle{

    constructor(x, y, size, speed, color, vidinha){
        super(x, y, size, speed, color);
        this.status = 'Parado';
        this.vidinha = vidinha;
    }

    paint(ctx){
        // ctx.fillStyle = '000'

        this.draw(ctx)

        //os zoio do bicho
        this.circ(ctx, 
            this.x - this.size / 2.5,
            this.y - this.size / 4,
            this.size * .1, 1, 'black')

        this.circ(ctx, 
            this.x + this.size / 2.5,
            this.y - this.size / 4,
            this.size * .1, 1, 'black')
        
        //a boquinha do bicho
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.arc(this.x, this.y + this.size / 4, this.size / 2, 0, Math.PI)
        ctx.strokeStyle = 'black'
        ctx.stroke()

        // this.circ(ctx,
        //     this.x,
        //     this.y,
        //     this.size, 2, 'yellow')
    }
        
    move(limits, key){

        let movements = {
			'ArrowDown': { sx: 0, sy: this.speed },
			'ArrowUp': { sx: 0, sy: - this.speed },
			'ArrowLeft': { sx: - this.speed, sy: 0 },
			'ArrowRight': { sx: this.speed, sy: 0 },
            'Parado': { sx:0, sy: 0 }
		}

        this.status = movements[key] ? key : this.status
		
		const { sx, sy } = movements[this.status]

        this.x += sx
        this.y += sy

        this.limits(limits)
    }

    limits(limits){
        //borda dele da direita  borda do limite
        if( this.x + this.size >= limits.width ){
            this.x = limits.width - this.size
        }
        //borda dele da esquerda  borda do limite
        if( this.x - this.size <= 0 ){
            this.x = this.size
        }
        //borda dele da direita  borda do limite
        if( this.y + this.size >= limits.height ){
            this.y = limits.height - this.size
        }
        //borda dele da esquerda  borda do limite
        if( this.y - this.size <= 0 ){
            this.y = this.size
        }

    }
}

    


