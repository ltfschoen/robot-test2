module.exports = {
    getTemplateForDimensions: function (boardDimensions) {
        var hash = {};
        for (var col = 0; col < boardDimensions.width; col++) {
            for (var row = 0; row < boardDimensions.height; row++) {
                hash[[col, row]] = "";
            }
        }
        return hash;
    }
};