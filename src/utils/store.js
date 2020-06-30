export const getWebList = () => {
  return new Promise(resolve => {
    chrome.storage.sync.get({ webList: [] }, data => {
      resolve(data.webList);
    });
  });
};

export const hasItem = item => {
  return new Promise(resolve => {
    chrome.storage.sync.get({ webList: [] }, data => {
      resolve(data.webList.includes(item));
    });
  });
};

export const deleteItem = async item => {
  let webList = await getWebList();
  webList = webList.filter(i => i !== item);
  return new Promise(resolve => {
    chrome.storage.sync.set(
      {
        webList,
      },
      () => resolve(true)
    );
  });
};

export const toggleItem = async item => {
  let webList = await getWebList();
  return new Promise(resolve => {
    if (!webList.includes(item)) {
      webList.push(item);
    } else {
      webList = webList.filter(i => i !== item);
    }
    chrome.storage.sync.set(
      {
        webList,
      },
      () => resolve(true)
    );
  });
};
