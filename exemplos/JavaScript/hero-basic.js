/**
 * Created by Tiago on 12/07/2014.
 */

Hero.LEFT = -1;
Hero.RIGHT = +1;
Hero.UP = -1;
Hero.DOWN = +1;
Hero.NO_MOVING = 0;

function Hero(engine, sheet) {
    this.engine = engine;
    this.sheet = new Spritesheet(this.engine, sheet, 1, 1, 60);

    this.x = this.engine.canvasHelper.width() / 2;
    this.y = this.engine.canvasHelper.height() / 10;

    this.directionX = Hero.NO_MOVING;
    this.directionY = Hero.NO_MOVING;

    this.moving = false;

    this.speed = 10;

    this.registerEvents();
}

Hero.prototype = {
    registerEvents: function () {
        var hero = this;
        this.engine.addKeyboardEvent(Keyboard.LEFT, function () {
            if (hero.x <= 0) return;

            hero.directionX = Hero.LEFT;
            hero.directionY = Hero.NO_MOVING;

            hero.moving = true;
            hero.sheet.nextFrame();

            hero.x -= hero.speed;
        });
        this.engine.addKeyboardEvent(Keyboard.RIGHT, function () {
            if (hero.x + 50 >= engine.canvasHelper.width()) return;

            hero.directionX = Hero.RIGHT;
            hero.directionY = Hero.NO_MOVING;

            hero.moving = true;
            hero.sheet.nextFrame();

            hero.x += hero.speed;
        });
        this.engine.addKeyboardEvent(Keyboard.UP, function () {
            if (hero.y <= 0) return;

            hero.directionX = Hero.NO_MOVING;
            hero.directionY = Hero.UP;

            hero.moving = true;
            hero.sheet.nextFrame();

            hero.y -= hero.speed;
        });
        this.engine.addKeyboardEvent(Keyboard.DOWN, function () {
            if (hero.y + 50 >= engine.canvasHelper.height()) return;

            hero.directionX = Hero.NO_MOVING;
            hero.directionY = Hero.DOWN;

            hero.moving = true;
            hero.sheet.nextFrame();

            hero.y += hero.speed;
        });
        this.engine.addKeyboardShootEvent(Keyboard.SPACE_BAR, function () {
            hero.shoot();
        });
        this.engine.addKeyboardReleaseEvent(function() {
            hero.moving = false;
        });
    },

    update: function () {
    },

    draw: function () {
        this.engine.canvasHelper.save();

        this.sheet.draw(this.x, this.y);

        this.engine.canvasHelper.restore();
    },

    shoot: function () {
        var ammo = new Ammo(this.engine);

        ammo.x = this.x + this.getAmmoPositionBasedOnDirection(this.direction);
        ammo.y = this.y + this.getAmmoPositionBasedOnDirection(this.directionY);
        ammo.radius = 2;
        ammo.color = 'red';

        ammo.speedX = this.directionX * 20;
        ammo.speedY = this.directionY * 20;

        this.engine.addSprite(ammo);
    },

    getAmmoPositionBasedOnDirection: function (direction) {
        if (direction == -1)
            return 0;
        else if (direction == 0)
            return 25;
        else
            return 50;
    }
}