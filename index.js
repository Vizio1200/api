const express = require('express');
const app = express();

app.use(express.json());

const crudRoutes = require('./src/routes/crud');
const guitarrasRoutes = require('./src/routes/guitarras');

app.use('/api', crudRoutes);
app.use('/api', guitarrasRoutes);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});