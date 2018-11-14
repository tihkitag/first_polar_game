/**
 * Created by Tiago on 12/07/2014.
 */

function Ammo(engine) {
    this.engine = engine;
    this.x = 0;
    this.y = 0;

    this.speedX = 0;
    this.speedY = 0;

    this.color = 'black';
    this.radius = 10;
}

Ammo.prototype = {
    update: function () {
        this.x += this.speedX;
        this.y += this.speedY;
    },

    draw: function () {
        this.engine.canvasHelper.save();

        this.engine.canvasHelper.fillStyle(this.color);
        this.engine.canvasHelper.drawFullArc(this.x, this.y, this.radius);

        this.engine.canvasHelper.restore();
    }
}