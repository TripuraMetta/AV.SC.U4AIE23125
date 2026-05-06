const axios = require("axios");
const validateLog = require("./validate");

const Log = async (stack, level, packageName, message) => {

    try {

        validateLog(stack, level, packageName, message);

        const logData = {
            stack,
            level,
            package: packageName,
            message
        };

        console.log("Log Created:", logData);

        return logData;

    } catch (error) {

        console.error("Logger Error:", error.message);

        return {
            success: false,
            error: error.message
        };
    }
};

module.exports = Log;