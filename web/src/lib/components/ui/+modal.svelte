<script>
	import { fade } from "svelte/transition";

	export let title;
	export let closeFunc;
</script>

<section class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" role="dialog"
		 aria-labelledby="modal-title" aria-describedby="modal-description" transition:fade={{ duration: 100 }}>
	<div class="bg-[#1f2937] rounded-lg shadow-lg max-w-lg w-full p-6 relative flex flex-col gap-5">
		<div class="flex justify-center items-center">
			<div class="text-center text-white text-xl font-bold uppercase">{title}</div>
			<div class="absolute top-4 right-4 cursor-pointer w-[20px] h-[20px] flex items-center group"
				 on:click={closeFunc} aria-hidden="true">
				<span
					class="w-[20px] h-[1px] bg-[#9ca3af] block absolute rotate-[45deg] transition-colors duration-300 group-hover:bg-white"></span>
				<span
					class="w-[20px] h-[1px] bg-[#9ca3af] block absolute rotate-[-45deg] transition-colors duration-300 group-hover:bg-white"></span>
			</div>
		</div>
		<div>
			<slot />
		</div>
	</div>
</section>
