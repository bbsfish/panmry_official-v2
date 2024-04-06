const PREFIX = "https://cf067016.cloudfree.jp/cms";
const OPTIONS = {
  method: 'GET',
  headers: {
    "api-key": "USR-c16e71d5fb31d953b384d9a1d820cc89f63001e2"
  }
};

const request = async (endpoint) => {
  try {
    console.log("CMS - ", endpoint);
    const response = await fetch(endpoint, OPTIONS);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

let cms = {};

async function getItem(model) {
  return request(`${PREFIX}/api/content/item/${model}`);
}

async function getItems(model, skip = 0, limit = 10) {
  return request(`${PREFIX}/api/content/items/${model}?limit=${limit}&skip=${skip}`);
}

async function getOrderedItems(model, target, order = 1 /* 1: ASC, -1: DESC */) {
  return request(`${PREFIX}/api/content/items/${model}?sort=%7B${target}%3A+${order}%7D`);
}

function getAssetFullPath(relative_path) {
  return `${PREFIX}/storage/uploads${relative_path}`;
}

cms = { getItem, getItems, getAssetFullPath, getOrderedItems };
export default cms;
