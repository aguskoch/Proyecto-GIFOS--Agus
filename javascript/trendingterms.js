//*****************************Trending Terms******************************* */

const urlterms = 'https://api.giphy.com/v1/trending/searches?';

async function getTrending(){
  const responset = await fetch(urlterms+apiKey)
  const jsont = await responset.json()
  //console.log(jsont)
  let data = jsont.data.map(data => data);
  buttonTrendTerms(data)
  
}
getTrending()

const trendingTerms = document.getElementById ("trending-terms")

function buttonTrendTerms (data){
  for(let y = 0; y < 5; y++){
    const term = document.createElement ("button");
    term.setAttribute ("class", "ps")
    //console.log(data[y])
    //sessionStorage.setItem (y,data[y]);
    term.innerText = data[y];
    term.addEventListener("click", () => searchGifWord(term.innerText))
    trendingTerms.appendChild(term);
  }
}

