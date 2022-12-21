try{
    //ON page change
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        
        if (tab.url?.startsWith("chrome://")) return undefined;  
        if(changeInfo.status == 'complete'){
            console.log('Gr-In Worker active.');
            chrome.scripting.executeScript({
            files: ['scripts/extraction-amazon.js', "scripts/extraction-auchan.js", 'scripts/content.js'],
            target: {tabId: tab.id}
            });
      }
    });






    // Store attributes of current displayed item
    let current_item = Array();


    // ON message received from other scripts
    // command: 
    //  - start: to reset current_item array and start listening to attributes
    //  - score: add the received score attribute to the current_item array
    //  - end: stop listening to scores and compute average global score to change the icon in the status bar
    //

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log(request);
      
      switch (request.command) {
        case "start":
          current_item = [];
          chrome.action.setIcon({ path: "/icons/green38.png"  }); // reset icon
          sendResponse({status: "New product deteced."});
          break;
        case "score":
          current_item.push(request.score);
          sendResponse({status: "Score received."});
          break;
        case "end":
          var total = 0;
          var count = 0;
          current_item.forEach(function(item, index) {
              total += item;
              count++;
          });
          let globalscore = total/count
          if (globalscore >= 7) chrome.action.setIcon({ path: "/icons/green38.png"  });
          if (globalscore < 7 && globalscore >= 4) chrome.action.setIcon({ path: "/icons/yellow38.png"  });
          if (globalscore < 4) chrome.action.setIcon({ path: "/icons/red38.png"  });

          sendResponse({status: "Icon changed."});

      }
      console.log(current_item);

     
    });
  
  
  }catch(e){
    console.log(e);
  }