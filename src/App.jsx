import { useState } from "react";
import { ethers } from "ethers";
import { useWeb3Modal } from "@web3modal/react";
import background from "./assets/cyberpunk-bg.png";
import skynetLogo from "./assets/skynet-logo.png";

export default function App() {
const { open } = useWeb3Modal();

const [walletConnected, setWalletConnected] = useState(false);
const [ethAmount, setEthAmount] = useState("");
const [contractBalance, setContractBalance] = useState("0");
const [alert, setAlert] = useState({ message: "", show: false });

const connectWallet = async () => {
try {
await open();
setWalletConnected(true);
} catch (err) {
showAlert("Wallet connection failed", true);
}
};

const showAlert = (message, show) => {
setAlert({ message, show });
setTimeout(() => setAlert({ message: "", show: false }), 4000);
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
backgroundColor: "rgba(0, 0, 0, 0.5)",
padding: 30,
borderRadius: 15,
textAlign: "center",
maxWidth: 400,
width: "100%",
boxShadow: "0 0 20px rgba(0,0,0,0.5)",
}}
>
<div
style={{
display: "flex",
justifyContent: "center",
marginBottom: 20,
}}
>
<img src={skynetLogo} alt="Skynet Logo" style={{ height: 50 }} />
</div>
<h1 style={{ color: "white", fontSize: 24 }}>SKYNET</h1>
<p style={{ color: "white", fontSize: 14 }}>SKYNET Token Dashboard</p>
<p style={{ color: "white", fontSize: 12 }}>
Contract ETH Balance: {contractBalance} ETH
</p>

<button
onClick={connectWallet}
style={{
marginTop: 10,
marginBottom: 10,
padding: "10px 20px",
backgroundColor: "#666",
border: "none",
borderRadius: 8,
color: "white",
cursor: "pointer",
width: "100%",
}}
>
Connect Wallet
</button>

<input
type="number"
value={ethAmount}
onChange={(e) => setEthAmount(e.target.value)}
placeholder="Amount in ETH"
style={{
marginTop: 10,
padding: "10px",
border: "none",
borderRadius: 8,
width: "100%",
marginBottom: 10,
}}
/>

<button
style={{
padding: "10px 20px",
backgroundColor: "#666",
border: "none",
borderRadius: 8,
color: "white",
cursor: "pointer",
width: "100%",
marginBottom: 10,
}}
>
Buy SKY
</button>

<button
style={{
padding: "10px 20px",
backgroundColor: "#666",
border: "none",
borderRadius: 8,
color: "white",
cursor: "pointer",
width: "100%",
}}
>
Claim Free SKY
</button>

{alert.show && (
<p style={{ color: "red", marginTop: 15 }}>{alert.message}</p>
)}
</div>
</div>
);
}