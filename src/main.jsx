import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { WagmiConfig } from 'wagmi';
import { Web3Modal } from '@web3modal/react';

import { wagmiConfig, chains, projectId } from './config';

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<WagmiConfig config={wagmiConfig}>
<App />
<Web3Modal projectId={projectId} ethereumClient={{ chains }} />
</WagmiConfig>
</React.StrictMode>
);
