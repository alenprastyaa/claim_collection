require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const db = require('./config/database');
const DataCollectionRoutes = require('./routes/dataCollection.routes');
const CarBrandRoutes = require('./routes/carBrand.routes');
const CarModelRoutes = require('./routes/carModel.routes');
const DamageTypeRoutes = require('./routes/damageType.routes');
const DamagedPartRoutes = require('./routes/damagedPart.routes');

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/data-collection', DataCollectionRoutes);
app.use('/api/car-brand', CarBrandRoutes);
app.use('/api/car-model', CarModelRoutes);
app.use('/api/damage-type', DamageTypeRoutes);
app.use('/api/damaged-part', DamagedPartRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API AutoClaim Running 🚀' });
});

app.use((err, req, res, next) => {
    console.error('Global Error:', err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

db.sync({ alter: true })
    .then(() => {
        console.log('📦 Database synced successfully');
        const PORT = process.env.PORT || 3600;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error(' Database sync error:', err);
    });

module.exports = app;
