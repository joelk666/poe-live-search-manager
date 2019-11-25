import fetch from "node-fetch";
import * as baseUrls from "../../resources/BaseUrls/BaseUrls";
import * as javaScriptUtils from "../../utils/JavaScriptUtils/JavaScriptUtils";
import * as electronUtils from "../utils/electron-utils/electron-utils";
import ItemFetchError from "../../errors/item-fetch-error";
import requestLimiter from "../request-limiter/request-limiter";
import { currencyNames } from "../../resources/CurrencyNames/CurrencyNames";
import { ipcEvents } from "../../resources/IPCEvents/IPCEvents";
import { windows } from "../../resources/Windows/Windows";
import mutex from "../mutex/mutex";

const startReservoirIncreaseListener = () => {
  const intervalId = setInterval(() => {
    const limiter = requestLimiter.getInstance();

    return limiter.currentReservoir().then(currentReservoir => {
      if (
        currentReservoir > 0 &&
        requestLimiter.isActive === true &&
        !mutex.isLocked()
      ) {
        requestLimiter.isActive = false;

        electronUtils.send(
          windows.POE_SNIPER,
          ipcEvents.RATE_LIMIT_STATUS_CHANGE,
          requestLimiter.isActive
        );

        clearInterval(intervalId);
      }
    });
  }, 1000);
};

export const fetchItemDetails = id => {
  return mutex.acquire().then(release => {
    const limiter = requestLimiter.getInstance();

    return limiter.schedule(() => {
      release();

      const itemUrl = `${baseUrls.poeFetchAPI + id}`;

      return fetch(itemUrl)
        .then(data => data.json())
        .then(parsedData =>
          limiter.currentReservoir().then(currentReservoir => {
            if (currentReservoir === 0 && requestLimiter.isActive === false) {
              requestLimiter.isActive = true;

              electronUtils.send(
                windows.POE_SNIPER,
                ipcEvents.RATE_LIMIT_STATUS_CHANGE,
                requestLimiter.isActive
              );

              startReservoirIncreaseListener();
            }

            const itemDetails = javaScriptUtils.safeGet(parsedData, [
              "result",
              0,
            ]);

            if (javaScriptUtils.isDefined(itemDetails)) {
              return itemDetails;
            }

            throw new ItemFetchError(`Item details not found for ${itemUrl}`);
          })
        );
    });
  });
};

export const getWhisperMessage = itemDetails => {
  const whisperMessage = javaScriptUtils.safeGet(itemDetails, [
    "listing",
    "whisper",
  ]);

  if (!javaScriptUtils.isDefined(whisperMessage)) {
    return "";
  }

  return whisperMessage;
};

export const getPrice = whisperMessage => {
  const currencies = currencyNames.join("|");
  const pattern = `\\d+\\.?\\d* (${currencies})+`;
  const regexp = new RegExp(pattern);
  const matchDetails = whisperMessage.match(regexp);

  // => `match` returns `null` if there's no corresponding item in the string.
  if (!javaScriptUtils.isDefined(matchDetails)) {
    return "";
  }

  return `~b/o ${matchDetails[0]}`;
};

export const notifyUser = (itemName, price) => {
  const title = `New ${itemName} listed`;

  electronUtils.doNotify({
    title,
    body: price,
  });
};