const body = document.querySelector('body')

const IMG_LIST = ['3','geo1','geo3','rain','Sketch006','Sketch008','Sketch009']
const IMG_NUM = 4;

function randomImg() {
    const randomNo = Math.floor(Math.random() * IMG_LIST.length)
    const img = IMG_LIST[randomNo]
    return img;
}
function showImg(img) {
    const image = new Image();
    image.src = `imgs/${img}.jpg`;
    image.classList.add("bgImage")
    body.prepend(image)
    return null;
}

function init() {
    const randomNumber = randomImg();
    showImg(randomNumber)
    // body.addEventListener('click', () => {
    //     const randomNumber = randomImg()
    //     showImg(randomNumber)
    // }
    // )?
}

init();