const inputPreview = document.querySelector("video-box")


const giveAccesToCamara = `
    <h1 id="video-title" class="main-title">¿Nos das acceso <br> a tu cámara?</h1>
    <p id="video-text" class="new-gifos-welcome-paragraph">El acceso a tu camara será válido sólo <br>por el tiempo en el que estés creando el GIFO.</p>
`;

function getStream () { 
    firstStep()
    let video = document.createElement('video');
    let videoContainer= document.getElementById('video-container');
    videoContainer.innerHTML = giveAccesToCamara;
    videoContainer.appendChild(video);
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
       height: { max: 300 }
    }
 })
 .then(async function(stream) {
    video.srcObject = stream;
    video.play();
    secondStep();
    const recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function() {
         console.log('started')
       },
      })
        let record = document.getElementById('record');
        record.addEventListener('click',function(){
            video.play();
            recorder.startRecording();
            thirdStep();
            timer(true)
        })
        let finish = document.getElementById('finish');
        let blob
        finish.addEventListener('click',function(){
            recorder.stopRecording(function() {
                blob = recorder.getBlob();
            });
            video.pause();
            fourStep();
            timer(false);
        })
        let upload = document.getElementById('upload');
        upload.addEventListener('click',async function(){
            //invokeSaveAsDialog(blob);
            fiveStep();
            let form = new FormData();
            form.append('file', blob, 'myGif.gif');
            console.log(form.get('file'))
            //await Data.postGif(form);
            uploadGif(form);
            
        })

    })
 }

function firstStep(){
    document.getElementById('start').style.display = 'none';
    document.getElementById('step1').classList.add('steps-number--active')
}
function secondStep () {
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


function events() {
    let start = document.getElementById('start');
    start.addEventListener('click',getStream);
    let repeat = document.getElementById('time-capture');
    repeat.addEventListener('click',function(){
        document.getElementById('upload').style.display = 'none';
        document.getElementById('step3').classList.remove('step--active')
        getStream();
    })

}
events()