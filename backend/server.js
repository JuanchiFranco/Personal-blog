const express = require('express');
const cors = require('cors');
const router = require('./router/articles'); // Asegúrate de que la ruta sea correcta
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});