FIRSTNEEDS_DATA_HEADER = [
    "Kind of", 
    "Carbon footprint (per serving)", 
    "Enegry needed to create", 
    "Exhaustion of non-renewable raw material", 
    "Water consumption (litters per one kg)", 
    "Pollution", 
    "Green score (text)", 
    "Green score", 
    "Sources"
];
FIRSTNEEDS_DATA_TSV = `Beef/Viande	15.5kg CO2e	Extremely High	Medium consumption of non-renewable ressources (Fueil for the transport)	15 000 L	High air polution, mitigate water pollution, High land pollution	To be determined but defenitely low	2	https://en.wikipedia.org/wiki/Environmental_impact_of_meat_production#Energy_consumption  https://meatthefacts.eu/home/more-than-meats-the-eye/environment/how-much-water-does-it-take-to-produce-1kg-of-beef/ https://www.wri.org/insights/6-pressing-questions-about-beef-and-climate-change-answered https://cornellbotanicgardens.org/learn/cornell-programs/the-environmental-cost-of-hamburgers/
Salmon/Saumon	2-7kg CO2e	Low (Cold blooded)	Low  consumption of non-renewable ressources (Fueil for the transport)	500 L	Low air pollution, High water pollution, No land pollution	Medium to High	7	https://www.researchgate.net/publication/324439402_Energy_consumption_for_salmon_slaughtering_processes https://www.biomar.com/en/global/articles/news/fish-are-an-efficient-source-of-protein/
Shampoo/Shampooing	111kg CO2e	Low 	Low  consumption of non-renewable ressources (Fueil for the transport)	Not determined	Medium air pollution, High water pollution, No land pollution	Medium	5	https://nanopdf.com/download/click-here-for-the-report_pdf  https://gettotext.com/water-consumption-how-much-h2o-does-make-up-production-need/
Shower gel/Gel douche	111kg CO2e	Low 	Low  consumption of non-renewable ressources (Fueil for the transport)	Not determined	Medium air pollution, High water pollution, No land pollution	Medium	5	https://www.healabel.com/water-footprint-of-food-list/
Canned vegetables/Légume 	<2.0kg CO2e	Low	Low  consumption of non-renewable ressources (Fueil for the transport)	330 L	Low air pollution, low water pollution, Moderate land pollution	High	9	https://www.caryinstitute.org/news-insights/blog-translational-ecology/food-energy https://www.healabel.com/water-footprint-of-food-list/
Pasta/Pates	1.24 kg CO2e	High	Medium consumption (electricity, Fueil)	1920  L	Medium air pollution, Medium water pollution, Medium land pollution	Medium	5	https://www.researchgate.net/publication/222572884_The_water_needed_for_Italians_to_eat_pasta_and_pizza https://www.healabel.com/pasta-benefits-side-effects/
Rice/Riz	0.16kg CO2e	High	High consumption of Fueil for production and transport	3400 L	High air polution, Low water pollution, Low land pollution	Medium to High	7	https://www.researchgate.net/figure/Energy-inputs-of-rice-production-per-hectare-in-the-United-States_tbl5_26575685 https://www.waterfootprint.org/media/downloads/Hoekstra-2008-WaterfootprintFood.pdf https://foodprint.org/blog/environmental-impacts-of-rice-production/
Fruits/Banana/Banane/Apple/Pomme	1.1 kg CO2e	Medium / Low	Fueil for transport (low)	100 - 1500L (depending on the fruit)	Low air pollution, low water pollution, Moderate land pollution	High	9	https://www.greeneatz.com/foods-carbon-footprint.html
Chocolate/Chocolat	0.2kg CO2e	High	High (massive deforestation)	10 000L	High land pollution, low air, low water pollution	Low to medium	3	https://www.worldwildlife.org/magazine/issues/spring-2017/articles/bittersweet-chocolate-s-impact-on-the-environment
Coffee/Café	0.209kg of CO2e (Increased by using filter and coffee machine)	High	High (production and consomation)	19000L	High land pollution, High air, low water pollution	Low	1	https://www.23degrees.com.au/blog/carbon-footprint-coffee-supply-chain/ https://www.ase.org/blog/coffee-gives-us-energy-how-much-does-it-use
Milk/Lait	0.5kg of CO2e	Medium	High (Lots of production processes requiring cooling eating thus lot of fueil)	1000L	Medium air polution, High water pollution, High land pollution	Medium	5	https://www.co2everything.com/co2e-of/milk https://sentientmedia.org/milk-pollution-in-rivers/`;

// Convert TSV to 2D Array
FIRSTNEEDS_DATA = FIRSTNEEDS_DATA_TSV.split('\n').map(line => line.split('\t'));
NUM_PRODUCTS = FIRSTNEEDS_DATA.length;
FIRSTNEEDS_WORDS = FIRSTNEEDS_DATA.map(row => row[0].toLowerCase().split(/[/]|\s/));

// Goal: return which product matches the given strings
// e.g. having "Milk" in the product's title, the product is more likely to be milk
function getAppropriateProductIndex(stringList) {
    // convert string list to word list (separated by whitespace)
    let wordList = stringList.map(v => v.toLowerCase().split(/\s/)).reduce((x,y) => x.concat(y), []);
    // count every possible first-need product name
    let counts = Array(NUM_PRODUCTS).fill(0);
    for(var i in FIRSTNEEDS_DATA) {
        let row = FIRSTNEEDS_DATA[i];
        for(var j in wordList) {
            let word = wordList[j];
            let found = FIRSTNEEDS_WORDS[i].find(val => val == word);
            if(found !== undefined) {
                counts[i] += 1;
            }
        }
    }
    var max = 0;
    var arg = undefined;
    for(var i in counts) {
        if(counts[i] > max) {
            max = counts[i];
            arg = i;
        }
    }
    return arg;
}