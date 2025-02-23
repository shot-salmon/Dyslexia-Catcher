// server/server.js
const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const port = 5001;

// CORS 처리를 위해 (개발환경에서는)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/run-python', (req, res) => {
  // python 폴더 내 myscript.py 실행
  const options = {
    cwd: path.join(__dirname, '..', 'STT')
  };
  const pythonScript = path.join(__dirname, '..', 'STT', 'main.py');
  const pythonProcess = spawn('python', [pythonScript], options);

  let output = "";

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.send(output);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
