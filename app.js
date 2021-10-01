const path = require('path');
const tools = require('./tools/tools');

const boysPath = path.join(__dirname, 'boys');
const girlsPath = path.join(__dirname, 'girls');

const workPath = path.join(__dirname, 'dir-0');


tools.filesSort(boysPath, 'gender','male', girlsPath);
tools.filesSort(girlsPath, 'gender', 'female', boysPath);

tools.filesUpTo(workPath, workPath);