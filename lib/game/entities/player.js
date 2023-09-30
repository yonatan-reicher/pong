ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity',
    'game.entities.player-attack',
)
.defines(function(){

const PLAYER_SPEED = 120
const PLAYER_JUMP = 340
    
EntityPlayer = ig.Entity.extend({
    size: { x: 24, y: 24 },
    collides: ig.Entity.COLLIDES.PASSIVE,
    maxVel: { x: 1000000, y: 1000000 },
    animSheet: new ig.AnimationSheet( 'media/kenney_pixel-platformer/Tilemap/characters_packed.png', 24, 24 ),

    lookingRight: true,

    init: function( x, y, settings ) {
        this.parent( x, y, settings );
        this.addAnim( 'idle', 1, [0] );
        this.addAnim( 'move', 0.1, [0, 1] );
        this.addAnim( 'jump', 1, [1] );
        this.wahSound = new ig.Sound( 'media/wah.*' );
        this.wahSound.volume = 0.5;
    },

    update: function() {
        this.move();
        
        if ( ig.input.pressed('attack') ) {
            this.attack();
        }

        this.parent();
    },

    move: function() {
        if ( ig.input.state('left') ) {
            this.vel.x = -PLAYER_SPEED;
            this.currentAnim = this.anims.move;
            this.lookingRight = false;
        }
        else if ( ig.input.state('right') ) {
            this.vel.x = PLAYER_SPEED;
            this.currentAnim = this.anims.move;
            this.lookingRight = true;
        }
        else {
            this.vel.x = 0;
            this.currentAnim = this.anims.idle;
        }

        if (!this.standing) {
            this.currentAnim = this.anims.jump;
        }

        if ( ig.input.pressed('jump') && this.standing ) {
            this.vel.y = -PLAYER_JUMP;
        }

        this.currentAnim.flip.x = this.lookingRight;
        ig.game.screen.x = this.pos.x - ig.system.width / 2;
    },

    attack: function() {
        // Spawn some particles
        for (let i = 0; i < 4; i++) {
            ig.game.spawnEntity( EntityPlayerAttack, this.pos.x, this.pos.y, {
                right: this.lookingRight, relativeVel: this.vel
            } );
        }

        const puck = ig.game.getEntitiesByType(EntityPuck)[0];
        if (puck && puck.touches(this)) {
            // puck.vel.x = this.lookingRight ? 200 : -200;
            // Always send the puck to the right
            puck.vel.x = PUCK_SPEED.x;
            puck.vel.y = puck.vel.y > 0 ? -PUCK_SPEED.y : PUCK_SPEED.y;
            puck.setP1();
        }

        // Play a sound
        this.wahSound.play();
    },
});

});
