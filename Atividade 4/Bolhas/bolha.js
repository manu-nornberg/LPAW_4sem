import Circle from "./circulo.js";

export default class Bolha extends Circle{
	constructor(x, y, size, speed, color) {
		super(x,y,size,speed,color)
		this.line = 1
	}

	move(limits){
		this.y +=this.speed
		this.limits(limits)
	}

	limits(limits){

		if(this.y - this.size > limits.height ){
			this.y = -2*this.size
			this.x = Math.random()*limits.width;
		}
	}

}