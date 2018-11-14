/**
 * Created by Tiago on 13/07/2014.
 */

/**
 * @param {GameEngine} engine THE GameEngine should be EVERYWHERE! =D
 */
function CanvasHelper(engine) {
    this.engine = engine;

    this.canvas = this.engine.canvas;
    this.context = this.engine.context;
}

CanvasHelper.prototype = {
    reDraw: function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },
    clear: function() {
        this.reDraw();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    width: function() {
        return this.canvas.width;
    },
    height: function() {
        return this.canvas.height;
    },
    fillRect: function(x, y, largura, altura) {
        this.context.fillRect(x, y, largura, altura);
    },
    fillStyle: function(color) {
        this.context.fillStyle = color;
    },
    strokeRect: function(x, y, largura, altura) {
        this.context.strokeRect(x, y, largura, altura);
    },
    strokeStyle: function(color) {
        this.context.strokeStyle = color;
    },
    messageSimple: function(message) {
        this.message(message, 50, this.width() / 4, this.height() / 2);
    },
    message: function(message, size, x, y) {
        this.fillStyle('white');
        this.strokeStyle('black');
        this.context.font = size + 'px PressStart2P';

        this.context.fillText(message, x, y);
        this.context.strokeText(message, x, y);
    },
    drawFullArc: function(x, y, radius) {
        this.drawArc(x, y, radius, 0, Math.PI * 2);
    },
    drawArc: function(x, y, radius, start, end) {
        this.context.beginPath();
        this.context.arc(x, y, radius, start, end);
        this.context.fill();
    },
    save: function() {
        this.context.save();
    },
    restore: function() {
        this.context.restore();
    }
};