document.addEventListener("DOMContentLoaded", function () {
  const postBody = document.getElementById("jat-post-body");
  const playButton = document.getElementById("jat-audio-play");
  const pauseButton = document.getElementById("jat-audio-pause");
  const stopButton = document.getElementById("jat-audio-stop");
  const rateControl = document.getElementById("jat-audio-rate");
  const voiceControl = document.getElementById("jat-audio-voice");
  const voiceField = voiceControl ? voiceControl.closest(".jat-audio-companion__voice") : null;
  const recordedAudio = document.getElementById("jat-recorded-audio");
  const libraryButtons = Array.from(document.querySelectorAll(".jat-listen-card__play"));
  const nowListeningTitle = document.getElementById("jat-listen-now-title");
  const statusMessage = document.getElementById("jat-listen-status");
  const rateStorageKey = "jat-audio-rate";
  const voiceStorageKey = "jat-audio-voice";
  const hasSpeech = "speechSynthesis" in window;

  if (!playButton || !pauseButton || !stopButton) return;

  let utterance = null;
  let selectedText = "";
  let selectedTitle = "";
  let selectedButton = null;
  let selectedAudioFile = recordedAudio?.dataset.defaultAudio || "";
  let availableVoices = [];

  function updateStatus(message) {
    if (statusMessage) statusMessage.textContent = message;
  }

  function isRecordedMode() {
    return Boolean(selectedAudioFile && recordedAudio);
  }

  function getPlaybackRate() {
    const selectedRate = rateControl ? Number.parseFloat(rateControl.value) : 1;
    return Number.isFinite(selectedRate) ? selectedRate : 1;
  }

  function restorePlaybackRate() {
    if (!rateControl) return;

    try {
      const savedRate = window.localStorage.getItem(rateStorageKey);
      const validOption = Array.from(rateControl.options).some(function (option) {
        return option.value === savedRate;
      });
      if (savedRate && validOption) rateControl.value = savedRate;
    } catch (error) {
      // Playback still works when storage is unavailable.
    }
  }

  function setSelectedButton(button) {
    libraryButtons.forEach(function (item) {
      item.setAttribute("aria-pressed", item === button ? "true" : "false");
      item.textContent = item === button ? "Selected" : "Listen";
    });
    selectedButton = button;
  }

  function stopSpeech() {
    if (hasSpeech) window.speechSynthesis.cancel();
    utterance = null;
  }

  function stopRecorded(resetPosition) {
    if (!recordedAudio) return;
    recordedAudio.pause();
    if (resetPosition) recordedAudio.currentTime = 0;
  }

  function updateControlAvailability() {
    const usable = isRecordedMode() || hasSpeech;
    playButton.disabled = !usable;
    pauseButton.disabled = !usable;
    stopButton.disabled = !usable;
    if (rateControl) rateControl.disabled = !usable;
    if (voiceField) voiceField.hidden = isRecordedMode();
    if (voiceControl) voiceControl.disabled = isRecordedMode() || !hasSpeech || availableVoices.length === 0;

    libraryButtons.forEach(function (button) {
      const hasRecordedFile = Boolean(button.dataset.audioFile);
      button.disabled = !hasSpeech && !hasRecordedFile;
    });
  }

  function setPlaybackMode(audioFile) {
    stopSpeech();
    stopRecorded(true);
    selectedAudioFile = audioFile || "";

    if (recordedAudio) {
      if (selectedAudioFile) {
        if (recordedAudio.getAttribute("src") !== selectedAudioFile) {
          recordedAudio.setAttribute("src", selectedAudioFile);
          recordedAudio.load();
        }
        recordedAudio.playbackRate = getPlaybackRate();
      } else {
        recordedAudio.removeAttribute("src");
        recordedAudio.load();
      }
    }

    pauseButton.textContent = "Pause";
    updateControlAvailability();
  }

  function getPreferredVoice() {
    const voices = availableVoices.length ? availableVoices : window.speechSynthesis.getVoices();

    return (
      voices.find(function (voice) {
        return voice.name === "Microsoft Roger Online (Natural) - English (United States)";
      }) ||
      voices.find(function (voice) {
        return voice.name === "Microsoft Christopher Online (Natural) - English (United States)";
      }) ||
      voices.find(function (voice) {
        return voice.name === "Microsoft Brian Online (Natural) - English (United States)";
      }) ||
      voices.find(function (voice) {
        return voice.name.includes("Online") && voice.lang === "en-US";
      }) ||
      voices.find(function (voice) {
        return voice.lang === "en-US";
      }) ||
      voices[0]
    );
  }

  function getSelectedVoice() {
    if (!voiceControl || !voiceControl.value) return getPreferredVoice();
    return availableVoices.find(function (voice) {
      return voice.voiceURI === voiceControl.value;
    }) || getPreferredVoice();
  }

  function populateVoiceOptions() {
    if (!voiceControl || !hasSpeech) return;

    const currentValue = voiceControl.value;
    availableVoices = window.speechSynthesis
      .getVoices()
      .filter(function (voice) {
        return /^en(?:-|_)/i.test(voice.lang || "");
      })
      .sort(function (a, b) {
        const aUs = a.lang === "en-US" ? 0 : 1;
        const bUs = b.lang === "en-US" ? 0 : 1;
        if (aUs !== bUs) return aUs - bUs;
        return a.name.localeCompare(b.name);
      });

    voiceControl.innerHTML = '<option value="">Automatic</option>';
    availableVoices.forEach(function (voice) {
      const option = document.createElement("option");
      option.value = voice.voiceURI;
      option.textContent = `${voice.name} (${voice.lang})`;
      voiceControl.appendChild(option);
    });

    let savedVoice = "";
    try {
      savedVoice = window.localStorage.getItem(voiceStorageKey) || "";
    } catch (error) {
      // Voice selection still works for the current page.
    }

    const desiredValue = savedVoice || currentValue;
    const hasDesiredVoice = availableVoices.some(function (voice) {
      return voice.voiceURI === desiredValue;
    });

    voiceControl.value = hasDesiredVoice ? desiredValue : "";
    updateControlAvailability();
  }

  function cleanText(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function buildReflectionText(title, subtitle, meta, body) {
    const intro = [
      "You are listening to Just A Thought.",
      title ? `Today's reflection is titled ${title}.` : "",
      subtitle ? subtitle + "." : "",
      meta ? meta + "." : "",
      "Now, let's begin."
    ]
      .filter(Boolean)
      .join(" ");

    return cleanText([intro, body].filter(Boolean).join(" "));
  }

  function getCurrentPostText() {
    if (!postBody) return "";
    const title = document.querySelector(".jat-post-intro h1")?.innerText || "";
    const subtitle = document.querySelector(".jat-post-intro .subheading")?.innerText || "";
    const meta = document.querySelector(".jat-post-intro .meta")?.innerText || "";
    const body = postBody.innerText || "";
    selectedTitle = title;
    return buildReflectionText(title, subtitle, meta, body);
  }

  function playRecorded() {
    if (!recordedAudio || !selectedAudioFile) return;
    stopSpeech();
    recordedAudio.playbackRate = getPlaybackRate();
    recordedAudio
      .play()
      .then(function () {
        pauseButton.textContent = "Pause";
        updateStatus(selectedTitle ? `Playing recorded audio for “${selectedTitle}.”` : "Playing recorded audio.");
      })
      .catch(function () {
        updateStatus("The recording could not begin on this device. Press Play again or open the post directly.");
      });
  }

  function speakSelectedText() {
    if (!hasSpeech) {
      updateStatus("Browser narration is not supported by this device.");
      return;
    }

    const text = selectedText || getCurrentPostText();
    if (!text) {
      updateStatus("Choose a reflection before pressing Play.");
      return;
    }

    stopRecorded(true);
    stopSpeech();
    pauseButton.textContent = "Pause";

    utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = getSelectedVoice();
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = getPlaybackRate();
    utterance.pitch = 0.9;
    utterance.volume = 1;

    utterance.onstart = function () {
      const voiceName = selectedVoice ? selectedVoice.name : "the automatic voice";
      updateStatus(selectedTitle ? `Playing “${selectedTitle}” at ${getPlaybackRate()}× using ${voiceName}.` : `Playing reflection at ${getPlaybackRate()}× using ${voiceName}.`);
    };

    utterance.onend = function () {
      updateStatus(selectedTitle ? `Finished “${selectedTitle}.”` : "Reflection finished.");
      pauseButton.textContent = "Pause";
    };

    utterance.onerror = function (event) {
      if (event.error === "interrupted" || event.error === "canceled") return;
      updateStatus("Playback stopped because the browser could not continue reading this reflection.");
      pauseButton.textContent = "Pause";
    };

    window.speechSynthesis.speak(utterance);
  }

  function playSelected() {
    if (isRecordedMode()) playRecorded();
    else speakSelectedText();
  }

  async function loadLibraryReflection(button) {
    const url = button.dataset.audioUrl;
    const title = button.dataset.audioTitle || "Selected reflection";
    const subtitle = button.dataset.audioSubtitle || "";
    const audioFile = button.dataset.audioFile || "";

    if (!url && !audioFile) return;

    setSelectedButton(button);
    selectedTitle = title;
    selectedText = "";
    if (nowListeningTitle) nowListeningTitle.textContent = title;

    if (audioFile) {
      setPlaybackMode(audioFile);
      updateStatus(`Ready to play the recorded audio for “${title}.”`);
      playRecorded();
      return;
    }

    setPlaybackMode("");
    updateStatus("Loading the reflection…");

    try {
      const response = await fetch(url, { credentials: "same-origin" });
      if (!response.ok) throw new Error("Unable to load reflection");
      const html = await response.text();
      const parsedPage = new DOMParser().parseFromString(html, "text/html");
      const parsedBody = parsedPage.getElementById("jat-post-body");
      const parsedMeta = parsedPage.querySelector(".jat-post-intro .meta");
      if (!parsedBody) throw new Error("Reflection content was not found");

      selectedText = buildReflectionText(
        title,
        subtitle,
        parsedMeta ? parsedMeta.innerText : "",
        parsedBody.innerText
      );
      updateStatus(`Ready to play “${title}.”`);
      speakSelectedText();
    } catch (error) {
      selectedText = "";
      updateStatus("This reflection could not be loaded. Open the post and use its Audio Companion instead.");
      if (selectedButton) {
        selectedButton.textContent = "Try Again";
        selectedButton.setAttribute("aria-pressed", "false");
      }
    }
  }

  restorePlaybackRate();
  if (selectedAudioFile) setPlaybackMode(selectedAudioFile);
  else updateControlAvailability();

  if (hasSpeech) {
    populateVoiceOptions();
    window.speechSynthesis.addEventListener("voiceschanged", populateVoiceOptions);
  }

  if (!hasSpeech && !selectedAudioFile) {
    updateStatus("Browser narration is not supported by this device. Recorded reflections will still play when available.");
  }

  playButton.addEventListener("click", function () {
    if (isRecordedMode()) {
      playRecorded();
      return;
    }

    if (hasSpeech && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      pauseButton.textContent = "Pause";
      updateStatus(selectedTitle ? `Playing “${selectedTitle}.”` : "Playing reflection.");
      return;
    }

    speakSelectedText();
  });

  pauseButton.addEventListener("click", function () {
    if (isRecordedMode() && recordedAudio) {
      if (recordedAudio.paused) {
        playRecorded();
      } else {
        recordedAudio.pause();
        pauseButton.textContent = "Resume";
        updateStatus(selectedTitle ? `Paused “${selectedTitle}.”` : "Recording paused.");
      }
      return;
    }

    if (!hasSpeech) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      pauseButton.textContent = "Pause";
      updateStatus(selectedTitle ? `Playing “${selectedTitle}.”` : "Playing reflection.");
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      pauseButton.textContent = "Resume";
      updateStatus(selectedTitle ? `Paused “${selectedTitle}.”` : "Reflection paused.");
    }
  });

  stopButton.addEventListener("click", function () {
    stopSpeech();
    stopRecorded(true);
    pauseButton.textContent = "Pause";
    updateStatus(selectedTitle ? `Stopped “${selectedTitle}.”` : "Playback stopped.");
  });

  if (rateControl) {
    rateControl.addEventListener("change", function () {
      try {
        window.localStorage.setItem(rateStorageKey, rateControl.value);
      } catch (error) {
        // The selected speed still applies for the current page.
      }

      if (isRecordedMode() && recordedAudio) {
        recordedAudio.playbackRate = getPlaybackRate();
        updateStatus(`Playback speed set to ${getPlaybackRate()}×.`);
      } else if (hasSpeech && (window.speechSynthesis.speaking || window.speechSynthesis.paused)) {
        speakSelectedText();
      } else {
        updateStatus(`Narration speed set to ${getPlaybackRate()}×.`);
      }
    });
  }

  if (voiceControl) {
    voiceControl.addEventListener("change", function () {
      try {
        window.localStorage.setItem(voiceStorageKey, voiceControl.value);
      } catch (error) {
        // The selected voice still applies for the current page.
      }

      const selectedVoice = getSelectedVoice();
      const voiceName = selectedVoice ? selectedVoice.name : "Automatic";
      if (hasSpeech && (window.speechSynthesis.speaking || window.speechSynthesis.paused)) {
        speakSelectedText();
      } else {
        updateStatus(`Narration voice set to ${voiceName}.`);
      }
    });
  }

  if (recordedAudio) {
    recordedAudio.addEventListener("ended", function () {
      pauseButton.textContent = "Pause";
      updateStatus(selectedTitle ? `Finished “${selectedTitle}.”` : "Recording finished.");
    });

    recordedAudio.addEventListener("error", function () {
      if (!selectedAudioFile) return;
      updateStatus("The recorded audio file could not be loaded.");
    });
  }

  libraryButtons.forEach(function (button) {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", function () {
      loadLibraryReflection(button);
    });
  });

  window.addEventListener("beforeunload", function () {
    stopSpeech();
    stopRecorded(false);
  });
});
