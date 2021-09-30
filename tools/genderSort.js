const fs = require("fs");
const path = require("path");


const genderSort = (xGenderPath, yGenderValue, yGenderPath) => {
    fs.readdir(xGenderPath, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(fileName => {
            fs.readFile(path.join(xGenderPath, fileName), (err, fileData) => {
                if (err) {
                    console.log(err);
                    return;
                }

                const genderObj = JSON.parse(fileData);

                if (genderObj.gender === yGenderValue) {
                    fs.rename(
                        path.join(xGenderPath, fileName),
                        path.join(yGenderPath, fileName),

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
    genderSort
};