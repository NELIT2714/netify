<script>
	import {
		convertBinaryToIP,
		convertIPToBinary,
		convertMaskToPrefix,
		convertPrefixToMask,
		getNetworkDetails,
	} from "/src/lib/js/netifyFunctions.js";
	import Modal from "$lib/components/ui/+modal.svelte";

	let netifyFunc = "0";
	let ipAddress = "";
	let subnetPrefix = 24;
	let binaryIPAddress = "11000000101010000000000000000001";

	let errorMessage;

	const subnetPrefixes = Array.from({ length: 31 }, (_, index) => index + 1);
	const netifyFunctions = [
		{ id: "0", name: "Get Network Information" },
		{ id: "1", name: "Convert Prefix to Subnet Mask" },
		{ id: "2", name: "Convert Subnet Mask to Prefix" },
		{ id: "3", name: "Convert IP Address to Binary" },
		{ id: "4", name: "Convert Binary to IP Address" },
	];

	let resultModal = false;
	const resultModalToggle = () => {
		resultModal = !resultModal;
	};

	let data;

	const submitForm = async () => {
		switch (netifyFunc) {
			case "0":
				data = await getNetworkDetails(ipAddress, subnetPrefix);
				break;
			case "1":
				data = await convertPrefixToMask(subnetPrefix);
				break;
			case "2":
				data = await convertMaskToPrefix(ipAddress);
				break;
			case "3":
				data = await convertIPToBinary(ipAddress);
				break;
			case "4":
				data = await convertBinaryToIP(binaryIPAddress);
				break;
		}
		errorMessage = data ? null : "An internal application error occurred. Please check your input and try again";

		if (!errorMessage) {
			resultModalToggle();
		}
	};
</script>

