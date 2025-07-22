// Node.js example for MAC address retrieval
// This file demonstrates how to get MAC addresses in a Node.js environment

import { networkInterfaces } from 'os';

/**
 * Get all MAC addresses from network interfaces
 * @returns {Array} Array of network interface objects with MAC addresses
 */
function getMacAddresses() {
  const interfaces = networkInterfaces();
  const macAddresses = [];
  
  for (const [name, nets] of Object.entries(interfaces)) {
    if (nets) {
      for (const net of nets) {
        // Filter out internal/loopback interfaces and those without MAC addresses
        if (net.mac && net.mac !== '00:00:00:00:00:00' && !net.internal) {
          macAddresses.push({
            interface: name,
            mac: net.mac,
            family: net.family,
            address: net.address,
            netmask: net.netmask,
            internal: net.internal
          });
        }
      }
    }
  }
  
  return macAddresses;
}

/**
 * Get the primary MAC address (usually the first non-internal interface)
 * @returns {string|null} MAC address or null if not found
 */
function getPrimaryMacAddress() {
  const macAddresses = getMacAddresses();
  return macAddresses.length > 0 ? macAddresses[0].mac : null;
}

/**
 * Get MAC addresses filtered by interface type
 * @param {string} interfacePattern - Pattern to match interface names (e.g., 'eth', 'wlan')
 * @returns {Array} Filtered MAC addresses
 */
function getMacAddressesByInterface(interfacePattern) {
  const macAddresses = getMacAddresses();
  return macAddresses.filter(item => 
    item.interface.toLowerCase().includes(interfacePattern.toLowerCase())
  );
}

// Example usage (uncomment to run in Node.js)
/*
console.log('All MAC Addresses:');
console.log(getMacAddresses());

console.log('\nPrimary MAC Address:');
console.log(getPrimaryMacAddress());

console.log('\nEthernet interfaces:');
console.log(getMacAddressesByInterface('eth'));

console.log('\nWiFi interfaces:');
console.log(getMacAddressesByInterface('wlan'));
*/

// Export functions for use in other modules
export {
  getMacAddresses,
  getPrimaryMacAddress,
  getMacAddressesByInterface
};