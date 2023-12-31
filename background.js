chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });


const extensions = 'http://'
const webstore = 'https://'
  
chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {    
      // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      // Next state will always be the opposite
      const nextState = prevState === 'ON' ? 'OFF' : 'ON'
  
      // Set the action badge to the next state
      await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        });

        if(nextState === "ON") {
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: ['content.js']
              });
        } else {
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: []
              });
        }
    }
})