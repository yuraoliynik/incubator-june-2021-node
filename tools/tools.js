const fs = require('fs');
const path = require('path');


const fileMove = (fileName, fileDirPath, moveDirPath) => {
    if (fileDirPath === moveDirPath) {
        console.log(`***  File '${fileName}' not moved. It is already here`);
        return;
    }

    fs.rename(
        path.join(fileDirPath, fileName),
        path.join(moveDirPath, fileName),

        (err) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(`***  File '${fileName}' was moved`);
        }
    );
};


const filesSort = (xPath, xPropertyName, xPropertyValue, yPath) => {
    fs.readdir(xPath, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(fileName => {
            fs.readFile(path.join(xPath, fileName), (err, fileData) => {
                if (err) {
                    console.log(err);
                    return;
                }

                const fileObj = JSON.parse(fileData.toString());

                if (fileObj[xPropertyName] !== xPropertyValue) {
                    fileMove(fileName, xPath, yPath);
                }
            });
        });
    });
};


const filesUpTo = (upPath, scanPath) => {
    fs.readdir(scanPath, (err, elements) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!elements.length) {
            return;
        }

        elements.forEach(element => {
            const elementPath = path.join(scanPath, element);

            fs.stat(elementPath, (err, stats) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (stats.isFile()) {
                    if (scanPath !== upPath) {
                        fileMove(element, scanPath, upPath);
                    }

                    return;
                }

                filesUpTo(upPath, elementPath);
            });
        });
    });
};


module.exports = {
    fileMove,
    filesSort,
    filesUpTo
};