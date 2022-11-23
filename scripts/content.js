
if(typeof init === 'undefined'){

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
            if (element[key] == "F") {
                console.log(text)
                try{
                const injectedSpan = document.createElement("SPAN");
                injectedSpan.className = "circle";
                injectedSpan.innerText = "t";
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
            let table = document.querySelector("table");
            //generateTableHead(table, data);
            generateTable(table, mountains);
            const injectElement = document.createElement('div');
            injectElement.id = "injection_GR-IN";
            injectElement.className = 'rustyZone-element';

            
            injectElement.appendChild(table)
            
            document.getElementById("altImages").appendChild(injectElement)
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
