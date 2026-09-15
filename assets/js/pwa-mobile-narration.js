/* Mobile fallback for browser narration in the installed PWA.
   Android speech engines are more reliable with short queued utterances than one article-length utterance.
   Pause/resume is implemented by canceling and restarting the retained chunk because some Android engines
   do not reliably recover a paused SpeechSynthesisUtterance. */
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
    let isPaused = false;

    function sayStatus(message) { if (status) status.textContent = message; }
    function setPaused(paused) {
      isPaused = paused;
      pause.textContent = paused ? 'Resume' : 'Pause';
      pause.setAttribute('aria-pressed', paused ? 'true' : 'false');
    }
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
      const voices = synth.getVoices().filter(function (item) { return /^en(?:-|_)/i.test(item.lang || ''); });
      if (voice && voice.value) return voices.find(function (item) { return item.voiceURI === voice.value; }) || voices[0];
      return voices.find(function (item) { return item.lang === 'en-US'; }) || voices[0];
    }
    function speakChunk(mySession) {
      if (mySession !== session || isPaused || !ready) return;
      if (chunkIndex >= chunks.length) {
        if (chunks.length) sayStatus('Finished “' + currentTitle + '.”');
        setPaused(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
      const chosen = selectedVoice();
      if (chosen) utterance.voice = chosen;
      utterance.rate = rate ? (parseFloat(rate.value) || 1) : 1;
      utterance.pitch = 0.9;
      utterance.volume = 1;
      utterance.onstart = function () { if (mySession === session && !isPaused) sayStatus('Playing “' + currentTitle + '.”'); };
      utterance.onend = function () {
        if (mySession === session && !isPaused) { chunkIndex += 1; speakChunk(mySession); }
      };
      utterance.onerror = function (event) {
        if (event.error === 'canceled' || event.error === 'interrupted') return;
        sayStatus('Narration stopped on this device. Press Play to try again.');
      };
      synth.speak(utterance);
    }
    function resumeFromRetainedChunk() {
      if (!ready) return;
      session += 1;
      synth.cancel();
      setPaused(false);
      sayStatus('Playing “' + currentTitle + '.”');
      window.setTimeout(function () { speakChunk(session); }, 80);
    }
    function pauseAtCurrentChunk() {
      if (!ready || isPaused) return;
      session += 1;
      setPaused(true);
      synth.cancel();
      sayStatus('Paused “' + currentTitle + '.”');
    }
    function startText(text, title) {
      session += 1;
      synth.cancel();
      currentTitle = title || 'Reflection';
      chunks = splitText(text);
      chunkIndex = 0;
      ready = chunks.length > 0;
      setPaused(false);
      if (!ready) { sayStatus('This reflection could not be prepared for narration.'); return; }
      const mySession = session;
      window.setTimeout(function () { speakChunk(mySession); }, 80);
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
        if (isPaused) resumeFromRetainedChunk();
        else {
          session += 1;
          synth.cancel();
          setPaused(false);
          const mySession = session;
          window.setTimeout(function () { speakChunk(mySession); }, 80);
        }
        return;
      }
      if (event.target.closest('#jat-audio-pause') && ready) {
        event.preventDefault(); event.stopImmediatePropagation();
        if (isPaused) resumeFromRetainedChunk();
        else pauseAtCurrentChunk();
        return;
      }
      if (event.target.closest('#jat-audio-stop') && ready) {
        event.preventDefault(); event.stopImmediatePropagation();
        session += 1;
        synth.cancel();
        chunkIndex = 0;
        setPaused(false);
        sayStatus('Stopped “' + currentTitle + '.”');
      }
    }, true);
  });
})();