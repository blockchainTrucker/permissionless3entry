import { useState, useEffect } from 'react';
import { ethers, verifyMessage } from 'ethers';

// Define the contract ABI (just the necessary functions for now)
const MIND_ABI = ['function balanceOf(address owner) view returns (uint256)'];

// Define network configurations for Rootstock and XRP EVM sidechain
const NETWORKS = {
    rootstock: {
        chainId: '0x1f',
        rpcUrl: 'https://public-node.testnet.rsk.co',
        chainName: 'Rootstock',
        nativeCurrency: {
            name: 'RSK',
            symbol: 'RSK',
            decimals: 18,
        },
        blockExplorerUrls: ['https://explorer.rsk.co'],
    },
    xrp: {
        chainId: '0x15f902', // Corrected chain ID for XRP EVM Sidechain
        rpcUrl: 'https://rpc-evm-sidechain.xrpl.org',
        chainName: 'XRP EVM Sidechain',
        nativeCurrency: {
            name: 'XRP',
            symbol: 'XRP',
            decimals: 18,
        },
        blockExplorerUrls: ['https://evm-sidechain.xrpl.org'],
    },
};

// Custom hook to interact with the MIND token contract
const useMind = (contractAddress) => {
    const [contract, setContract] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState(null);
    const [balance, setBalance] = useState(0.0);
    const [modal, setModal] = useState(false); // Controls the modal visibility
    const [network, setNetwork] = useState(null); // Tracks selected network
    const [walletConnected, setWalletConnected] = useState(false);
    const [rewardModal, setRewardModal] = useState(false);
    const [rewardType, setRewardType] = useState(true);
    const [prompt, setPrompt] = useState(null);
    const [name, setName] = useState('');

    // Function to switch the network in MetaMask
    const switchNetwork = async (networkConfig) => {
        try {
            if (!window.ethereum) {
                throw new Error('Ethereum wallet not found');
            }

            if (!networkConfig || !networkConfig.chainId) {
                throw new Error('Invalid network configuration or chain ID');
            }

            console.log('Switching to network:', networkConfig.chainName);

            // Request to switch network in MetaMask
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: networkConfig.chainId }],
            });
        } catch (error) {
            if (error.code === 4902) {
                // Chain is not added to MetaMask, request to add it
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: networkConfig.chainId,
                            rpcUrls: [networkConfig.rpcUrl],
                            chainName: networkConfig.chainName,
                            nativeCurrency: networkConfig.nativeCurrency,
                            blockExplorerUrls:
                                networkConfig.blockExplorerUrls || [],
                        },
                    ],
                });
            } else if (error.code === -32002) {
                // MetaMask error for a pending request
                console.error(
                    'A network switch request is already pending. Please complete the previous request.'
                );
            } else {
                console.error('Failed to switch network:', error);
                setError(error.message);
            }
        }
    };

    // Initialize provider, signer, and contract when the component mounts
    useEffect(() => {
        const init = async () => {
            try {
                // Retrieve the user object from localStorage
                const _user = JSON.parse(localStorage.getItem('user'));

                // Check if the user object and the network field exist
                if (!_user || !_user.network) {
                    console.log('No user or network found, showing modal...');
                    setModal(true); // Show modal if no network is selected
                    throw new Error('No network selected');
                }

                console.log('User object from localStorage:', _user);
                console.log('Selected network:', _user.network);

                // Get the network configuration from the NETWORKS object
                const networkConfig = NETWORKS[_user.network];

                // If no valid network configuration is found, throw an error and delete user
                if (!networkConfig) {
                    console.error(
                        'Invalid network configuration for network:',
                        _user.network
                    );

                    // Remove the 'user' from localStorage
                    localStorage.removeItem('user');

                    // Open the modal to ask the user to select a new network
                    setModal(true);

                    throw new Error('Invalid network configuration');
                }

                // Set the selected network to state
                console.log(_user.network);
                setNetwork(_user.network);
                setName(_user.name);
                console.log(network);
                setModal(false);

                // Check if MetaMask or another web3 provider is available
                if (window.ethereum) {
                    console.log(
                        'MetaMask detected, switching to network:',
                        networkConfig.chainName
                    );

                    // Switch to the selected network (Rootstock or XRP EVM sidechain)
                    await switchNetwork(networkConfig);

                    // Create a provider to interact with the Ethereum network
                    const _provider = new ethers.BrowserProvider(
                        window.ethereum
                    );

                    // Request account access if needed
                    await _provider.send('eth_requestAccounts', []);

                    // Get the signer (the account interacting with the contract)
                    const _signer = await _provider.getSigner();

                    // Get the connected wallet's address
                    const _address = await _signer.getAddress();
                    setAddress(_address);

                    // Check if contract address is valid
                    if (!contractAddress) {
                        throw new Error('Contract address is not defined');
                    }

                    // Initialize the contract
                    const _contract = new ethers.Contract(
                        contractAddress,
                        MIND_ABI,
                        _signer
                    );
                    setContract(_contract);
                } else {
                    setError('Ethereum wallet not found');
                    console.error('Ethereum wallet not found');
                }
            } catch (err) {
                console.error('Error initializing the contract:', err);
                setError(err.message);
            }
        };
        init();
    }, [contractAddress, network]);

    const fetchBalance = async () => {
        try {
            setLoading(true);
            const balance = await contract.balanceOf(address);
            const formattedBalance = ethers.formatUnits(balance, 18).toString();
            setBalance(parseFloat(formattedBalance).toFixed(2));
        } catch (err) {
            console.error('Error fetching balance:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Automatically get balance when the wallet is connected and contract is initialized
    useEffect(() => {
        fetchBalance();
    }, [contract, address, network]);

    // Connect to the user's wallet and sign a message
    const connectWallet = async (name, network) => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider
                await provider.send('eth_requestAccounts', []); // Request accounts from the user
                const signer = await provider.getSigner(); // Get the signer
                const address = await signer.getAddress(); // Get user's address

                const message =
                    'Please sign this message to prove ownership of your wallet.';
                const signature = await signer.signMessage(message); // User signs the message

                // Recover the address from the signed message
                const recoveredAddress = verifyMessage(message, signature);

                // Compare the recovered address with the wallet address
                if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
                    console.log(
                        'Signature is valid and matches the wallet address.'
                    );
                    setModal(false);
                    setWalletConnected(true);
                    setAddress(address);
                    localStorage.setItem(
                        'user',
                        JSON.stringify({ network, name })
                    );
                } else {
                    console.error(
                        'Signature does not match the wallet address.'
                    );
                    alert('Signature verification failed. Please try again.');
                }
            } catch (error) {
                console.error('Error connecting to wallet:', error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to continue.');
        }
    };

    return {
        name,
        balance,
        error,
        loading,
        address,
        modal,
        network,
        rewardModal,
        setRewardModal,
        rewardType,
        setRewardType,
        setModal,
        connectWallet,
        walletConnected,
        fetchBalance,
        prompt,
        setPrompt,
    };
};

export default useMind;
