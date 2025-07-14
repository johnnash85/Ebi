export const config = {
    production: process.env.PRODUCTION || false,
    jwt: {
        secret: process.env.JWT_SECRET || 'GitUsers',
    },
    api: {
        web: "",//''
    },
    socket: {
        url: process.env.ENDPOINT || "",//
        secure: true,
        pingInterval: process.env.PING_INTERVAL || 10000,
        pingTimeout: process.env.PING_TIMEOUT || 60000,
        withCredentials: false,
        rejectUnauthorized: false,
        transports: ["websocket", "polling"],
        reconnectionAttempts: "infinity",
        reconnectionDelay: process.env.RECONNECTION_DELAY || 1000,
        reconnectionDelayMax: process.env.RECONNECTION_DELAY_MAX || 5000,
        allowUpgrades: process.env.ALLOW_UPGRADES || false,
        reconnect: true,
        log: false
    },
    chatService: {
        active: false,
        port: process.env.CHAT_SRV_PORT || ,
        path: process.env.PATH_SOCKET || '/ebi_chat',
        channel: process.env.CHAT_SRV_CHANNEL || 'chat',//'api_chat/chat',
    },
    notificationService: {
        active: false,
        port: process.env.CHAT_SRV_PORT || ,
        path: process.env.PATH_SOCKET || '/ebi_notification',
        channel: process.env.CHAT_SRV_CHANNEL || 'notification',//'api_chat/notification',
    },
    tradeService: {
        active: true,
        port: process.env.CHAT_SRV_PORT || ,
        path: process.env.PATH_SOCKET || '/ebi_trade',
        channel: process.env.CHAT_SRV_CHANNEL || 'trade',//'api_chat/notification',
    },
    paypal:
    {
       
    }

}