/**
 * Created by Tiago on 12/07/2014.
 */

Player.LEFT = -1;
Player.RIGHT = +1;
Player.UP = -1;
Player.DOWN = +1;
Player.NO_MOVING = 0;

/**
 * @param {GameEngine} engine THE GameEngine should be EVERYWHERE! =D
 * @param {Image} sheet Sprite image 1 x 1
 */
function Player(engine, sheet) {
    this.engine = engine;

    this.sheetLines = 1;
    this.sheetColumns = 3;
    this.sheet = new Spritesheet(this.engine, sheet, this.sheetLines, this.sheetColumns, 120);

    this.reposition();

    this.speed = this.engine.canvasHelper.width() / 3.5;
    this.distance = 0;

    this.lifes = 3;
    this.score = 0;

    this.registerEvents();
}

Player.prototype = {
    registerEvents: function() {
        var player = this;
        var engine = this.engine;
        this.engine.addKeyboardEvent(Keyboard.LEFT, function() {
            if (player.x - player.distance <= 0)
                return;

            player.directionX = Player.LEFT;
            player.directionY = Player.NO_MOVING;

            player.x -= player.distance;
        });
        this.engine.addKeyboardEvent(Keyboard.RIGHT, function() {
            if (player.x + player.sheet.width() / player.sheetColumns
                    + player.distance >= engine.canvasHelper.width())
                return;

            player.directionX = Player.RIGHT;
            player.directionY = Player.NO_MOVING;

            player.x += player.distance;
        });
        this.engine.addKeyboardEvent(Keyboard.UP, function() {
            if (player.y - player.distance <= 0)
                return;

            player.directionX = Player.NO_MOVING;
            player.directionY = Player.UP;

            player.y -= player.distance / 2;
        });
        this.engine.addKeyboardEvent(Keyboard.DOWN, function() {
            if (player.y + player.sheet.height() / player.sheetLines
                    + player.distance >= engine.canvasHelper.height())
                return;

            player.directionX = Player.NO_MOVING;
            player.directionY = Player.DOWN;

            player.y += player.distance / 2;
        });
        this.engine.addKeyboardShootEvent(Keyboard.SPACE_BAR, function() {
            if (player.engine.isRunning())
                player.shoot();
        });
        this.engine.addKeyboardReleaseEvent(function() {
        });
    },
    reposition: function() {
        this.x = this.engine.canvasHelper.width() / 2 - (this.sheet.width() / 2);
        this.y = this.engine.canvasHelper.height() - (this.sheet.height());

        this.directionX = Player.NO_MOVING;
        this.directionY = Player.NO_MOVING;
    },
    update: function() {
        this.distance = this.speed * this.engine.timeSinceLastCycle / 1000;
        this.sheet.nextFrame();
    },
    draw: function() {
        this.engine.canvasHelper.save();

        this.sheet.draw(this.x, this.y);

        this.engine.canvasHelper.restore();
    },
    shoot: function() {
        var projectile = new Projectile(this.engine, this);
        this.engine.addSprite(projectile);
    },
    colliderRects: function() {
        var rects = [
            {x: this.x + 5, y: this.y + 3, width: 32 - 5, height: 74 - 3},
            {x: this.x + 19, y: this.y + 74, width: 29 - 19, height: 106 - 74}
        ];

        if (this.engine.debug)
            for (var r in rects) {
                this.engine.canvasHelper.strokeStyle('red');
                this.engine.canvasHelper.strokeRect(rects[r].x, rects[r].y, rects[r].width, rects[r].height);
            }

        return rects;
    },
    collidedWith: function(sprite) {
        if (sprite instanceof Enemy) {
            this.engine.deactivateKeyboard();
            this.engine.releaseSprite(sprite);
            this.engine.releaseSprite(this);

            new Boom(this.engine, sprite, ImageLoader.IMAGES.ANIMATION_BOOM);

            var engine = this.engine;
            var player = this;
            new Boom(engine, this, ImageLoader.IMAGES.ANIMATION_BOOM, function() {
                if (--player.lifes < 0) {
                    engine.gameOver();
                    return;
                }

                engine.addSprite(player);
                player.reposition();
                engine.activateKeyboard();
            });
        }
    }
};