/**
 * Created by Tiago on 12/07/2014.
 */

/**
 * @param {GameEngine} engine THE GameEngine should be EVERYWHERE! =D
 * @param {Image} sheet Sprite image
 * @param {Number} lines Sheet number of lines
 * @param {Number} columns Sheet number of columns
 * @param {Number} interval Animation interval in miliseconds
 */
function Spritesheet(engine, sheet, lines, columns, interval) {
    this.engine = engine;

    this.sheet = sheet;

    this.lines = lines;
    this.columns = columns;

    this.line = 0;
    this.column = 0;

    this.interval = interval;
    this.cycleEnd = null;
}

Spritesheet.prototype = {
    nextFrame: function() {
        var now = new Date().getTime();
        if (!this.last)
            this.last = now;
        if (now - this.last < this.interval)
            return;

        if (++this.column == this.columns) {
            this.column = 0;
            if (this.cycleEnd)
                this.cycleEnd();
        }

        this.last = now;
    },
    draw: function(x, y) {
        var frameWidth = this.sheet.width / this.columns;
        var frameHeight = this.sheet.height / this.lines;

        this.engine.context.drawImage(
                this.sheet,
                (frameWidth * this.column), (frameHeight * this.line),
                frameWidth, frameHeight,
                x, y,
                frameWidth, frameHeight);
    },
    width: function() {
        return this.sheet.width;
    },
    height: function() {
        return this.sheet.height;
    }
};