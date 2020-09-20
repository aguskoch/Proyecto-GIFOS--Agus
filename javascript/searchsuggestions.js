const searchInput = document.getElementById("search-word");
const suggestionsPanel = document.getElementById('suggestions');

function fnAutoComplete(){
    searchInput.addEventListener('keyup', async (event) =>{
    let sug = await getAutoComplete(searchInput.value);
    const view = `
      <ul class="suggestions">
          ${sug.data.map(item => `
              <li class="option-list"><i class="fa fa-search"></i>${item.name}</li>
          `).join('')}
      </ul>
      `;
    if(sug.data.length !== 0){
        suggestionsPanel.innerHTML = view
    }else{
        suggestionsPanel.innerHTML = ''
    }

    let optionList = document.getElementsByClassName("option-list");
    for (let j = 0; j < optionList.length; j++){
        optionList[j].addEventListener("click", suggestion)
    }

    function suggestion(){
        for(let i = 0; i < optionList.length; i++){
            const text = optionList[i].innerText
            searchGif(text)
        }
    }
})
}
fnAutoComplete()

async function getAutoComplete(text){
    console.log(text)
    const url = 'https://api.giphy.com/v1/gifs/search/tags?api_key=Xfw2Rr8bA07WpNCqwtJws7z9j7zgOMwz&q='+text;
    const response = await fetch(url);
    const data = await response.json();
    return data
}


