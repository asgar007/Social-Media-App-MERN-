const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const {fileURLToPath} = require('url');
const User = require('./models/user');
const Post = require('./models/post');
const users = require('./data/index');
// console.log(users)

/* CONFIGURATIONS */
dotenv.config();
const PORT = process.env.PORT || 6001;
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
//use static folder
app.use(express.static('./assets'));
app.use(express.urlencoded());

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'assets/images');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });
const registerController = require('./controllers/registerController');
const postController = require('./controllers/postController');
const { verifyToken } = require('./middleware/auth');
/* ROUTES WITH FILES */
app.post('/auth/register', upload.single("picture"), registerController.register);
app.post('/posts', verifyToken, upload.single("picture"), postController.createPost);


/* ROUTE */
app.use('/', require('./routes'));

/* MONGO SETUP */
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function(){
    app.listen(PORT, function() { console.log(`successfull server started on port: ${PORT}`); });
    /*ADD DATA ONLY ONE TIME */

    // User.create({
    //     firstName: "Ali",
    //     lastName: "ali",
    //     email: "ali@getMaxListeners.com",
    //     password: "obj.password"
    // })
    
    // User.insertMany(users)
    //     .then((docs)=> console.log('Objects inserted successfully:', docs))
    //     .catch((error) => {
    //         console.error('Error inserting objects:', error);
    //     });
    
}).catch(function(err){ console.log(`error in starting server: ${err}`); })
