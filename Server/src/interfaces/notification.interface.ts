import { Document } from "mongoose";

export interface INotification extends Document {
    user_id: string;
    project_id: string;
    post_id: string;
    comment_id: string;
    channel: string;
    message: string;
}


