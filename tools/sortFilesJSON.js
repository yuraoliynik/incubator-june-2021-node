const fs = require("fs");
const path = require("path");


const sortFilesJSON = (xPath, xPropertyName, xPropertyValue, yPath) => {
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

                const genderObj = JSON.parse(fileData.toString());

                if (genderObj[xPropertyName] !== xPropertyValue) {
                    fs.rename(
                        path.join(xPath, fileName),
                        path.join(yPath, fileName),

                        (err) => {
                            if (err) {
                                console.log(err);
                                return;
                            }

                            console.log(`***  File "${fileName}" was moved`);
                        }
                    );
                }
            });
        });
    });
};


module.exports = {
    sortFilesJSON
};