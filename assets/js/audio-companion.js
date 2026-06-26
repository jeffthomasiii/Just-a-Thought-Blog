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
    utterance.rate = 0.95;
    utterance.pitch = 1;
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