global.browser = require('webextension-polyfill');

chrome.runtime.onMessage.addListener((req, sender) => {
  if (sender.tab && typeof req.enableCopyCrack !== 'undefined') {
    const status = req.enableCopyCrack;
    chrome.browserAction.setIcon({
      tabId: sender.tab.id,
      path: {
        16: `/icons/16${status ? '' : '-gray'}.png`,
        32: `/icons/32${status ? '' : '-gray'}.png`,
        48: `/icons/48${status ? '' : '-gray'}.png`,
        128: `/icons/128${status ? '' : '-gray'}.png`,
      },
    });
  }
});
