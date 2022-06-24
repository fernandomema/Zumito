const { args } = require("@commands/info/help");
var mongoose = require("mongoose");

const schema = new mongoose.Schema({ 
    type: {
        type: "string"
    },
    command: {
        name: {
            type: 'string',
        },
        args: {
            type: 'mixed',
        },
    }, 
    error: {
        name: {
            type: 'string',
        },
        message: {
            type: 'string',
        },
        stacktrace: {
            type: 'mixed',
        }
    },
    possibleSolutions: {
        type: 'mixed',
    }

});
module.exports = mongoose.model('Error', schema);