import axios from "axios";
//import { I18n } from "react-redux-i18n";
import { config } from "../../config";
import socketIOClient, { io } from "socket.io-client";
//import formatMessage from '../../utils/message';
//import formatUser from '../../utils/user';
//import formatNotification from '../../utils/notification';
import {
    UPDATE_TICKER_STOCK_QUOTE,
    ////////////////////
    UPDATE_TICKER_OPTION_QUOTE
    //////////////////
    ///////////////
} from '../types/eventTypes';
/*
import {
    CONTACT_ONLINE,
    CONTACT_OFFLINE,
    CONTACTS_ONLINE,
    /////////////////////
    UPDATE_BADGET_LIST_CONTACTS
} from "../types/contactsTypes";
import {
    RECEIVE_MESSAGE,
    CONFIRM_MESSAGE_READ,
    CONFIRM_MESSAGE_RECEIVE
} from "../types/messageTypes";
import {
    RECEIVE_NOTIFICATION,
} from "../types/notificationTypes";
*/
var user_id, token;
//crea una o n instancia de socket, si se requiere crear una nueva instancia es agreagar a lado de la url  // , { forceNew: true } //+ ":" + config.notificationService.port 
/*const socketNotification = io(config.socket.url + "/" + config.notificationService.channel, {
    transports: config.socket.transports,
    withCredentials: config.socket.withCredentials,
    //forceNew: true,
    secure: config.socket.secure,
    reconnect: config.socket.reconnect,
    rejectUnauthorized: config.socket.rejectUnauthorized,
    //port: config.notificationService.port,
    path: config.notificationService.path,
    reconnectionDelay: config.socket.reconnectionDelay,
    reconnectionDelayMax: config.socket.reconnectionDelayMax,
    reconnectionAttempts: config.socket.reconnectionAttempts
});//"https://server-domain.com"  wss://

const socketChat = io(config.socket.url + "/" + config.chatService.channel, {//":" + config.chatService.port + 
    transports: config.socket.transports,
    withCredentials: config.socket.withCredentials,
    //forceNew: true,
    secure: config.socket.secure,
    reconnect: config.socket.reconnect,
    rejectUnauthorized: config.socket.rejectUnauthorized,
    //port: config.chatService.port,
    path: config.chatService.path,
    reconnectionDelay: config.socket.reconnectionDelay,
    reconnectionDelayMax: config.socket.reconnectionDelayMax,
    reconnectionAttempts: config.socket.reconnectionAttempts
});
*/
export function updateStock(item) {
    return {
        type: UPDATE_TICKER_STOCK_QUOTE,
        item: item
    };
}

export function updateOption(item) {
    return {
        type: UPDATE_TICKER_OPTION_QUOTE,
        item: item
    };
}


let socketTrade = null;
const log = config.socket.log;

export const initConextionSocket = (data: Object) => async (dispatch) => {

    if (!config.tradeService.active) return;

    socketTrade = io(config.socket.url + "/" + config.tradeService.channel, {//":" + config.chatService.port + 
        transports: config.socket.transports,
        withCredentials: config.socket.withCredentials,
        //forceNew: true,
        secure: config.socket.secure,
        reconnect: config.socket.reconnect,
        rejectUnauthorized: config.socket.rejectUnauthorized,
        port: config.tradeService.port,
        path: config.tradeService.path,
        reconnectionDelay: config.socket.reconnectionDelay,
        reconnectionDelayMax: config.socket.reconnectionDelayMax,
        reconnectionAttempts: config.socket.reconnectionAttempts
    });

    socketTrade.on("connect", () => {
        //console.log(socketChat.connected); // true
        log && console.log("Ebi Trade connect"); // true
    });

    socketTrade.on("disconnect", () => {
        log && console.log("Ebi Trade desconectado"); // true
    });

    socketTrade.on("reconnection_attempt", () => {  // ...
        log && console.log("Ebi Trade reconectando"); // true
    });
    socketTrade.on("reconnect", () => {  // ...
        log && console.log("Ebi Trade reconectado"); // true
    });

    //socket.on("connect_error", () => { socket.auth.token = "abcd"; socket.connect(); });
    // or if the `auth` attribute is a functionconst socket = io({  auth: (cb) => {    cb(localStorage.getItem("token"));  }});
    socketTrade.on("connect_error", (err) => {
        log && console.log(err.req);	     // el objeto de la solicitud
        log && console.log(err.code);     // el código de error, por ejemplo 1
        log && console.log(err.message);  // el mensaje de error, por ejemplo, "ID de sesión desconocida"
        log && console.log(err.context);  // algún contexto de error adicional
        setTimeout(() => { socketTrade.connect(); }, 1000);
    });

    socketTrade.on("stock", (data) => {
        log && console.log(data);
        dispatch(updateStock(data));
    });

    socketTrade.on("option", (data) => {
        log && console.log(data);
        dispatch(updateOption(data));
    });
}

