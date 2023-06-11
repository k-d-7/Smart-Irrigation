import { INotification } from "@interfaces/notification.interface";
import Notification from "@/models/notification.model";
import { NotificationParams } from "@/params/params";

class NotificationService {
    public async createNotification(params: NotificationParams): Promise<INotification> {
        const newNotification = await Notification.create({...params});
        if (!newNotification) {
            throw new Error('Error in creating notification');
        }

        return newNotification;
    }

    public async getNotificationById(id: string): Promise<INotification> {
        const notification = await Notification.findById(id);
        if (!notification) {
            throw new Error('Notification not found');
        }

        return notification;
    }

    public async getNotificationsByUserId(id: string): Promise<INotification[]> {
        const notifications = await Notification.find({ user_id: id });
        if (!notifications) {
            throw new Error('Notification not found');
        }

        return notifications;
    }
    
    public async getNotificationsByProjectId(id: string): Promise<INotification[]> {
        const notifications = await Notification.find({ project_id: id });  
        if (!notifications) {
            throw new Error('Notification not found');
        }

        return notifications;
    }

    public async getNotificationsByPostId(id: string): Promise<INotification[]> {
        const notifications = await Notification.find({ post_id: id });
        if (!notifications) {
            throw new Error('Notification not found');
        }

        return notifications;
    }

    public async getNotificationsByCommentId(id: string): Promise<INotification[]> {
        const notifications = await Notification.find({ comment_id: id });
        if (!notifications) {
            throw new Error('Notification not found');
        }

        return notifications;
    }

    public async deleteNotificationById(id: string): Promise<void> {
        const notification = await Notification.deleteOne({ _id: id });
        if (!notification) {
            throw new Error('Notification not found');
        }

        return;
    }
}

export default NotificationService;