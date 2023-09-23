import mongoose from "mongoose";
import validator from "validator";

export interface IUser extends mongoose.Document {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    phone_number: string;
}

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'Please provide your first name'],
    },
    last_name: {
        type: String,
        required: [true, 'Please provide your last name']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide your email'],
        validate: {
            validator: (v: string) => validator.isEmail(v.toString()),
            message: 'Email already exist'
        }
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Please provide your username']
    },
    phone_number: {
        type: String,
        required: [true, 'Please provide your password']
    }
}, {
    timestamps: true
});

const User = mongoose.model<IUser>(
    'users',
    UserSchema
);

export default User;