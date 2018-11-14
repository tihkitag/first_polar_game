/**
 * Created by Tiago on 12/07/2014.
 */

Keyboard.ENTER = 13;
Keyboard.SPACE_BAR = 32;
Keyboard.LEFT = 37;
Keyboard.UP = 38;
Keyboard.RIGHT = 39;
Keyboard.DOWN = 40;

/**
 * @param {GameEngine} engine THE GameEngine should be EVERYWHERE! =D
 * @param {HTMLDocument} element HTML element (pass nothing to be DOCUMENT)
 */
function Keyboard(engine, element) {
    this.engine = engine;
    this.activated = false;

    this.element = document;
    if (element != null)
        this.element = element;

    this.actions = [];
    this.shootActions = [];
    this.releaseActions = [];

    this.presseds = [];
    this.shoots = [];

    this.keyDown();
    this.keyUp();
}

Keyboard.prototype = {
    activate: function() {
        this.activated = true;
    },
    deactivate: function() {
        this.activated = false;
    },
    keyDown: function() {
        var keyboard = this;
        this.element.addEventListener('keydown', function(event) {
            if (!keyboard.activated)
                return;

            var key = event.keyCode;
            keyboard.presseds[key] = true;

            keyboard.executeShootAction(keyboard, key);
        });
    },
    keyUp: function() {
        var keyboard = this;
        this.element.addEventListener('keyup', function(event) {
            var key = event.keyCode;
            keyboard.presseds[key] = false;
            keyboard.shoots[key] = 0;

            for (var action in keyboard.releaseActions)
                keyboard.releaseActions[action]();
        });
    },
    executeShootAction: function(keyboard, key) {
        if (!keyboard.shoots[key] && keyboard.shootActions[key])
            keyboard.shoots[key] = 1;

        if (this.hasShoot(key)) {
            this.shoots[key]++;
            this.shootActions[key]();
        }
    },
    executeEvents: function() {
        for (var key in this.actions)
            if (this.isPressed(key))
                this.actions[key]();
    },
    isPressed: function(key) {
        return this.presseds[key];
    },
    hasShoot: function(key) {
        return this.shoots[key] == 1;
    }
};