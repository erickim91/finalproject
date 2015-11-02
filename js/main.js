var game;

game = new Phaser.Game(1000, 600, Phaser.AUTO, 'game');

game.state.add('Menu', Menu);

// Adding the Game state.
game.state.add('Game', Snake_Game);

game.state.add('Game2', Heli_Game);

game.state.add('Game3', Dx_Game);

game.state.start('Menu');

game.state.add('Game_Over', Game_Over);
