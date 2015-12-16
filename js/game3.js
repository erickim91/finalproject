var ball, paddle, blocks, livesText, introText, background;

var ballOnPaddle = true;
var lives = 3;
var score;

var defaultTextOptions = { font: "20px Arial", align: "left", fill: '#306230' };
var boldTextOptions = { font: "40px Arial", fill: '#306230', align: "center" };

var Dx_Game = {

  preload: function() {

       game.load.image("block0", "/assets/block0.png");
       game.load.image("block1", "/assets/block1.png");
       game.load.image("block2", "/assets/block2.png");
       game.load.image("paddle", "/assets/newpaddle.png");
       game.load.image("ball", "/assets/ball.png");
    },

  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#9BBC0F';

    score = 0;

       game.physics.arcade.checkCollision.down = false;

       blocks = game.add.group();
       blocks.enableBody = true;
       blocks.physicsdBodyType = Phaser.Physics.ARCADE;

       for (i = 0; i < 5; i++) {
         for (j = 0; j < 15; j++) {
           var randomblockNumber = Math.floor(Math.random() * 3);
           var block = blocks.create(120 + (j * 52), 100 + (i * 52), "block" + randomblockNumber);
           block.body.bounce.set(1);
           block.body.immovable = true;
         }
       }

       paddle = game.add.sprite(game.world.centerX, 500, "paddle");
       paddle.anchor.setTo(0.5, 0.5);
       game.physics.enable(paddle, Phaser.Physics.ARCADE);
       paddle.body.collideWorldBounds = true;
       paddle.body.bounce.set(1);
       paddle.body.immovable = true;

       ball = game.add.sprite(game.world.centerX, paddle.y - 16, "ball");
       ball.scale.setTo(1.3,1.3);
       ball.anchor.set(0.5);
       ball.checkWorldBounds = true;
       game.physics.enable(ball, Phaser.Physics.ARCADE);
       ball.body.collideWorldBounds = true;
       ball.body.bounce.set(1);
       ball.events.onOutOfBounds.add(helpers.death, this);

       scoreText = game.add.text(32, 550, "score: 0", defaultTextOptions);
       livesText = game.add.text(900, 550, "lives: 3", defaultTextOptions);
       introText = game.add.text(game.world.centerX, 400, "CLICK TO LAUNCH BALL", { font: "bold 50px sans-serif", fill: '#306230', align: "center"});
       introText.anchor.setTo(0.5, 0.5);
       game.input.onDown.add(helpers.release, this);
  },

  update: function() {
    paddle.x = game.input.x;

       // Making sure the player does not move out of bounds
       if (paddle.x < 24) {
           paddle.x = 24;
       } else if (paddle.x > game.width - 24) {
           paddle.x = game.width - 24;
       }

       if (ballOnPaddle) {
           // Setting the ball on the paddle when player has it
           ball.body.x = paddle.x;
       } else {
           game.physics.arcade.collide(ball, paddle, helpers.ballCollideWithPaddle, null, this);
           game.physics.arcade.collide(ball, blocks, helpers.ballCollideWithblock, null, this);
       }
  }


};

var helpers = {
   release: function() {
       if (ballOnPaddle) {
           ballOnPaddle = false;
           ball.body.velocity.y = -300;
           ball.body.velocity.x = -75;
           introText.visible = false;
       }
   },

   death: function() {
       lives--;
       livesText.text = "lives: " + lives;

       if (lives === 0) {
           helpers.gameOver();
       } else {
           ballOnPaddle = true;
           ball.reset(paddle.body.x + 16, paddle.y - 16);
       }
   },

   gameOver: function() {
       game.state.start('Game_Over');
   },

   ballCollideWithblock: function(ball, block) {
       block.kill();

       score += 10;
       scoreText.text = "score: " + score;

       if (blocks.countLiving() <= 0) {
           // New level start
           score += 1000;
           scoreText.text = "score: " + score;
           introText.text = "- Next Level -";

           ballOnPaddle = true;
           ball.body.velocity.set(0);
           ball.x = paddle.x + 16;
           ball.y = paddle.y - 16;

           blocks.callAll("revive");
       }

   },

   ballCollideWithPaddle: function(ball, paddle) {
       var diff = 0;

       if (ball.x < paddle.x) {
           // Ball is on the left-hand side
           diff = paddle.x - ball.x;
           ball.body.velocity.x = (-10 * diff);
       } else if (ball.x > paddle.x) {
           // Ball is on the right-hand side
           diff = ball.x -paddle.x;
           ball.body.velocity.x = (10 * diff);
       } else {
           // Ball is perfectly in the middle
           // Add a little random X to stop it bouncing straight up!
           ball.body.velocity.x = 2 + Math.random() * 8;
       }
   }
};
