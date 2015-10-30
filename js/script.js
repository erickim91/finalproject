var GameState = function(game) {
};

// Load images and sounds
GameState.prototype.preload = function() {
    // this.game.load.image('ground', '/assets/gfx/ground.png');
    // this.game.load.spritesheet('cyclops', '/assets/gfx/monster.png', 32, 32);
    // this.game.load.spritesheet('explosion', '/assets/gfx/explosion.png', 128, 128);


    //loads background
    this.game.load.image('forestBackground', '/assets/forestBackground.jpeg');

    //loads playersprite
    this.game.load.image('player', '/assets/Placeholder.png')

    //loads music
    this.game.load.audio('jayZ', '/assets/HippityHoppity.mp3');


};

// Setup the example
GameState.prototype.create = function() {

game.physics.startSystem(Phaser.Physics.ARCADE);

  //add music and background
  this.music = this.game.add.audio("jayZ");
  this.music.play();

  this.game.add.sprite(0, 0, 'forestBackground');

  // Define movement constants
  this.MAX_SPEED = 200; // pixels/second
  this.ACCELERATION = 80; // pixels/second/second
  this.DRAG = 240; // pixels/second
  this.GRAVITY = 500; // pixels/second/second
  this.JUMP_SPEED = -120; // pixels/second (negative y is up)

  //summon player
  this.player = this.game.add.image(32, game.world.height - 150, "player");
  player.scale.setTo(1, 1);
  //enables physics for player
  this.game.physics.arcade.enable(player);

  // Make player collide with world boundaries so he doesn't leave the stage
      this.player.body.collideWorldBounds = true;

      // Set player minimum and maximum movement speed
      this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10); // x, y

      // Add drag to the player that slows them down when they are not accelerating
      this.player.body.drag.setTo(this.DRAG, 0); // x, y

      // Since we're jumping we need gravity
      game.physics.arcade.gravity.y = this.GRAVITY;

      // Flag to track if the jump button is pressed
      this.jumping = false;


};

// The update() method is called every frame
GameState.prototype.update = function() {


};


// Setup game
var game = new Phaser.Game(800, 480, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);
