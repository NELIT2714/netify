<script>
	const subnetPrefixes = Array.from({ length: 32 }, (_, index) => index + 1);

	const appData = {
		function: "1",
		ip: "",
		subnetPrefix: 24,
	};
</script>

<form class="w-max" on:submit|preventDefault>
	<div class="flex flex-col gap-3">
		<div>
			<h1 class="text-white ">Network Management</h1>
		</div>
		<div class="flex flex-col">
			<div class="flex flex-col gap-1 text-sm">
				<label class="text-white" for="ipAddress">Select function</label>
				<select bind:value={appData.function}
						class="py-2.5 px-3 bg-transparent border border-[#313131] text-white outline-none rounded-[10px] focus:ring-2 focus:ring-[#39965F]"
						name="function" id="function">
						<option class="bg-[#313131]" value="1" selected>Get Network Information</option>
				</select>
			</div>

			<div class="flex flex-col gap-1 text-sm">
				<label class="text-white" for="ipAddress">IP Address</label>
				<input bind:value={appData.ip}
					   class="py-2.5 px-3 bg-transparent border border-[#313131] text-white outline-none rounded-[10px] focus:ring-2 focus:ring-[#39965F]"
					   type="text"
					   name="ipAddress" id="ipAddress" placeholder="Enter IP Address">
			</div>

			<div class="flex flex-col gap-1 text-sm">
				<label class="text-white" for="ipAddress">Subnet prefix</label>
				<select bind:value={appData.subnetPrefix}
						class="py-2.5 px-3 bg-transparent border border-[#313131] text-white outline-none rounded-[10px] focus:ring-2 focus:ring-[#39965F]"
						name="ipAddress" id="ipAddress">
					{#each subnetPrefixes as prefix }
						<option class="bg-[#313131]" value={prefix} selected={prefix === 24}>{prefix}</option>
					{/each}
				</select>
			</div>
		</div>

		<div>
			<button class="rounded-[10px] bg-[#39965F] w-full p-2 text-white transition-all duration-[0.3s] hover:bg-[#317C50]">Submit</button>
		</div>
	</div>
</form>
