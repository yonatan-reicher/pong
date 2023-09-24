ig.module(
    'game.entities.paddle'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityPaddle = ig.Entity.extend({
    size: {x: 16, y: 32},
    collides: ig.Entity.COLLIDES.FIXED,
    animSheet: new ig.AnimationSheet( 'media/paddle.png', 16, 32 ),
    gravityFactor: 0,

    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim( 'idle', 1, [0] );
    },

    update: function() {
        this.parent();
    },
});

});
