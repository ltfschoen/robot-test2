var boardTemplate = require('../helpers/board_template.js');

function Board(boardDimensions) {
    boardDimensions = { width: 5, height: 5}; // Restrict board size to adhere to specification
    this.layout = boardTemplate.getTemplateForDimensions(boardDimensions);
}

module.exports = Board;