
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
      
      function generateTable(table, data) {
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
      }
      
      
    const init = function(){
        
        if (!document.getElementById("injection_GR-IN")){
            let table = document.createElement("table");
            //generateTableHead(table, data);
            //generateTable(table, mountains);
            generateTable(table, extractData());
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
    }
    init();
}
