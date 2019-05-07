import React, { Component } from "react";
import MaterialTable from "material-table";
import { store } from "../../../../resources/Store/Store";
import { ipcEvents } from "../../../../resources/IPCEvents/IPCEvents";
import * as TableColumns from "../../../resources/TableColumns/TableColumns";

// https://github.com/electron/electron/issues/7300#issuecomment-274269710
const electron = window.require("electron");
const { ipcRenderer } = electron;

class Trade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: store.get("messages") || []
    };

    this.addItemMessage = this.addItemMessage.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on(ipcEvents.ON_MESSAGE, this.addItemMessage);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(ipcEvents.ON_MESSAGE, this.addItemMessage);
  }

  addItemMessage(_, itemData) {
    const { messages } = this.state;

    const parsedItemData = JSON.parse(itemData);

    messages.unshift(parsedItemData);

    store.set("messages", messages);

    this.setState({
      messages
    });
  }

  render() {
    const {
      messages: [...messages]
    } = this.state;
    return (
      <MaterialTable
        title="Active connections"
        columns={TableColumns.tradeScreen}
        data={messages}
      />
    );
  }
}

export default Trade;
