/**
 * Created by Tiago on 11/07/2014.
 */

function Bola(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.x = 0;
    this.y = 0;
    this.velocidadeX = 0;
    this.velocidadeY = 0;

    this.cor = 'black';
    this.raio = 10;
}

Bola.prototype = {
    update: function () {
        if (this.x < this.raio
            || this.x > this.canvas.width - this.raio)
            this.velocidadeX *= -1;

        if (this.y < this.raio
            || this.y > this.canvas.height - this.raio)
            this.velocidadeY *= -1;

        this.x += this.velocidadeX;
        this.y += this.velocidadeY;
    },

    draw: function () {
        this.context.save();

        this.context.fillStyle = this.cor;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.raio, 0, Math.PI * 2);
        this.context.fill();

        this.context.restore();
    },

    colliderRects: function () {
        return [
            {
                x: this.x - this.raio,
                y: this.y - this.raio,
                width: this.raio * 2,
                height: this.raio * 2
            }
        ];
    },

    collidedWith: function (sprite) {
        if (this.x < sprite.x)
            this.velocidadeX = - Math.abs(this.velocidadeX);
        else
            this.velocidadeX = Math.abs(this.velocidadeX);

        if (this.y < sprite.y)
            this.velocidadeY = - Math.abs(this.velocidadeY);
        else
            this.velocidadeY = Math.abs(this.velocidadeY);
    }
}