var Board = require('./board');
var Player = require('./player');
var PlaceProposed = require('./place_proposed');
var placeHelper = require('../helpers/place_helper');

function Game(boardDimensions, commands) {
    this.commands = commands ? commands.split('\n') : "";
    this.board = new Board(boardDimensions);
    this.player = new Player();
}

Game.prototype = function() {
    var getPlaceArgumentsFromPlaceCommand = function(command) {
        return command.split(" ").slice(-1).join().split(",");
    };

    var processPlaceCommand = function(command) {
        var placeProposed = new PlaceProposed(getPlaceArgumentsFromPlaceCommand(command));
        if (placeProposed.isValidPlace() && !placeProposed.isSameAsCurrentPlace(this.player)) {
            this.player.changePlace(placeProposed, this.board);
        }
    };

    var processRotateCommand = function(command) {
        if (!this.player.isNotPlaced()) { this.player.rotate(command, this.board); }
    };

    var processMoveCommand = function() {
        if (!this.player.isNotPlaced() && placeHelper.isValidToMove(this.player)) { this.player.move(this.board); }
    };

    var processReportCommand = function() {
        if (!this.player.isNotPlaced()) {
            var placeCurrent = this.player.reportPlaceCurrent();
            process.stdout.write(placeCurrent + "\n");
        }
    };

    var processCommands = function() {
        for (var element = 0, totalLength = this.commands.length; element < totalLength; element++) {
            if (this.commands[element].match(/PLACE/gi) != null) {
                this.processPlaceCommand(this.commands[element]);
            } else if (this.commands[element].match(/LEFT|RIGHT/gi) != null) {
                this.processRotateCommand(this.commands[element]);
            } else if (this.commands[element].match(/MOVE/gi) != null) {
                this.processMoveCommand();
            } else if (this.commands[element].match(/REPORT/gi) != null) {
                this.processReportCommand();
            }
        }
    };

    return {
        getPlaceArgumentsFromPlaceCommand: getPlaceArgumentsFromPlaceCommand,
        processPlaceCommand: processPlaceCommand,
        processRotateCommand: processRotateCommand,
        processMoveCommand: processMoveCommand,
        processReportCommand: processReportCommand,
        processCommands: processCommands
    };
}();

module.exports = Game;