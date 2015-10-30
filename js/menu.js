var Menu = {

    preload : function() {
        // Load all the needed resources for the menu.
        game.load.image('playSnake', './assets/playsnake.png');
        game.load.image('playHeli', './assets/playhelicopter.png');
    },

    create: function () {

        // Add menu screen.
        // It will act as a button to start the game.
        this.add.button(0, 0, 'playSnake', this.startGame1, this);
        this.add.button(500, 0, 'playHeli', this.startGame2, this);

    },

    startGame1: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    }

};
