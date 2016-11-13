var PlaceCurrent = require('./place_current');
var placeHelper = require('../helpers/place_helper');

function Player() {
    this.placeCurrent = new PlaceCurrent("","","");
}

Player.prototype = function() {
    var isNotPlaced = function () {
        return [this.placeCurrent.xCoordinate, this.placeCurrent.yCoordinate, this.placeCurrent.faceDirection].indexOf(undefined) != -1 ||
            [this.placeCurrent.xCoordinate, this.placeCurrent.yCoordinate, this.placeCurrent.faceDirection].indexOf("") != -1;
    };

    var changePlace = function(placeProposed, board) {
        this.placeCurrent = placeProposed;
        this.resetPlaceWhenPreviouslyPlaced(board);
        board.layout[[placeProposed.xCoordinate, placeProposed.yCoordinate]] = placeProposed.faceDirection;
    };

    var resetPlaceWhenPreviouslyPlaced = function(board) {
        if (board.layout[[this.placeCurrent.xCoordinate, this.placeCurrent.yCoordinate]] != undefined) {
            board.layout[[this.placeCurrent.xCoordinate, this.placeCurrent.yCoordinate]] = "";
        }
    };

    var rotate = function(rotation, board) {
        var newDirection = placeHelper.getDirectionForRotation(rotation, this.placeCurrent.faceDirection);
        board.layout[[this.placeCurrent.xCoordinate, this.placeCurrent.yCoordinate]] = newDirection;
        this.placeCurrent.faceDirection = newDirection;
    };

    var move = function(board) {
        this.resetPlaceWhenPreviouslyPlaced(board);
        var moveBy = placeHelper.getDistanceToMoveForFaceDirection(this.placeCurrent.faceDirection);
        var newCoordinates = String(parseInt(this.placeCurrent.xCoordinate) + moveBy.xMove) + "," +
            String(parseInt(this.placeCurrent.yCoordinate) + moveBy.yMove);
        board.layout[[newCoordinates]] = this.placeCurrent.faceDirection;
        this.placeCurrent.xCoordinate = String(parseInt(this.placeCurrent.xCoordinate) + moveBy.xMove);
        this.placeCurrent.yCoordinate = String(parseInt(this.placeCurrent.yCoordinate) + moveBy.yMove);
    };

    var reportPlaceCurrent = function () {
        if ([this.placeCurrent.xCoordinate, this.placeCurrent.yCoordinate, this.placeCurrent.faceDirection].join() != ",,") {
            return [this.placeCurrent.xCoordinate, this.placeCurrent.yCoordinate, this.placeCurrent.faceDirection].join();
        }
        return "";
    };

    return {
        isNotPlaced: isNotPlaced,
        changePlace: changePlace,
        resetPlaceWhenPreviouslyPlaced: resetPlaceWhenPreviouslyPlaced,
        rotate: rotate,
        move: move,
        reportPlaceCurrent: reportPlaceCurrent
    };
}();

module.exports = Player;
