// Browser-based MAC address attempts (will fail for security reasons)
document.getElementById('browser-attempt').addEventListener('click', async () => {
  const resultDiv = document.getElementById('browser-result');
  
  try {
    // This will not work in browsers for security reasons
    resultDiv.innerHTML = `
      <div class="error">
        ❌ <strong>Access Denied:</strong> Browsers do not allow direct MAC address access for security and privacy reasons.
        <br><br>
        <strong>Why this fails:</strong>
        <ul>
          <li>Privacy protection - MAC addresses are unique identifiers</li>
          <li>Security concerns - could be used for tracking</li>
          <li>Browser sandboxing prevents low-level network access</li>
        </ul>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
  }
});

// Network Information API (doesn't provide MAC addresses)
document.getElementById('network-info').addEventListener('click', () => {
  const resultDiv = document.getElementById('network-result');
  
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    resultDiv.innerHTML = `
      <div class="success">
        <strong>Network Connection Info:</strong><br>
        • Type: ${connection.effectiveType || 'unknown'}<br>
        • Downlink: ${connection.downlink || 'unknown'} Mbps<br>
        • RTT: ${connection.rtt || 'unknown'} ms<br>
        • Save Data: ${connection.saveData || false}<br>
        <br>
        <em>Note: This API doesn't provide MAC addresses</em>
      </div>
    `;
  } else {
    resultDiv.innerHTML = `
      <div class="warning">
        ⚠️ Network Information API not supported in this browser
      </div>
    `;
  }
});

// Device fingerprinting alternative
document.getElementById('fingerprint').addEventListener('click', () => {
  const resultDiv = document.getElementById('fingerprint-result');
  
  const fingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    colorDepth: screen.colorDepth,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    hardwareConcurrency: navigator.hardwareConcurrency,
    maxTouchPoints: navigator.maxTouchPoints
  };
  
  // Create a simple hash of the fingerprint
  const fingerprintString = JSON.stringify(fingerprint);
  let hash = 0;
  for (let i = 0; i < fingerprintString.length; i++) {
    const char = fingerprintString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  resultDiv.innerHTML = `
    <div class="success">
      <strong>Device Fingerprint Generated:</strong><br>
      Hash: <code>${Math.abs(hash).toString(16)}</code><br>
      <details>
        <summary>View Details</summary>
        <pre>${JSON.stringify(fingerprint, null, 2)}</pre>
      </details>
    </div>
  `;
});

// UUID generation alternative
document.getElementById('uuid').addEventListener('click', () => {
  const resultDiv = document.getElementById('uuid-result');
  
  // Generate a UUID v4
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  
  // Store in localStorage for persistence
  localStorage.setItem('deviceUUID', uuid);
  
  resultDiv.innerHTML = `
    <div class="success">
      <strong>Generated UUID:</strong><br>
      <code>${uuid}</code><br>
      <em>Stored in localStorage for future sessions</em>
    </div>
  `;
});

// Check for existing UUID on load
window.addEventListener('load', () => {
  const existingUUID = localStorage.getItem('deviceUUID');
  if (existingUUID) {
    document.getElementById('uuid-result').innerHTML = `
      <div class="info">
        <strong>Existing UUID found:</strong><br>
        <code>${existingUUID}</code>
      </div>
    `;
  }
});