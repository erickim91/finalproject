var snake, face, squareSize, score, speed, updateDelay, direction, new_direction, addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value;

var Snake_Game = {

    preload: function() {

        game.load.image('snake', './assets/snakeBody.png');
        game.load.image('face', './assets/face.png');
        game.load.audio('jayZ', '/assets/HippityHoppity.mp3');
    },

    create: function() {


        game.stage.backgroundColor = '#061f27';


        snake = [];
        face = {};
        squareSize = 20;
        score = 0;
        speed = 0;                      // Game speed.
        updateDelay = 0;                // A variable for control over update rates.
        direction = 'right';            // The direction of our snake.
        new_direction = null;           // A buffer to store the new direction into.
        addNew = false;                 // A variable used when a face has been eaten.

        // Set up a Phaser controller for keyboard input.
        cursors = game.input.keyboard.createCursorKeys();

        game.stage.backgroundColor = '#061f27';

        // Generate the initial snake stack
        for (i = 0; i < 16; i++) {
            snake[i] = game.add.sprite(300+i*squareSize, 300, 'snake');
        }



        this.generateFace();


        textStyle_Key = { font: "bold 15px sans-serif", fill: "#fff", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };


        game.add.text(30, 20, "SCORE", textStyle_Key);
        scoreTextValue = game.add.text(94, 18, score.toString(), textStyle_Value);

        game.add.text(900, 20, "SPEED", textStyle_Key);
        speedTextValue = game.add.text(962, 18, speed.toString(), textStyle_Value);

    },

    update: function() {



        if (cursors.right.isDown && direction!='left')
        {
            new_direction = 'right';
        }
        else if (cursors.left.isDown && direction!='right')
        {
            new_direction = 'left';
        }
        else if (cursors.up.isDown && direction!='down')
        {
            new_direction = 'up';
        }
        else if (cursors.down.isDown && direction!='up')
        {
            new_direction = 'down';
        }


        speed = Math.min(20, Math.floor(score/5));

        speedTextValue.text = '' + speed;


        updateDelay++;


        if (updateDelay % (9 - speed) == 0) {


            var firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;


            if(new_direction){
                direction = new_direction;
                new_direction = null;
            }


            if(direction == 'right'){

                lastCell.x = firstCell.x + 20;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'left'){
                lastCell.x = firstCell.x - 20;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'up'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 20;
            }
            else if(direction == 'down'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 20;
            }


            snake.push(lastCell);
            firstCell = lastCell;


            // Increase length of snake if an face had been eaten.
            // Create a block in the back of the snake with the old position of the previous last block (it has moved now along with the rest of the snake).
            if(addNew){
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                addNew = false;
            }

            this.faceCollision();
            this.selfCollision(firstCell);
            this.wallCollision(firstCell);
        }


    },

    generateFace: function(){


        var randomX = Math.floor(Math.random() * 50 ) * squareSize,
            randomY = Math.floor(Math.random() * 30 ) * squareSize;

        face = game.add.sprite(randomX, randomY, 'face');
    },

    faceCollision: function() {

        for(var i = 0; i < snake.length; i++){
            if(snake[i].x == face.x && snake[i].y == face.y){

                addNew = true;

                face.destroy();

                this.generateFace();

                score++;

                scoreTextValue.text = score.toString();

            }
        }

    },

    selfCollision: function(head) {


        for(var i = 0; i < snake.length - 1; i++){
            if(head.x == snake[i].x && head.y == snake[i].y){


                game.state.start('Game_Over');
            }
        }

    },

    wallCollision: function(head) {

        if(head.x >= 1000 || head.x < 0 || head.y >= 600 || head.y < 0){
            game.state.start('Game_Over');
        }

    }

};
