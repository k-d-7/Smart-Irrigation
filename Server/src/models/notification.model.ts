import { INotification } from "@interfaces/notification.interface";
import { Schema, model } from "mongoose";

const notificationSchema: Schema = new Schema({
    user_id: { type: String},
    project_id: { type: String},
    post_id: { type: String},
    comment_id: { type: String},
    channel: { type: String, required: true },
    message: { type: String, required: true },
}, {
    timestamps: true,
});

export default model<INotification>("Notification", notificationSchema);
