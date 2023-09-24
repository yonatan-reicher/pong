ig.module(
    'game.entities.player-attack'
)
.requires(
    'impact.entity',
)
.defines(function(){

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const animations = [
    [ 'X', 0.1, [158, 159] ],
    [ 'dot', 0.1, [157] ],
];

const lifeTime = 0.2;

EntityPlayerAttack = ig.Entity.extend({
    size: {x: 18, y: 18},
    collides: ig.Entity.COLLIDES.NONE,
    animSheet: new ig.AnimationSheet( 'media/kenney_pixel-platformer/Tilemap/tiles_packed.png', 18, 18 ),
    bounciness: 1,
    gravityFactor: 0.1,
    friction: {x: 1500, y: 1000},

    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim( ...animations.random() );
        this.currentAnim.flip.x = randomInt(0, 1);
        this.vel.x = randomInt(200, 300) * (settings.right ? 1 : -1);
        this.vel.y = randomInt(100, 200) * (randomInt(0, 1) ? 1 : -1);
        this.vel.x += settings.relativeVel.x;
        this.vel.y += settings.relativeVel.y;
    },

    update: function() {
        this.currentAnim.alpha = this.currentAnim.alpha - (ig.system.tick / lifeTime);
        if (this.currentAnim.alpha <= 0) {
            this.kill();
        }
        this.parent();
    }
});

});
