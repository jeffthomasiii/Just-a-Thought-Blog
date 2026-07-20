document.addEventListener("DOMContentLoaded", function () {
  const postBody = document.getElementById("jat-post-body");
  const playButton = document.getElementById("jat-audio-play");
  const pauseButton = document.getElementById("jat-audio-pause");
  const stopButton = document.getElementById("jat-audio-stop");
  const rateControl = document.getElementById("jat-audio-rate");
  const libraryButtons = Array.from(document.querySelectorAll(".jat-listen-card__play"));
  const nowListeningTitle = document.getElementById("jat-listen-now-title");
  const statusMessage = document.getElementById("jat-listen-status");
  const rateStorageKey = "jat-audio-rate";

  if (!playButton || !pauseButton || !stopButton) return;

  function updateStatus(message) {
    if (statusMessage) statusMessage.textContent = message;
  }

  if (!("speechSynthesis" in window)) {
    playButton.disabled = true;
    pauseButton.disabled = true;
    stopButton.disabled = true;
    if (rateControl) rateControl.disabled = true;
    libraryButtons.forEach(function (button) {
      button.disabled = true;
    });
    updateStatus("Audio playback is not supported by this browser.");
    return;
  }

  let utterance = null;
  let selectedText = "";
  let selectedTitle = "";
  let selectedButton = null;

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

  function getPreferredVoice() {
    const voices = window.speechSynthesis.getVoices();

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
        return voice.name.includes("Roger Online") && voice.lang === "en-US";
      }) ||
      voices.find(function (voice) {
        return voice.name.includes("Christopher Online") && voice.lang === "en-US";
      }) ||
      voices.find(function (voice) {
        return voice.name.includes("Brian Online") && voice.lang === "en-US";
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

  function speakSelectedText() {
    const text = selectedText || getCurrentPostText();

    if (!text) {
      updateStatus("Choose a reflection before pressing Play.");
      return;
    }

    window.speechSynthesis.cancel();
    pauseButton.textContent = "Pause";

    utterance = new SpeechSynthesisUtterance(text);
    const preferredVoice = getPreferredVoice();

    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.rate = getPlaybackRate();
    utterance.pitch = 0.9;
    utterance.volume = 1;

    utterance.onstart = function () {
      updateStatus(selectedTitle ? `Playing “${selectedTitle}” at ${getPlaybackRate()}×.` : `Playing reflection at ${getPlaybackRate()}×.`);
    };

    utterance.onend = function () {
      updateStatus(selectedTitle ? `Finished “${selectedTitle}.”` : "Reflection finished.");
      pauseButton.textContent = "Pause";
    };

    utterance.onerror = function () {
      updateStatus("Playback stopped because the browser could not continue reading this reflection.");
      pauseButton.textContent = "Pause";
    };

    window.speechSynthesis.speak(utterance);
  }

  async function loadLibraryReflection(button) {
    const url = button.dataset.audioUrl;
    const title = button.dataset.audioTitle || "Selected reflection";
    const subtitle = button.dataset.audioSubtitle || "";

    if (!url) return;

    window.speechSynthesis.cancel();
    setSelectedButton(button);
    selectedTitle = title;

    if (nowListeningTitle) nowListeningTitle.textContent = title;
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

  playButton.addEventListener("click", function () {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      pauseButton.textContent = "Pause";
      updateStatus(selectedTitle ? `Playing “${selectedTitle}.”` : "Playing reflection.");
      return;
    }

    speakSelectedText();
  });

  pauseButton.addEventListener("click", function () {
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
    window.speechSynthesis.cancel();
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

      if (window.speechSynthesis.speaking || window.speechSynthesis.paused) {
        speakSelectedText();
      } else {
        updateStatus(`Narration speed set to ${getPlaybackRate()}×.`);
      }
    });
  }

  libraryButtons.forEach(function (button) {
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", function () {
      loadLibraryReflection(button);
    });
  });

  window.addEventListener("beforeunload", function () {
    window.speechSynthesis.cancel();
  });
});