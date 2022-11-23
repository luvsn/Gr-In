try{
    //ON page change
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        
        if (tab.url?.startsWith("chrome://")) return undefined;  
        if(changeInfo.status == 'complete'){
            //if (changeInfo.url) {
            console.log('hello');
            chrome.scripting.executeScript({
            files: ['scripts/content.js'],
            target: {tabId: tab.id}
            });
      }
    });
  
  
  }catch(e){
    console.log(e);
  }