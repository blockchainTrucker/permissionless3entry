import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Define the contract ABI (just the necessary functions for now)
const MIND_ABI = [
    'function balanceOf(address owner) view returns (uint256)',
    // Add more functions here as needed
];

// Custom hook to interact with the MIND token contract
const useMind = (contractAddress) => {
    const [contract, setContract] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState(null);
    const [balance, setBalance] = useState(null);

    // Initialize provider, signer, and contract when the component mounts
    useEffect(() => {
        const init = async () => {
            try {
                // Check if MetaMask (or any other web3 provider) is available
                if (window.ethereum) {
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

                    // Initialize the contract
                    const _contract = new ethers.Contract(
                        contractAddress,
                        MIND_ABI,
                        _signer
                    );

                    // Set provider, signer, and contract in the state
                    setContract(_contract);
                } else {
                    setError('Ethereum wallet not found');
                    console.error('Ethereum wallet not found');
                }
            } catch (err) {
                console.error('Error initializing the contract: ', err);
                setError(err.message);
            }
        };
        init();
    }, [contractAddress]);

    // Automatically get balance when the wallet is connected and contract is initialized
    useEffect(() => {
        const fetchBalance = async () => {
            if (contract && address) {
                try {
                    setLoading(true);
                    const balance = await contract.balanceOf(address);
                    const formattedBalance = ethers
                        .formatUnits(balance, 18)
                        .toString();
                    const roundedBalance =
                        parseFloat(formattedBalance).toFixed(2);
                    setBalance(roundedBalance);
                } catch (err) {
                    console.error('Error fetching balance: ', err);
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBalance();
    }, [contract, address]);

    return {
        balance,
        error,
        loading,
        address,
    };
};

export default useMind;
