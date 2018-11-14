/**
 * Created by Tiago on 13/07/2014.
 */

/**
 * @param {GameEngine} engine THE GameEngine should be EVERYWHERE! =D
 * @param {Player} player Player Sprite
 * @param {Image} sheet HUD image for LIFES
 */
function HUD(engine, player, sheet) {
    this.engine = engine;
    this.player = player;
    this.sheet = new Spritesheet(this.engine, sheet, 1, 1, 60);
}

HUD.prototype = {
    update: function() {

    },
    draw: function() {
        this.engine.canvasHelper.save();
        this.engine.context.scale(0.5, 0.5);

        var x = 20;
        var y = 20;

        for (var i = 0; i < this.player.lifes; i++)
            this.sheet.draw(x + (i * 40), y);

        this.engine.canvasHelper.restore();

        this.engine.canvasHelper.save();

        this.engine.canvasHelper.message(this.player.score + ' PONTOS', 50, 200, 70);

        this.engine.canvasHelper.restore();
    },
    colliderRects: function() {
    },
    collidedWith: function(sprite) {
    }
};