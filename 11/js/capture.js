const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureFrontButton = document.getElementById('captureFront');
const captureBackButton = document.getElementById('captureBack');
const idFrontInput = document.getElementById('idFront');
const idBackInput = document.getElementById('idBack');

let currentCapture;

async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.style.display = 'block';
}

function captureImage() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    video.style.display = 'none';
    if (currentCapture === 'front') {
        idFrontInput.value = dataURL;
    } else if (currentCapture === 'back') {
        idBackInput.value = dataURL;
    }
}

captureFrontButton.addEventListener('click', () => {
    currentCapture = 'front';
    startCamera();
});

captureBackButton.addEventListener('click', () => {
    currentCapture = 'back';
    startCamera();
});

video.addEventListener('click', captureImage);

document.getElementById('userIdForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    // Example: Display the captured images
    const frontDataURL = formData.get('idFront');
    const backDataURL = formData.get('idBack');

    if (frontDataURL) {
        const frontImage = document.createElement('img');
        frontImage.src = frontDataURL;
        frontImage.width = 200;
        document.body.appendChild(frontImage);
    }

    if (backDataURL) {
        const backImage = document.createElement('img');
        backImage.src = backDataURL;
        backImage.width = 200;
        document.body.appendChild(backImage);
    }
});