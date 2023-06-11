import {model, Schema} from 'mongoose';
import {IUser} from '@/interfaces/user.interface';

const UserSchema: Schema = new Schema({
    phone: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {
    timestamps: true
});

export default model<IUser>('User', UserSchema);
