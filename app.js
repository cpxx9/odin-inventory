require('dotenv/config');

const path = require('node:path');
const express = require('express');
const { indexRouter } = require('./routes/indexRouter');
const { genreRouter } = require('./routes/genreRouter');

const assetsPath = path.join(__dirname, 'views');
const app = express();
const PORT = process.env.PORT || 8000;

app.set('views', assetsPath);
app.set('view engine', 'ejs');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/', indexRouter);
app.use('/genre', genreRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
