/**
 * Created by Tiago on 11/07/2014.
 */

/**
 * @param {GameEngine} engine THE GameEngine should be EVERYWHERE! =D
 */
function Animation(engine) {
    this.engine = engine;
    this.sprites = [];
    this.spritesToRelease = [];

    this.shouldRun = false;
    this.lastTime = new Date().getTime();
}

Animation.prototype = {
    addSprite: function(sprite) {
        this.sprites.push(sprite);
        sprite.animation = this;
    },
    isRunning: function() {
        return this.shouldRun;
    },
    start: function() {
        this.shouldRun = true;
        this.engine.lastCycle = 0;
        this.lastTime = 0;

        this.nextFrame();
    },
    stop: function() {
        this.shouldRun = false;
    },
    nextFrame: function() {
        if (!this.shouldRun)
            return;

        var now = new Date().getTime();
        if (this.engine.lastCycle == 0)
            this.engine.lastCycle = now;
        this.engine.timeSinceLastCycle = now - this.engine.lastCycle;

        this.engine.canvasHelper.reDraw();

        this.engine.executeKeyboardEvents();

        for (var i in this.sprites)
            this.sprites[i].update();

        for (var i in this.sprites)
            this.sprites[i].draw();

        this.createNewEnemy();

        this.engine.collider.process();

        this.processSpritesToRelease();

        this.engine.lastCycle = now;
        var animation = this;
        requestAnimationFrame(function() {
            animation.nextFrame();
        });
    },
    createNewEnemy: function() {
        var now = new Date().getTime();
        var timeSinceLast = now - this.lastTime;

        if (timeSinceLast > 1000) {
            this.engine.addSprite(new Enemy(this.engine, ImageLoader.IMAGES.ENEMY_KOARINO));
            this.lastTime = now;
            this.engine.player.score += 10;
        }
    },
    processSpritesToRelease: function() {
        var newSprites = [];

        for (var i in this.sprites) {
            if (this.spritesToRelease.indexOf(this.sprites[i]) == -1)
                newSprites.push(this.sprites[i]);
        }

        this.spritesToRelease = [];
        this.sprites = newSprites;
    },
    releaseSprite: function(sprite) {
        this.spritesToRelease.push(sprite);
    }
};