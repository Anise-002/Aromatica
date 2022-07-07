let YOffset = 0;
let currentScene = 0;
let prevScrollHeight = 0;
let enterNewSection;

//이미지시퀀스
function setCanvasImage() {
    let imgElem;
    for (let i = 1; i < scenInfo[0].value.videoImgCount + 1; i++) {
        imgElem = new Image();
        if (i < 10) i = `00${i}`;
        if (i >= 10 && i < 100) i = `0${i}`;
        imgElem.src = `./video/1/${i}.jpg`;
        scenInfo[0].obj.videoImg.push(imgElem);
    }
    for (let i = 0; i < scenInfo[3].imageCount; i++) {
        imgElem = new Image();
        imgElem.src = scenInfo[3].obj.canvasImgpath[i];
        scenInfo[3].obj.imgs.push(imgElem);
    }
    for (let i = 1; i < scenInfo[6].value.videoImgCount + 1; i++) {
        imgElem = new Image();
        if (i < 10) i = `00${i}`;
        if (i >= 10 && i < 100) i = `0${i}`;
        imgElem.src = `./video/2/${i}.jpg`;
        scenInfo[6].obj.videoImg.push(imgElem);
    }
    for(let i = 0; i < scenInfo[8].imageCount; i++){
        imgElem = new Image();
        imgElem.src = scenInfo[8].obj.canvasImgpath[i];
        scenInfo[8].obj.imgs.push(imgElem);
    }
}


//현재 창의 섹션 구분하기 위한 함수
function setCurrentNum() {
    enterNewSection = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
        prevScrollHeight += scenInfo[i].scrollHeight;
    }
    if (YOffset > prevScrollHeight + scenInfo[currentScene].scrollHeight) {
        enterNewSection = true;
        currentScene++;
        document.body.setAttribute('id', `show-section-${currentScene}`);
    }
    if (YOffset < prevScrollHeight) {
        enterNewSection = true;
        if (currentScene === 0) return;
        currentScene--;
        document.body.setAttribute('id', `show-section-${currentScene}`);
    }
    if (enterNewSection) return;
    playAnimation();
}

//초기세팅 값 및 로딩 세팅 값
function setLayout() {
    for (let i = 0; i < scenInfo.length; i++) {
        if (scenInfo[i].type === STICKY) {
            if(window.innerWidth >= 1024){
                scenInfo[7].heightNum = 3.5;
            }else{
                scenInfo[7].heightNum = 3;
            }
            scenInfo[i].scrollHeight = scenInfo[i].heightNum * window.innerHeight;
        }
        if (scenInfo[i].type === FULLHEIGHT) {
            scenInfo[i].scrollHeight = scenInfo[i].obj.container.offsetHeight;
        }
        if (scenInfo[i].type === NORMAL) {
            scenInfo[i].scrollHeight = scenInfo[i].obj.container.offsetHeight;
        }
        scenInfo[i].obj.container.style.height = `${scenInfo[i].scrollHeight}px`;
    }
    YOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < scenInfo.length; i++) {
        totalScrollHeight += scenInfo[i].scrollHeight;
        if (totalScrollHeight >= YOffset) {
            currentScene = i;
            break;
        }
    }
    document.body.setAttribute('id', `show-section-${currentScene}`);

    playAnimation();
    //canvas size 
    const heightRatio = window.innerHeight / 1080;
    const widthRatio = window.innerWidth/1920;
    const useHeightRatio = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    const useWidthRatio =  `translate3d(-50%, -50%, 0) scale(${widthRatio})`;

    if(window.innerWidth == 1280 && window.innerHeight == 800){
        //Nest Hub Max 디바이스 대응 조건문
        scenInfo[0].obj.canvas.style.transform = useHeightRatio;
        scenInfo[3].obj.canvas.style.transform = useHeightRatio;
        scenInfo[3].obj.backgroundCanvas.style.transform = useHeightRatio;
        scenInfo[6].obj.canvas.style.transform =useHeightRatio;
        scenInfo[6].obj.backgroundCanvas.style.transform =useHeightRatio;
        scenInfo[8].obj.canvas.style.transform = useHeightRatio;
        scenInfo[8].obj.backgroundCanvas.style.transform = useHeightRatio;
    }else if(window.innerWidth > window.innerHeight){
        //가로가 넓은 디바이스 대응
        scenInfo[0].obj.canvas.style.transform = useWidthRatio;
        scenInfo[3].obj.canvas.style.transform = useWidthRatio;
        scenInfo[3].obj.backgroundCanvas.style.transform =useWidthRatio;
        scenInfo[6].obj.canvas.style.transform = useWidthRatio;
        scenInfo[6].obj.backgroundCanvas.style.transform = useWidthRatio;
        scenInfo[8].obj.canvas.style.transform = useWidthRatio;
        scenInfo[8].obj.backgroundCanvas.style.transform = useWidthRatio;
    }else if(window.innerWidth < window.innerHeight){
        //세로가 넓은 디바이스 대응
        scenInfo[0].obj.canvas.style.transform = useHeightRatio;
        scenInfo[3].obj.canvas.style.transform = useHeightRatio;
        scenInfo[3].obj.backgroundCanvas.style.transform = useHeightRatio
        scenInfo[6].obj.canvas.style.transform = useHeightRatio;
        scenInfo[6].obj.backgroundCanvas.style.transform = useHeightRatio;
        scenInfo[8].obj.canvas.style.transform = useHeightRatio;
        scenInfo[8].obj.backgroundCanvas.style.transform = useHeightRatio;
    }
    //css 클래스를 이용해 html태그에 추가 후 전체적으로 적용시키는 방법을 시도해 봐도 좋을 것 같다.
}

function fixedNav(){
    if(window.pageYOffset > 50){
        document.querySelector('#bottom-nav').classList.add('fixed');
    }else{
        document.querySelector('#bottom-nav').classList.remove('fixed');
    }
};

function sideNavShow(){
    const menuButton = document.querySelectorAll('.menu-button');
    const sideMenu = document.querySelector('#side-nav');
    
    menuButton[0].addEventListener('click', ()=>{
        sideMenu.classList.toggle('show');
    });
    menuButton[1].addEventListener('click', ()=>{
        sideMenu.classList.toggle('show');
    });
}
sideNavShow();

setCanvasImage();
window.addEventListener('load', () => {
    setLayout();
    scenInfo[0].obj.context.drawImage(scenInfo[0].obj.videoImg[0], 0, 0);
});
window.addEventListener('resize', () => {
    setLayout();
    playAnimation();
});
window.addEventListener('scroll', () => {
    YOffset = window.pageYOffset;
    fixedNav();
    playAnimation();
    setCurrentNum();
})
