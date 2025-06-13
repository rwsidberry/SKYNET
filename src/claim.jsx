import React, { useState } from "react";
import { ethers } from "ethers";
import skynetLogo from "./assets/skynet-logo.png";
const background = "/cyberpunk-bg.jpg";

// Replace this with your deployed contract address
const claimContractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

// Minimal ABI for claim() function
const claimAbi = [
"function claim() public"
];

export default function Claim() {
const [walletConnected, setWalletConnected] = useState(false);
const [claimStatus, setClaimStatus] = useState("");

const connectWallet = async () => {
if (window.ethereum) {
try {
await window.ethereum.request({ method: "eth_requestAccounts" });
setWalletConnected(true);
} catch (err) {
console.error("Wallet connection failed:", err);
}
} else {
alert("Install MetaMask to connect your wallet");
}
};

const claimTokens = async () => {
if (!window.ethereum) return alert("Please install MetaMask");

try {
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(claimContractAddress, claimAbi, signer);
const tx = await contract.claim();
await tx.wait();
setClaimStatus("✅ Claim successful!");
} catch (error) {
console.error("Claim failed:", error);
setClaimStatus("❌ Claim failed.");
}
};

return (
<div
className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center px-4"
style={{ backgroundImage: `url(${background})` }}
>
<div className="bg-black bg-opacity-60 p-8 rounded-3xl shadow-lg border border-gray-300 w-full max-w-xl text-center mx-auto">
<img src={skynetLogo} alt="Skynet Logo" className="h-16 mx-auto mb-4" />
<h1 className="text-3xl font-bold text-white mb-1">SKYNET</h1>
<p className="text-white font-medium mb-2">Claim Your Free SKY Token</p>
<p className="text-sm text-gray-300 mb-6">
Connect your wallet to claim 1000 SKY tokens instantly.
</p>

<button
onClick={connectWallet}
className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded mb-4 transition duration-300"
>
Connect Wallet
</button>

<button
onClick={claimTokens}
className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
>
Claim Free SKY
</button>

{claimStatus && (
<p className="mt-4 text-sm text-white">{claimStatus}</p>
)}
</div>
</div>
);
}