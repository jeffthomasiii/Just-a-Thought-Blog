(function () {
  'use strict';

  var tool = document.querySelector('[data-author-share]');
  var article = document.querySelector('[data-article-actions]');
  if (!tool || !article) return;

  var AUTHOR_MODE_KEY = 'jat-author-share-enabled';
  var PLATFORM_KEY = 'jat-author-share-platforms';
  var ANGLE_KEY = 'jat-author-share-angle';
  var status = tool.querySelector('[data-author-status]');
  var results = tool.querySelector('[data-author-results]');
  var preview = tool.querySelector('[data-author-article-preview]');
  var pasteBox = tool.querySelector('[data-author-paste]');
  var fallback = tool.querySelector('[data-author-fallback]');
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

  var platformLabels = {
    facebook: 'Facebook',
    threads: 'Threads',
    linkedin: 'LinkedIn',
    x: 'X',
    instagram: 'Instagram',
    'text-message': 'Text Message'
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
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var box = document.createElement('textarea');
      box.value = text;
      box.setAttribute('readonly', '');
      box.style.position = 'fixed';
      box.style.left = '-9999px';
      box.style.opacity = '0';
      document.body.appendChild(box);
      box.focus();
      box.select();

      try {
        var copied = document.execCommand('copy');
        document.body.removeChild(box);
        copied ? resolve() : reject(new Error('Copy failed'));
      } catch (error) {
        document.body.removeChild(box);
        reject(error);
      }
    });
  }

  function copyTextSynchronously(text) {
    var box = document.createElement('textarea');
    box.value = text;
    box.setAttribute('readonly', '');
    box.style.position = 'fixed';
    box.style.left = '-9999px';
    box.style.opacity = '0';
    document.body.appendChild(box);
    box.focus();
    box.select();

    var copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (error) {
      copied = false;
    }

    document.body.removeChild(box);
    return copied;
  }

  function selectedPlatforms() {
    return Array.prototype.slice.call(tool.querySelectorAll('[data-platform-fieldset] input:checked')).map(function (input) {
      return input.value;
    });
  }

  function selectedAngle() {
    var input = tool.querySelector('input[name="jat-author-angle"]:checked');
    return input ? input.value : 'general article announcement';
  }

  function saveSelections() {
    try {
      window.localStorage.setItem(PLATFORM_KEY, JSON.stringify(selectedPlatforms()));
      window.localStorage.setItem(ANGLE_KEY, selectedAngle());
    } catch (error) {}
  }

  function restoreSelections() {
    try {
      var savedPlatforms = JSON.parse(window.localStorage.getItem(PLATFORM_KEY) || 'null');
      if (Array.isArray(savedPlatforms) && savedPlatforms.length) {
        tool.querySelectorAll('[data-platform-fieldset] input').forEach(function (input) {
          input.checked = savedPlatforms.indexOf(input.value) > -1;
        });
      }

      var savedAngle = window.localStorage.getItem(ANGLE_KEY);
      if (savedAngle) {
        tool.querySelectorAll('input[name="jat-author-angle"]').forEach(function (input) {
          if (input.value === savedAngle) input.checked = true;
        });
      }
    } catch (error) {}
  }

  function buildPrompt(platforms, angle) {
    var requestedSections = platforms.map(function (platform) {
      return '=== ' + platformLabels[platform].toUpperCase() + ' ===';
    }).join('\n');

    return [
      'Act as the social media writing assistant for Jeff Thomas III, author of Just A Thought Blog.',
      '',
      'Write original, platform-specific captions for this published article. Preserve Jeff’s reflective, honest, warm, biblically grounded, compassionate, and conversational voice. Invite reflection rather than pressure agreement.',
      '',
      'Do not use clickbait, exaggerated claims, generic Christian clichés, invented personal details, unsupported theological conclusions, excessive emojis, excessive hashtags, dramatic fragments, or em dashes. Keep the writing authentic rather than overly polished.',
      '',
      'Article title: ' + data.title,
      'Description: ' + (data.description || 'Not provided'),
      'Article URL: ' + data.url,
      'Scripture: ' + (data.scripture || 'Not provided'),
      'Categories: ' + (data.categories || 'Not provided'),
      'Tags: ' + (data.tags || 'Not provided'),
      'Series: ' + (data.series || 'Not provided'),
      'Selected emphasis: ' + angle,
      'Platforms requested: ' + platforms.map(function (platform) { return platformLabels[platform]; }).join(', '),
      '',
      'Platform guidance:',
      '- Facebook: personal and reflective, approximately 100–180 words, with a natural invitation to read and one thoughtful question when appropriate.',
      '- Threads: conversational and concise, approximately 45–90 words.',
      '- LinkedIn: professional and thoughtful when the subject supports it, approximately 80–150 words. Do not force a business angle.',
      '- X: no more than 260 characters including the URL.',
      '- Instagram: reflective, approximately 100–180 words, followed by no more than 5 relevant hashtags.',
      '- Text Message: warm, natural, and brief, as though sharing the article with a friend.',
      '',
      'Include the article URL as plain text in every caption. Do not format URLs as Markdown links. Do not use Markdown symbols around article or series titles. Use “…just a thought.” only where it feels natural.',
      '',
      'Return only the requested caption sections, using these exact headings on their own lines:',
      requestedSections,
      '',
      'Place each complete caption immediately below its heading. Do not add an introduction, explanation, code fence, JSON, or closing commentary.'
    ].join('\n');
  }

  function parseLabeledResponse(value) {
    var raw = String(value || '').replace(/```(?:text|markdown)?/gi, '').trim();
    var matches = [];
    var headingPattern = /^===\s*(FACEBOOK|THREADS|LINKEDIN|X|INSTAGRAM|TEXT(?:\s|-)?MESSAGE)\s*===\s*$/gim;
    var match;

    while ((match = headingPattern.exec(raw)) !== null) {
      matches.push({ label: match[1], index: match.index, contentStart: headingPattern.lastIndex });
    }

    if (!matches.length) throw new Error('No caption headings were found.');

    var captions = {};
    matches.forEach(function (item, index) {
      var end = index + 1 < matches.length ? matches[index + 1].index : raw.length;
      var content = raw.slice(item.contentStart, end).trim();
      var normalized = item.label.toLowerCase().replace(/\s+/g, '-');
      if (normalized === 'textmessage') normalized = 'text-message';
      captions[normalized] = content;
    });

    return captions;
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, function (character) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character];
    });
  }

  function openTool() {
    lastFocus = document.activeElement;
    preview.innerHTML = '<strong>' + escapeHtml(data.title) + '</strong>' + escapeHtml(data.description || data.url);
    restoreSelections();
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

  function renderCaptions(captions) {
    results.innerHTML = '';

    selectedPlatforms().forEach(function (platform) {
      if (typeof captions[platform] !== 'string' || !captions[platform].trim()) return;

      var card = document.createElement('section');
      card.className = 'jat-author-share__card';
      card.innerHTML = '<h3>' + escapeHtml(platformLabels[platform] || platform) + '</h3>' +
        '<textarea aria-label="' + escapeHtml(platformLabels[platform] || platform) + ' caption"></textarea>' +
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
          status.textContent = (platformLabels[platform] || platform) + ' opened. The caption was copied so you can paste it.';
        }
      });

      results.appendChild(card);
    });

    if (!results.children.length) throw new Error('No requested captions could be matched to the response.');
    results.hidden = false;
    fallback.open = false;
    status.textContent = 'Captions imported. Review and edit each one before sharing.';
  }

  function importResponse(value) {
    renderCaptions(parseLabeledResponse(value));
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
    } catch (error) {}
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

  tool.querySelectorAll('[data-platform-fieldset] input, [data-angle-fieldset] input').forEach(function (input) {
    input.addEventListener('change', saveSelections);
  });

  tool.querySelector('[data-author-send]').addEventListener('click', function () {
    var platforms = selectedPlatforms();
    if (!platforms.length) {
      status.textContent = 'Select at least one platform.';
      return;
    }

    saveSelections();
    var prompt = buildPrompt(platforms, selectedAngle());
    var copied = copyTextSynchronously(prompt);

    if (!copied && navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(prompt).catch(function () {});
    }

    status.textContent = copied
      ? 'Request copied. Opening ChatGPT…'
      : 'Opening ChatGPT. If the request was not copied, return and try again.';

    window.location.href = 'https://chatgpt.com/';
  });

  tool.querySelector('[data-author-clipboard]').addEventListener('click', function () {
    if (!navigator.clipboard || !navigator.clipboard.readText || !window.isSecureContext) {
      fallback.open = true;
      status.textContent = 'This browser does not allow direct clipboard reading. Paste the response into the fallback field below.';
      return;
    }

    navigator.clipboard.readText().then(function (text) {
      importResponse(text);
    }).catch(function () {
      fallback.open = true;
      status.textContent = 'Clipboard access was blocked. Paste the response into the fallback field below.';
    });
  });

  tool.querySelector('[data-author-paste-import]').addEventListener('click', function () {
    try {
      importResponse(pasteBox.value);
    } catch (error) {
      status.textContent = error.message || 'The pasted response could not be imported.';
    }
  });

  tool.querySelector('[data-author-start-over]').addEventListener('click', function () {
    results.innerHTML = '';
    results.hidden = true;
    pasteBox.value = '';
    fallback.open = false;
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
