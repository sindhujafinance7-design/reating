const QRCode = require('qrcode');
const os = require('os');
const fs = require('fs');
const path = require('path');

// Function to get the local IP address
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Skip internal and non-IPv4 addresses
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

const ip = getLocalIP();
const frontendUrl = `http://${ip}:5173`;

console.log(`Frontend URL mapped to: ${frontendUrl}`);

const filePath = path.join(__dirname, '..', 'Rating_QR_Code.png');

// Generate QR Code
QRCode.toFile(filePath, frontendUrl, {
    color: {
        dark: '#4F46E5',  // Indigo color to match the UI theme
        light: '#FFFFFF' // Transparent background
    },
    width: 500,
    margin: 2
}, function (err) {
    if (err) throw err;
    console.log(`✅ QR Code successfully generated!`);
    console.log(`📁 File saved at: ${filePath}`);
});
