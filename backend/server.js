// const express = require('express');
// const cors = require('cors');
// const apiRoutes = require('./routes/api');
// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use('/api', apiRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
require('dotenv').config();
const { authenticateToken } = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());

// Apply authentication to specific routes
app.use('/api/diagnose', authenticateToken);
app.use('/api/history', authenticateToken);
app.use('/api/prescriptions/:id', authenticateToken);

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));