export const closeConextionSocket = () => async (dispatch) => {
    socketTrade && socketTrade.disconnect();
    //socket.close()
    socketTrade = null;
}

export const suscribeStock = (data: Object) => async (dispatch) => {
    socketTrade.emit("suscribeStock", data);
    log && console.log("suscribeStock");

}

export const suscribeOption = (data: Object) => async (dispatch) => {
    socketTrade.emit("suscribeOption", data);
    log && console.log("suscribeOption");

}

/*
export function eventChat(data) {
    return {
        type: EVENT_CHAT,
        data: data
    }
};
export function setContactEvent(data) {
    return {
        type: UPDATE_CONTACT_EVENT,
        item: data
    };
}

export function removeContactEvent(error) {
    return {
        type: CLEAR_CONTACT_EVENT,
    };
}
*/
/////////////////////////////////////message
/*export function receiveMessage(data) {
    axios.put(config.api.godiway + "message/receive", {
        id: data.id,
        user_id: user_id,
        token: token,
        lang: I18n.t("locale")
    }, {
        headers: { Authorization: `Bearer ${data.token}` },
    })
        .then(function (response) {
            //console.log(response);
            /*if (response.status < 300) {
              if (response.data.status === "Success")
                dispatch(successStoreMessage(response.data.item, data.id));
              else dispatch(failedStoreMessage(response.data.description, data.id));
            } else {
              dispatch(failedStoreMessage("try_later"), data.id);
            }*/
/* })
 .catch(function (error) {
     console.log(error);
     return;
 });
return {
 type: RECEIVE_MESSAGE,
 data: data
}
};

export function confirmMessageReceive(data) {
return {
 type: CONFIRM_MESSAGE_RECEIVE,
 data: data
}
}

export function confirmMessageRead(data) {
return {
 type: CONFIRM_MESSAGE_READ,
 data: data
}
}
/*
export function receiveNotification(data) {
return {
type: RECEIVE_NOTIFICATION,
data: data
}
};
//////////////////////////////// Contacts
export function receiveMembers(list) {
return {
 type: CONTACTS_ONLINE,
 list: list
}
};
export function setOnlineContact(data) {
return {
 type: CONTACT_ONLINE,
 data: data
};
}
export function setOfflineContact(data) {
return {
 type: CONTACT_OFFLINE,
 data: data
};
}
export function setBadgetContact(data) {//Actualiza Contacts
return {
 type: UPDATE_BADGET_LIST_CONTACTS,
 data: data
}
};
////////////////////////////////notifications

///////////////////////////////////////

export const updateContactEvent = (data: Object) => async dispatch => {
dispatch(setContactEvent(data));
}

export const clearContactEvent = (data: Object) => async dispatch => {
dispatch(removeContactEvent());
}

export const setOnLineContact = (data: Object) => async (dispatch) => {
dispatch(setOnlineContact(data));
};
*/




