import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Test server running');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Test server listening on port ${PORT}`));
