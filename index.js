const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/buildease",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("Connected to database!!!"))
    .catch((err) => console.log(err))

const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const architectureRoutes = require('./routes/architectureRoute');
const constructionRoutes = require('./routes/constructionRoute');
const interiordesignRoutes = require('./routes/interiordesignRoute');
const architectureAppointmentRoute = require('./routes/architectureAppointmentRoute');
const constructionAppointmentRoute = require('./routes/constructionAppointmentRoute');
const interiordesignAppointmentRoute = require('./routes/interiordesignAppointmentRoute');

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/architecture', architectureRoutes);
app.use('/construction', constructionRoutes);
app.use('/interiordesign', interiordesignRoutes);
app.use('/architectureappointment', architectureAppointmentRoute);
app.use('/constructionappointment', constructionAppointmentRoute);
app.use('/interiordesignappointment', interiordesignAppointmentRoute)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening on port", port));

module.exports = app;