import { ethers, parseUnits } from 'ethers';
import { adminKey } from '../../config/config'; // Admin private key for minting
import validator from 'validator';
// Network configuration
const NETWORKS = {
    rootstock: {
        chainId: '0x1f',
        rpcUrl: 'https://public-node.testnet.rsk.co', // Correct Rootstock Testnet URL
        chainName: 'Rootstock',
        nativeCurrency: {
            name: 'RSK',
            symbol: 'RSK',
            decimals: 18,
        },
        blockExplorerUrls: ['https://explorer.testnet.rsk.co'],
    },
    xrp: {
        chainId: '0x15f902', // XRP EVM Sidechain Testnet Chain ID
        rpcUrl: 'https://rpc-evm-sidechain.xrpl.org', // Ensure this URL is correct
        chainName: 'XRP EVM Sidechain',
        nativeCurrency: {
            name: 'XRP',
            symbol: 'XRP',
            decimals: 18,
        },
        blockExplorerUrls: ['https://evm-sidechain.xrpl.org'],
    },
};

// ERC20 ABI, including the `mint` function
const ERC20_ABI = ['function mint(address to, uint256 amount) external'];

const completeMeditation = async (req, res) => {
    try {
        const { address, network } = req.body;
        const contractAddress = '0xfe1efa33372089f2741ae4b5a30c2428adc78823'; // Contract address
        const networkConfig = NETWORKS[network];

        // Check if valid network is selected
        if (!networkConfig) {
            return res
                .status(400)
                .json({ result: false, error: 'Invalid network specified' });
        }

        // Ensure there are enough messages to proceed with minting
        // Set up provider and test connectivity
        const provider = new ethers.JsonRpcProvider(networkConfig.rpcUrl);
        const wallet = new ethers.Wallet(adminKey, provider); // Use admin key to sign the transaction

        // Log block number to ensure the connection is valid
        const blockNumber = await provider.getBlockNumber();
        console.log(`Connected to ${network}, block number: ${blockNumber}`);

        // Set up contract instance
        const contract = new ethers.Contract(
            contractAddress,
            ERC20_ABI,
            wallet
        );

        // Log mint amount
        const mintAmount = parseUnits('3', 18); // 3 tokens with 18 decimals
        console.log(
            `Minting 3 tokens (value: ${mintAmount.toString()}) to ${address} on ${network}`
        );

        // Call the mint function on the contract
        const mintTx = await contract.mint(address, mintAmount);

        // Wait for the transaction to be mined
        const receipt = await mintTx.wait();
        console.log('Transaction receipt:', receipt);

        res.status(200).json({
            result: true,
            txHash: receipt.transactionHash,
            message: `Minted 3 MIND tokens to ${address} on ${network}`,
        });
    } catch (err) {
        console.error('Error minting tokens:', err);
        res.status(500).json({ result: false, error: 'Failed to mint tokens' });
    }
};
export default completeMeditation;
