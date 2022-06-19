    let YOffset = 0;
    let currentScene = 0;
    let prevScrollHeight = 0;
    let enterNewSection;

    //이미지시퀀스
    function setCanvasImage(){
        let imgElem;

        for(let i = 1; i<scenInfo[0].value.videoImgCount + 1; i++){
            imgElem = new Image();
            if(i < 10) i =`00${i}`;
            if(i >= 10 && i < 100) i =`0${i}`;
            imgElem.src = `../video/1/${i}.jpg`;
            scenInfo[0].obj.videoImg.push(imgElem);
        }

    }
    

    //현재 창의 섹션 구분하기 위한 함수
    function setCurrentNum(){
        enterNewSection = false;
        prevScrollHeight = 0;

        for(let i = 0; i<currentScene; i++){
            prevScrollHeight += scenInfo[i].scrollHeight;            
        }
        if(YOffset > prevScrollHeight + scenInfo[currentScene].scrollHeight ){
            enterNewSection = true;
            currentScene++;
            document.body.setAttribute('id', `show-section-${currentScene}`);
        }
        if(YOffset < prevScrollHeight){
            enterNewSection = true;
            if(currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-section-${currentScene}`);
        }

       if(enterNewSection) return;
       playAnimation();

    }

    //초기세팅 값 및 로딩 세팅 값
    function setLayout(){
        for(let i = 0; i <scenInfo.length; i++){
            if(scenInfo[i].type === STICKY){
                 scenInfo[i].scrollHeight = scenInfo[i].heightNum * window.innerHeight;
            }
            if(scenInfo[i].type === FULLHEIGHT ){
               scenInfo[i].scrollHeight = scenInfo[i].obj.container.offsetHeight + innerHeight;
            }
            if(scenInfo[i].type === NORMAL){
                scenInfo[i].scrollHeight = scenInfo[i].obj.container.offsetHeight;
             }
            scenInfo[i].obj.container.style.height = `${scenInfo[i].scrollHeight}px`;
        }

        YOffset = window.pageYOffset;
        let totalScrollHeight =0;
        for(let i = 0; i < scenInfo.length; i++){
            totalScrollHeight += scenInfo[i].scrollHeight;
            if(totalScrollHeight >= YOffset){
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-section-${currentScene}`);

        playAnimation();

        //canvas size 
        const heightRatio = window.innerHeight/ 1080;
        scenInfo[0].obj.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }

    setCanvasImage();
    window.addEventListener('load',()=>{
        setLayout();
        scenInfo[0].obj.context.drawImage(scenInfo[0].obj.videoImg[0], 0, 0);
    });
    window.addEventListener('resize', ()=>{
        setLayout();
        playAnimation();
    });
    window.addEventListener('scroll',()=>{
        YOffset = window.pageYOffset;
        playAnimation();
        setCurrentNum();

    })
