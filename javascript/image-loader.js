/**
 * Created by Tiago on 13/07/2014.
 */

ImageLoader.IMAGES = {
    PLAYER_POLOR: 'polar',
    ENEMY_KOARINO: 'koarino',
    BACKGROUND_SPACE: 'bg-space',
    BACKGROUND_STARS: 'bg-stars',
    BACKGROUND_CLOUD: 'bg-clouds',
    ANIMATION_BOOM: 'boom'
};

ImageLoader.TOTAL_IMAGES = 0;
ImageLoader.LOADED = 0;

ImageLoader.LOADING = null;
ImageLoader.INITIALIZE_FUNCTION = null;

/**
  * @param {function} loading Call this when still loading
  * @param {function} initialize and this when done
  */
function ImageLoader(loading, initialize) {
    ImageLoader.LOADING = loading;
    ImageLoader.INITIALIZE_FUNCTION = initialize;
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
            ImageLoader.INITIALIZE_FUNCTION();
        ImageLoader.LOADING(ImageLoader.LOADED, ImageLoader.TOTAL_IMAGES);
    }
};