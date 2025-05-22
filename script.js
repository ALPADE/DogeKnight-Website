// Slideshow Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.slideshow-image');
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}
setInterval(nextSlide, 3000); // Change slide every 3 seconds
showSlide(currentSlide);

// Web3 Wallet Integration
let web3;
let userAccount;
const connectionStatus = document.getElementById('connection-status');

function showWalletOptions() {
    document.getElementById('wallet-selection').style.display = 'block';
}

async function connectMetaMask() {
    connectionStatus.innerText = "Connecting to MetaMask...";
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            web3 = new Web3(window.ethereum);

            // Check for Base Mainnet (chain ID: 8453)
            const chainId = await web3.eth.getChainId();
            if (Number(chainId) !== 8453) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x2105' }],
                    });
                } catch (switchError) {
                    if (switchError.code === 4902) {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x2105',
                                chainName: 'Base Mainnet',
                                nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
                                rpcUrls: ['https://base-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY'],
                                blockExplorerUrls: ['https://basescan.org']
                            }],
                        });
                    } else {
                        throw switchError;
                    }
                }
            }

            showWalletStatus();
            connectionStatus.innerText = "Connected to MetaMask!";
        } catch (error) {
            console.error("MetaMask connection failed:", error);
            connectionStatus.innerText = `Failed to connect with MetaMask: ${error.message}`;
        }
    } else {
        connectionStatus.innerText = "Please install MetaMask to use this option!";
    }
}

async function connectWalletConnect() {
    connectionStatus.innerText = "Connecting to WalletConnect...";
    try {
        const provider = new EthereumProvider({
            chainId: 8453,
            rpc: {
                8453: "https://base-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY"
            },
            qrcodeModalOptions: {
                mobileLinks: ["metamask", "trust", "coinbase", "rainbow", "argent", "ledger"]
            }
        });

        await provider.enable();
        web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        userAccount = accounts[0];

        showWalletStatus();
        connectionStatus.innerText = "Connected to WalletConnect!";
    } catch (error) {
        console.error("WalletConnect connection failed:", error);
        connectionStatus.innerText = `Failed to connect with WalletConnect: ${error.message}`;
    }
}

function showWalletStatus() {
    document.getElementById('wallet-address').innerText = userAccount;
    document.getElementById('wallet-status').style.display = 'block';
    document.getElementById('wallet-selection').style.display = 'none';
}

async function buyTokens() {
    const tokenAmount = document.getElementById('token-amount').value;
    if (!tokenAmount || tokenAmount <= 0) {
        alert("Please enter a valid amount of DKNT tokens to buy.");
        return;
    }

    const ethAmount = (tokenAmount * 0.0001).toString();
    const presaleContractAddress = "[Insert Presale Contract Address Here]";

    try {
        await web3.eth.sendTransaction({
            from: userAccount,
            to: presaleContractAddress,
            value: web3.utils.toWei(ethAmount, 'ether'),
            gas: 21000,
        });

        alert(`Successfully purchased ${tokenAmount} DKNT tokens! They will be airdropped to your wallet after the presale ends.`);
    } catch (error) {
        console.error("Token purchase failed:", error);
        alert(`Failed to purchase tokens: ${error.message}`);
    }
}

// Countdown Timer
const presaleStartDate = new Date("2025-04-18T00:00:00Z").getTime();
const countdownElement = document.getElementById('countdown');
const presaleActionElement = document.getElementById('presale-action');

function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = presaleStartDate - now;

    if (timeRemaining <= 0) {
        countdownElement.style.display = 'none';
        presaleActionElement.style.display = 'block';
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();
