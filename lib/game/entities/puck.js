ig.module(
    'game.entities.puck'
)
.requires(
    'impact.entity'
)
.defines(function(){

PUCK_SPEED = { x: 200, y: 200 };

EntityPuck = ig.Entity.extend({
    size: {x: 18, y: 18},
    collides: ig.Entity.COLLIDES.PASSIVE,
    animSheet: new ig.AnimationSheet( 'media/ball.png', 18, 18 ),
    bounciness: 1,
    gravityFactor: 0,

    owner: 0,

    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim( 'netural', 1, [0] );
        this.addAnim( 'p1', 1, [1] );
        this.addAnim( 'p2', 1, [2] );
        this.vel.x = PUCK_SPEED.x;
        this.vel.y = PUCK_SPEED.y;
    },

    setP1: function() {
        this.currentAnim = this.anims.p1;
        this.owner = 1;
    },

    setP2: function() {
        this.currentAnim = this.anims.p2;
        this.owner = 2;
    },
});

});
