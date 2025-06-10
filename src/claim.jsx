import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import skynetLogo from "./assets/skynet-logo.png";
import background from "./assets/cyberpunk-bg.png";

export default function Claim() {
const [walletConnected, setWalletConnected] = useState(false);
const [claimStatus, setClaimStatus] = useState("");
const [contractBalance, setContractBalance] = useState("0");

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

useEffect(() => {
const fetchBalance = async () => {
if (window.ethereum && walletConnected) {
const provider = new ethers.BrowserProvider(window.ethereum);
const balance = await provider.getBalance("0xd67d7e5613ee5ce75cc3b358039ad8c3d42a0910");
setContractBalance(ethers.formatEther(balance));
}
};
fetchBalance();
}, [walletConnected]);

return (
<div
className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
style={{ backgroundImage: `url(${background})` }}
>
<div className="bg-black bg-opacity-60 p-8 rounded-3xl shadow-lg border border-gray-300 w-full max-w-sm">
<div className="flex flex-col items-center">
<img src={skynetLogo} alt="Skynet Logo" className="h-20 mb-4" />
<h1 className="text-3xl font-bold text-white">SKYNET</h1>
<p className="text-white">SKYNET Token Sale</p>
<p className="text-white text-sm mb-4">
Contract ETH Balance: {contractBalance} ETH
</p>
<p className="text-center text-white font-semibold text-md mb-4 animate-pulse">
Connect your wallet now to instantly claim free <span className="text-cyan-400">SKY</span> tokens!
</p>
</div>

<div className="space-y-4">
<button
onClick={connectWallet}
className="w-full bg-gray-900 text-white py-2 px-4 rounded shadow-md hover:bg-gray-800"
>
Connect Wallet
</button>
<button className="w-full bg-gray-900 text-white py-2 px-4 rounded shadow-md hover:bg-gray-800">
Claim SKY Tokens
</button>
</div>

{claimStatus && (
<p className="text-center text-green-400 font-medium mt-4">
{claimStatus}
</p>
)}
</div>
</div>
);
}
