// server/server.js
const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const port = 5000;

// CORS 처리를 위해 (개발환경에서는)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/run-python', (req, res) => {
  // python 폴더 내 myscript.py 실행
  const duration = req.query.duration;
  console.log(duration);
  const options = {
    cwd: path.join(__dirname, '..', 'STT')
  };
  const pythonScript = path.join(__dirname, '..', 'STT', 'main.py');
  const pythonProcess = spawn('../STT/venv/Scripts/python', [pythonScript, 'prac', duration], options);

  let output = "";

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}, ${output}`);
    res.send(output);
  });
});

app.get('/eval-score', (req, res) => {
  // python 폴더 내 myscript.py 실행
  const duration = req.query.duration;
  const keys = req.query.keys;
  const nums = req.query.nums;
  const trial = req.query.trial;
  
  console.log(duration, keys, nums, trial);
  const options = {
    cwd: path.join(__dirname, '..', 'STT')
  };
  const pythonScript = path.join(__dirname, '..', 'STT', 'main.py');
  const pythonProcess = spawn('../STT/venv/Scripts/python', [pythonScript, 'test', duration, keys, nums, trial], options);

  let output = "";

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}, ${output}`);
    res.send(output);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
