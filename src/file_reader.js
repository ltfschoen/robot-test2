var fs = require('fs');

function FileReader() {}

FileReader.prototype = function() {
    var readInstructionFile = function(filename, callback) {
        var fileLocation = (process.cwd().split("/").pop() == "src") ?
            '../data/' + filename.toString() : './data/' + filename.toString();

        fs.readFile(fileLocation, 'utf8', function (err, commandsBuffer) {
            if (err) { return callback(err); }
            try {
                var commands = commandsBuffer.toString().trim();
            } catch(err) {
                return callback(err);
            }
            callback(null, commands);
        });
    };

    return {
        readInstructionFile: readInstructionFile
    };
}();

module.exports = FileReader;