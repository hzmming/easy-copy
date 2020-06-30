import { separator } from '@/utils/constant';

chrome.storage.sync.get({ webList: [] }, function(data) {
  const rules = data.webList.filter(i => i.includes(location.host));
  if (!rules.length) return;

  const match = rules.map(i => i.split(separator).pop());

  const param = {};
  match.forEach(i => (param[i] = true));

  window.postMessage(
    {
      easyCopyMessage: true,
      init: true,
      ...param,
    },
    '*'
  );

  param.enable && chrome.runtime.sendMessage({ enableCopyCrack: param.enable });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.updateOption) {
    delete request.updateOption;
    window.postMessage(
      {
        easyCopyMessage: true,
        ...request,
      },
      '*'
    );
  }
  sendResponse('');
});
