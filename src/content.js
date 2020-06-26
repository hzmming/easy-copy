chrome.storage.sync.get({ isTurnOn: true, webList: [] }, function(data) {
  if (!data.isTurnOn) return;

  const rules = data.webList.find(i => i.includes(location.host));
  if (!rules.length) return;

  const param = rules
    .map(i => i.split('###').pop())
    .map(key => ({
      [key]: true,
    }));

  window.postMessage(
    {
      needCopyCrack: true,
      ...param,
    },
    '*'
  );
});
