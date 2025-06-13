import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css"; // Import shared styles
import skynetLogo from "./assets/skynet-logo.png";

// Add your deployed contract address and ABI here
const saleContractAddress = "0xYourSaleContractAddress"; // Replace with actual address
const saleAbi = [
"function buy() public payable",
"function withdraw() public",
"function getBalance() public view returns (uint256)"
];

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

const fetchBalance = async () => {
if (!window.ethereum) return;
try {
const provider = new ethers.BrowserProvider(window.ethereum);
const contract = new ethers.Contract(saleContractAddress, saleAbi, provider);
const balance = await contract.getBalance();
setContractBalance(ethers.formatEther(balance));
} catch (err) {
console.error("Balance fetch failed:", err);
}
};

const buySky = async () => {
if (!window.ethereum) return alert("Please install MetaMask");
try {
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(saleContractAddress, saleAbi, signer);
const tx = await contract.buy({ value: ethers.parseEther(ethAmount) });
await tx.wait();
fetchBalance();
alert("✅ Purchase successful!");
} catch (err) {
console.error("Purchase failed:", err);
alert("❌ Purchase failed.");
}
};

const withdrawEth = async () => {
if (!window.ethereum) return alert("Please install MetaMask");
try {
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(saleContractAddress, saleAbi, signer);
const tx = await contract.withdraw();
await tx.wait();
fetchBalance();
alert("✅ ETH withdrawn!");
} catch (err) {
console.error("Withdrawal failed:", err);
alert("❌ Withdrawal failed.");
}
};

useEffect(() => {
if (walletConnected) {
fetchBalance();
}
}, [walletConnected]);

return (
<div className="fullscreen-bg">
<div className="card">
<img src={skynetLogo} alt="Skynet Logo" />
<h1>SKYNET</h1>
<p>SKYNET Token Sale</p>
<p>Contract ETH Balance: {contractBalance} ETH</p>

<button onClick={connectWallet} style={{ backgroundColor: "#007bff", color: "white" }}>
Connect Wallet
</button>

<input
type="text"
placeholder="Amount in ETH"
value={ethAmount}
onChange={(e) => setEthAmount(e.target.value)}
style={{ marginTop: "1rem", padding: "0.5rem", width: "100%", borderRadius: "8px" }}
/>

<button onClick={buySky} style={{ backgroundColor: "#00b894", color: "white" }}>
Buy SKY
</button>

<button onClick={withdrawEth} style={{ backgroundColor: "#d63031", color: "white" }}>
Admin Withdraw ETH
</button>
</div>
</div>
);
}