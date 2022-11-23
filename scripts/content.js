
if(typeof init === 'undefined'){

    let mountains = [
        { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
        { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
        { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
        { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
        { name: "Monte Amiata", height: 1738, place: "Siena" }
      ];
      
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
      
      function generateTable(table, data) {
        for (let element of data) {
          let row = table.insertRow();
          for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
          }
        }
      }
      
      
    const init = function(){
        
        if (!document.getElementById("injection_GR-IN")){
            let table = document.querySelector("table");
            let data = Object.keys(mountains[0]);
            generateTableHead(table, data);
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
