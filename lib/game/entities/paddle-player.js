ig.module(
    'game.entities.paddle-player'
)
.requires(
    'game.entities.paddle'
)
.defines(function(){

EntityPaddlePlayer = EntityPaddle.extend({
    update: function() {
        this.vel.y =
            ig.input.state('up') ? -100 :
            ig.input.state('down') ? 100 :
            0;

        this.parent();
    }
});

});
