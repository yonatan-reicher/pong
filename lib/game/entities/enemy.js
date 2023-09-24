ig.module(
    'game.entities.enemy'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityEnemy = ig.Entity.extend({
    size: {x: 24, y: 24},
    collides: ig.Entity.COLLIDES.ACTIVE,
    animSheet: new ig.AnimationSheet( 'media/kenney_pixel-platformer/Tilemap/characters_packed.png', 24, 24 ),
    maxVel: { x: 1000000, y: 1000000 },

    lookingRight: true,

    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim( 'idle', 1, [2] );
        this.addAnim( 'move', 0.17, [3, 2] );
    },

    update: function() {
        this.parent();

        const puck = ig.game.getEntitiesByType(EntityPuck)[0];

        this.lookingRight = puck.pos.x > this.pos.x;

        this.vel.x = this.lookingRight ? 50 : -50;

        this.currentAnim.flip.x = this.lookingRight;

        const gonnaStepPos = {
            x: this.pos.x + (this.lookingRight ? 1 : 0) * this.size.x,
            y: this.pos.y + this.size.y + 1
        };

        const gonnaStepTile = ig.game.collisionMap.getTile(
            gonnaStepPos.x,
            gonnaStepPos.y
        );

        const gonnaRunIntoPos = {
            x: this.pos.x + this.size.x / 2 + (this.lookingRight ? 1 : -1) * (this.size.x / 2 + 1),
            y: this.pos.y + this.size.y / 2,
        };

        const gonnaRunIntoTile = ig.game.collisionMap.getTile(
            gonnaRunIntoPos.x,
            gonnaRunIntoPos.y
        );

        if ((!gonnaStepTile || gonnaRunIntoTile) && this.standing) {
            this.vel.y = -320;
        }

        this.currentAnim = this.vel.x ? this.anims.move : this.anims.idle;
    },

    collideWith: function(other, _axis) {
        if (other instanceof EntityPuck) {
            other.setP2();
        }
    }
});

});
