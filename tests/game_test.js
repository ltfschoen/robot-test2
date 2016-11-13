var chai = require('chai');
var expect = chai.expect;
var Game = require('../src/game');

describe('Game', function() {
    describe('WithBoardAndPlayer', function() {
        it('Returns 5x5 board layout for current coordinates (key) and direction (value)', function () {
            var boardDimensions = { width: 5, height: 5};
            var game = new Game(boardDimensions, null);
            var hash = {
                "0,0": "", "0,1": "", "0,2": "", "0,3": "", "0,4": "",
                "1,0": "", "1,1": "", "1,2": "", "1,3": "", "1,4": "",
                "2,0": "", "2,1": "", "2,2": "", "2,3": "", "2,4": "",
                "3,0": "", "3,1": "", "3,2": "", "3,3": "", "3,4": "",
                "4,0": "", "4,1": "", "4,2": "", "4,3": "", "4,4": ""
            };
            expect(JSON.stringify(game.board.layout)).to.equal(JSON.stringify(hash));
        });

        it('Prevents creation of boards that are not to specification of 5x5', function () {
            var boardDimensions = { width: 10, height: 10};
            var game = new Game(boardDimensions, null);
            var hash = {
                "0,0": "", "0,1": "", "0,2": "", "0,3": "", "0,4": "",
                "1,0": "", "1,1": "", "1,2": "", "1,3": "", "1,4": "",
                "2,0": "", "2,1": "", "2,2": "", "2,3": "", "2,4": "",
                "3,0": "", "3,1": "", "3,2": "", "3,3": "", "3,4": "",
                "4,0": "", "4,1": "", "4,2": "", "4,3": "", "4,4": ""
            };
            expect(JSON.stringify(game.board.layout)).to.equal(JSON.stringify(hash));
        });

        it('Creates player without placing it on the board', function () {
            var boardDimensions = { width: 5, height: 5};
            var game = new Game(boardDimensions, null);
            expect(game.player.placeCurrent.xCoordinate).to.equal(undefined);
            expect(game.player.placeCurrent.yCoordinate).to.equal(undefined);
        });

        describe('WithInvalidCommand', function() {
            it('Ignores commands that are invalid', function () {
                var commands = "  ####  ##$@%@#%^$^$$&%$&&&%$&$%#&#$\nPLACE@234MOVE-";
                var boardDimensions = {width: 5, height: 5};
                var game = new Game(boardDimensions, commands);
                game.processCommands();
                expect(game.player.placeCurrent.xCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.yCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.faceDirection).to.equal(undefined);
                expect(game.board.layout[["0,0"]]).to.equal("");
            });
        });

        describe('WithCommandsPriorToFirstPlaceCommand', function() {
            it('Ignores commands prior to first PLACE command and does not provide report', function () {
                var commands = "REPORT\nMOVE\nLEFT\nREPORT\n";
                var boardDimensions = {width: 5, height: 5};
                var game = new Game(boardDimensions, commands);
                game.processCommands();
                expect(game.player.placeCurrent.xCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.yCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.faceDirection).to.equal(undefined);
                expect(game.board.layout[["0,0"]]).to.equal("");
            });
        });

        describe('WithValidPlaceCommand', function() {
            it('Adds player on board correctly for multiple PLACE commands', function () {
                var commands = "PLACE 0,0,NORTH\nPLACEMOVEPLACEPLACE 0,2,EAST\PLACE 0,1,SOUTH";
                var boardDimensions = { width: 5, height: 5};
                var game = new Game(boardDimensions, commands);
                game.processCommands();
                expect(game.player.placeCurrent.xCoordinate).to.equal("0");
                expect(game.player.placeCurrent.yCoordinate).to.equal("1");
                expect(game.player.placeCurrent.faceDirection).to.equal("SOUTH");
                expect(game.board.layout[["0,1"]]).to.equal("SOUTH");
            });

            it('Adds player on board correctly for valid PLACE command at South West corner', function () {
                var commands = "PLACE 0,0,NORTH";
                var boardDimensions = { width: 5, height: 5};
                var game = new Game(boardDimensions, commands);
                game.processCommands();
                expect(game.player.placeCurrent.xCoordinate).to.equal("0");
                expect(game.player.placeCurrent.yCoordinate).to.equal("0");
                expect(game.player.placeCurrent.faceDirection).to.equal("NORTH");
                expect(game.board.layout[["0,0"]]).to.equal("NORTH");
            });

            it('Adds player on board correctly for valid PLACE command at North West corner', function () {
                var commands = "PLACE 4,4,EAST";
                var boardDimensions = { width: 5, height: 5};
                var game = new Game(boardDimensions, commands);
                game.processCommands();
                expect(game.player.placeCurrent.xCoordinate).to.equal("4");
                expect(game.player.placeCurrent.yCoordinate).to.equal("4");
                expect(game.player.placeCurrent.faceDirection).to.equal("EAST");
                expect(game.board.layout[["4,4"]]).to.equal("EAST");
            });

            describe('WithValidRotateCommand', function() {
                it('Rotates player on board correctly for given valid rotation command', function () {
                    var commands = "PLACE 0,0,NORTH\nLEFT";
                    var boardDimensions = { width: 5, height: 5};
                    var game = new Game(boardDimensions, commands);
                    game.processCommands();
                    expect(game.player.placeCurrent.xCoordinate).to.equal("0");
                    expect(game.player.placeCurrent.yCoordinate).to.equal("0");
                    expect(game.player.placeCurrent.faceDirection).to.equal("WEST");
                    expect(game.board.layout[["0,0"]]).to.equal("WEST");
                });

                describe('WithValidMoveCommand', function() {
                    it('Moves player on board correctly for given valid move command', function () {
                        var commands = "PLACE 0,0,NORTH\nRIGHT\nMOVE";
                        var boardDimensions = { width: 5, height: 5};
                        var game = new Game(boardDimensions, commands);
                        game.processCommands();
                        expect(game.player.placeCurrent.xCoordinate).to.equal("1");
                        expect(game.player.placeCurrent.yCoordinate).to.equal("0");
                        expect(game.player.placeCurrent.faceDirection).to.equal("EAST");
                        expect(game.board.layout[["1,0"]]).to.equal("EAST");
                    });
                });

                describe('WithInvalidMoveForRotation', function() {
                    it('Does not moves player when move in face direction goes to non-board coordinate West', function () {
                        var commands = "PLACE 0,4,NORTH\nLEFT\nMOVE";
                        var boardDimensions = { width: 5, height: 5};
                        var game = new Game(boardDimensions, commands);
                        game.processCommands();
                        expect(game.player.placeCurrent.xCoordinate).to.equal("0");
                        expect(game.player.placeCurrent.yCoordinate).to.equal("4");
                        expect(game.player.placeCurrent.faceDirection).to.equal("WEST");
                        expect(game.board.layout[["0,4"]]).to.equal("WEST");
                    });

                    it('Does not moves player when move in face direction goes to non-board coordinate East', function () {
                        var commands = "PLACE 3,3,NORTH\nRIGHT\nMOVE\nMOVE\nRIGHT";
                        var boardDimensions = { width: 5, height: 5};
                        var game = new Game(boardDimensions, commands);
                        game.processCommands();
                        expect(game.player.placeCurrent.xCoordinate).to.equal("4");
                        expect(game.player.placeCurrent.yCoordinate).to.equal("3");
                        expect(game.player.placeCurrent.faceDirection).to.equal("SOUTH");
                        expect(game.board.layout[["4,3"]]).to.equal("SOUTH");
                    });

                    it('Does not moves player when move in face direction goes to non-board coordinate North', function () {
                        var commands = "MOVE\nLEFT\nPLACE\nPLACE -1,3,NORTH\nPLACE 1,3,EAST\nLEFT\nMOVE\nMOVE\nRIGHT";
                        var boardDimensions = { width: 5, height: 5};
                        var game = new Game(boardDimensions, commands);
                        game.processCommands();
                        expect(game.player.placeCurrent.xCoordinate).to.equal("1");
                        expect(game.player.placeCurrent.yCoordinate).to.equal("4");
                        expect(game.player.placeCurrent.faceDirection).to.equal("EAST");
                        expect(game.board.layout[["1,4"]]).to.equal("EAST");
                    });

                    it('Does not moves player when move in face direction goes to non-board coordinate South', function () {
                        var commands = "#@$%GRE\nPLACE 3,2,NORTH\n#$%#%^\nMOVE\nMOVE\nRIGHT\nR#$R\n\nLEFT\nLEFT\nLEFT\nMOVE\nMOVE\nMOVE\nMOVE\nMOVE";
                        var boardDimensions = { width: 5, height: 5};
                        var game = new Game(boardDimensions, commands);
                        game.processCommands();
                        expect(game.player.placeCurrent.xCoordinate).to.equal("3");
                        expect(game.player.placeCurrent.yCoordinate).to.equal("0");
                        expect(game.player.placeCurrent.faceDirection).to.equal("SOUTH");
                        expect(game.board.layout[["3,0"]]).to.equal("SOUTH");
                    });
                });
            });
        });

        describe('WithInvalidCoordinatesInPlaceCommand', function() {
            it('Prevents placing player for PLACE coordinates outside the board on the West side', function () {
                var commands = "PLACE -1,0,NORTH";
                var boardDimensions = {width: 5, height: 5};
                var game = new Game(boardDimensions, commands);
                game.processCommands();
                expect(game.player.placeCurrent.xCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.yCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.faceDirection).to.equal(undefined);
                expect(game.board.layout[["0,0"]]).to.equal("");
            });

            it('Prevents placing player for PLACE coordinates outside the board on the North side', function () {
                var commands = "PLACE 1,5,NORTH";
                var boardDimensions = {width: 5, height: 5};
                var game = new Game(boardDimensions, commands);
                game.processCommands();
                expect(game.player.placeCurrent.xCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.yCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.faceDirection).to.equal(undefined);
                expect(game.board.layout[["0,0"]]).to.equal("");
            });

            it('Prevents placing player for PLACE coordinates outside the board on the South side', function () {
                var commands = "PLACE 1,-1,NORTH";
                var boardDimensions = {width: 5, height: 5};
                var game = new Game(boardDimensions, commands);
                game.processCommands();
                expect(game.player.placeCurrent.xCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.yCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.faceDirection).to.equal(undefined);
                expect(game.board.layout[["0,0"]]).to.equal("");
            });

            it('Prevents placing player for PLACE coordinates outside the board on the East side', function () {
                var commands = "PLACE 6,6,NORTH";
                var boardDimensions = {width: 5, height: 5};
                var game = new Game(boardDimensions, commands);
                game.processCommands();
                expect(game.player.placeCurrent.xCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.yCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.faceDirection).to.equal(undefined);
                expect(game.board.layout[["0,0"]]).to.equal("");
            });
        });

        describe('WithExtremeCoordinatesInPlaceCommand', function() {
            it('Prevents placing player for extreme high unsafe PLACE coordinates', function () {
                var commands = "PLACE 9007199254740992,9007199254740992,NORTH";
                var boardDimensions = {width: 5, height: 5};
                var game = new Game(boardDimensions, commands);
                game.processCommands();
                expect(game.player.placeCurrent.xCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.yCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.faceDirection).to.equal(undefined);
                expect(game.board.layout[["0,0"]]).to.equal("");
            });
            it('Prevents placing player for extreme low unsafe PLACE coordinates', function () {
                var commands = "PLACE -9007199254740992,-9007199254740992,NORTH";
                var boardDimensions = {width: 5, height: 5};
                var game = new Game(boardDimensions, commands);
                game.processCommands();
                expect(game.player.placeCurrent.xCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.yCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.faceDirection).to.equal(undefined);
                expect(game.board.layout[["0,0"]]).to.equal("");
            });
            it('Prevents placing player for infinite sized PLACE coordinates', function () {
                var commands = "PLACE Infinity,-Infinity,NORTH";
                var boardDimensions = {width: 5, height: 5};
                var game = new Game(boardDimensions, commands);
                game.processCommands();
                expect(game.player.placeCurrent.xCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.yCoordinate).to.equal(undefined);
                expect(game.player.placeCurrent.faceDirection).to.equal(undefined);
                expect(game.board.layout[["0,0"]]).to.equal("");
            });
        });

        describe('WithValidReportCommands', function() {
            it('Reports current place of player on table whenever single REPORT command is read', function () {
                var commands = "PLACE 3,3,NORTH";
                var boardDimensions = {width: 5, height: 5};
                var game = new Game(boardDimensions, commands);
                game.processCommands();
                expect(game.player.reportPlaceCurrent()).to.equal("3,3,NORTH");
            });

            it('Reports current place of player on table whenever multiple REPORT commands are read', function () {
                var commands = "PLACE 1,1,NORTH\nREPORT\nPLACE 3,3,SOUTH\nREPORT";
                var boardDimensions = {width: 5, height: 5};
                var game = new Game(boardDimensions, commands);
                game.processCommands();
                expect(game.player.reportPlaceCurrent()).to.equal("3,3,SOUTH");
            });
        });

        describe('WithInvalidReportCommands', function() {
            it('Does not report a place of player for invalid REPORT commands (i.e. no output on terminal)', function () {
                var commands = "PLACE -1,-5,EAST\nPLECA\nPLACE 1,1,NORTH\nPLACE 6,6,NORTH\nPLACE 4,3,REPORT";
                var boardDimensions = {width: 5, height: 5};
                var game = new Game(boardDimensions, commands);
                game.processCommands();
                expect(game.player.reportPlaceCurrent()).to.equal("1,1,NORTH");
            });
        });
    });
});