chrome.commands.onCommand.addListener(async (command) => {
    if (command === "send-page-html") {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.id) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: sendHTMLtoServer,
        });
      }
    }
  });
  
  function sendHTMLtoServer() {
    const htmlContent = document.documentElement.outerHTML;
    
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ html: htmlContent, url: window.location.href })
    }).then(response => {
      console.log('Sent page to server:', response.status);
    }).catch(error => {
      console.error('Error sending page:', error);
    });
  }
  