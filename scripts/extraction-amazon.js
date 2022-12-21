// List of attributes extracted from Amazon pages
// each attribute is enumerated as a triplet consisting of:
// - name
// - function that extracts the value from the document and returns it
// - function that converts the value into a 0-10 score.
let AMAZON_ATTRIBDATA = [
  [
    "Test",
    document => 5,
    str => 5
  ],
  [
    "Eco Label",
    document => (document.querySelector(".energyEfficiencyTextPlacement") || document.querySelector(".dp-energy-efficiency-badge-rating-border")).textContent.trim(),
    str => 10 - (str.codePointAt(0) - "A".codePointAt(0)) * 10 / 6
  ],
  [
    "Weight",
    document => document.evaluate("//table[@id='productDetails_techSpec_section_1']/tbody/tr/th[contains(., 'Poids') or contains(., 'Weight')]/../td", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.innerText,
    str => 5 // TODO
  ],
  [
    "Energy consumption",
    document => document.evaluate("//table[@id='productDetails_techSpec_section_1']/tbody/tr/th[contains(., 'Puissance') or contains(., 'Power')]/../td", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.innerText,
    //document => document.evaluate('//div[@id="poExpander"]/div[1]/div/table/tbody/tr[contains(@class, "po-wattage")]/td[2]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.innerText,
    str => 5 // TODO
  ]
];
  
// Extract data from the page and return them in a list
// Each value is a dictionary with:
//  - "name": name of the variable
//  - "height": the value
//  - "place": the score out of 10 on the ecological impact
function extractData() {  
  let ATTRIBDATA = AMAZON_ATTRIBDATA;
  var xdata = Array();
  for(let i in ATTRIBDATA) {
    let attr = ATTRIBDATA[i];
    let name = attr[0];
    var val;
    try {
      val = attr[1](document);        
    } catch (error) {
      val = "ERROR";
    }
    if(val == "ERROR")
      continue;
    let score = attr[2](val);
    //console.log(`${name}, value=${val}, score=${score}`)
    var dct = {"name": name, "height": val, "place": score};
    xdata.push(dct);
  }
  return xdata;
}

function computeGlobalScore(xdata) {
  var score = 0;
  var count = 0;
  for(let i in xdata) {
    console.log("hehehe");
    console.log(xdata[i]["place"]);
    score += parseInt(xdata[i]["place"]);
    count += 1;
  }
  return Math.floor(score / count);
}