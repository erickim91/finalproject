
// declare variables

var firstHole = 10;
var holeEnd = firstHole + 19;
var score = 0;

var Heli_Game = {

    preload: function() {
      game.load.image('player', '/assets/helicoptersprite.png');
      game.load.image('cavewall', '/assets/longwall.png');
      game.load.image('wallblock', '/assets/wallblock.png');

    },

    create: function() {

      game.stage.backgroundColor = '#9BBC0F';

      score = 0;

      MAX_SPEED = 200; // pixels/second
      ACCELERATION = 800; // pixels/second/second
      DRAG = 600; // pixels/second
      GRAVITY = 500; // pixels/second/second
      JUMP_SPEED = -500; // pixels/second (negative y is up)

      player = game.add.sprite(160, 160, 'player');

      game.physics.arcade.enable(player);

      player.body.collideWorldBounds = true;

      // game.physics.arcade.gravity.y = GRAVITY;

      game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
      boost = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      walls = game.add.group();
      walls.enableBody = true;
      walls.createMultiple(1400, 'wallblock');

      midWalls = game.add.group();
      midWalls.enableBody = true;
      midWalls.createMultiple(40, 'wallblock');

      timer = game.time.events.loop(90, this.addOneWall, this);

      game.time.events.loop(500, this.scoreUp, this);

      game.physics.arcade.collide(player, walls);
      game.physics.arcade.collide(player, wall);

      game.time.events.loop(1800, this.addCenterWall, this);

      scoreText = game.add.text(32, 550, "score: 0", { font: "20px Arial", align: "left", fill: '#306230' });

    },

    update: function() {

      if (boost.isDown) {
        // player.body.gravity.y = 0;
        player.body.acceleration.y = -1500;
        if (player.body.velocity > -1000) {
          player.body.acceleration.y = 1
        }
      }

      else if (boost.isUp) {
        player.body.gravity.y = 500;
        player.body.acceleration.y = 800;
        player.body.maxVelocity.y = 400;
      }

game.physics.arcade.overlap(player, walls, this.gameOver, null, this);

    },

    addOneBlock: function(x, y) {
      // Grab first set of dead pipes in group
      var wall = walls.getFirstDead();

      wall.reset(x, y);

      wall.body.velocity.x = -200;

      wall.checkWorldBounds = true;
      wall.outOfBoundsKill = true;
    },

    addOneWall: function() {

      // var hole = Math.floor(Math.random() * 28) + 1;

      var hole = Math.floor(Math.random() * ((firstHole + 1) - (firstHole - 1) + 1)) + (firstHole - 1);


      if (hole >= 0 && hole <= 10) {
        firstHole = hole;
      };

      // i < total number of blocks
      for (i = 0; i < 30; i++) {
        if (i != hole && i != hole + 1 && i != hole + 2 && i != hole + 3 && i != hole + 4 && i != hole + 5 && i != hole + 6 && i != hole + 7 && i != hole + 8 && i != hole + 9 && i != hole + 10 && i != hole + 11 && i != hole + 12 && i != hole + 13 && i != hole + 14 && i != hole + 15 && i != hole + 16 && i != hole + 17 && i != hole + 18 && i != hole + 19) {

          var wall = walls.getFirstDead();
          wall.enableBody = true;
          wall.reset(1000, i * 20);

          wall.body.velocity.x = -200;

          wall.checkWorldBounds = true;
          wall.outOfBoundsKill = true;

        }
      }

    },

    scoreUp: function() {
      score++;
    },

    gameOver: function() {
        game.state.start('Game_Over');
    },


    addCenterWall: function() {

      var centerWall = Math.floor(Math.random() * 28) + 1;

      // i < total number of blocks
      for (i = 0; i < 30; i++) {
        if (i = !centerWall) {

          var wall = Walls.getFirstDead();

          wall.reset(600, i * 20);

          wall.body.velocity.x = -200;

          wall.checkWorldBounds = true;
          wall.outOfBoundsKill = true;

        }
      }
    //
    // }

}
}
