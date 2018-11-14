/**
 * Created by Tiago on 12/07/2014.
 */

/**
 * @param {Number} MIN Min value
 * @param {Number} MAX well... max value? =]
 */
GameEngine.RANDOM = function(MIN, MAX) {
    return MIN
            + Math.floor(Math.random()
                    * MAX - MIN + 1);
};

/**
 * @param {String} canvasName THE GameEngine should be EVERYWHERE! =D
 * @param {HTMLDocument} element HTML element (pass null to be DOCUMENT)
 * @param {Boolean} debug It will show the rectangles borders
 */
function GameEngine(canvasName, element, debug) {
    this.debug = debug;

    this.canvas = null;
    this.context = null;
    this.canvasName = canvasName;
    this.element = element;

    this.keyboard = new Keyboard(this);
    this.animation = new Animation(this);
    this.collider = new Collider(this);
    this.canvasHelper = null;

    this.lastCycle = 0;
    this.timeSinceLastCycle = 0;

    this.player = null;

    return this.init();
}

GameEngine.prototype = {
    init: function() {
        if (this.canvasName == null)
            this.canvasName = "canvas";
        if (this.element == null)
            this.element = document;

        this.canvas = this.element.getElementById(this.canvasName);
        this.context = this.canvas.getContext("2d");

        var engine = this;
        this.addKeyboardShootEvent(Keyboard.ENTER, function() {
            if (engine.animation.isRunning())
                engine.stopAnimation();
            else
                engine.startAnimation();
        });

        this.canvasHelper = new CanvasHelper(this);
        this.canvasHelper.clear();
        return this;
    },
    initialize: function() {
        this.keyboard.activate();
    },
    isRunning: function() {
        return this.animation.isRunning();
    },
    startAnimation: function() {
        this.animation.start();
    },
    stopAnimation: function() {
        this.animation.stop();

        this.canvasHelper.save();

        this.canvasHelper.messageSimple(" ~ PAUSADO ~ ");

        this.canvasHelper.restore();
    },
    gameOver: function() {
        this.stopAnimation();
        this.keyboard.activated = false;

        MUSIC.pause();
        MUSIC.currentTime = 0.0;

        this.canvasHelper.save();

        this.canvasHelper.fillStyle('gray');
        this.canvasHelper.fillRect(0, 0, this.canvasHelper.width(), this.canvasHelper.height());

        this.canvasHelper.message(this.player.score + ' PONTOS', 50, 200, 70);

        this.canvasHelper.message(" GAME OVER ! D= ",  50, 20, 190);

        this.canvasHelper.message("by: TIAGO COUTO", 10, 10, 500);
        this.canvasHelper.message("    FABIANE M KITAGAWA", 10, 10, 515);
        this.canvasHelper.message("    POLAR", 10, 10, 530);

        this.canvasHelper.restore();

        this.showPlayLink();

        this.player.lifes = 3;
        this.player.score = 0;
        this.player.reposition();
        this.addSprite(this.player);

        this.releaseAllEnemys();
        this.lastCycle = 0;
        this.animation.lastTime = 0;
    },
    addKeyboardEvent: function(key, action) {
        this.keyboard.actions[key] = action;
    },
    addKeyboardShootEvent: function(key, action) {
        this.keyboard.shootActions[key] = action;
    },
    addKeyboardReleaseEvent: function(action) {
        this.keyboard.releaseActions.push(action);
    },
    executeKeyboardEvents: function() {
        this.keyboard.executeEvents();
    },
    addSprite: function(sprite) {
        this.animation.addSprite(sprite);
        this.collider.addSprite(sprite);
    },
    addPlayer: function(player, hud) {
        this.player = player;

        this.addSprite(player);
        this.addSprite(hud);
    },
    releaseAllEnemys: function() {
        for (var e in this.animation.sprites)
            if (this.animation.sprites[e] instanceof Enemy)
                this.releaseSprite(this.animation.sprites[e]);
    },
    releaseSprite: function(sprite) {
        this.animation.releaseSprite(sprite);
        this.collider.releaseSprite(sprite);
    },
    showPlayLink: function() {
        this.element.getElementById('play').style.display = 'block';
    }
};