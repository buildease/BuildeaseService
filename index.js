const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const passport = require('passport');
const bodyParser = require('body-parser');
// const Users = require('./api/routes/users');
// const UserModel = require('./models/users');
// const ArchitectureModel = require('./models/architecture');
// const Architecture = require('./api/routes/architecture');
// const Construction = require('./api/routes/construction');
// const Interiordesign = require('./api/routes/interiordesign');
// const http = require('http');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({})
//     }
//     next();
// });
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

// const db = require("./config/keys").mongoURL;
// mongoose.connect(db,
//     {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         useCreateIndex: true
//     })
//     .then(() => console.log("Connected to database!!!"))
//     .catch((err) => console.log(err))
// mongoose.Promise = global.Promise;

const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const architectureRoutes = require('./routes/architectureRoute');
const constructionRoutes = require('./routes/constructionRoute');
const interiordesignRoutes = require('./routes/interiordesignRoute');


// require('./config/passport')(passport)
// app.use(passport.initialize());
// app.use('/api/users', Users);
// app.use('/api', Architecture);
// app.use('/api', Construction);
// app.use('/api', Interiordesign);

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/architecture', architectureRoutes);
app.use('/construction', constructionRoutes);
app.use('/interiordesign', interiordesignRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening on port", port));

module.exports = app;