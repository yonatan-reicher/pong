ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

    'game.entities.puck',
    'game.entities.paddle-cpu',
    'game.entities.paddle-player',

    'game.levels.main',
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
        ig.input.bind( ig.KEY.UP_ARROW, 'up' );
        ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
        ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
        ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
        ig.input.bind( ig.KEY.W, 'up' );
        ig.input.bind( ig.KEY.S, 'down' );
        ig.input.bind( ig.KEY.A, 'left' );
        ig.input.bind( ig.KEY.D, 'right' );

        ig.input.bind( ig.KEY.SPACE, 'jump' );
        ig.input.bind( ig.KEY.W, 'jump' );
        ig.input.bind( ig.KEY.UP_ARROW, 'jump' );

        ig.input.bind( ig.KEY.MOUSE1, 'attack' );

        ig.music.add('media/music/track1.ogg');
        ig.music.volume = 0.5;
        ig.music.play();

        this.gravity = 1000;
        this.loadLevel(LevelMain);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		/*
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
        */
		this.font.draw( 'WASD/arrows, click', 2, ig.system.height - 5 - 2, ig.Font.ALIGN.LEFT );
	}
});


// Start the Game with 60fps, a resolution of 324x243, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 324, 243, 2 );

});
