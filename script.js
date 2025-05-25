// Wallet Connection
let web3;
let userAccount;

async function connectMetaMask() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            document.getElementById('wallet-address').innerText = userAccount.substring(0, 6) + '...' + userAccount.substring(userAccount.length - 4);
            document.getElementById('wallet-selection').style.display = 'none';
            document.getElementById('wallet-status').style.display = 'block';
            document.getElementById('connection-status').innerText = 'Connected to MetaMask!';
        } catch (error) {
            document.getElementById('connection-status').innerText = 'Failed to connect MetaMask: ' + error.message;
        }
    } else {
        document.getElementById('connection-status').innerText = 'MetaMask not detected. Please install MetaMask.';
    }
}

async function connectWalletConnect() {
    const provider = new WalletConnectProvider({
        infuraId: 'YOUR_INFURA_ID', // Replace with your Infura ID
    });
    try {
        await provider.enable();
        web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        userAccount = accounts[0];
        document.getElementById('wallet-address').innerText = userAccount.substring(0, 6) + '...' + userAccount.substring(userAccount.length - 4);
        document.getElementById('wallet-selection').style.display = 'none';
        document.getElementById('wallet-status').style.display = 'block';
        document.getElementById('connection-status').innerText = 'Connected to WalletConnect!';
    } catch (error) {
        document.getElementById('connection-status').innerText = 'Failed to connect WalletConnect: ' + error.message;
    }
}

function showWalletOptions() {
    document.getElementById('wallet-selection').style.display = 'block';
    document.getElementById('wallet-status').style.display = 'none';
    document.getElementById('connection-status').innerText = '';
}

async function buyTokens() {
    const amount = document.getElementById('token-amount').value;
    if (!web3 || !userAccount) {
        document.getElementById('connection-status').innerText = 'Please connect a wallet first.';
        return;
    }
    if (!amount || amount <= 0) {
        document.getElementById('connection-status').innerText = 'Please enter a valid amount.';
        return;
    }
    // Placeholder for token purchase logic
    document.getElementById('connection-status').innerText = `Processing purchase of ${amount} DKNT...`;
}

// Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slideshow-image');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 3000);
showSlide(currentSlide);

// Hamburger Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Dynamic Navbar Offset
function adjustNavbarPosition() {
    const marketFeed = document.querySelector('.market-feed');
    const navbar = document.getElementById('navbar');
    if (marketFeed && navbar) {
        const marketFeedHeight = marketFeed.offsetHeight;
        navbar.style.top = `${marketFeedHeight}px`;
    }
}

// Run on load and resize
window.addEventListener('load', adjustNavbarPosition);
window.addEventListener('resize', adjustNavbarPosition);
