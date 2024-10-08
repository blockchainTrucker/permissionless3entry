import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Define the contract ABI (just the necessary functions for now)
const MIND_ABI = [
    'function balanceOf(address owner) view returns (uint256)',
    'function mint(address to, uint256 amount) external',
    // Add more functions here as needed
];

// Custom hook to interact with the MIND token contract
const useMind = (contractAddress) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Initialize provider, signer, and contract when the component mounts
    useEffect(() => {
        const init = async () => {
            try {
                // Check if MetaMask (or any other web3 provider) is available
                if (window.ethereum) {
                    // Create a provider to interact with the Ethereum network (or Rootstock in your case)
                    const _provider = new ethers.BrowserProvider(
                        window.ethereum
                    );

                    // Request account access if needed
                    await _provider.send('eth_requestAccounts', []);

                    // Get the signer (the account interacting with the contract)
                    const _signer = await _provider.getSigner();

                    // Initialize the contract
                    const _contract = new ethers.Contract(
                        contractAddress,
                        MIND_ABI,
                        _signer
                    );

                    // Set provider, signer, and contract in the state
                    setProvider(_provider);
                    setSigner(_signer);
                    setContract(_contract);
                } else {
                    console.error('Ethereum wallet not found');
                }
            } catch (err) {
                console.error('Error initializing the contract: ', err);
                setError(err.message);
            }
        };
        init();
    }, [contractAddress]);

    // Function to get the balance of a specific address
    const getBalance = async (address) => {
        try {
            setLoading(true);
            if (!contract) throw new Error('Contract is not initialized');
            const balance = await contract.balanceOf(address);
            return ethers.formatUnits(balance, 18); // Assuming 18 decimals
        } catch (err) {
            console.error('Error fetching balance: ', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        provider,
        signer,
        contract,
        getBalance,
        error,
        loading,
    };
};

export default useMind;
