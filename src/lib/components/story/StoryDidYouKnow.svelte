<script lang="ts">
import { s } from '$lib/client/localization.svelte';
import CitationText from './CitationText.svelte';
import { useCitationProcessing } from '$lib/utils/citationProcessing';
import type { CitationProps } from '$lib/types/citation';

// Props
interface Props extends CitationProps {
	content: string;
}

let { content, articles = [], citationMapping }: Props = $props();

// Convert citations to numbered format if mapping is available
const displayContent = $derived.by(() => {
	const processed = useCitationProcessing(content, citationMapping);
	// Ensure we return a string (content is always a string, but TypeScript needs assurance)
	return typeof processed === 'string' ? processed : processed.join(' ');
});
</script>

<section class="mt-6 rounded-lg bg-[#CED8FB] p-4 dark:bg-[#2A3B5E]">
	<h3 class="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">
		{s('section.didYouKnow') || 'Did You Know?'}
	</h3>
	<p class="text-gray-700 dark:text-gray-200">
		<CitationText text={displayContent} inline={false} {articles} {citationMapping} />
	</p>
</section> 