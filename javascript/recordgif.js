const urlpost = 'https://upload.giphy.com/v1/gifs?';
const apiKey = 'api_key=Xfw2Rr8bA07WpNCqwtJws7z9j7zgOMwz';


const inputPreview = document.querySelector("video-box")



let start = document.getElementById('start');
start.addEventListener('click', getStream);

function getStream() {
    firstStep()
    let video = document.createElement('video');
    let videoContainer = document.getElementById('video-container');
    const giveAccesToCamara = `
    <h1 id="video-title" class="main-title">¿Nos das acceso <br> a tu cámara?</h1>
    <p id="video-text" class="new-gifos-welcome-paragraph">El acceso a tu camara será válido sólo <br>por el tiempo en el que estés creando el GIFO.</p>
    `;
    videoContainer.innerHTML = giveAccesToCamara;
    videoContainer.appendChild(video);
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 300 }
        }
    })
        .then(async function (stream) {
            video.srcObject = stream;
            video.play();
            secondStep();
            const recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
            })
            let record = document.getElementById('record');
            record.addEventListener('click', function () {
                video.play();
                recorder.startRecording();
                thirdStep();
                runTimer()
            })
            let finish = document.getElementById('finish');
            let blob
            finish.addEventListener('click', function () {
                recorder.stopRecording(function () {
                    blob = recorder.getBlob();
                });
                video.pause();
                fourthStep();
                stopTimer()
            })
            let upload = document.getElementById('upload');
            upload.addEventListener('click', async function () {
                fifthStep();
                let form = new FormData();
                form.append('file', blob, 'myGif.gif');
                console.log(form.get('file'))
                uploadGif(form).then( (data) => {
                    addGifLocalStorage(data)
                }
                );
            })

        })
}

function firstStep() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('step1').classList.add('steps-number--active')
}
function secondStep() {
    document.getElementById('video-title').remove();
    document.getElementById('video-text').remove();
    document.getElementById('step1').classList.remove('steps-number--active')
    document.getElementById('step2').classList.add('steps-number--active')
    document.getElementById('record').style.display = 'block';
}
function thirdStep() {
    document.getElementById('record').style.display = 'none';
    document.getElementById('time-capture').style.display = 'none';
    document.getElementById('timer').style.display = 'block';
    document.getElementById('finish').style.display = 'block';
}
function fourthStep() {
    document.getElementById('finish').style.display = 'none';
    document.getElementById('upload').style.display = 'block';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('time-capture').style.display = 'block';
}
function fifthStep() {
    document.getElementById('step2').classList.remove('steps-number--active')
    document.getElementById('step3').classList.add('steps-number--active')
    document.getElementById('time-capture').style.display = 'none';
}
function calculateTimeDuration(secs) {
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - (hr * 3600)) / 60);
    let sec = Math.floor(secs - (hr * 3600) - (min * 60));
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    return hr + ':' + min + ':' + sec;
}
let runtimer
function runTimer(){
    let dateStarted = new Date().getTime();
    let timer = document.getElementById('timer');
    function update() {
        timer.innerHTML = calculateTimeDuration((new Date().getTime() - dateStarted) / 1000);
    }
    runtimer = setInterval(update, 1000)
}
function stopTimer(){
    clearInterval(runtimer)
    runtimer = 0
}
 
let repeat = document.getElementById('time-capture');
repeat.addEventListener('click', function () {
    document.getElementById('upload').style.display = 'none';
    document.getElementById('step3').classList.remove('step--active')
    getStream();
})
let array =[]
if(localStorage.getItem("mygifs") != null){
    array = JSON.parse(localStorage.getItem("mygifs"))
}
async function uploadGif(file){
    document.getElementById('upload').style.display = 'none'
    let videoContainer = document.getElementById('video-container')
    videoContainer.classList.add("video-card-loading")
    let vidWidth = document.getElementsByTagName('video')[0].offsetWidth;
    let vidHeight = document.getElementsByTagName('video')[0].offsetHeight;
    videoContainer.style.width = `${vidWidth}px`
    videoContainer.style.height = `${vidHeight}px`
    videoContainer.innerHTML = `<img src="assets/loader.svg" alt="loader"><br>
                          <h3>Estamos subiendo tu GIFO</h3>`  
    const OtherParam = {
        method: "POST",
        body: file
    }
    const response = await fetch(urlpost+apiKey, OtherParam);
    const json = await response.json();
    let data = json.data
    console.log(data)
    return data
}
function addGifLocalStorage(data){
    array.push(data)
    let jsonString = JSON.stringify(array)
    localStorage.setItem("mygifs", jsonString)
    let videoContainer = document.getElementById('video-container')
    videoContainer.innerHTML = `<img src="assets/check.svg" alt="loader"><br>
    <h3>GIFO subido con éxito</h3>`
    console.log("Uploaded")
}


