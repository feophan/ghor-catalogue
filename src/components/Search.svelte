<script>
  export let data = [];

  let query = "";
  let searchMode = "concord";

  function normalize(str) {
    return str?.toLowerCase() ?? "";
  }

  $: {
  const q = normalize(query);
  const searchTags = q.split(',').map(normalize).filter(Boolean);

  for (const article of document.querySelectorAll('article[data-code]')) {
    const code = article.dataset.code;
    const att = data.find(d => d.code === code);
    if (!att) continue;

    let visible = true;

    if (!q) {
      visible = true;
    } else if (searchMode === 'features') {
    // Check if every tag is matched either by a lemma OR within a single feature group
      visible = att.features?.some(entry => {
        const lemma = normalize(entry.lemma);
        const features = (entry.feature ?? []).map(normalize);

        // A match occurs only if every tag is either in the features array or matches the lemma
        return searchTags.every(tag =>
          tag === lemma || features.includes(tag)
        );
      });
    } else if (searchMode === 'concord') {
      visible = att.concord?.some(
        pair =>
          normalize(pair.English).includes(q) ||
          normalize(pair.Ghor).includes(q)
      );
    }

    article.style.display = visible ? '' : 'none';
  }
}

</script>

<div class="mb-6 flex flex-col sm:flex-row gap-4 items-center">
  <input
    type="text"
    placeholder="Search by word, lemma, or feature..."
    bind:value={query}
    class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md"
  />
  <select
    bind:value={searchMode}
    class="px-3 py-2 border border-gray-300 rounded-md"
  >
    <option value="concord">Corpus</option>
    <option value="features">Lemma or Feature</option>
  </select>
</div>
