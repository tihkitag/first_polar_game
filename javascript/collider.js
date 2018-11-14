/**
 * Created by Tiago on 12/07/2014.
 */

/**
  * @param {GameEngine} engine THE GameEngine should be EVERYWHERE! =D
  */
function Collider(engine) {
    this.engine = engine;

    this.sprites = [];
    this.spritesToRelease = [];
    this.whenColliding = null;
}

Collider.prototype = {
    addSprite: function(sprite) {
        this.sprites.push(sprite);
        sprite.collider = this;
    },
    uniqueString: function(sprite) {
        var unique = '';

        var rects = sprite.colliderRects();
        for (var r in rects) {
            unique += 'x:' + rects[r].x + ',';
            unique += 'y:' + rects[r].y + ',';
            unique += 'l:' + rects[r].width + ',';
            unique += 'a:' + rects[r].height + '\n';
        }

        return unique;
    },
    process: function() {
        var alreadyTested = new Object();

        for (var sprite1 in this.sprites)
            for (var sprite2 in this.sprites) {
                if (sprite1 == sprite2)
                    continue;

                var idSprite1 = this.uniqueString(this.sprites[sprite1]);
                var idSprite2 = this.uniqueString(this.sprites[sprite2]);

                if (!alreadyTested[idSprite1])
                    alreadyTested[idSprite1] = [];
                if (!alreadyTested[idSprite2])
                    alreadyTested[idSprite2] = [];

                if (!(alreadyTested[idSprite1].indexOf(idSprite2) >= 0
                        || alreadyTested[idSprite2].indexOf(idSprite1) >= 0)) {
                    this.detectCollision(this.sprites[sprite1], this.sprites[sprite2]);
                    alreadyTested[idSprite1].push(idSprite2);
                    alreadyTested[idSprite2].push(idSprite1);
                }
            }

        this.processSpritesToRelease();
    },
    detectCollision: function(sprite1, sprite2) {
        var spriteOneRects = sprite1.colliderRects();
        var spriteTwoRects = sprite2.colliderRects();

        colliders:
                for (var s1 in spriteOneRects)
            for (var s2 in spriteTwoRects)
                if (this.hasCollision(spriteOneRects[s1], spriteTwoRects[s2])) {
                    sprite1.collidedWith(sprite2);
                    sprite2.collidedWith(sprite1);

                    if (this.whenColliding)
                        this.whenColliding(sprite1, sprite2);

                    break colliders;
                }
    },
    hasCollision: function(rect1, rect2) {
        return (
                ((rect1.x + rect1.width) > rect2.x
                        && rect1.x < (rect2.x + rect2.width))
                &&
                ((rect1.y + rect1.height) > rect2.y
                        && rect1.y < (rect2.y + rect2.height))
                );
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

    releaseSprite: function (sprite) {
        this.spritesToRelease.push(sprite);
    }
};