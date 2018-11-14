/**
 * Created by Tiago on 11/07/2014.
 */

function Animation(engine) {
    this.engine = engine;
    this.sprites = [];
    this.shouldRun = false;
}

Animation.prototype = {
    addSprite: function(sprite) {
        this.sprites.push(sprite);
    },
    start: function() {
        this.shouldRun = true;
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

        this.engine.canvasHelper.clear();
        this.engine.executeKeyboardEvents();

        for (var i in this.sprites)
            this.sprites[i].update();

        for (var i in this.sprites)
            this.sprites[i].draw();

        this.engine.lastCycle = now;
        var animation = this;
        requestAnimationFrame(function() {
            animation.nextFrame();
        });
    }
}