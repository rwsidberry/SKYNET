import React, { useState } from "react";
import { ethers } from "ethers";
import skynetLogo from "./assets/skynet-logo.png";
import background from "./assets/cyberpunk-bg.png";

const saleContractAddress = "0x3d40c7cc7c952dae8b4624ea22ed2c63e6485b78";
const claimContractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

const saleAbi = [
{
"inputs": [],
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"inputs": [],
"name": "RATE",
"outputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "buy",
"outputs": [],
"stateMutability": "payable",
"type": "function"
},
{
"inputs": [],
"name": "skyToken",
"outputs": [
{
"internalType": "contract IERC20",
"name": "",
"type": "address"
}
],
"stateMutability": "view",
"type": "function"
}
];

const claimAbi = [
{
"inputs": [
{
"internalType": "address",
"name": "to",
"type": "address"
},
{
"internalType": "uint256",
"name": "amount",
"type": "uint256"
}
],
"name": "transfer",
"outputs": [
{
"internalType": "bool",
"name": "",
"type": "bool"
}
],
"stateMutability": "nonpayable",
"type": "function"
}
];

export default function App() {
const [walletConnected, setWalletConnected] = useState(false);
const [ethAmount, setEthAmount] = useState("");
const [contractBalance, setContractBalance] = useState("0");
const [alert, setAlert] = useState(null);

const connectWallet = async () => {
if (window.ethereum) {
try {
await window.ethereum.request({ method: "eth_requestAccounts" });
setWalletConnected(true);
} catch (err) {
showAlert("Wallet connection failed", true);
}
} else {
alert("Install MetaMask to connect your wallet");
}
};

const showAlert = (message, error = false) => {
setAlert({ message, error });
setTimeout(() => setAlert(null), 3000);
};

const buyTokens = async () => {
if (!window.ethereum || !ethAmount) return showAlert("Enter ETH to purchase.", true);
try {
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(saleContractAddress, saleAbi, signer);
const tx = await contract.buy({ value: ethers.parseEther(ethAmount) });
await tx.wait();
showAlert("✅ Purchase successful!");
} catch (err) {
console.error(err);
showAlert("❌ Purchase failed.", true);
}
};

const claimTokens = async () => {
if (!window.ethereum) return showAlert("Wallet not connected.", true);
try {
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const address = await signer.getAddress();
const contract = new ethers.Contract(claimContractAddress, claimAbi, signer);
const tx = await contract.transfer(address, ethers.parseUnits("1000", 18));
await tx.wait();
showAlert("✅ Claim successful!");
} catch (err) {
console.error(err);
showAlert("❌ Claim failed.", true);
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
boxSizing: "border-box"
}}
>
<div
style={{
backgroundColor: "rgba(0, 0, 0, 0.65)",
padding: 30,
borderRadius: 20,
border: "1px solid #ccc",
width: "90vw",
maxWidth: 350,
textAlign: "center"
}}
>
<div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
<img src={skynetLogo} alt="Skynet Logo" style={{ height: 50 }} />
</div>

<h1 style={{ color: "white", fontSize: 28, marginBottom: 8 }}>SKYNET</h1>
<p style={{ color: "#bbb", fontSize: 14, marginBottom: 4 }}>SKYNET Token Dashboard</p>
<p style={{ color: "#ccc", fontSize: 12, marginBottom: 20 }}>Contract ETH Balance: {contractBalance} ETH</p>

<button onClick={connectWallet} style={btnStyle}>Connect Wallet</button>
<input
type="text"
placeholder="Amount in ETH"
value={ethAmount}
onChange={(e) => setEthAmount(e.target.value)}
style={{ ...btnStyle, backgroundColor: "#444", marginTop: 10 }}
/>
<button onClick={buyTokens} style={btnStyle}>Buy SKY</button>
<button onClick={() => showAlert("Admin Withdraw feature coming soon", true)} style={btnStyle}>Admin Withdraw ETH</button>
<button onClick={claimTokens} style={btnStyle}>Claim Free SKY</button>

{alert && (
<p
style={{
marginTop: 10,
color: alert.error ? "#ff4d4f" : "#4caf50",
fontWeight: "bold"
}}
>
{alert.message}
</p>
)}
</div>
</div>
);
}

const btnStyle = {
width: "100%",
padding: "10px 0",
marginTop: 10,
backgroundColor: "rgba(255, 255, 255, 0.15)",
color: "white",
border: "1px solid #ccc",
borderRadius: 8,
cursor: "pointer",
fontWeight: "bold"
};

