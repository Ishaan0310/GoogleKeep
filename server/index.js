const express = require('express');
const cors = require('cors');
const path = require('path');
const notesRoutes = require('./routes/notes');

const app = express();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000' // Allow only your frontend to access the backend
}));

app.use(express.json());
app.use('/api/notes', notesRoutes);

// Serve static files from the React frontend app
app.use(express.static(path.join('D:/Sample project/assignment2/build')));

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
    res.sendFile('D:/Sample project/assignment2/build/index.html');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
