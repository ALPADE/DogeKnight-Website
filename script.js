// Wallet Connection
let web3;
let userAccount;
let walletProvider = null;

async function connectWallet(type) {
    const statusElement = document.getElementById('connection-status');
    statusElement.innerText = '';

    try {
        if (type === 'metamask') {
            if (!window.ethereum) {
                statusElement.innerText = 'Meta Enumeration not detected. Pray, install MetaMask!';
                return;
            }
            web3 = new Web3(window.ethereum);

            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];

            // Check for Base network (chainId 8453)
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            if (chainId !== '0x2105') {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x2105' }], // Base Mainnet
                    });
                } catch (switchError) {
                    if (switchError.code === 4902) {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x2105',
                                chainName: 'Base Mainnet',
                                rpcUrls: ['https://mainnet.base.org'],
                                nativeCurrency: {
                                    name: 'Ether',
                                    symbol: 'ETH',
                                    decimals: 18
                                },
                                blockExplorerUrls: ['https://basescan.org']
                            }],
                        });
                    } else {
                        throw switchError;
                    }
                }
            }

            statusElement.innerText = 'Connected to MetaMask, noble knight!';
        } else if (type === 'walletconnect') {
            const provider = new WalletConnectWeb3Provider.Web3Provider({
                rpc: {
                    8453: 'https://mainnet.base.org', // Base Mainnet
                },
                chainId: 8453,
            });
            walletProvider = provider;

            // Enable WalletConnect session
            await provider.enable();
            web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            userAccount = accounts[0];

            statusElement.innerText = 'Connected to WalletConnect, valiant knight!';
        } else {
            statusElement.innerText = 'Unknown wallet type, brave knight!';
            return;
        }

        // Update UI
        document.getElementById('wallet-address').innerText = 
            userAccount.substring(0, 6) + '...' + userAccount.substring(userAccount.length - 4);
        document.getElementById('wallet-selection').style.display = 'none';
        document.getElementById('wallet-status').style.display = 'block';

    } catch (error) {
        statusElement.innerText = `Failed to connect wallet: ${error.message}`;
        console.error('Wallet connection error:', error);
    }
}

async function disconnectWallet() {
    if (walletProvider && walletProvider.disconnect) {
        await walletProvider.disconnect();
    }
    userAccount = null;
    walletProvider = null;
    web3 = null;

    document.getElementById('wallet-selection').style.display = 'block';
    document.getElementById('wallet-status').style.display = 'none';
    document.getElementById('connection-status').innerText = 'Wallet disconnected, knight. Connect again to join the crusade!';
}

function showWalletOptions() {
    document.getElementById('wallet-selection').style.display = 'block';
    document.getElementById('wallet-status').style.display = 'none';
    document.getElementById('connection-status').innerText = '';
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

// EmailJS Contact Form Logic
document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS with your Public Key
  emailjs.init("kkLCKkOdThngOB2ka");

  // Form submission handler
  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form data
    const formData = {
      user_name: document.getElementById('user_name').value || 'Anonymous Knight',
      user_email: document.getElementById('user_email').value || 'no-reply@dogeknight.org',
      message: document.getElementById('message').value
    };

    // Debug: Log data and config
    console.log('Form Data:', formData);
    console.log('User ID:', 'kkLCKkOdThngOB2ka');
    console.log('Service ID:', 'YOUR_SERVICE_ID');
    console.log('Template ID:', 'YOUR_TEMPLATE_ID');

    // Send via EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
      .then(function(response) {
        console.log('Success:', response.status, response.text);
        document.getElementById('form-status').innerHTML = "Missive dispatched! The Meme Lord hears thee! 🐕‍🦺";
        document.getElementById('contact-form').reset();
      }, function(error) {
        console.error('EmailJS Error:', error);
        document.getElementById('form-status').innerHTML = `Alas, the raven faltered: ${error.text || 'Unknown error'}. Try again or seek us on X!`;
      });
  });
});
