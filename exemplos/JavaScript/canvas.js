/**
 * Created by Tiago on 12/07/2014.
 */

function Canvas(canvasName, element) {
    this.canvas = null;
    this.context = null;
    this.canvasName = canvasName;
    this.element = element;

    return this.init();
}

Canvas.prototype = {
    init: function () {
        if (this.canvasName == null) this.canvasName = "canvas";
        if (this.element == null) this.element = document;

        this.canvas = this.element.getElementById(this.canvasName);
        this.context = this.canvas.getContext("2d");

        this.clear();

        return this;
    },

    clear: function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    width: function () {
        return this.canvas.width;
    },

    height: function () {
        return this.canvas.height;
    },

    fillRect: function (x, y, largura, altura) {
        this.context.fillRect(x, y, largura, altura);
    },

    fillStyle: function (color) {
        this.context.fillStyle = color;
    },

    drawFullArc: function (x, y, radius) {
        this.drawArc(x, y, radius, 0, Math.PI*2);
    },

    drawArc: function (x, y, radius, start, end) {
        this.context.beginPath();
        this.context.arc(x, y, radius, start, end);
        this.context.fill();
    },

    save: function () {
        this.context.save();
    },

    restore: function () {
        this.context.restore();
    }
}