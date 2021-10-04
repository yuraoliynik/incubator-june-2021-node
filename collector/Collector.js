const fs = require('fs');
const path = require('path');

function Collector(dirName, dirPath) {
    this.dirName = dirName;
    this.dirPath = dirPath;

    this.collect = (objForCollect, objFileName, cb = () => {}) => {
        if (cb()) {
            fs.writeFile(
                path.join(this.dirPath, this.dirName, `${objFileName}.txt`),
                JSON.stringify(objForCollect),
                (err) => {

                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log(`*****  User file '${objFileName}.txt' was created in '${this.dirName}'`)
                }
            );
        }
    };

    if (fs.existsSync(path.join(this.dirPath, this.dirName))) {
        fs.rmdirSync(
            path.join(this.dirPath, this.dirName),
            {recursive: true}
        );
    }

    if (!fs.existsSync(path.join(this.dirPath, this.dirName))) {
        fs.mkdir(
            path.join(this.dirPath, this.dirName),
            (err) => {

                if (err) {
                    console.log(err);
                    return;
                }

                console.log(`***  Directory '${this.dirName}' was created or/and cleaned`);
            }
        );
    }
}

module.exports = Collector;