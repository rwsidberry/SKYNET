import React, { useState } from "react";
import { ethers } from "ethers";
import skynetLogo from "./assets/skynet-logo.png";
import background from "./assets/cyberpunk-bg.png";

// Replace with your deployed contract addresses
const saleContractAddress = "0xYourSaleContractAddress";
const claimContractAddress = "0xYourClaimContractAddress";

const saleAbi = ["function buy() public payable", "function withdraw() public view returns (uint256)"];
const claimAbi = ["function claim() public"];

export default function App() {
const [walletConnected, setWalletConnected] = useState(false);
const [ethAmount, setEthAmount] = useState("");
const [contractBalance, setContractBalance] = useState("0");
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

const buySky = async () => {
if (!window.ethereum || !ethAmount) return alert("Please connect wallet and enter ETH amount");

try {
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(saleContractAddress, saleAbi, signer);
const tx = await contract.buy({ value: ethers.parseEther(ethAmount) });
await tx.wait();
alert("✅ SKY tokens purchased!");
} catch (error) {
console.error("Buy failed:", error);
alert("❌ Purchase failed.");
}
};

const withdraw = async () => {
if (!window.ethereum) return;

try {
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(saleContractAddress, saleAbi, signer);
const tx = await contract.withdraw();
await tx.wait();
alert("✅ Withdrawal successful!");
} catch (error) {
console.error("Withdraw failed:", error);
alert("❌ Withdrawal failed.");
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
style={{
backgroundImage: `url(${background})`,
backgroundSize: "cover",
backgroundPosition: "center",
height: "100vh",
width: "100vw",
display: "flex",
justifyContent: "center",
alignItems: "center",
margin: 0,
padding: 0,
boxSizing: "border-box",
}}
>
<div
style={{
backgroundColor: "rgba(0, 0, 0, 0.6)",
padding: "2rem",
borderRadius: "1.5rem",
boxShadow: "0 0 20px rgba(0,0,0,0.3)",
border: "1px solid #ccc",
maxWidth: "400px",
width: "100%",
textAlign: "center",
}}
>
<div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
<img src={skynetLogo} alt="Skynet Logo" style={{ height: 50 }} />
</div>
<h1 style={{ color: "white", fontSize: "2rem", marginBottom: "0.25rem" }}>SKYNET</h1>
<p style={{ color: "white", fontWeight: "bold", marginBottom: "0.25rem" }}>SKYNET Token Dashboard</p>
<p style={{ color: "#ccc", marginBottom: "1.5rem" }}>Contract ETH Balance: {contractBalance} ETH</p>

<button
onClick={connectWallet}
style={buttonStyle}
>
Connect Wallet
</button>

<input
type="text"
placeholder="Amount in ETH"
value={ethAmount}
onChange={(e) => setEthAmount(e.target.value)}
style={{
width: "100%",
padding: "10px",
margin: "0.5rem 0",
borderRadius: "8px",
border: "1px solid #ccc",
backgroundColor: "rgba(255,255,255,0.1)",
color: "#fff",
}}
/>

<button onClick={buySky} style={buttonStyle}>
Buy SKY
</button>
<button onClick={withdraw} style={buttonStyle}>
Admin Withdraw ETH
</button>
<button onClick={claimTokens} style={buttonStyle}>
Claim Free SKY
</button>

{claimStatus && (
<p style={{ marginTop: "1rem", color: "#fff" }}>{claimStatus}</p>
)}
</div>
</div>
);
}

// Transparent gray button style
const buttonStyle = {
width: "100%",
backgroundColor: "rgba(255, 255, 255, 0.1)",
color: "white",
fontWeight: "bold",
padding: "10px",
margin: "0.5rem 0",
border: "1px solid rgba(255,255,255,0.2)",
borderRadius: "8px",
cursor: "pointer",
};
