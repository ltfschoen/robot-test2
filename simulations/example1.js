var Game = require('../src/game');
var FileReader = require('../src/file_reader');

var fileReader = new FileReader();
fileReader.readInstructionFile("example_instructions1", function(err, commands) {
    var boardDimensions = {width: 5, height: 5};
    var game = new Game(boardDimensions, commands);
    game.processCommands();
});
