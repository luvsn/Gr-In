
if(typeof init === 'undefined'){

    // Returns the color appropriate for the score:
    //  0- 2: red (bad)
    //  3- 7: yellow
    //  8-10: green (good)
    function getScoreColor(score) {
      if(score <= 2)
        return "red";
      else if(score <= 7)
        return "yellow";
      return "green";
    }

    // Create table header
    function createHeader(colSpan, globalScore) 
    {
      let thead = document.createElement("thead");
      let tr = document.createElement("tr");
      let th = document.createElement("th");
      th.colSpan = colSpan;
      th.style.textAlign = "center";
      let icon = document.createElement("img");
      icon.src = chrome.runtime.getURL(`icons/${getScoreColor(globalScore)}.png`);
      let text = document.createElement("p");
      text.innerText = "Gr-In";
      text.style.fontSize = "26px";
      th.appendChild(icon);
      th.appendChild(text);
      tr.appendChild(th);
      thead.appendChild(tr);
      return thead;
    }


    let mountains = [
        { name: "Manufacturer", height: "ABC", place: "F" },
        { name: "Label", height: "D", place: "F" },
        { name: "Energy consumption", height: "1520 kWh / year", place: "F" },
        { name: "Water consumption", height: "50 L / load", place: "F" }
      ];
      /*
      function generateTableHead(table, data) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let key of data) {
          let th = document.createElement("th");
          let text = document.createTextNode(key);
          th.appendChild(text);
          row.appendChild(th);
        }
      }
      */
      
      function generateTable(table, data, globalScore) {
        table.appendChild(createHeader(3, globalScore));
        table.style.border = "6px solid";
        table.style.borderRadius = "3px";
        table.style.borderColor = getScoreColor(globalScore);
        for (let element of data) {
          let row = table.insertRow();
          for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            console.log(text)
            if (key == "place") {
              console.log(text)
              try{
                const injectedSpan = document.createElement("SPAN");
                let score = element[key];
                injectedSpan.className = "circle";
                injectedSpan.innerText = score.toString();
                injectedSpan.style.backgroundColor = getScoreColor(score);
                cell.appendChild(injectedSpan);
              }catch(e){
                console.log(e)
              }

              //cell.appendChild(text);
            }
            else {    
              cell.appendChild(text);
            }
          }
        }
        let row = table.insertRow();
        let cell1 = row.insertCell();
        cell1.innerHTML = "<b>Global score</b>";
        let cell2 = row.insertCell();
        cell2.style.textAlign = "center";
        const injectedSpan = document.createElement("SPAN");
        injectedSpan.className = "circle";
        injectedSpan.style.backgroundColor = getScoreColor(globalScore);
        cell2.appendChild(injectedSpan);
        cell2.appendChild(document.createTextNode(`${globalScore} / 10`));
        row.appendChild(cell1);
        row.appendChild(cell2);
      }
      
      
    const init = function(){
      if (document.URL.search("auchandrive.lu") == -1) {
        // Amazon
        if (!document.getElementById("injection_GR-IN")){

          
          
            let table = document.createElement("table");
            //generateTableHead(table, data);
            //generateTable(table, mountains);

            chrome.runtime.sendMessage({command: "start"}, function(response) {
              console.log(response.status);
            });

            let xdata = extractData();
            let globalScore = computeGlobalScore(xdata);
            generateTable(table, extractData(), globalScore);

            chrome.runtime.sendMessage({command: "end"}, function(response) {
              console.log(response.status);
            });

            const injectElement = document.createElement('div');
            injectElement.id = "injection_GR-IN";
            injectElement.className = 'rustyZone-element';

            
            injectElement.appendChild(table)
            
            //document.getElementById("altImages").appendChild(injectElement)
            document.getElementById("title_feature_div").appendChild(injectElement)
        }
        const hostEle = document.createElement('div');
        hostEle.className = 'rustyZone-element-host';
        hostEle.innerHTML = 'Hello From the Rusty Zone Element';
        document.body.appendChild(hostEle);

        //Using Shadow Root
        var host = document.querySelector('.rustyZone-element-host');
        var root = host.attachShadow({mode: 'open'}); // Create a Shadow Root
        var div = document.createElement('div');
        div.className = 'div root-class';
        div.innerHTML='<style>.div{border:3px solid blue;margin:10px;padding:10px;width:200px;}</style>'
        +'Hello From the Rusty Zone Shadow Root Element';
        root.appendChild(div);
        // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //   var currTab = tabs[0];
        //   if (currTab) { // Sanity check
        //     chrome.pageAction.setIcon({tabId: currTab.id, path: 'icons/red.png'});
        //   }
        // });
        //chrome.pageAction.setIcon({ tabId: tabId, path: 'icons/red.png' });
  

      }
      else {
        // Auchan
        if (!document.getElementById("GRIN-AUCHAN")){
          var auTitle = document.querySelector("#central-container > div > div.fiche-produit-content > div > div.right > div.main-infos > h2");
          if(auTitle !== undefined) {
            // Gather data
            let productTitle = auTitle.innerText;
            let productIndex = getAppropriateProductIndex([productTitle]);

            // let p = document.createElement("p");
            // p.innerText = FIRSTNEEDS_WORDS[productIndex];
            // auTitle.parentElement.appendChild(p);

            let tstyle = "border: 1px lightgray solid; padding: 3px;";

            let table = document.createElement("table");
            table.style.tableLayout = "fixed";
            table.style.width = "100%";
            table.style.borderCollapse = "separate";
            table.style.border = "6px solid green";
            table.style.borderRadius = "3px";
            table.id = "GRIN-AUCHAN";
            table.appendChild(createHeader(2, parseInt(FIRSTNEEDS_DATA[productIndex][7])));
            let tbody = document.createElement("tbody");
            for(var i in FIRSTNEEDS_DATA_HEADER) {
              let tr = document.createElement("tr");
              let col1 = document.createElement("td");
              col1.style = tstyle;
              col1.innerText = FIRSTNEEDS_DATA_HEADER[i];
              let col2 = document.createElement("td");
              col2.style = tstyle;
              if(FIRSTNEEDS_DATA_HEADER[i] == "Sources") {
                let links = FIRSTNEEDS_DATA[productIndex][i].split(" ");
                let ul = document.createElement("ul");
                for(var l in links) {
                  let li = document.createElement("li");
                  let a = document.createElement("a");
                  a.href = links[l];
                  a.innerText = links[l];
                  li.appendChild(a);
                  ul.appendChild(li);
                }
                col2.appendChild(ul);
              } else if(FIRSTNEEDS_DATA_HEADER[i] == "Green score (text)") {
                continue;
              } else if(FIRSTNEEDS_DATA_HEADER[i] == "Green score") {
                let para = document.createElement("p");
                let score = parseInt(FIRSTNEEDS_DATA[productIndex][i]);
                const injectedSpan = document.createElement("span");
                injectedSpan.className = "circle";
                injectedSpan.style.backgroundColor = getScoreColor(score);
                table.style.borderColor = getScoreColor(score);
                para.style.textAlign = "center";
                para.appendChild(injectedSpan);
                para.appendChild(document.createTextNode(`${score} / 10`));
                col2.appendChild(para);
              } else if(FIRSTNEEDS_DATA_HEADER[i] == "Kind of") {
                col2.innerText = FIRSTNEEDS_WORDS[productIndex][0];
              } else {
                col2.innerText = FIRSTNEEDS_DATA[productIndex][i];
              }
              tr.appendChild(col1);
              tr.appendChild(col2);
              tbody.appendChild(tr);
            }
            table.appendChild(tbody);
            auTitle.parentElement.appendChild(table);
          }
        }
      }
    }
    init();
}
