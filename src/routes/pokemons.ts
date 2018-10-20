import {Request, Response} from "express";

import pokemons = require('../db/db.json'); //load our local database file

export class Pokemons {

    public routes(app): void { //received the express instance from app.ts file
        app.route('/pokemons')
            .get((req: Request, res: Response) => {
                res.status(200).send(pokemons);
            })
        app.route('/pokemons/:id')
            .get((req:Request, res: Response) => {
                let id = req.params.id;
                res.status(200).send(pokemons[id]);
            })
        app.route('/pokemons')
            .post((req: Request, res: Response) => {
                let name = req.body.name;   //this requires body-parser package
                let attack = req.body.attack;
                res.status(200).send(name);
            })
        app.route('/pokemons/:id')
            .delete((req:Request, res: Response) => {
                let id = req.params.id;
                res.status(200).send(pokemons[id]);
                //logic to store in database
            })
    }


}