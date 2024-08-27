const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.post('/create-file', (req, res) => {
  const timestamp = new Date().toISOString();
  const formattedDate = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${formattedDate}.txt`;

  // Define the folder path where the file will be created
  const folderPath = path.join(__dirname, 'files'); // Ensure this folder exists

  // Create the folder if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Define the file path
  const filePath = path.join(folderPath, filename);

  // Write the timestamp to the file
  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      return res.status(500).send('Error writing file');
    }
    res.send(`File created: ${filename}`);
  });
});
app.get('/list-files', (req, res) => {
    // Define the folder path where the text files are stored
    const folderPath = path.join(__dirname, 'files'); // Ensure this folder exists
  
    // Check if the folder exists
    if (!fs.existsSync(folderPath)) {
      return res.status(404).send('Folder not found');
    }
  
    // Read the contents of the folder
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        return res.status(500).send('Error reading folder');
      }
  
      // Filter for .txt files
      const txtFiles = files.filter(file => path.extname(file) === '.txt');
  
      // Return the list of text files
      res.json(txtFiles);
    });
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
