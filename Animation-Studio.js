const addImage = document.getElementById("add-image");
const previewContainer = document.querySelector(".preview-container");
const animationContainer = document.querySelector(".animation-container");
const speedInput = document.getElementById("speed-input");
const startButton = document.getElementById("start-button");
let images = [];
let currentIndex = 0;
let timerId;
let interval = 1000; // 기본 간격은 1초
let isShowing = false;

function handleImageUpload(event) {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = function (event) {
      const imageUrl = event.target.result;
      images.push(imageUrl);
      createPreviewImage(imageUrl);
    };

    reader.readAsDataURL(file);
  }
}

function createPreviewImage(imageUrl) {
  const previewImage = document.createElement("img");
  previewImage.src = imageUrl;
  previewImage.classList.add("preview-image");
  previewContainer.appendChild(previewImage);

  const deleteButton = document.createElement("span");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "삭제";
  deleteButton.addEventListener("click", () => deleteImage(imageUrl));
  previewContainer.appendChild(deleteButton);
}
function deleteImage(imageUrl) {
  const imageIndex = images.indexOf(imageUrl);
  if (imageIndex > -1) {
    images.splice(imageIndex, 1);
  }

  const previewImages = document.querySelectorAll(".preview-image");
  const deleteButtons = document.querySelectorAll(".delete-button");

  for (let i = 0; i < previewImages.length; i++) {
    if (previewImages[i].src === imageUrl) {
      previewContainer.removeChild(previewImages[i]);
      previewContainer.removeChild(deleteButtons[i]);
      break;
    }
  }
}
function startSlideshow() {
  if (images.length === 0) {
    alert("이미지를 선택해주세요.");
    return;
  }
  if (isShowing === true) {
    startButton.innerText = "Start Animation";
    isShowing = false;
    clearInterval(timerId);
  } else {
    startButton.innerText = "Stop Animation";
    isShowing = true;
    timerId = setInterval(showNextImage, interval);
  }
}

function showNextImage() {
  const numImages = images.length;

  if (numImages > 0) {
    currentIndex = (currentIndex + 1) % numImages;
    displayAnimationImage(images[currentIndex]);
  }
}

function displayAnimationImage(imageUrl) {
  const animationImage = document.createElement("img");
  animationImage.src = imageUrl;
  animationImage.classList.add("animation-image");
  animationContainer.innerHTML = "";
  animationContainer.appendChild(animationImage);
}

function stopSlideshow() {
  startButton.disabled = false;
  clearInterval(timerId);
}

function setSlideshowSpeed() {
  const newInterval = parseInt(speedInput.value);
  if (newInterval > 0) {
    interval = newInterval;
  } else {
    alert("0보다 큰 수를 입력하세요.");
  }
}

addImage.addEventListener("change", handleImageUpload);
speedInput.addEventListener("change", setSlideshowSpeed);
startButton.addEventListener("click", startSlideshow);
