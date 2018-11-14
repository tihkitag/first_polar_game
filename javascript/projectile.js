/**
 * Created by Tiago on 12/07/2014.
 */

/**
  * @param {GameEngine} engine THE GameEngine should be EVERYWHERE! =D
  * @param {Spritesheet} sprite Spritesheet
  */
function Projectile(engine, sprite) {
    this.engine = engine;
    this.sprite = sprite;

    this.width = 4;
    this.height = 20;
    this.x = this.sprite.x + ((this.sprite.sheet.width() / this.sprite.sheetColumns) / 2) - (this.width / 2) - 4;
    this.y = this.sprite.y;
    this.speed = this.sprite.speed * 4;
    this.distance = 0;

    AUDIO_PROJECTILE.currentTime = 0.0;
    AUDIO_PROJECTILE.play();
}

Projectile.prototype = {
    update: function() {
        this.y -= this.distance;

        if (this.y < -this.height)
            this.engine.releaseSprite(this);

        this.distance = this.speed * this.engine.timeSinceLastCycle / 1000;
    },
    draw: function() {
        this.engine.canvasHelper.save();

        this.engine.canvasHelper.fillStyle('black');
        this.engine.canvasHelper.fillRect(this.x, this.y, this.width, this.height);

        this.engine.canvasHelper.restore();
    },
    colliderRects: function() {
        return [
            {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            }
        ];
    },
    collidedWith: function(sprite) {
    }
};