/* 
 *  : Bear Bone Technology :
 */

var MUSIC = new Audio();
MUSIC.id = "music";
MUSIC.src = 'audio/music.mp3';
MUSIC.volume = 0.5;
MUSIC.loop = true;
MUSIC.load();

var AUDIO_BOOM = new Audio();
AUDIO_BOOM.src = 'audio/boom.mp3';
AUDIO_BOOM.volume = 0.4;
AUDIO_BOOM.load();

var AUDIO_PROJECTILE = new Audio();
AUDIO_PROJECTILE.src = 'audio/projectile.mp3';
AUDIO_PROJECTILE.volume = 0.3;
AUDIO_PROJECTILE.load();