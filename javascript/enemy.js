/**
 * Created by Tiago on 12/07/2014.
 */

Enemy.RIGHT = -1;
Enemy.LEFT = +1;
Enemy.NO_MOVING = 0;

/**
 * @param {GameEngine} engine THE GameEngine should be EVERYWHERE! =D
 * @param {Image} sheet Enemy image
 */
function Enemy(engine, sheet) {
    this.engine = engine;
    this.sheet = new Spritesheet(this.engine, sheet, 1, 1, 60);

    this.x = GameEngine.RANDOM(this.sheet.width(), this.engine.canvasHelper.width());
    this.y = -this.sheet.height() * 2;

    this.speed = GameEngine.RANDOM(500, 900);
    this.distance = 0;

    this.xSpeed = GameEngine.RANDOM(200, 400);
    this.xDistance = 0;

    this.side = Enemy.LEFT;
    this.lastSideChange = 0;
    this.maxSide = GameEngine.RANDOM(100, 500);
}

Enemy.prototype = {
    update: function() {
        this.y += this.distance;

        if (this.y > this.engine.canvasHelper.height())
            this.engine.releaseSprite(this);

        this.distance = this.speed * this.engine.timeSinceLastCycle / 1000;

        this.x += (this.xDistance * this.side);

        if (this.lastSideChange > this.maxSide || this.x > this.engine.canvasHelper.width() || this.x < 0) {
            this.lastSideChange = 0;
            this.side *= -1;
        }
        
        this.xDistance = this.xSpeed * this.engine.timeSinceLastCycle / 1000;
        this.lastSideChange += this.xDistance;
    },
    draw: function() {
        this.engine.canvasHelper.save();

        this.sheet.draw(this.x, this.y);

        this.engine.canvasHelper.restore();
    },
    
    colliderRects: function() {
        var rects = [
            {x: this.x + 5, y: this.y + 7, width: 51 - 5, height: 52 - 7},
            {x: this.x + 18, y: this.y + 55, width: 38 - 18, height: 69 - 55}
        ];

        if (this.engine.debug)
            for (var r in rects) {
                this.engine.canvasHelper.strokeStyle('yellow');
                this.engine.canvasHelper.strokeRect(rects[r].x, rects[r].y, rects[r].width, rects[r].height);
                
                var stats = [
                    "   x:" + this.x,
                    "   y:" + this.y,
                    " dst:" + this.distance,
                    "xdst:" + this.xDistance,
                    "msid:" + this.maxSide,
                    "lsts:" + this.lastSideChange
                ];
                
                this.engine.canvasHelper.messageStat(this, stats);
            }

        return rects;
    },
    collidedWith: function(sprite) {
        if (sprite instanceof Projectile) {
            this.engine.releaseSprite(this);
            this.engine.releaseSprite(sprite);

            new Boom(this.engine, this, ImageLoader.IMAGES.ANIMATION_BOOM);
            this.engine.player.score += 100;
        }
    }
};