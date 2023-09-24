ig.module(
    'game.entities.paddle-cpu'
)
.requires(
    'game.entities.paddle'
)
.defines(function(){

EntityPaddleCpu = EntityPaddle.extend({
    update: function() {
        const puck = ig.game.getEntitiesByType(EntityPuck)[0];

        this.vel.y =
            puck.pos.y + puck.size.y/2 > this.pos.y + this.size.y/2 ?
            100 : -100;

        this.parent();
    }
});

});
