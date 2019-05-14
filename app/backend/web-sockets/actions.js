import { Notification } from "electron";
import WebSocket from "ws";
import getWindowByName from "../utils/get-window-by-name/get-window-by-name";
import * as JavaScriptUtils from "../../utils/JavaScriptUtils/JavaScriptUtils";
import { ipcEvents } from "../../resources/IPCEvents/IPCEvents";
import store from "./store";

const doNotify = ({ notificationMessage }) => {
  new Notification({
    title: "PoE Sniper Pro",
    body: notificationMessage
  }).show();
};

const setupWebSocketListeners = webSocket => {
  webSocket.on("message", message => {
    doNotify({
      notificationMessage: message
    });

    const window = getWindowByName("PoE Sniper");

    window.webContents.send(ipcEvents.TRADE_MESSAGE, message);
  });
};

export const connect = connectionDetails => {
  const newWebsocket = new WebSocket(connectionDetails.uri);

  newWebsocket.on("open", () => {
    store.update(connectionDetails.id, newWebsocket);

    setupWebSocketListeners(newWebsocket);
  });
};

export const disconnect = connectionDetails => {
  const ws = store.get(connectionDetails.id);

  if (JavaScriptUtils.isDefined(ws.socket)) {
    ws.socket.close();
  }
};
