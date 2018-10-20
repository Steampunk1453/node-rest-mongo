import * as express from 'express';
import * as bodyParser from 'body-parser'; //used to parse the form data that you pass in the request
import { Pokemons } from "./routes/pokemons";
import {Courses} from "./routes/courses";
const mongoose = require('mongoose');
const config = require('./db/mongoDB');

class App {

    public app: express.Application;
    public pokeRoutes: Pokemons = new Pokemons();
    public coursesRoute: Courses = new Courses();

    constructor() {
        this.app = express(); //run the express instance and store in app
        this.config();
        this.mongoSetup();
        this.coursesRoute.routes(this.app);
        this.pokeRoutes.routes(this.app);
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({
            extended: false
        }))
        // allow-Origin
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    private mongoSetup(): void{
        mongoose.connect(config.DB).then(() => {console.log('Database is connected')},
            err => { console.log('Can not connect to the database' +err)
            });
    }

}

export default new App().app;