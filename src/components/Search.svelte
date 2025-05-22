<script>
  export let data = [];

  let query = "";
  let searchMode = "concord";

  $: filtered = data.filter(att => {
    const q = query.toLowerCase();
    if (!q) return true;

    if (searchMode === 'concord') {
      return att.concord?.some(
        pair => pair.English?.toLowerCase().includes(q) || pair.Ghor?.toLowerCase().includes(q)
      );
    } else if (searchMode === 'features') {
        const searchTags = query
            .toLowerCase()
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0); // Remove blanks

        return Array.isArray(att.features) && att.features.some(f => {
            const featureTags = Array.isArray(f.feature) ? f.feature.map(t => t.toLowerCase()) : [];
            return searchTags.every(tag => featureTags.includes(tag));
        });
        }

    return false;
  });
</script>

<div class="space-y-10">
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

  {#each filtered as att}
    <article id={att.code} class="bg-white rounded-xl shadow p-6">
      <header class="mb-4">
        <div class="flex justify-between text-sm text-gray-500">
          <span>Code: {att.code ?? '—'}</span>
          <span>Timestamp: {att.timestamp ?? '—'}</span>
        </div>

        {#if att.ghor}
          <p class="text-lg font-medium text-blue-800 mt-2">{att.ghor}</p>
        {/if}
        {#if att.english}
          <p class="text-base text-gray-700 italic">{att.english}</p>
        {/if}
        {#if att.italian}
          <p class="text-base text-gray-400 italic">{att.italian}</p>
        {/if}
      </header>

      {#if att.concord}
        <div class="overflow-x-auto mt-4">
          <table class="min-w-full text-sm border rounded-lg">
            <thead>
              <tr class="bg-gray-100 text-left">
                <th class="px-3 py-2 border">English</th>
                <th class="px-3 py-2 border">Ghor</th>
              </tr>
            </thead>
            <tbody>
              {#each att.concord as item}
                <tr class="odd:bg-white even:bg-gray-50">
                  <td class="px-3 py-2 border">{item.English ?? '—'}</td>
                  <td class="px-3 py-2 border">{item.Ghor ?? '—'}</td>
                </tr>
              {/each}
            </tbody>
          </table>
          {#if att.comment}
            <p class="text-xs text-amber-500 mt-2">{att.comment}</p>
          {/if}
        </div>
      {/if}
    </article>
  {/each}
</div>
