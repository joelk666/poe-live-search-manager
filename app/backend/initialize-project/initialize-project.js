import { ipcMain } from "electron";
import { ipcEvents } from "../../resources/IPCEvents/IPCEvents";
import { globalStore } from "../../GlobalStore/GlobalStore";
import * as webSocketActions from "../web-sockets/actions";
import store from "../web-sockets/store";

const connectToStoredWebSockets = () => {
  store.all().forEach(connectionDetails => {
    webSocketActions.connect(connectionDetails);
  });
};

const disconnectFromStoredWebSockets = () => {
  store.all().forEach(connectionDetails => {
    webSocketActions.disconnect(connectionDetails);
  });
};

const setupIpcEvents = () => {
  ipcMain.on(ipcEvents.WS_ADD, (event, connectionDetails) => {
    store.add(connectionDetails);

    const isLoggedIn = globalStore.get("isLoggedIn", false);

    if (isLoggedIn) {
      webSocketActions.connect(connectionDetails);
    }
  });

  ipcMain.on(ipcEvents.WS_REMOVE, (event, connectionDetails) => {
    const isLoggedIn = globalStore.get("isLoggedIn", false);

    if (isLoggedIn) {
      webSocketActions.disconnect(connectionDetails);
    }

    store.remove(connectionDetails.id);
  });

  ipcMain.on(ipcEvents.USER_LOGIN, () => {
    connectToStoredWebSockets();
  });

  ipcMain.on(ipcEvents.USER_LOGOUT, () => {
    disconnectFromStoredWebSockets();
  });
};

const loadLocallySavedWsConnectionsIntoStore = () => {
  const locallySavedWsConnections = globalStore.get("wsConnections", []);

  locallySavedWsConnections.forEach(connectionDetails => {
    store.add(connectionDetails);
  });
};

const initializeProject = () => {
  loadLocallySavedWsConnectionsIntoStore();

  setupIpcEvents();
};

export default initializeProject;
