import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import skynetLogo from "./assets/skynet-logo.png";
const background = "./public/cyberpunk-bg.jpg";


export default function App() {
const [walletConnected, setWalletConnected] = useState(false);
const [ethAmount, setEthAmount] = useState("");
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
const balance = await provider.getBalance("your_contract_address");
setContractBalance(ethers.formatEther(balance));
}
};
fetchBalance();
}, [walletConnected]);

return (
<div
className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center px-4"
style={{ backgroundImage: `url(${background})` }}
>
<div className="bg-black bg-opacity-60 p-8 rounded-3xl shadow-lg border border-gray-300 w-full max-w-xl text-center mx-auto">
<div className="flex flex-col items-center">
<img src={skynetLogo} alt="Skynet Logo" className="h-20 mb-4" />
<h1 className="text-3xl font-bold text-white">SKYNET</h1>
<p className="text-white">SKYNET Token Sale</p>
<p className="text-white text-sm mb-6">
Contract ETH Balance: {contractBalance} ETH
</p>
</div>
<div className="space-y-4">
<button
onClick={connectWallet}
className="w-full bg-blue-800 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700"
>
Connect Wallet
</button>
<input
type="text"
placeholder="Amount in ETH"
className="w-full px-4 py-2 rounded border border-gray-700 bg-gray-900 text-white placeholder-gray-400"
value={ethAmount}
onChange={(e) => setEthAmount(e.target.value)}
/>
<button className="w-full bg-blue-800 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700">
Buy SKY
</button>
<button className="w-full bg-blue-800 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700">
Admin Withdraw ETH
</button>
</div>
</div>
</div>
);
}