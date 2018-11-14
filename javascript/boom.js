/**
 * Created by Tiago on 13/07/2014.
 */

/**
 * @param {GameEngine} engine THE GameEngine should be EVERYWHERE! =D
 * @param {Player|Enemy} sprite Sprite to BOOM!
 * @param {Image} sheet Spritesheet 1 x 5
 * @param {Function} endAction Function to execute after the animation
 */
function Boom(engine, sprite, sheet, endAction) {
    this.engine = engine;
    this.sprite = sprite;
    this.endAction = endAction;
    this.sheet = new Spritesheet(engine, sheet, 1, 5, 75);

    this.x = (this.sprite.x + (this.sprite.sheet.width() / 2)) - ((this.sheet.width() / 5) / 2);
    this.y = (this.sprite.y + (this.sprite.sheet.height() / 2)) - ((this.sheet.height() / 1) / 2);

    this.engine.addSprite(this);

    var boom = this;
    this.sheet.cycleEnd = function() {
        engine.releaseSprite(boom);
        if (boom.endAction)
            boom.endAction();
    };

    AUDIO_BOOM.currentTime = 0.0;
    AUDIO_BOOM.play();
}

Boom.prototype = {
    update: function() {

    },
    draw: function() {
        this.sheet.draw(this.x, this.y);
        this.sheet.nextFrame();
    },
    colliderRects: function() {
    },
    collidedWith: function(sprite) {
    }
};