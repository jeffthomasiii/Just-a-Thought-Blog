(function () {
  'use strict';

  var tool = document.querySelector('[data-author-share]');
  var article = document.querySelector('[data-article-actions]');
  if (!tool || !article) return;

  var AUTHOR_MODE_KEY = 'jat-author-share-enabled';
  var apiUrl = tool.getAttribute('data-api-url') || '';
  var status = tool.querySelector('[data-author-status]');
  var results = tool.querySelector('[data-author-results]');
  var preview = tool.querySelector('[data-author-article-preview]');
  var generateButton = tool.querySelector('[data-author-generate]');
  var clearButton = tool.querySelector('[data-author-clear]');
  var lastFocus = null;

  var data = {
    title: article.getAttribute('data-title') || document.title,
    description: article.getAttribute('data-description') || '',
    url: article.getAttribute('data-url') || window.location.href.split('?')[0],
    scripture: article.getAttribute('data-scripture') || '',
    categories: article.getAttribute('data-categories') || '',
    tags: article.getAttribute('data-tags') || '',
    series: article.getAttribute('data-series') || ''
  };

  var platformUrls = {
    facebook: function () { return 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(data.url); },
    threads: function (text) { return 'https://www.threads.net/intent/post?text=' + encodeURIComponent(text); },
    linkedin: function () { return 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(data.url); },
    x: function (text) { return 'https://x.com/intent/tweet?text=' + encodeURIComponent(text); },
    instagram: function () { return 'https://www.instagram.com/'; },
    'text-message': function (text) { return 'sms:?&body=' + encodeURIComponent(text); }
  };

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var box = document.createElement('textarea');
      box.value = text;
      box.setAttribute('readonly', '');
      box.style.position = 'fixed';
      box.style.opacity = '0';
      document.body.appendChild(box);
      box.select();
      try {
        var ok = document.execCommand('copy');
        document.body.removeChild(box);
        ok ? resolve() : reject(new Error('Copy failed'));
      } catch (error) {
        document.body.removeChild(box);
        reject(error);
      }
    });
  }

  function selectedPlatforms() {
    return Array.prototype.slice.call(tool.querySelectorAll('fieldset:first-of-type input:checked')).map(function (input) {
      return input.value;
    });
  }

  function selectedAngle() {
    var input = tool.querySelector('input[name="jat-author-angle"]:checked');
    return input ? input.value : 'general article announcement';
  }

  function openTool() {
    lastFocus = document.activeElement;
    preview.innerHTML = '<strong>' + escapeHtml(data.title) + '</strong>' + escapeHtml(data.description || data.url);
    tool.hidden = false;
    document.body.style.overflow = 'hidden';
    var first = tool.querySelector('input, button, textarea');
    if (first) first.focus();
  }

  function closeTool() {
    tool.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, function (character) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character];
    });
  }

  function platformLabel(name) {
    return {'facebook':'Facebook','threads':'Threads','linkedin':'LinkedIn','x':'X','instagram':'Instagram','text-message':'Text message'}[name] || name;
  }

  function renderCaptions(captions) {
    results.innerHTML = '';
    selectedPlatforms().forEach(function (platform) {
      if (typeof captions[platform] !== 'string') return;
      var card = document.createElement('section');
      card.className = 'jat-author-share__card';
      card.innerHTML = '<h3>' + escapeHtml(platformLabel(platform)) + '</h3>' +
        '<textarea aria-label="' + escapeHtml(platformLabel(platform)) + ' caption"></textarea>' +
        '<div class="jat-author-share__card-actions"><button type="button" data-copy-caption>Copy</button><a target="_blank" rel="noopener noreferrer" data-open-platform>Open platform</a></div>';
      var textarea = card.querySelector('textarea');
      textarea.value = captions[platform];
      card.querySelector('[data-copy-caption]').addEventListener('click', function (event) {
        copyText(textarea.value).then(function () {
          event.target.textContent = 'Copied';
          window.setTimeout(function () { event.target.textContent = 'Copy'; }, 1800);
        }).catch(function () {
          status.textContent = 'The caption could not be copied. Select it manually and try again.';
        });
      });
      var openLink = card.querySelector('[data-open-platform]');
      var urlBuilder = platformUrls[platform];
      openLink.href = urlBuilder ? urlBuilder(textarea.value) : data.url;
      openLink.addEventListener('click', function () {
        openLink.href = urlBuilder ? urlBuilder(textarea.value) : data.url;
        if (platform === 'facebook' || platform === 'linkedin' || platform === 'instagram') {
          copyText(textarea.value);
          status.textContent = platformLabel(platform) + ' opened. The caption was copied so you can paste it.';
        }
      });
      results.appendChild(card);
    });
    results.hidden = !results.children.length;
    clearButton.hidden = results.hidden;
  }

  function setGenerating(isGenerating) {
    generateButton.disabled = isGenerating;
    generateButton.textContent = isGenerating ? 'Generating captions…' : 'Generate captions';
  }

  function generateCaptions() {
    var platforms = selectedPlatforms();
    if (!platforms.length) {
      status.textContent = 'Select at least one platform.';
      return;
    }

    if (!apiUrl) {
      status.textContent = 'The caption service has not been connected yet. Add author_social_api_url to _config.yml after deploying the Worker.';
      return;
    }

    setGenerating(true);
    status.textContent = 'Writing platform-specific captions…';

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        article: data,
        platforms: platforms,
        angle: selectedAngle()
      })
    }).then(function (response) {
      return response.json().catch(function () { return {}; }).then(function (payload) {
        if (!response.ok) throw new Error(payload.error || 'Caption generation failed.');
        return payload;
      });
    }).then(function (payload) {
      if (!payload.captions || typeof payload.captions !== 'object') throw new Error('The caption service returned an incomplete response.');
      renderCaptions(payload.captions);
      status.textContent = 'Captions generated. Review and edit each one before sharing.';
    }).catch(function (error) {
      status.textContent = error.message || 'Caption generation failed. Please try again.';
    }).finally(function () {
      setGenerating(false);
    });
  }

  function authorModeEnabled() {
    try {
      return window.localStorage.getItem(AUTHOR_MODE_KEY) === 'true';
    } catch (error) {
      return false;
    }
  }

  function enableAuthorMode() {
    try {
      window.localStorage.setItem(AUTHOR_MODE_KEY, 'true');
    } catch (error) {
      // The current page still opens the tool if browser storage is blocked.
    }
  }

  function addAuthorLauncher() {
    if (!authorModeEnabled() || document.querySelector('[data-author-share-launcher]')) return;
    var shareActions = article.querySelector('.jat-article-actions__copy-actions');
    if (!shareActions) return;

    var button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-author-share-launcher', '');
    button.textContent = 'Create social posts with AI';
    button.addEventListener('click', openTool);
    shareActions.appendChild(button);
  }

  tool.querySelectorAll('[data-author-share-close]').forEach(function (element) {
    element.addEventListener('click', closeTool);
  });

  generateButton.addEventListener('click', generateCaptions);
  clearButton.addEventListener('click', function () {
    results.innerHTML = '';
    results.hidden = true;
    clearButton.hidden = true;
    status.textContent = '';
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !tool.hidden) closeTool();
    if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 'j') {
      event.preventDefault();
      openTool();
    }
  });

  var params = new URLSearchParams(window.location.search);
  if (params.get('author-share') === 'true' || params.get('share-ai') === 'true') {
    enableAuthorMode();
    addAuthorLauncher();
    openTool();
  } else {
    addAuthorLauncher();
  }
})();
