// export default function download(className){
//     const gifWrappers = document.getElementsByClassName(className);

//     for (let i = 0 ; i < gifWrappers.length; i++) {
//         let download = gifWrappers[i].getElementsByClassName("download");   
//         download[0].addEventListener('click', () => downloadGif(gifWrappers[i]))
//     }

// }


export default async function downloadGif(gifWrapper){
    console.log(gifWrapper)
    let image = gifWrapper.getElementsByClassName("gifTrending")[0].src
    let title = gifWrapper.getElementsByClassName("gif-title")[0].innerText
    let a = document.createElement('a');
    let response = await fetch(image);
    let file = await response.blob();
    a.download = title;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}

