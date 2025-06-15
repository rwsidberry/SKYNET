import React, { useState } from "react";
import { ethers } from "ethers";
import skynetLogo from "./assets/skynet-logo.png";
import background from "./assets/cyberpunk-bg.png";

const purchaseContractAddress = "0x3d40c7cc7c952dae8b4624ea22ed2c63e6485b78";
const claimContractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

const claimAbi = [
{
inputs: [
{ internalType: "address", name: "to", type: "address" },
{ internalType: "uint256", name: "amount", type: "uint256" },
],
name: "transfer",
outputs: [{ internalType: "bool", name: "", type: "bool" }],
stateMutability: "nonpayable",
type: "function",
},
];

const purchaseAbi = [
{ inputs: [], stateMutability: "nonpayable", type: "constructor" },
{
inputs: [],
name: "RATE",
outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
stateMutability: "view",
type: "function",
},
{
inputs: [],
name: "buy",
outputs: [],
stateMutability: "payable",
type: "function",
},
{
inputs: [],
name: "skyToken",
outputs: [
{ internalType: "contract IERC20", name: "", type: "address" },
],
stateMutability: "view",
type: "function",
},
];

export default function App() {
const [walletConnected, setWalletConnected] = useState(false);
const [status, setStatus] = useState("");

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const connectWallet = async () => {
if (window.ethereum) {
try {
await window.ethereum.request({ method: "eth_requestAccounts" });
setWalletConnected(true);
} catch (err) {
console.error("Wallet connection failed:", err);
}
} else {
alert("Please install MetaMask.");
}
};

const claimTokens = async () => {
if (!window.ethereum) return alert("Please install MetaMask");

try {
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(
claimContractAddress,
claimAbi,
signer
);
const userAddress = await signer.getAddress();
const tx = await contract.transfer(userAddress, 1000);
await tx.wait();
setStatus("✅ Claim successful!");
} catch (error) {
console.error("Claim failed:", error);
setStatus("❌ Claim failed.");
}
};

const buyTokens = async () => {
if (!window.ethereum) return alert("Please install MetaMask");

try {
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(
purchaseContractAddress,
purchaseAbi,
signer
);
const tx = await contract.buy({ value: ethers.parseEther("0.01") });
await tx.wait();
setStatus("✅ Purchase successful!");
} catch (error) {
console.error("Purchase failed:", error);
setStatus("❌ Purchase failed.");
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
backgroundColor: "rgba(0,0,0,0.7)",
padding: 24,
borderRadius: 16,
maxWidth: 400,
width: "90%",
textAlign: "center",
color: "white",
}}
>
<div
style={{
display: "flex",
justifyContent: "center",
marginBottom: 20,
}}
>
<img src={skynetLogo} alt="Skynet Logo" style={{ height: 60 }} />
</div>
<h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 12 }}>
SKYNET
</h1>
<p style={{ marginBottom: 8 }}>Claim or Buy SKY Token</p>

<button
onClick={connectWallet}
style={{
width: "100%",
backgroundColor: "rgba(255, 255, 255, 0.1)",
color: "white",
padding: 12,
borderRadius: 8,
border: "1px solid white",
marginBottom: 10,
cursor: "pointer",
}}
>
Connect Wallet
</button>

<button
onClick={claimTokens}
style={{
width: "100%",
backgroundColor: "rgba(255, 255, 255, 0.1)",
color: "white",
padding: 12,
borderRadius: 8,
border: "1px solid white",
marginBottom: 10,
cursor: "pointer",
}}
>
Claim Free SKY
</button>

<button
onClick={buyTokens}
style={{
width: "100%",
backgroundColor: "rgba(255, 255, 255, 0.1)",
color: "white",
padding: 12,
borderRadius: 8,
border: "1px solid white",
cursor: "pointer",
}}
>
Buy SKY for 0.01 ETH
</button>

{status && <p style={{ marginTop: 16 }}>{status}</p>}

{/* Deep Link for Mobile */}
{isMobile && !window.ethereum && (
<a
href="https://metamask.app.link/dapp/skynet-blush.vercel.app"
target="_blank"
rel="noopener noreferrer"
style={{
marginTop: 20,
display: "inline-block",
backgroundColor: "#f6851b",
padding: "10px 16px",
borderRadius: 6,
color: "white",
textDecoration: "none",
fontWeight: "bold",
}}
>
Open in MetaMask App
</a>
)}
</div>
</div>
);
}