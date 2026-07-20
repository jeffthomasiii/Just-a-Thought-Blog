document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("jat-listen-search");
  const topicSelect = document.getElementById("jat-listen-topic");
  const resetButton = document.getElementById("jat-listen-filter-reset");
  const countMessage = document.getElementById("jat-listen-filter-count");
  const emptyState = document.getElementById("jat-listen-empty");
  const cards = Array.from(document.querySelectorAll("[data-listen-card]"));

  if (!searchInput || !topicSelect || !resetButton || cards.length === 0) return;

  function normalize(value) {
    return (value || "").toLowerCase().trim();
  }

  function updateLibrary() {
    const query = normalize(searchInput.value);
    const topic = normalize(topicSelect.value);
    let visibleCount = 0;

    cards.forEach(function (card) {
      const searchText = normalize(card.dataset.search);
      const categories = normalize(card.dataset.categories).split("|").filter(Boolean);
      const matchesQuery = !query || searchText.includes(query);
      const matchesTopic = !topic || categories.includes(topic);
      const isVisible = matchesQuery && matchesTopic;

      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (countMessage) {
      countMessage.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "reflection" : "reflections"}.`;
    }

    if (emptyState) emptyState.hidden = visibleCount !== 0;
    resetButton.disabled = !query && !topic;
  }

  searchInput.addEventListener("input", updateLibrary);
  topicSelect.addEventListener("change", updateLibrary);
  resetButton.addEventListener("click", function () {
    searchInput.value = "";
    topicSelect.value = "";
    updateLibrary();
    searchInput.focus();
  });

  updateLibrary();
});
