export default () => {
  const style = document.createElement('style');
  style.innerHTML = `
        * { 
          user-select: none !important;
        }
      `;

  // 记录事件是否添加，避免重复添加
  const event = {
    copy: false,
    select: false,
    contextMenu: false,
  };

  const opt = {};
  window.addEventListener('message', e => {
    if (typeof e.data.easyCopyMessage === 'undefined') return;

    Object.assign(opt, e.data);

    if (opt.init && !opt.enable) return;

    // 解除复制限制
    if (typeof e.data.enableCopy !== 'undefined') {
      processCopy();
    }

    // 解除选中限制
    if (typeof e.data.enableSelect !== 'undefined') {
      processSelect();
    }

    // 解除右键限制
    if (typeof e.data.enableContextMenu !== 'undefined') {
      processContextMenu();
    }
  });

  function processCopy() {
    if (opt.enableCopy && !event.copy) {
      window.addEventListener(
        'copy',
        e => {
          if (!opt.enable || !opt.enableCopy) return;
          e.stopImmediatePropagation();
        },
        true
      );
      event.copy = true;
    }
  }

  function processSelect() {
    if (opt.enableSelect && !event.select) {
      window.addEventListener(
        'selectstart',
        e => {
          if (!opt.enable || !opt.enableSelect) return;
          e.stopImmediatePropagation();
        },
        true
      );
      event.select = true;
    }
    processSelectCss(opt.enableSelect);
  }

  function processContextMenu() {
    if (opt.enableContextMenu && !event.contextMenu) {
      window.addEventListener(
        'contextmenu',
        e => {
          if (!opt.enable || !opt.enableContextMenu) return;
          e.stopImmediatePropagation();
        },
        true
      );
    }
  }

  function processSelectCss(status) {
    status ? document.documentElement.appendChild(style) : style.remove();
  }
};
