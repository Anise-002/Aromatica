    let YOffset = 0;
    let currentScene = 0;
    let prevScrollHeight = 0;

    //현재 창의 섹션 구분하기 위한 함수
    function setCurrentNum(){
        prevScrollHeight = 0;
        for(let i = 0; i<currentScene; i++){
            prevScrollHeight += scenInfo[i].scrollHeight;            
        }
        if(YOffset > prevScrollHeight + scenInfo[currentScene].scrollHeight ){
            currentScene++;
            document.body.setAttribute('id', `show-section-${currentScene}`);
        }
        if(YOffset < prevScrollHeight){
            if(currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-section-${currentScene}`);
        }
    }

    //초기세팅 값 및 로딩 세팅 값
    function setLayout(){
        for(let i = 0; i <scenInfo.length; i++){
            // if(scenInfo[i].type === STICKY){
            //     scenInfo[i].scrollHeight = scenInfo[i].heightNum * window.innerHeight;
            // }
            // if(scenInfo[i].type === NORMAL){
            //     scenInfo[i].scrollHeight = scenInfo[i].obj.container.innerHeight;
            //     console.log(scenInfo[i].scrollHeight);
            // }
            scenInfo[i].scrollHeight = scenInfo[i].heightNum * window.innerHeight;        
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
    }

    window.addEventListener('load',setLayout);
    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll',()=>{
        YOffset = window.pageYOffset;
        setCurrentNum();
        playAnimation();

    })
