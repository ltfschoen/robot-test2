module.exports = {
    getDirectionForRotation: function(rotation, currentFaceDirection) {
        var newDirecton;
        if (rotation == "LEFT") {
            if (currentFaceDirection == "NORTH") {
                newDirecton = "WEST";
            } else if (currentFaceDirection == "SOUTH") {
                newDirecton = "EAST";
            } else if (currentFaceDirection == "EAST") {
                newDirecton = "NORTH";
            } else if (currentFaceDirection == "WEST") {
                newDirecton = "SOUTH";
            }
        } else if (rotation == "RIGHT") {
            if (currentFaceDirection == "NORTH") {
                newDirecton = "EAST";
            } else if (currentFaceDirection == "SOUTH") {
                newDirecton = "WEST";
            } else if (currentFaceDirection == "EAST") {
                newDirecton = "SOUTH";
            } else if (currentFaceDirection == "WEST") {
                newDirecton = "NORTH";
            }
        }
        return newDirecton;
    },

    getDistanceToMoveForFaceDirection: function(currentFaceDirection) {
        var moveBy = {xMove: 0, yMove: 0};
        if (currentFaceDirection == "NORTH") {
            moveBy.yMove += 1;
        } else if (currentFaceDirection == "SOUTH") {
            moveBy.yMove -= 1;
        } else if (currentFaceDirection == "EAST") {
            moveBy.xMove += 1;
        } else if (currentFaceDirection == "WEST") {
            moveBy.xMove -= 1;
        }
        return moveBy;
    },

    isValidToMove: function(currentPlayer) {
        // Bottom boundary
        if (currentPlayer.placeCurrent.yCoordinate == 0 && currentPlayer.placeCurrent.faceDirection == "SOUTH") {
            return false;
        // Top boundary
        } else if (currentPlayer.placeCurrent.yCoordinate == 4 && currentPlayer.placeCurrent.faceDirection == "NORTH") {
            return false;
        // Left boundary
        } else if (currentPlayer.placeCurrent.xCoordinate == 0 && currentPlayer.placeCurrent.faceDirection == "WEST") {
            return false;
        // Right boundary
        } else if (currentPlayer.placeCurrent.xCoordinate == 4 && currentPlayer.placeCurrent.faceDirection == "EAST") {
            return false;
        } else if (currentPlayer.isNotPlaced()) {
            return false;
        } else {
            return true;
        }
    }
};