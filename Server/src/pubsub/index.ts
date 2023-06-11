import ioInstance from "@/utils/socket";

const subscribe = (channel: string) => {
    ioInstance.emit("subscribe", () => {
        console.log("subscribed to channel: " + channel);
    });
}

const unsubscribe = (channel: string) => {
    ioInstance.emit("unsubscribe", () => {
        console.log("unsubscribed from channel: " + channel);
    });
}

const publish = (channel: string, message: any) => {
    ioInstance.to(channel).emit("message", message, () => {
        console.log("published to channel: " + channel + " message: " + message.toString());
    });
}

export {
    subscribe,
    unsubscribe,
    publish
}
