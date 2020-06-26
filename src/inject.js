function injectCustomJs(jsPath) {
  const temp = document.createElement('script');
  temp.async = false;
  temp.setAttribute('type', 'text/javascript');
  /**
   * 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
   */
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function() {
    // 放在页面不好看，执行完后移除掉
    this.parentNode.removeChild(this);
  };
  document.documentElement.appendChild(temp);
}

injectCustomJs('injects.js');
