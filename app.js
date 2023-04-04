const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser')
const feedRoutes = require('./routes/feed')
const authRoutes = require('./routes/auth')
const multer = require('multer')
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const {Server} = require('socket.io');

const app = express()

const swaggerDefinition= {
    openapi: '3.0.0',
    info: {
        title: 'Test Title',
        description: 'Test description',
        version: '1.0.0',
        contact: {
            name: 'Bayzt Irem',
            email: 'bayzt.irem@gmail.com'
        },
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Development server',
            },
        ],
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
}

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(bodyParser.json())
app.use(
    multer({storage: fileStorage, fileFilter: fileFilter}).single('image')
)

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes)
app.use('/auth', authRoutes)

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});

mongoose
    .connect(
        'mongodb+srv://<username>:<password>@cluster0.o2osslj.mongodb.net/messages?retryWrites=true'
    )
    .then(result => {
        const server = app.listen(8080)
        const io = require('./socket').init(server);
        io.on('connection', socket => {
            console.log("client connect")
        })
    })
    .catch(err => console.log(err))

