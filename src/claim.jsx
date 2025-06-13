import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css"; // <— make sure this is at the top
import skynetLogo from "./assets/skynet-logo.png";

// Replace the image and contractAddress as needed
const backgroundStyle = "fullscreen-bg";
const claimContractAddress = "0xYourClaimContractAddress";
const claimAbi = ["function claim() public"];

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
<div className={backgroundStyle}>
<div className="card">
<img src={skynetLogo} alt="Skynet Logo" />
<h1>SKYNET</h1>
<p>Claim Your Free SKY Token</p>
<p>Connect your wallet to claim 1000 SKY tokens instantly.</p>
<button onClick={connectWallet} style={{ backgroundColor: "#007bff", color: "white" }}>
Connect Wallet
</button>
<button onClick={claimTokens} style={{ backgroundColor: "#555", color: "white" }}>
Claim Free SKY
</button>
{claimStatus && <p style={{ marginTop: "1rem" }}>{claimStatus}</p>}
</div>
</div>
);
}
