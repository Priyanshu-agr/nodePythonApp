const express = require('express');
const { spawn } = require('child_process');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    try {
        let dataToSend;
        // spawn new child process to call the python script
        const python = spawn('python3', ['./script1.py']);
        //collect data from script
        python.stdout.on('data', function (data) {
            console.log('Pipe data from python script');
            dataToSend = data.toString();
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
            // send data to browser
            res.send(dataToSend)
        });
    }
    catch (e) {
        console.log(e.message);
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})