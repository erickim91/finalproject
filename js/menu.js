var Menu = {

    preload: function() {
      // Load all the needed resources for the menu.
      game.load.image('playSnake', './assets/snakestart.png');
      game.load.image('playHeli', './assets/helicopterstart.png');
      game.load.image('playBreakout', './assets/breakoutstart.png');
      game.load.audio('jayZ', '/assets/HippityHoppity.mp3');

    },

    create: function () {

      game.stage.backgroundColor = '#061f27';

      // music = game.add.audio("jayZ");
      // music.stop();
      // music.play();

      // Add menu screen.
      // It will act as a button to start the game.
      this.add.button(250, 90, 'playSnake', this.startGame1, this);
      this.add.button(250, 260, 'playHeli', this.startGame2, this);
      this.add.button(250, 430, 'playBreakout', this.startGame3, this);

    },

    startGame1: function () {

      // Change the state to the actual game.
      this.state.start('Game');
    },

    startGame2: function () {

      this.state.start('Game2');
    },

    startGame3: function() {

      this.state.start('Game3');
    }

};
