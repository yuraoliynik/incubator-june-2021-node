const path = require("path");
const tools = require("./tools");

const boysPath = path.join(__dirname, "boys");
const girlsPath = path.join(__dirname, "girls");


tools.sortFilesJSON(boysPath, "gender","male", girlsPath);
tools.sortFilesJSON(girlsPath, "gender", "female", boysPath);