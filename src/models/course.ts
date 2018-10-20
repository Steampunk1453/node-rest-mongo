import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Define collection and schema for Course
export const Course = new Schema({
    course_name: {
        type: String
    },
    course_price: {
        type: Number
    }
});
