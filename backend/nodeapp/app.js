const {readFile, writeFileSync, writeFile} = require('fs')

 readFile('./content/first.txt', 'utf8', (err,result) => {
    if (err) {
        console.log(err);
        return
    }
    const first = result;
    readFile('./content/second.txt', 'utf8', (err,result) => {
        if (err) {
            console.log(err);
            return
        }
    writeFile('./content/result-async.txt', `Here is the result: ${first}, ${second}`,
    (err,result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    }
    );})
 })