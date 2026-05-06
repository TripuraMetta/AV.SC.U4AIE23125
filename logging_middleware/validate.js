const {
    VALID_STACKS,
    VALID_LEVELS,
    BACKEND_PACKAGES
} = require("./constants");

const validateLog = (stack, level, packageName, message) => {

    if (!VALID_STACKS.includes(stack)) {
        throw new Error("Invalid stack value");
    }

    if (!VALID_LEVELS.includes(level)) {
        throw new Error("Invalid level value");
    }

    if (!BACKEND_PACKAGES.includes(packageName)) {
        throw new Error("Invalid package name");
    }

    if (!message || typeof message !== "string") {
        throw new Error("Message must be a valid string");
    }

    return true;
};

module.exports = validateLog;