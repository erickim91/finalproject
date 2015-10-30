GameState = function(game) {
};

// Load images and sounds
GameState.preload = function() {
    game.load.image('ground', '/assets/gfx/ground.png');
    game.load.image('player', '/assets/Placeholder.png');
    game.load.image('wall', '/assets/wall.png');
    game.load.audio('jayZ', '/assets/HippityHoppity.mp3');

};

// Setup the example
GameState.create = function() {
    // Set stage background to something sky colored
    game.stage.backgroundColor = 0x4488cc;

    music = game.add.audio("jayZ");
    music.play();

    // Define movement constants
    MAX_SPEED = 200; // pixels/second
    ACCELERATION = 800; // pixels/second/second
    DRAG = 600; // pixels/second
    GRAVITY = 2000; // pixels/second/second
    JUMP_SPEED = -500; // pixels/second (negative y is up)

    testButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Create a player sprite
    player = game.add.sprite(game.width/2, game.height - 100, 'player');

    // Enable arcade physics on the player
    game.physics.enable(player, Phaser.Physics.ARCADE);

    // Make player collide with world boundaries so he doesn't leave the stage
    player.body.collideWorldBounds = true;

    // Set player minimum and maximum movement speed
    player.body.maxVelocity.setTo(MAX_SPEED, MAX_SPEED * 10); // x, y

    // Add drag to the player that slows them down when they are not accelerating
    player.body.drag.setTo(DRAG, 0); // x, y

    // Since we're jumping we need gravity
    game.physics.arcade.gravity.y = GRAVITY;

    // Flag to track if the jump button is pressed
    jumping = false;

    // Create some ground for the player to walk on
    ground = game.add.group();
    for(var x = 0; x < game.width; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = game.add.sprite(x, game.height - 32, 'ground');
        game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        ground.add(groundBlock);
    }

    // wall
    wall = game.add.group();
    for(var y = 0; y < game.height; y += 256) {
      var wallBlock = game.add.sprite(0, y, 'wall');
      game.physics.enable(wallBlock, Phaser.Physics.ARCADE);
      wallBlock.body.immovable = true;
      wallBlock.body.allowGravity = false;
      wall.add(wallBlock);
    }


    // Capture certain keys to prevent their default actions in the browser.
    // This is only necessary because this is an HTML5 game. Games on other
    // platforms may not need code like
    game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN
    ]);

    // Just for fun, draw some height markers so we can see how high we're jumping
    drawHeightMarkers();
};

// This function draws horizontal lines across the stage
GameState.drawHeightMarkers = function() {
    // Create a bitmap the same size as the stage
    var bitmap = game.add.bitmapData(game.width, game.height);

    // These functions use the canvas context to draw lines using the canvas API
    for(y = game.height-32; y >= 64; y -= 32) {
        bitmap.context.beginPath();
        bitmap.context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        bitmap.context.moveTo(0, y);
        bitmap.context.lineTo(game.width, y);
        bitmap.context.stroke();
    }

    game.add.image(0, 0, bitmap);
};

// The update() method is called every frame
GameState.update = function() {
    // Collide the player with the ground and wall
    game.physics.arcade.collide(player, ground);
    game.physics.arcade.collide(player, wall);

    if (leftInputIsActive()) {
        // If the LEFT key is down, set the player velocity to move left
        player.body.acceleration.x = -ACCELERATION;
    } else if (rightInputIsActive()) {
        // If the RIGHT key is down, set the player velocity to move right
        player.body.acceleration.x = ACCELERATION;
    } else {
        player.body.acceleration.x = 0;
    }

    if (testButton.isDown) {
      player.body.velocity.y = -400;
    }


    // Set a variable that is true when the player is touching the ground
    var onTheGround = player.body.touching.down;

    // If the player is touching the ground, let him have 2 jumps
    if (onTheGround) {
        jumps = 2;
        jumping = false;
    }

    // Jump! Keep y velocity constant while the jump button is held for up to 150 ms
    if (jumps > 0 && upInputIsActive(150)) {
        player.body.velocity.y = JUMP_SPEED;
        jumping = true;
    }

    // Reduce the number of available jumps if the jump input is released
    if (jumping && upInputReleased()) {
        jumps--;
        jumping = false;
    }

};


// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.
GameState.leftInputIsActive = function() {
    var isActive = false;

    isActive = input.keyboard.isDown(Phaser.Keyboard.LEFT);
    isActive |= (game.input.activePointer.isDown &&
        game.input.activePointer.x < game.width/4);

    return isActive;
};

// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
GameState.rightInputIsActive = function() {
    var isActive = false;

    isActive = input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    isActive |= (game.input.activePointer.isDown &&
        game.input.activePointer.x > game.width/2 + game.width/4);

    return isActive;
};

// This function should return true when the player activates the "jump" control
// In this case, either holding the up arrow or tapping or clicking on the center
// part of the screen.
GameState.upInputIsActive = function(duration) {
    var isActive = false;

    isActive = input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
    isActive |= (game.input.activePointer.justPressed(duration + 1000/60) &&
        game.input.activePointer.x > game.width/4 &&
        game.input.activePointer.x < game.width/2 + game.width/4);

    return isActive;
};

// This function returns true when the player releases the "jump" control
GameState.upInputReleased = function() {
    var released = false;

    released = input.keyboard.upDuration(Phaser.Keyboard.UP);
    released |= game.input.activePointer.justReleased();

    return released;
};

var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);
