export const ipcEvents = {
  WS_ADD: "wsAdd",
  WS_REMOVE: "wsRemove",
  RESULTS_UPDATE: "resultsUpdate",
  USER_LOGIN: "userLogin",
  USER_LOGOUT: "userLogout",
  SOCKET_STATE_UPDATE: "socketStateUpdate",
  RECONNECT_SOCKET: "reconnectSocket",
  RECONNECT_ALL: "reconnectAllSockets",
  GET_SOCKETS: "getSockets",
  SEND_SOCKETS: "sendSockets",
  TEST_NOTIFICATION: "testNotification",
  FETCH_SUBSCRIPTION_DETAILS: "fetchSubscriptionDetails",
  GET_SUBSCRIPTION_DETAILS: "getSubscriptionDetails",
  SEND_SUBSCRIPTION_DETAILS: "sendSubscriptionDetails",
  DROP_SCHEDULED_RESULTS: "dropScheduledResults",
  RATE_LIMIT_STATUS_CHANGE: "rateLimitStatusChange",
  ID_TOKEN_CHANGED: "idTokenChanged",
  PRIVACY_POLICY_UPDATE_FAIL: "privacyPolicyUpdateFail",
};
