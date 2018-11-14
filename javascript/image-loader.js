/**
 * Created by Tiago on 13/07/2014.
 */

ImageLoader.TOTAL_IMAGES = 0;
ImageLoader.LOADED = 0;

ImageLoader.LOADING = null;
ImageLoader.INITIALIZE_FUNCTION = null;

ImageLoader.IMAGES = {
    PLAYER_POLOR: 'polar-sheet',
    ANIMATION_BOOM: 'boom',
    HUD_LIFES: 'polar',
    ENEMY_KOARINO: 'koarino',
    BACKGROUND_SPACE: 'bg-space',
    BACKGROUND_STARS: 'bg-stars',
    BACKGROUND_CLOUD: 'bg-clouds'
};

ImageLoader.INITIALIZED = function() {
    var space = new Background(ImageLoader.ENGINE, ImageLoader.IMAGES.BACKGROUND_SPACE, 60);
    var stars = new Background(ImageLoader.ENGINE, ImageLoader.IMAGES.BACKGROUND_STARS, 150);
    var clouds = new Background(ImageLoader.ENGINE, ImageLoader.IMAGES.BACKGROUND_CLOUD, 500);

    var polor = new Player(ImageLoader.ENGINE, ImageLoader.IMAGES.PLAYER_POLOR);
    var hud = new HUD(ImageLoader.ENGINE, polor, ImageLoader.IMAGES.HUD_LIFES);

    ImageLoader.ENGINE.addSprite(space);
    ImageLoader.ENGINE.addSprite(stars);
    ImageLoader.ENGINE.addSprite(clouds);

    ImageLoader.ENGINE.addPlayer(polor, hud);

    ImageLoader.ENGINE.showPlayLink();
};

ImageLoader.LOADING = function() {
    ImageLoader.ENGINE.canvasHelper.save();

    var size = ImageLoader.LOADED / ImageLoader.TOTAL_IMAGES;

    ImageLoader.ENGINE.canvasHelper.clear();

    ImageLoader.ENGINE.canvasHelper.fillStyle('red');
    ImageLoader.ENGINE.canvasHelper.fillRect(0, 0, ImageLoader.ENGINE.canvasHelper.width() * size, ImageLoader.ENGINE.canvasHelper.height() / 100);

    ImageLoader.ENGINE.canvasHelper.message("by: TIAGO COUTO", 10, 10, 500);
    ImageLoader.ENGINE.canvasHelper.message("    FABIANE M KITAGAWA", 10, 10, 515);
    ImageLoader.ENGINE.canvasHelper.message("    POLAR", 10, 10, 530);

    ImageLoader.ENGINE.canvasHelper.restore();
};

/**
 * @param {GameEngine} engine THE GameEngine should be EVERYWHERE! =D
 */
function ImageLoader(engine) {
    ImageLoader.ENGINE = engine;
}

ImageLoader.prototype = {
    load: function() {
        for (var i in ImageLoader.IMAGES) {
            ImageLoader.TOTAL_IMAGES++;

            var img = new Image();
            img.src = 'image/' + ImageLoader.IMAGES[i] + '.png';
            img.onload = this.loading;

            ImageLoader.IMAGES[i] = img;
        }
    },
    loading: function() {
        if (++ImageLoader.LOADED == ImageLoader.TOTAL_IMAGES)
            ImageLoader.INITIALIZED();

        ImageLoader.LOADING();
    }
};