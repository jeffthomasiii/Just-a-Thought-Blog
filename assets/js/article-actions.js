(function () {
  'use strict';

  var root = document.querySelector('[data-article-actions]');
  if (!root) return;

  var triggers = Array.prototype.slice.call(root.querySelectorAll('[data-actions-trigger]'));
  var panels = Array.prototype.slice.call(root.querySelectorAll('[data-actions-panel]'));
  var title = root.getAttribute('data-title') || document.title;
  var description = root.getAttribute('data-description') || '';
  var pageUrl = root.getAttribute('data-url') || window.location.href;
  var scripture = root.getAttribute('data-scripture') || '';
  var categories = root.getAttribute('data-categories') || '';
  var tags = root.getAttribute('data-tags') || '';
  var series = root.getAttribute('data-series') || '';

  function closeAll(exceptName) {
    panels.forEach(function (panel) {
      var name = panel.getAttribute('data-actions-panel');
      var shouldRemainOpen = name === exceptName;
      panel.hidden = !shouldRemainOpen;
    });

    triggers.forEach(function (trigger) {
      var name = trigger.getAttribute('data-actions-trigger');
      trigger.setAttribute('aria-expanded', String(name === exceptName));
    });
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var name = trigger.getAttribute('data-actions-trigger');
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';
      closeAll(isOpen ? null : name);
    });
  });

  document.addEventListener('click', function (event) {
    if (!root.contains(event.target)) closeAll(null);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      var activeTrigger = root.querySelector('[data-actions-trigger][aria-expanded="true"]');
      closeAll(null);
      if (activeTrigger) activeTrigger.focus();
    }
  });

  function buildShareMessage() {
    return 'This article from Just A Thought Blog gave me something to reflect on: “' + title + '”';
  }

  function shareUrl(service) {
    var shareMessage = buildShareMessage();
    var encodedUrl = encodeURIComponent(pageUrl);
    var encodedTitle = encodeURIComponent(title);
    var encodedMessage = encodeURIComponent(shareMessage);
    var encodedMessageWithUrl = encodeURIComponent(shareMessage + '\n\n' + pageUrl);

    switch (service) {
      case 'facebook':
        return 'https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl + '&quote=' + encodedMessage;
      case 'threads':
        return 'https://www.threads.net/intent/post?text=' + encodedMessageWithUrl;
      case 'x':
        return 'https://twitter.com/intent/tweet?text=' + encodedMessage + '&url=' + encodedUrl;
      case 'linkedin':
        return 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodedUrl;
      case 'email':
        return 'mailto:?subject=' + encodeURIComponent('A thought worth sharing: ' + title) + '&body=' + encodedMessageWithUrl;
      default:
        return pageUrl;
    }
  }

  root.querySelectorAll('[data-share-service]').forEach(function (link) {
    var service = link.getAttribute('data-share-service');
    link.setAttribute('href', shareUrl(service));
    if (service !== 'email') {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();

      try {
        var copied = document.execCommand('copy');
        document.body.removeChild(textarea);
        copied ? resolve() : reject(new Error('Copy failed'));
      } catch (error) {
        document.body.removeChild(textarea);
        reject(error);
      }
    });
  }

  var copyButton = root.querySelector('[data-copy-link]');
  var copyStatus = root.querySelector('[data-copy-status]');

  if (copyButton) {
    copyButton.addEventListener('click', function () {
      copyText(pageUrl).then(function () {
        copyButton.textContent = 'Link copied';
        copyStatus.textContent = '';
        window.setTimeout(function () {
          copyButton.textContent = 'Copy link';
        }, 2200);
      }).catch(function () {
        copyStatus.textContent = 'Copying was unavailable. Select the address from your browser instead.';
      });
    });
  }

  function buildReflectionPrompt() {
    var context = [];
    context.push('I just read the article "' + title + '" on Just A Thought Blog.');
    context.push('Article: ' + pageUrl);

    if (description) context.push('Article description: ' + description);
    if (scripture) context.push('Scripture referenced: ' + scripture);
    if (categories) context.push('Categories: ' + categories);
    if (tags) context.push('Tags: ' + tags);
    if (series) context.push('Series: ' + series);

    context.push('Help me take this thought further. Reflect on the article from a biblically grounded and compassionate perspective. Summarize its central idea, identify the main questions or tensions it raises, connect the reflection to the Scripture cited without forcing conclusions the article does not make, and give me three thoughtful questions for personal reflection or conversation. End with one practical next step I could consider this week.');

    return context.join('\n\n');
  }

  var openAiButton = root.querySelector('[data-open-ai]');
  var reflectStatus = root.querySelector('[data-reflect-status]');

  if (openAiButton) {
    openAiButton.addEventListener('click', function () {
      var selected = root.querySelector('input[name="jat-ai-tool"]:checked');
      if (!selected) return;

      var destination = selected.value;
      var newWindow = window.open('about:blank', '_blank');
      var prompt = buildReflectionPrompt();

      copyText(prompt).then(function () {
        reflectStatus.textContent = 'Prompt copied. Paste it into the AI conversation that opens.';
        if (newWindow) {
          newWindow.opener = null;
          newWindow.location = destination;
        } else {
          window.location.href = destination;
        }
      }).catch(function () {
        if (newWindow) newWindow.close();
        reflectStatus.textContent = 'The prompt could not be copied. Please try again or allow clipboard access.';
      });
    });
  }
})();