document.addEventListener("DOMContentLoaded", function () {
  const postBody = document.getElementById("jat-post-body");
  const playButton = document.getElementById("jat-audio-play");
  const pauseButton = document.getElementById("jat-audio-pause");
  const stopButton = document.getElementById("jat-audio-stop");

  if (!postBody || !playButton || !pauseButton || !stopButton) return;
  if (!("speechSynthesis" in window)) return;

  let utterance = null;

  function getPostText() {
    const title = document.querySelector(".jat-post-intro h1")?.innerText || "";
    const subtitle = document.querySelector(".jat-post-intro .subheading")?.innerText || "";
    const meta = document.querySelector(".jat-post-intro .meta")?.innerText || "";
    const body = postBody.innerText || "";

    const intro = [
      "You are listening to Just A Thought.",
      title ? `Today's reflection is titled ${title}.` : "",
      subtitle ? subtitle + "." : "",
      meta ? meta + "." : "",
      "Now, let's begin."
    ].filter(Boolean).join(" ");

    return [intro, body]
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  }

  playButton.addEventListener("click", function () {
    window.speechSynthesis.cancel();

    utterance = new SpeechSynthesisUtterance(getPostText());

    const voices = window.speechSynthesis.getVoices();

    const preferredVoice =
       voices.find(voice => voice.name === "Microsoft Roger Online (Natural) - English (United States)") ||
       voices.find(voice => voice.name === "Microsoft Christopher Online (Natural) - English (United States)") ||
       voices.find(voice => voice.name === "Microsoft Brian Online (Natural) - English (United States)") ||
       voices.find(voice => voice.name.includes("Roger Online") && voice.lang === "en-US") ||
       voices.find(voice => voice.name.includes("Christopher Online") && voice.lang === "en-US") ||
       voices.find(voice => voice.name.includes("Brian Online") && voice.lang === "en-US") ||
       voices.find(voice => voice.name.includes("Online") && voice.lang === "en-US") ||
       voices.find(voice => voice.lang === "en-US") ||
       voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    console.log("Audio Companion voice:", preferredVoice ? preferredVoice.name : "No voice selected");

    utterance.rate = 0.98;
    utterance.pitch = 0.9;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  });

  pauseButton.addEventListener("click", function () {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      pauseButton.textContent = "Pause";
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      pauseButton.textContent = "Resume";
    }
  });

  stopButton.addEventListener("click", function () {
    window.speechSynthesis.cancel();
    pauseButton.textContent = "Pause";
  });
});