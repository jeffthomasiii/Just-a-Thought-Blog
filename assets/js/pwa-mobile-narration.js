/* Mobile fallback for browser narration in the installed PWA.
   Android speech engines are more reliable with short queued utterances than one article-length utterance. */
(function () {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const isAndroid = /Android/i.test(navigator.userAgent || '');
  const hasSpeech = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  if (!isStandalone || !isAndroid || !hasSpeech) return;

  document.addEventListener('DOMContentLoaded', function () {
    const synth = window.speechSynthesis;
    const status = document.getElementById('jat-listen-status');
    const titleNode = document.getElementById('jat-listen-now-title');
    const play = document.getElementById('jat-audio-play');
    const pause = document.getElementById('jat-audio-pause');
    const stop = document.getElementById('jat-audio-stop');
    const rate = document.getElementById('jat-audio-rate');
    const voice = document.getElementById('jat-audio-voice');
    if (!play || !pause || !stop) return;

    let chunks = [];
    let chunkIndex = 0;
    let currentTitle = '';
    let session = 0;
    let ready = false;

    function sayStatus(message) { if (status) status.textContent = message; }
    function clean(text) { return (text || '').replace(/\s+/g, ' ').trim(); }
    function splitText(text) {
      const sentences = clean(text).match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
      const result = [];
      let current = '';
      sentences.forEach(function (sentence) {
        const part = sentence.trim();
        if (!part) return;
        if ((current + ' ' + part).trim().length <= 220) current = (current + ' ' + part).trim();
        else {
          if (current) result.push(current);
          if (part.length <= 220) current = part;
          else {
            const words = part.split(' ');
            current = '';
            words.forEach(function (word) {
              if ((current + ' ' + word).trim().length > 200) { if (current) result.push(current); current = word; }
              else current = (current + ' ' + word).trim();
            });
          }
        }
      });
      if (current) result.push(current);
      return result;
    }
    function selectedVoice() {
      const voices = synth.getVoices().filter(function (v) { return /^en(?:-|_)/i.test(v.lang || ''); });
      if (voice && voice.value) return voices.find(function (v) { return v.voiceURI === voice.value; }) || voices[0];
      return voices.find(function (v) { return v.lang === 'en-US'; }) || voices[0];
    }
    function speakChunk(mySession) {
      if (mySession !== session || chunkIndex >= chunks.length) {
        if (mySession === session && chunks.length) sayStatus('Finished “' + currentTitle + '.”');
        if (pause) pause.textContent = 'Pause';
        return;
      }
      const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
      const chosen = selectedVoice();
      if (chosen) utterance.voice = chosen;
      utterance.rate = rate ? (parseFloat(rate.value) || 1) : 1;
      utterance.pitch = 0.9;
      utterance.volume = 1;
      utterance.onstart = function () { sayStatus('Playing “' + currentTitle + '.”'); };
      utterance.onend = function () { if (mySession === session) { chunkIndex += 1; speakChunk(mySession); } };
      utterance.onerror = function (event) {
        if (event.error === 'canceled' || event.error === 'interrupted') return;
        sayStatus('Narration stopped on this device. Press Play to try again.');
      };
      synth.speak(utterance);
    }
    function startText(text, title) {
      session += 1;
      synth.cancel();
      currentTitle = title || 'Reflection';
      chunks = splitText(text);
      chunkIndex = 0;
      ready = chunks.length > 0;
      if (!ready) { sayStatus('This reflection could not be prepared for narration.'); return; }
      speakChunk(session);
    }
    async function chooseReflection(button) {
      if (button.dataset.audioFile) return false;
      const url = button.dataset.audioUrl;
      if (!url) return true;
      currentTitle = button.dataset.audioTitle || 'Selected reflection';
      if (titleNode) titleNode.textContent = currentTitle;
      sayStatus('Loading the reflection…');
      try {
        const response = await fetch(url, { credentials: 'same-origin' });
        if (!response.ok) throw new Error('load');
        const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
        const body = doc.getElementById('jat-post-body');
        if (!body) throw new Error('body');
        const subtitle = button.dataset.audioSubtitle || '';
        const meta = doc.querySelector('.jat-post-intro .meta');
        const intro = ['You are listening to Just A Thought.', 'Today’s reflection is titled ' + currentTitle + '.', subtitle, meta ? meta.innerText : '', 'Now, let’s begin.'].filter(Boolean).join(' ');
        startText(intro + ' ' + body.innerText, currentTitle);
      } catch (error) {
        sayStatus('This reflection could not be loaded for narration. Open the post and try its Audio Companion.');
      }
      return true;
    }

    document.addEventListener('click', function (event) {
      const libraryButton = event.target.closest('.jat-listen-card__play');
      if (libraryButton && !libraryButton.dataset.audioFile) {
        event.preventDefault(); event.stopImmediatePropagation(); chooseReflection(libraryButton); return;
      }
      if (event.target.closest('#jat-audio-play') && ready) {
        event.preventDefault(); event.stopImmediatePropagation();
        if (synth.paused) { synth.resume(); pause.textContent = 'Pause'; }
        else { session += 1; synth.cancel(); speakChunk(session); }
        return;
      }
      if (event.target.closest('#jat-audio-pause') && ready) {
        event.preventDefault(); event.stopImmediatePropagation();
        if (synth.paused) { synth.resume(); pause.textContent = 'Pause'; }
        else if (synth.speaking) { synth.pause(); pause.textContent = 'Resume'; sayStatus('Paused “' + currentTitle + '.”'); }
        return;
      }
      if (event.target.closest('#jat-audio-stop') && ready) {
        event.preventDefault(); event.stopImmediatePropagation();
        session += 1; synth.cancel(); chunkIndex = 0; pause.textContent = 'Pause'; sayStatus('Stopped “' + currentTitle + '.”');
      }
    }, true);
  });
})();