/* Runs one project page selected by the HTML document's data-project attribute. */
(function () {
  const id = document.body.dataset.project;
  const project = window.PROJECT_CATALOG?.find(item => item.id === id);
  if (!project) {
    document.getElementById('app').textContent = '项目页面未找到。';
    return;
  }

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
  const guide = window.PROJECT_GUIDE?.[id];

  window.renderProjectApp(project);
  const app = document.getElementById('app');
  app.inert = true;
  const overlay = document.createElement('div');
  overlay.className = 'intro-overlay';
  overlay.innerHTML = '<section class="intro-dialog" role="dialog" aria-modal="true" aria-labelledby="introTitle" aria-describedby="introDescription">' +
    '<button class="intro-close" type="button" aria-label="关闭项目介绍">×</button>' +
    '<figure class="animal-art"><img src="../assets/project-animals/' + escapeHtml(project.animal) + '.svg" alt="' + escapeHtml(project.animalName) + '插画"><figcaption>✧ ' + escapeHtml(project.animalName) + '</figcaption></figure>' +
    '<div class="intro-copy"><span class="eyebrow">' + escapeHtml(project.collection) + ' · ' + escapeHtml(project.category) + '</span>' +
    '<h2 id="introTitle">' + escapeHtml(project.title) + '</h2><p id="introDescription">' + escapeHtml(guide?.[1] || project.desc) + '</p>' +
    '<div class="intro-flow"><strong>谁会使用</strong><p>' + escapeHtml(guide?.[0] || project.category) + '</p><strong>实际业务流程</strong><p>' + (guide ? guide.slice(2, 5) : project.flow).map(escapeHtml).join(' → ') + '</p></div>' +
    '<p class="intro-status">当前未接入原项目数据库和 API；需要真实服务的功能暂不可用。</p>' +
    '<button class="btn primary intro-confirm" type="button">确定，查看项目 ↗</button></div></section>';
  document.body.append(overlay);
  document.body.classList.add('intro-open');
  const close = () => { window.location.href = './index.html#/projects'; };
  const confirm = () => {
    overlay.remove();
    app.inert = false;
    document.body.classList.remove('intro-open');
    app.querySelector('main')?.focus();
  };
  const closeButton = overlay.querySelector('.intro-close');
  const confirmButton = overlay.querySelector('.intro-confirm');
  closeButton.addEventListener('click', close);
  confirmButton.addEventListener('click', confirm);
  overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
  overlay.addEventListener('keydown', event => {
    if (event.key === 'Escape') close();
    if (event.key === 'Tab') {
      const last = event.shiftKey ? closeButton : confirmButton;
      if (document.activeElement === last) {
        event.preventDefault();
        (event.shiftKey ? confirmButton : closeButton).focus();
      }
    }
  });
  closeButton.focus();
})();
