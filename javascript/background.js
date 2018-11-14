/**
 * Created by Tiago on 12/07/2014.
 */

/**
  * @param {GameEngine} engine THE GameEngine should be EVERYWHERE! =D
  * @param {Image} image Background image
  * @param {Number} speed Scroll speed
  */
function Background(engine, image, speed) {
    this.engine = engine;
    this.image = image;

    this.junctionPoint = 0;
    this.speed = speed;
}

Background.prototype = {
    update: function() {
        this.junctionPoint += this.speed * this.engine.timeSinceLastCycle / 1000;

        if (this.junctionPoint > this.image.height)
            this.junctionPoint = 0;
    },
    draw: function() {
        var xNeeded = this.engine.canvasHelper.width() / this.image.width;

        for (var i = 0; i <= xNeeded; i++) {
            var x = this.image.width * i;
            var y = this.junctionPoint - this.image.height;
            this.engine.context.drawImage(this.image, x, y, this.image.width, this.image.height);
            var y = this.junctionPoint;
            this.engine.context.drawImage(this.image, x, y, this.image.width, this.image.height);
        }
    },
    colliderRects: function() {
        return [
            {}
        ];
    }
};