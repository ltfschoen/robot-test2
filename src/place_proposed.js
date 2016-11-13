function PlaceProposed(placeProposed) {
    this.xCoordinate = placeProposed[0];
    this.yCoordinate = placeProposed[1];
    this.faceDirection = placeProposed[2];
    this.validFaceDirections = ["NORTH", "SOUTH", "WEST", "EAST"];
}

PlaceProposed.prototype = function() {
    var isSameAsCurrentPlace = function(player) {
        if (player.isNotPlaced()) {
            return false;
        } else if (this.xCoordinate == player.placeCurrent.xCoordinate &&
            this.yCoordinate == player.placeCurrent.yCoordinate &&
            this.faceDirection == player.placeCurrent.faceDirection) {
            return true;
        }
        return false;
    };

    var isValidPlace = function() {
        if (!isNaN(parseInt(this.xCoordinate)) && !isNaN(parseInt(this.xCoordinate)) &&
            !isNaN(this.yCoordinate) && !isNaN(this.yCoordinate) &&
            this.xCoordinate >= 0 && this.xCoordinate <= 4 &&
            this.yCoordinate >= 0 && this.yCoordinate <= 4 &&
            this.validFaceDirections.indexOf(this.faceDirection) != -1) {
            return true;
        }
        return false;
    };

    return {
        isSameAsCurrentPlace: isSameAsCurrentPlace,
        isValidPlace: isValidPlace
    };
}();

module.exports = PlaceProposed;