/*
export const initConextionSocket = (data_ini: Object) => async (dispatch) => {
    socketChat.on("connect", () => {
        //console.log(socketChat.connected); // true
        log && console.log("Godiwayer Chat connect"); // true
    });

    socketChat.on("disconnect", () => {
        log && console.log("Godiwayer Chat desconectado"); // true
    });

    socketChat.on("reconnection_attempt", () => {  // ...
        log && console.log("Godiwayer Chat reconectando"); // true
    });
    socketChat.on("reconnect", () => {  // ...
        log && console.log("Godiwayer Chat reconectado"); // true
    });

    //socket.on("connect_error", () => { socket.auth.token = "abcd"; socket.connect(); });
    // or if the `auth` attribute is a functionconst socket = io({  auth: (cb) => {    cb(localStorage.getItem("token"));  }});
    socketChat.on("connect_error", (err) => {
        log && console.log(err.req);	     // el objeto de la solicitud
        log && console.log(err.code);     // el código de error, por ejemplo 1
        log && console.log(err.message);  // el mensaje de error, por ejemplo, "ID de sesión desconocida"
        log && console.log(err.context);  // algún contexto de error adicional
        setTimeout(() => { socketChat.connect(); }, 1000);
    });
    //socket.volatile.emit("hello", "might or might not be received");

    socketChat.on("members", (data) => {
        dispatch(receiveMembers(data));
        log && console.log("miembros");
        log && console.log(data);
    });
    socketChat.on("user_online", (data) => {
        log && console.log(data);
        log && console.log("miembro online");
        dispatch(setOnlineContact(data));

    });
    socketChat.on("user_offline", (data) => {
        // dispatch(removeMember(data));
        log && console.log("miembro offline");
        if (data != null && data != undefined)
            dispatch(setOfflineContact(data));
        log && console.log("miembro offline");
        log && console.log(data);
    });

    socketChat.on("message_new", (data) => {
        log && console.log(data);
        data.is_seen = 1;
        socketChat.emit("message_receive", data);
        log && console.log('message receive send');
        dispatch(receiveMessage(data));
        dispatch(setBadgetContact(data));
    });

    socketChat.on("message_receive", (data) => {
        log && console.log(data);
        dispatch(confirmMessageReceive(data));
        log && console.log('message receive');
    });

    socketChat.on("message_read", (data) => {
        log && console.log(data);
        dispatch(confirmMessageRead(data));
        log && console.log('message  read');
    });

    let timer;
    socketChat.on("event", (data) => {
        log && console.log('typingOn');
        dispatch(eventChat(data));
        clearInterval(timer);
        timer = setTimeout(() => {
            dispatch(
                eventChat({
                    socket: data.socket,///
                    status: 'typingOFF',
                    user_id: data.user_id
                }));
            log && console.log('typingOFF');
        }, 3000);
        //
    });
    ///////////////////////////////////////////////////
    socketNotification.on("connect", () => {
        //log && console.log(socketNotification.connected); // true
        log && console.log("Godiwayer Notification connect"); // true
    });

    socketNotification.on("disconnect", () => {
        log && console.log("Godiwayer Notification desconectado"); // true
    });

    socketNotification.on("reconnection_attempt", () => {  // ...
        log && console.log("Godiwayer Notification reconectando"); // true
    });
    socketNotification.on("reconnect", () => {  // ...
        log && console.log("Godiwayer Notification reconectado"); // true
    });

    socketNotification.on("connect_error", (err) => {
        log && console.log(err.req);	     // el objeto de la solicitud
        log && console.log(err.code);     // el código de error, por ejemplo 1
        log && console.log(err.message);  // el mensaje de error, por ejemplo, "ID de sesión desconocida"
        log && console.log(err.context);  // algún contexto de error adicional
        setTimeout(() => { socketNotification.connect(); }, 1000);
    });
    */
/*
  socketNotification.on("notify", (data) => {
    console.log(data);
    dispatch(receiveNotification(data));
    console.log('notification receive');
  });
  */
//}
/*
export const sendMessage = (data: Object) => async (dispatch) => {
    log && console.log(data);
    socketChat.emit("message_new", formatMessage(data));//.in(roomId).to(data.online)//
    log && console.log("send message");
}

export const sendEvent = (data: Object) => async (dispatch) => {
    log && console.log(data);
    socketChat.emit("event", data);//.in(roomId).to(data.online)
    log && console.log("send Event");
}


export const sendNotification = (data: Object) => async (dispatch) => {
    log && console.log(data);
    socketNotification.emit("notify", formatNotification(data));//.in(roomId).to(data.online)
    log && console.log("send notification");
}

export const userOnline = (data: Object) => async (dispatch) => {
    if (log) {
        console.log("Login Chat and Notification");
        console.log(data);
    }
    user_id = data.id;
    token = data.access_token;
    socketChat.emit("user_online", formatUser(data));//.in(roomId)
    socketNotification.emit("user_online", formatUser(data));
    log && console.log("Send Chat and Notification user online");
}

export const userOffline = (data: Object) => async (dispatch) => {
    log && console.log(data);
    socketChat.emit("user_offline", data);//.in(roomId)
    socketNotification.emit("user_offline", data);
    log && console.log("Logout");
}

export const loadContactsOnline = (data: Object) => async (dispatch) => {
    socketChat.emit("members", data);
    log && console.log("ask members");
}



*/

/**
 * socket.join('private-message-room'); unirme a un room
 * socket.leave('private-message-room');salirme de un room
 * socket.in('private-message-room').emit('new_msg', {msg: 'hello'});
 * io.in(theSocketId).socketsLeave("room1");
 * // make all Socket instances disconnectio.disconnectSockets();
// make all Socket instances in the "room1" room disconnect (and discard the low-level connection)io.in("room1").disconnectSockets(true);
// make all Socket instances in the "room1" room of the "admin" namespace disconnectio.of("/admin").in("room1").disconnectSockets();
// this also works with a single socket IDio.of("/admin").in(theSocketId).disconnectSockets();



// return all Socket instancesconst sockets = await io.fetchSockets();
// return all Socket instances in the "room1" room of the main namespaceconst sockets = await io.in("room1").fetchSockets();
// return all Socket instances in the "room1" room of the "admin" namespaceconst sockets = await io.of("/admin").in("room1").fetchSockets();
// this also works with a single socket IDconst sockets = await io.in(theSocketId).fetchSockets();
 */
