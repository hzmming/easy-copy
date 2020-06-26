window.addEventListener('message', e => {
  if (!e.needCopyCrack) return;

  // 解除复制限制
  e.enableCopy && crackCopy();

  // 解除选中限制
  e.enableSelect && crackSelect();

  // 解除右键限制
  e.enableContextMenu && crackContextMenu();
});

function crackCopy() {
  window.addEventListener('copy', e => e.stopImmediatePropagation(), true);
}

function crackSelect() {
  window.addEventListener('selectstart', e => e.stopImmediatePropagation(), true);
  const style = document.createElement('style');
  style.innerHTML = `
      * { 
        user-select: none !important;
      }
    `;
  document.documentElement.appendChild(style);
}

function crackContextMenu() {
  window.addEventListener('contextmenu', e => e.stopImmediatePropagation(), true);
}
