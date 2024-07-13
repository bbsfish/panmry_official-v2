const PREFIX = "https://cf067016.cloudfree.jp/cms";
const OPTIONS = {
  method: 'GET',
  headers: {
    "api-key": "USR-c16e71d5fb31d953b384d9a1d820cc89f63001e2"
  }
};

const logger = (() => {
  const format = `[apis/cms]`;
  const log = (...args) => console.log(format, ...args);
  const error = (...args) => console.error(format, ...args);
  return {
    log, error,
  };
})();

const request = (() => {
  const _fetch = async (endpoint, options) => {
    try {
      logger.log(`fetch - ${options.method}`, endpoint);
      return await fetch(endpoint, options);
    } catch (error) {
      logger.error('@_fetch', error);
      throw error;
    }
  }

  const toJSON = async (endpoint, options = OPTIONS) => {
    let data;
    try {
      const response = await _fetch(endpoint, options);
      // responseText = await response.text();
      data = await response.json();
      return data;
    } catch (error) {
      logger.error('Error @toJSON', data, error);
      throw error;
    }
  }

  const toText = async (endpoint, options = OPTIONS) => {
    let data;
    try {
      const response = await _fetch(endpoint, options);
      data = await response.text();
      return data;
    } catch (error) {
      logger.error('@toJSON', data, error);
      throw error;
    }
  }

  return { toJSON, toText };
})();

let cms = {};

async function getItem(model) {
  return request.toJSON(`${PREFIX}/api/content/item/${model}`);
}

async function getItems(model, skip = 0, limit = 5) {
  return request.toJSON(`${PREFIX}/api/content/items/${model}?limit=${limit}&skip=${skip}`);
}

async function getOrderedItems(model, target, order = 1 /* 1: ASC, -1: DESC */) {
  return request.toJSON(`${PREFIX}/api/content/items/${model}?sort=%7B${target}%3A+${order}%7D`);
}

function getAssetFullPath(relative_path) {
  return `${PREFIX}/storage/uploads${relative_path}`;
}

const GetImage = (() => {
  const thumbnail = (_id, w, h) => request.toText(`${PREFIX}/api/assets/image/${_id}?m=thumbnail&w=${w}&h=${h}&mime=auto`);
  const bestFit = (_id, w, h) => request.toText(`${PREFIX}/api/assets/image/${_id}?m=bestFit&w=${w}&h=${h}&mime=auto`);
  const resize = (_id, w, h) => request.toText(`${PREFIX}/api/assets/image/${_id}?m=resize&w=${w}&h=${h}&mime=auto`);
  const fitToWidth = (_id, w) => request.toText(`${PREFIX}/api/assets/image/${_id}?m=fitToWidth&w=${w}&mime=auto`);
  // const fitToHeight = (_id, h) => request.toText(`${PREFIX}/api/assets/image/${_id}?m=fitToHeight&h=${h}&mime=auto`);
  return { thumbnail, bestFit, resize, fitToWidth };
})();

cms = { getItem, getItems, getAssetFullPath, getOrderedItems, GetImage };
export default cms;