{#if resultModal}
	<Modal title="Result" closeFunc={resultModalToggle}>

		{#if netifyFunc === "0"}

			<div class="flex flex-col gap-5">
				<div class="flex flex-col gap-2">
					<p class="text-gray-400 text-[11pt]"><strong
						class="text-gray-200">Address:</strong> {data.ip.address}
					</p>
					<p class="text-gray-400 text-[11pt]"><strong class="text-gray-200">Mask:</strong> {data.subnet_mask}
						({subnetPrefix})</p>
					<p class="text-gray-400 text-[11pt]"><strong
						class="text-gray-200">Class:</strong> {data.ip.ip_class}
					</p>
					<p class="text-gray-400 text-[11pt]"><strong
						class="text-gray-200">Status:</strong> {data.ip.ip_status}
					</p>
				</div>

				<div class="flex flex-col gap-2">
					<p class="text-gray-400 text-[11pt]"><strong class="text-gray-200">Network
						IP:</strong> {data.network.ip}</p>
					<p class="text-gray-400 text-[11pt]"><strong
						class="text-gray-200">Hosts:</strong> {data.network.hosts.toLocaleString()}</p>
					<p class="text-gray-400 text-[11pt]"><strong
						class="text-gray-200">Subnets:</strong> {data.network.subnets.toLocaleString()}</p>
					<p class="text-gray-400 text-[11pt]"><strong
						class="text-gray-200">Broadcast:</strong> {data.network.broadcast}</p>
				</div>
			</div>

		{:else if netifyFunc === "1"}

			<div class="flex flex-col gap-2">
				<p class="text-gray-400 text-[11pt]"><strong class="text-gray-200">Mask: </strong> {data.ip_mask}</p>
			</div>

		{:else if netifyFunc === "2"}

			<div class="flex flex-col gap-2">
				<p class="text-gray-400 text-[11pt]"><strong class="text-gray-200">Prefix: </strong> {data.prefix}</p>
			</div>

		{:else if netifyFunc === "3"}

			<div class="flex flex-col gap-2">
				<p class="text-gray-400 text-[11pt]"><strong class="text-gray-200">Binary IP
					Address: </strong> {data.ip_address_binary.match(/.{1,8}/g).join(".")}</p>
			</div>

		{:else if netifyFunc === "4"}

			<div class="flex flex-col gap-2">
				<p class="text-gray-400 text-[11pt]"><strong class="text-gray-200">IP
					Address: </strong> {data.ip_address}</p>
			</div>

		{/if}
	</Modal>
{/if}

<section class="flex justify-center items-center" style="height: calc(var(--vh, 1vh) * 100)">
	<form class="w-[400px]" on:submit|preventDefault={submitForm} on:change={errorMessage = null}>
		<div class="flex flex-col gap-3">
			<div class="text-center mb-3">
				<h1 class="text-white text-2xl font-bold">Network Management</h1>
			</div>

			<div class="flex flex-col gap-3">
				<div class="flex flex-col gap-1 text-sm w-full">
					<label class="text-white" for="ipAddress">Select function</label>
					<select bind:value={netifyFunc}
							class="py-2.5 px-3 bg-transparent border border-[#313131] text-white outline-none rounded-[10px] focus:ring-2 focus:ring-[#39965F] w-full"
							name="function" id="function">
						{#each netifyFunctions as item (item.id)}
							<option class="bg-[#313131]" value={item.id}>{item.name}</option>
						{/each}
					</select>
				</div>

				{#if netifyFunc === "0"}

					<div class="flex flex-col gap-1 text-sm w-full">
						<label class="text-white" for="ipAddress">IP Address</label>
						<input bind:value={ipAddress}
							   class="py-2.5 px-3 bg-transparent border border-[#313131] text-white outline-none rounded-[10px] focus:ring-2 focus:ring-[#39965F] w-full"
							   type="text"
							   name="ipAddress" id="ipAddress" placeholder="Enter IP Address">
					</div>

					<div class="flex flex-col gap-1 text-sm w-full">
						<label class="text-white" for="ipAddress">Subnet prefix</label>
						<select bind:value={subnetPrefix}
								class="py-2.5 px-3 bg-transparent border border-[#313131] text-white outline-none rounded-[10px] focus:ring-2 focus:ring-[#39965F] w-full"
								name="ipAddress" id="ipAddress">
							{#each subnetPrefixes as prefix }
								<option class="bg-[#313131]" value={prefix} selected={prefix === 24}>{prefix}</option>
							{/each}
						</select>
					</div>

				{:else if netifyFunc === "1"}

					<div class="flex flex-col gap-1 text-sm w-full">
						<label class="text-white" for="ipAddress">Subnet prefix</label>
						<select bind:value={subnetPrefix}
								class="py-2.5 px-3 bg-transparent border border-[#313131] text-white outline-none rounded-[10px] focus:ring-2 focus:ring-[#39965F] w-full"
								name="ipAddress" id="ipAddress">
							{#each subnetPrefixes as prefix }
								<option class="bg-[#313131]" value={prefix} selected={prefix === 24}>{prefix}</option>
							{/each}
						</select>
					</div>

				{:else if netifyFunc === "2"}

					<div class="flex flex-col gap-1 text-sm w-full">
						<label class="text-white" for="ipAddress">Subnet Mask</label>
						<input bind:value={ipAddress}
							   class="py-2.5 px-3 bg-transparent border border-[#313131] text-white outline-none rounded-[10px] focus:ring-2 focus:ring-[#39965F] w-full"
							   type="text"
							   name="ipAddress" id="ipAddress" placeholder="Enter Subnet Mask">
					</div>

				{:else if netifyFunc === "3"}

					<div class="flex flex-col gap-1 text-sm w-full">
						<label class="text-white" for="ipAddress">IP Address</label>
						<input bind:value={ipAddress}
							   class="py-2.5 px-3 bg-transparent border border-[#313131] text-white outline-none rounded-[10px] focus:ring-2 focus:ring-[#39965F] w-full"
							   type="text"
							   name="ipAddress" id="ipAddress" placeholder="Enter IP Address">
					</div>

				{:else if netifyFunc === "4"}

					<div class="flex flex-col gap-1 text-sm w-full">
						<label class="text-white" for="ipAddress">Binary IP Address</label>
						<input bind:value={binaryIPAddress}
							   class="py-2.5 px-3 bg-transparent border border-[#313131] text-white outline-none rounded-[10px] focus:ring-2 focus:ring-[#39965F] w-full"
							   type="text"
							   name="binaryIPAddress" id="binaryIPAddress" placeholder="Enter Binary IP Address">
					</div>

				{/if}
			</div>

			{#if errorMessage}
				<div>
					<p class="empty:hidden text-sm text-[#FF4D4D]">{errorMessage}</p>
				</div>
			{/if}

			<div class="w-full">
				<button
					class="rounded-[10px] bg-[#39965F] w-full p-2 text-white transition-all duration-[0.3s] hover:bg-[#317C50]">
					Submit
				</button>
			</div>
		</div>
	</form>
</section>
