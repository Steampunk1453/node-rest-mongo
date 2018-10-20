import {Request, Response} from "express";
import {Course} from "../models/course";
import * as mongoose from 'mongoose';

const course = mongoose.model('course', Course);

export class Courses {

    public routes(app): void { //received the express instance from app.ts file

        app.route('/courses')
            .get((req: Request, res: Response) => {
                course.find({}, (err, course) => {
                    if(err){
                        res.send(err);
                    }
                    res.json(course);
                });
            });

        app.route('/course/:id')
            .get((req: Request, res: Response) => {
                course.findById(req.params.id, (err, course) => {
                    if(err){
                        res.send(err);
                    }
                    res.json(course);
                });
            });

        app.route('/course')
            .post((req: Request, res: Response) => {
                let newCourse = new course(req.body);
                newCourse.save({}, (err) => {
                    if(err){
                        res.send(err);
                    }
                    res.status(200).json({'course': 'Course added successfully'});
                });
            });

        app.route('/course/:id')
            .put((req: Request, res: Response) => {
                course.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, course) => {
                    if(err){
                        res.send(err);
                    }
                    res.json(course);
                });

            });

        app.route('/course/:id')
            .delete((req: Request, res: Response) => {
                course.deleteOne({_id: req.params.id}, (err) => {
                    if(err){
                        res.send(err);
                    }
                    res.json({ message: 'Successfully deleted contact!'});
                });

            })
    }


}