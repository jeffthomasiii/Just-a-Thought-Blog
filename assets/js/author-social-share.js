(function () {
  'use strict';

  var tool = document.querySelector('[data-author-share]');
  var article = document.querySelector('[data-article-actions]');
  if (!tool || !article) return;

  var status = tool.querySelector('[data-author-status]');
  var importBox = tool.querySelector('[data-author-import]');
  var results = tool.querySelector('[data-author-results]');
  var preview = tool.querySelector('[data-author-article-preview]');
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

  function buildPrompt(platforms, angle) {
    var lines = [
      'Act as the social media writing assistant for Jeff Thomas III, author of Just A Thought Blog.',
      '',
      'Write original, platform-specific captions for this published article. Preserve Jeff’s reflective, honest, warm, biblically grounded, compassionate, and conversational voice. The writing should invite reflection rather than pressure agreement.',
      '',
      'Do not use clickbait, exaggerated claims, generic Christian clichés, invented personal details, or unsupported theological conclusions. Do not overuse emojis, hashtags, dramatic fragments, one-sentence paragraphs, or em dashes. Keep the writing authentic rather than overly polished.',
      '',
      'Article title: ' + data.title,
      'Description: ' + (data.description || 'Not provided'),
      'Article URL: ' + data.url,
      'Scripture: ' + (data.scripture || 'Not provided'),
      'Categories: ' + (data.categories || 'Not provided'),
      'Tags: ' + (data.tags || 'Not provided'),
      'Series: ' + (data.series || 'Not provided'),
      'Selected emphasis: ' + angle,
      'Platforms requested: ' + platforms.join(', '),
      '',
      'Platform guidance:',
      '- Facebook: personal and reflective, approximately 100–180 words, with a natural invitation to read and one thoughtful question when appropriate.',
      '- Threads: conversational and concise, approximately 45–90 words.',
      '- LinkedIn: professional and thoughtful when the subject supports it, approximately 80–150 words. Do not force a business angle.',
      '- X: no more than 260 characters including the URL.',
      '- Instagram: reflective caption, approximately 100–180 words, followed by no more than 5 relevant hashtags.',
      '- Text message: warm, natural, and brief, as though sharing the article with a friend.',
      '',
      'Include the article URL in every caption. Use “…just a thought.” only where it feels natural and consistent with the platform.',
      '',
      'Return only valid JSON with one key for each requested platform. Use these exact key names: facebook, threads, linkedin, x, instagram, text-message. Do not use Markdown fences or add commentary outside the JSON.'
    ];
    return lines.join('\n');
  }

  function openTool() {
    lastFocus = document.activeElement;
    preview.innerHTML = '<strong>' + escapeHtml(data.title) + '</strong>' + escapeHtml(data.description || data.url);
    tool.hidden = false;
    document.body.style.overflow = 'hidden';
    var first = tool.querySelector('input, select, button, textarea');
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
    Object.keys(captions).forEach(function (platform) {
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
        });
      });
      var openLink = card.querySelector('[data-open-platform]');
      var urlBuilder = platformUrls[platform];
      openLink.href = urlBuilder ? urlBuilder(textarea.value) : data.url;
      openLink.addEventListener('click', function () {
        if (platform === 'facebook' || platform === 'linkedin' || platform === 'instagram') {
          copyText(textarea.value);
          status.textContent = platformLabel(platform) + ' opened. The caption was copied so you can paste it.';
        }
      });
      results.appendChild(card);
    });
    results.hidden = !results.children.length;
  }

  tool.querySelectorAll('[data-author-share-close]').forEach(function (element) {
    element.addEventListener('click', closeTool);
  });

  tool.querySelector('[data-author-generate]').addEventListener('click', function () {
    var platforms = selectedPlatforms();
    if (!platforms.length) {
      status.textContent = 'Select at least one platform.';
      return;
    }
    var prompt = buildPrompt(platforms, selectedAngle());
    var destination = tool.querySelector('[data-author-ai-tool]').value;
    var opened = window.open('about:blank', '_blank');
    copyText(prompt).then(function () {
      status.textContent = 'Prompt copied. Paste it into the AI conversation, then import the JSON response below.';
      if (opened) {
        opened.opener = null;
        opened.location = destination;
      } else {
        window.location.href = destination;
      }
    }).catch(function () {
      if (opened) opened.close();
      status.textContent = 'The prompt could not be copied. Please allow clipboard access and try again.';
    });
  });

  tool.querySelector('[data-author-load]').addEventListener('click', function () {
    var raw = importBox.value.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    try {
      var captions = JSON.parse(raw);
      renderCaptions(captions);
      status.textContent = 'Captions loaded. Review and edit each one before sharing.';
    } catch (error) {
      status.textContent = 'That response is not valid JSON yet. Remove any commentary around the JSON and try again.';
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !tool.hidden) closeTool();
    if (event.altKey && event.shiftKey && event.key.toLowerCase() === 's') {
      event.preventDefault();
      openTool();
    }
  });

  var params = new URLSearchParams(window.location.search);
  if (params.get('author-share') === 'true' || params.get('share-ai') === 'true') openTool();
})();