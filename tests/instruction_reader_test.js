var fs = require('fs');
var chai = require('chai');
var expect = chai.expect; // use expect style of Chai
var InstructionReader = require('../src/file_reader');
var Game = require('../src/game');

describe("Instruction Reader", function() {
    describe('WithFilename', function () {
        it('Reads instructions from mock file without error', function (callback) {
            var filename = "example_instructions1";
            var fileLocation = './data/' + filename.toString(); // relative to process.cwd()
            fs.readFile(fileLocation, 'utf8', function (err, instructionBuffer) {
                // Propogate error and exit function
                if (err) {
                    return callback(err);
                }
                try {
                    var instructions = instructionBuffer.toString().trim();
                    expect(instructions).to.equal("PLACE 0,0,NORTH\nMOVE\nREPORT");
                } catch (err) {
                    // Catch conversion errors
                    return callback(err);
                }
                // Propogate output when no errors
                callback(null, instructions);
            });
        });
    });

    describe('WithEmptyFile', function () {
        it('Reads empty instructions without error', function () {
            var commands = "";
            var boardDimensions = {width: 5, height: 5};
            var game = new Game(boardDimensions, commands);
            game.processCommands();
            expect(game.player.placeCurrent.xCoordinate).to.equal(undefined);
            expect(game.player.placeCurrent.yCoordinate).to.equal(undefined);
            expect(game.player.placeCurrent.faceDirection).to.equal(undefined);
            expect(game.board.layout[["0,0"]]).to.equal("");
        });
    });
});