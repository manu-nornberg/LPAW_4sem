import Circle from './circle.js';

export default class Enemy extends Circle {

    //criando o construtor do circulo do inimigo
    constructor(x, y, size, speed, color) {
        super(x, y, size, speed, color);
    }


    //vai se mover no quadrante de acordo com o smile
    move(limits, smile) {
        if (this.x < smile.x)
            this.x += this.speed
        else
            this.x -= this.speed
        // if(this.y < smile.y)
            this.y += this.speed
        // else
        //     this.y -= this.speed
        this.limits(limits)
    }

    limits(limits) {
        if (this.y - this.size > limits.height) {
            this.y = -2 * this.size
            this.x = Math.random() * limits.width;
        }
    }

    
}