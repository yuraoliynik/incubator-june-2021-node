const path = require("path");

const boysPath = path.join(__dirname, "boys");
const girlsPath = path.join(__dirname, "girls");

const tools = require("tools");


tools.genderSort(boysPath, "female", girlsPath);
tools.genderSort(girlsPath, "male", boysPath);


