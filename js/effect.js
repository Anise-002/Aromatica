function calcValue(value, currentYOffset) {
    let rv;
    const scrollHeight = scenInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;   //섹션을 기준으로 한 yoffsest값 

    if (value.length === 3) {
        const start = value[2].start * scrollHeight;
        const end = value[2].end * scrollHeight;
        const playPart = end - start;
        const partRatio = (currentYOffset - start) / playPart;  //움직이고자 하는 부분의 yoffset값의 비율

        if (currentYOffset >= start && currentYOffset <= end) {
            //움직이고자 하는 영역을 기준으로 한 yoffset의 비율
            rv = partRatio * (value[1] - value[0]) + value[0];
        } else if (currentYOffset < start) {
            rv = value[0];
        } else if (currentYOffset > end) {
            rv = value[1];
        }
    } else {
        rv = scrollRatio * (value[1] - value[0]) + value[0];
    }
    return rv;
}

function playAnimation() {
    const current = scenInfo[currentScene]
    const obj = current.obj;
    const value = current.value;
    const scrollHeight = current.scrollHeight;
    const currentYOffset = YOffset - prevScrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    const FIXED = "fixed";


    switch (currentScene) {
        case 0:
            //canvas
            let sequence = Math.round(calcValue(value.imageSequence, currentYOffset));
            if (sequence < 0 || sequence > 212) return;
            obj.context.drawImage(obj.videoImg[sequence], 0, 0);
            obj.canvas.style.opacity = calcValue(value.canvas_opacity, currentYOffset);
            //messageA
            if (scrollRatio <= 0.22) {
                obj.messageA.style.opacity = calcValue(value.a_opacity_in, currentYOffset);
                obj.messageA.style.transform = `translate3d(${calcValue(value.a_translateX_in, currentYOffset)}%, 0, 0)`;
            } else {
                obj.messageA.style.opacity = calcValue(value.a_opacity_out, currentYOffset);
                obj.messageA.style.transform = `translate3d(0, ${calcValue(value.a_translateY_out, currentYOffset)}%, 0)`;
            }
            //messageB
            if (scrollRatio <= 0.58) {
                obj.messageB.style.opacity = calcValue(value.b_opacity_in, currentYOffset);
                obj.messageB.style.transform = `translate3d(0, ${calcValue(value.b_translateY_in, currentYOffset)}%, 0)`;
            } else {
                obj.messageB.style.opacity = calcValue(value.b_opacity_out, currentYOffset);
                obj.messageB.style.transform = `translate3d(0, ${calcValue(value.b_translateY_out, currentYOffset)}%, 0)`;
            }
            //messageC
            if (scrollRatio <= 0.85) {
                obj.messageC.style.opacity = calcValue(value.c_opacity_in, currentYOffset);
                obj.messageC.style.transform = `translate3d(0, ${calcValue(value.c_translateY_in, currentYOffset)}%, 0)`;
            } else {
                obj.messageC.style.opacity = calcValue(value.c_opacity_out, currentYOffset);
                obj.messageC.style.transform = `translate3d(0, ${calcValue(value.c_translateY_out, currentYOffset)}%, 0)`;
            }
            //messageD
            obj.messageD.style.opacity = calcValue(value.d_opacity_in, currentYOffset);
            obj.messageD.style.transform = `translate3d(0, ${calcValue(value.d_translateY_in, currentYOffset)}%, 0)`;

            break;
        case 1:
            obj.container.style.opacity = calcValue(value.container_opacity_out, currentYOffset);
            //titleCon
            obj.title.style.opacity = calcValue(value.title_opacity_in, currentYOffset);
            obj.subTitle.style.opacity = calcValue(value.subTitle_opacity_in, currentYOffset);
            obj.button.style.opacity = calcValue(value.button_opacity_in, currentYOffset);

            obj.title.style.transform = `translate3d(0, ${calcValue(value.title_translateY_in, currentYOffset)}%,0)`;
            obj.subTitle.style.transform = `translate3d(0, ${calcValue(value.subTitle_translateY_in, currentYOffset)}%,0)`;
            obj.button.style.transform = `translate3d(-50%, ${calcValue(value.button_translateY_in, currentYOffset)}%,0)`;

            break;
        case 2:

            const fixedPadding = (value.sectionPaddingTop - value.paddingFixedTop);
            //fixed될때 section의 padding-top의 값(50vh - 40vh) = 10vh;
            //fixed가 되길 원하는 시작점의 section padding-top(40vh)의 px값
            const fixedRatio = (innerHeight * value.paddingFixedTop / 100) / scrollHeight;
            //fixed될때의 시작점 : 40vh의 px값을 구한 후 sectionheight의 비율을 구함
            const paddingPx = (innerHeight * fixedPadding / 100);
            //10vh의 px값 구하기
            const moveStart = paddingPx + (value.bottomContent_opacity_in[2].end * scrollHeight);
            //fixed할떄의 padding의 값 + 지금까지 스크롤한 px값


            obj.ContContainer.classList.remove(FIXED);
            obj.ContContainer.style.top = `${value.sectionPaddingTop}vh`;
            // obj.ContContainer.style.left = 0;

            if (scrollRatio > fixedRatio && scrollRatio < value.bottomContent_opacity_in[2].end) {
                obj.ContContainer.classList.add(FIXED);
                obj.ContContainer.style.top = `${fixedPadding}vh`;
            } else if (scrollRatio >= value.bottomContent_opacity_in[2].end && scrollRatio < 1) {
                obj.ContContainer.classList.remove(FIXED);
                obj.ContContainer.style.top = `${moveStart}px`;
            }

            // 화면 너비에 따른 Horizon,Vertical width 지정 함수
            function setLineWidth (){
                if(innerWidth < 768){
                    value.left_horizon_line[1] = 15;
                    value.left_vertical_line[1] = 11;
                    value.right_horizon_line[1] = 14;
                    value.right_vertical_line[1] = 9;
                }
                if(innerWidth >= 768){
                    value.left_horizon_line[1] = 11;
                    value.left_vertical_line[1] = 9;
                    value.right_horizon_line[1] = 11;
                    value.right_vertical_line[1] = 9;
                }
                if(innerWidth >= 1024){
                    value.left_horizon_line[1] = 155;
                    value.left_vertical_line[1] = 80;
                    value.right_horizon_line[1] = 155;
                    value.right_vertical_line[1] = 80;
                }
                // if(innerWidth > 1920){
                //     value.left_horizon_line[1] = 5;
                //     value.left_vertical_line[1] = 3;
                //     value.right_horizon_line[1] = 5;
                //     value.right_vertical_line[1] = 3;
                // }          
            };
            setLineWidth();


            //leftContent
            if (scrollRatio > 0.1) {
                obj.leftContainer.style.display = "block";
                obj.leftContent.style.opacity = calcValue(value.leftContent_opacity_in, currentYOffset);
                obj.leftContent.style.transform = `translate3d( ${calcValue(value.leftContent_transformX_in, currentYOffset)}%,0, 0)`;
                if(innerWidth >= 1024){
                    obj.leftHorizon.style.width = `${calcValue(value.left_horizon_line, currentYOffset)}px`;
                    obj.leftVertical.style.width = `${calcValue(value.left_vertical_line, currentYOffset)}px`;
                }else{
                    obj.leftHorizon.style.width = `${calcValue(value.left_horizon_line, currentYOffset)}vw`;
                    obj.leftVertical.style.width = `${calcValue(value.left_vertical_line, currentYOffset)}vw`;
                }
                
                
            } else {
                obj.leftContainer.style.display = "none";
            }

            if (scrollRatio > 0.2) {
                obj.rightContainer.style.display = "block";
                //rightContent
                obj.rightContent.style.opacity = calcValue(value.rightContent_opacity_in, currentYOffset);
                obj.rightContent.style.transform = `translate3d( ${calcValue(value.leftContent_transformY_in, currentYOffset)}%,0, 0)`;
                if(innerWidth >= 1024){
                    obj.rightHorizon.style.width = `${calcValue(value.right_horizon_line, currentYOffset)}px`;
                    obj.rightVertical.style.width = `${calcValue(value.right_vertical_line, currentYOffset)}px`;
                }else{
                    obj.rightHorizon.style.width = `${calcValue(value.right_horizon_line, currentYOffset)}vw`;
                    obj.rightVertical.style.width = `${calcValue(value.right_vertical_line, currentYOffset)}vw`;
                }

            } else {
                obj.rightContainer.style.display = "none";
            }
            //conceptText
            if (scrollRatio > 0.3) {
                obj.conceptText.style.display = 'flex';
                obj.conceptText.style.opacity = calcValue(value.conceptText_opacity_in, currentYOffset);
                obj.conceptText.style.transform = `translate3d(0, ${calcValue(value.conceptText_translateY_in, currentYOffset)}%, 0)`;
            } else {
                obj.conceptText.style.display = 'none';
            }
            //bottomContent
            if (scrollRatio > 0.5) {
                obj.bottomContent.style.display = 'block';
                obj.bottomContent.style.opacity = calcValue(value.bottomContent_opacity_in, currentYOffset);
                obj.bottomContent.style.transform = `translate3d(0, ${calcValue(value.bottomContent_translateY_in, currentYOffset)}%, 0)`;
            } else {
                obj.bottomContent.style.display = 'none';
            }
            scenInfo[3].obj.context.drawImage(scenInfo[3].obj.imgs[0], 0, 0);
            scenInfo[3].obj.canvasContainer.classList.remove(FIXED);
            break;

        case 3:
            //캔버스 설정
            obj.canvasContainer.classList.add(FIXED);
            obj.canvasContainer.style.top = `0px`;

            //캔버스 블랜딩 초기값 설정
            value.canvasblendImage[0] = 0;
            value.canvasblendImage[1] = 2000;
            value.canvasblendImage[2].start = 0;
            value.canvasblendImage[2].end = 0.6;
            const blendHeight = calcValue(value.canvasblendImage, currentYOffset);
            const heightRatio = window.innerHeight / 1080;

            //이미지 블랜딩
            const textStartPoint = ((obj.canvas.width * heightRatio) - window.innerWidth) / 2;
            obj.context.drawImage(obj.imgs[0], 0, 0);
            obj.context.drawImage(obj.imgs[1],
                0, 1500 - blendHeight, obj.canvas.width, blendHeight,
                0, obj.canvas.height - blendHeight, obj.canvas.width, blendHeight
            );

            //Text 블랜딩

            if (scrollRatio > 0 ) {
                value.textContainer_Y[0] = obj.canvas.height;
                value.textContainer_Y[1] = 0;
                value.textContainer_Y[2].end = value.canvasblendImage[2].end;
                obj.textContainer.style.top = `${calcValue(value.textContainer_Y, currentYOffset)}px`;
            }

            //태블릿 이상 대비 블랜딩
            if (window.innerWidth >= 1024) {
                obj.context.drawImage(obj.imgs[1],
                    0, 1500 - blendHeight, obj.canvas.width / 2, blendHeight,
                    0, obj.canvas.height - blendHeight, obj.canvas.width / 2, blendHeight
                );
                obj.context.fillStyle = 'rgb(180,141,98)';
                obj.context.fillRect(
                    obj.canvas.width / 2, obj.canvas.height - blendHeight, obj.canvas.width / 2, blendHeight
                )

            }

            //블랜딩 후
            if (scrollRatio > value.canvasblendImage[2].end + 0.05) {
                const moveheight = `${(value.canvasblendImage[2].end + 0.05) * scrollHeight}`;
                obj.canvasContainer.classList.remove(FIXED);
                obj.canvasContainer.style.top = `${moveheight}px`;

            }
        break;
        
        case 5:
        break;
        case 6:
            //cavas image 랜더링
            let imageSequence =Math.floor(calcValue(value.imageSequence, currentYOffset));
            if(imageSequence < 0) imageSequence=0;
            if(imageSequence >value.imageSequence[1]) imageSequence = value.imageSequence[1];
            obj.context.drawImage(obj.videoImg[imageSequence], 0, 0);
            //canvas opacity 
            if(scrollRatio  < 0.8){
                obj.canvas.style.opacity = calcValue(value.canvas_opacity_in,currentYOffset);
            }// }else{
            //     obj.canvas.style.opacity = calcValue(value.canvas_opacity_out,currentYOffset);
            // }
            //a
            if(scrollRatio < 0.16){
                obj.messageA.style.opacity = calcValue(value.a_opacity_in, currentYOffset);
                obj.messageA.style.transform = `translate3d(0,${calcValue(value.a_translateY_in, currentYOffset)}px, 0)`;
            }else{
                obj.messageA.style.opacity = calcValue(value.a_opacity_out, currentYOffset);
                obj.messageA.style.transform = `translate3d(0,${calcValue(value.a_translateY_out, currentYOffset)}px, 0)`;
            }
            //b
            if(scrollRatio < 0.3){
                obj.messageB.style.opacity = calcValue(value.b_opacity_in, currentYOffset);
                obj.messageB.style.transform = `translate3d(0,${calcValue(value.b_translateY_in, currentYOffset)}px, 0)`;
            }else{
                obj.messageB.style.opacity = calcValue(value.b_opacity_out, currentYOffset);
                obj.messageB.style.transform = `translate3d(0,${calcValue(value.b_translateY_out, currentYOffset)}px, 0)`;
            }
            //c
            if(scrollRatio < 0.61){
                obj.messageC.style.opacity = calcValue(value.c_opacity_in, currentYOffset);
                obj.messageC.style.transform = `translate3d(0,${calcValue(value.c_translateY_in, currentYOffset)}px, 0)`;
            }else{
                obj.messageC.style.opacity = calcValue(value.c_opacity_out, currentYOffset);
                obj.messageC.style.transform = `translate3d(0,${calcValue(value.c_translateY_out, currentYOffset)}px, 0)`;
            }
            //d
            if(scrollRatio < 0.81){
                obj.messageD.style.opacity = calcValue(value.d_opacity_in, currentYOffset);
                obj.messageD.style.transform = `translate3d(0,${calcValue(value.d_translateY_in, currentYOffset)}px, 0)`;
            }else{
                obj.messageD.style.opacity = calcValue(value.d_opacity_out, currentYOffset);
                obj.messageD.style.transform = `translate3d(0,${calcValue(value.d_translateY_out, currentYOffset)}px, 0)`;
            }
            //section 이동
            if (scrollRatio > 0.85) {
                const moveheight = (0.85 * scrollHeight);
                obj.canvasContainer.style.position = 'relative';
                obj.canvasContainer.style.top = `${moveheight}px`;
            }else{
                obj.canvasContainer.style.position = 'fixed';
                obj.canvasContainer.style.top = 0;
            }

        break;
    }
}