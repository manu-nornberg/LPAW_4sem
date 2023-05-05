export default class Circle{

    //fazer o construtor do circulo, adicionando os parametros
    constructor(x, y, size, speed, color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.color = color;
    }

    //cria a funcao desenha
    draw(ctx){
        this.circ(ctx,
            this.x,
            this.y,
            this.size,
            this.speed,
            this.color)
    }

    //o negocio do circulo, faz o circulo e papa
    circ(ctx, pos_x, pos_y, radius, color, fill = false){
        ctx.stokeStyle = color;
        ctx.beginPath();
        ctx.arc(pos_x, pos_y, radius, 0, Math.PI*2);
        ctx.stroke();
        if(fill){
            ctx.fillStyle = fill
            ctx.fill()
        }
    }
    
    //colisao do bicho
    colisao(circ) {
        return Math.abs(this.x-circ.x) < (this.size+circ.size)*1.2
                && Math.abs(this.y-circ.y) < (this.size+circ.size)*1.2
    } 
    
    //  colisao(circ) {
    //     return Math.sqrt((this.x - circ.x)^2 - (this.y - circ.y)^2) < circ.size + this.size 
    // }
     
}
