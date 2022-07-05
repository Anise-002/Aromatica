function calcValue(value, currentYOffset) {
    let rv;
    const scrollHeight = scenInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (value.length === 3) {
        const start = value[2].start * scrollHeight;
        const end = value[2].end * scrollHeight;
        const playPart = end - start;
        const partRatio = (currentYOffset - start) / playPart;  

        if (currentYOffset >= start && currentYOffset <= end) {
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
    let scrollRatio = currentYOffset / scrollHeight;
    let moveStartPoint;

    const FIXED = "fixed";

    //scrollRatio 예외처리
    if(scrollRatio > 1) scrollRatio = 1;
    if(scrollRatio < -0) scrollRatio = 0;

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
            
            //scenInfo[2] - contContainer 효과 지정
            scenInfo[2].obj.ContContainer.style.opacity = 0;
            break;
        case 2:
            //스클로한 값 px로 변환
            if(window.innerWidth >= 1024) value.paddingFixedTop = 43;
            const fixedPadding = (value.sectionPaddingTop - value.paddingFixedTop);
            const fixedRatio = (innerHeight * value.paddingFixedTop / 100) / scrollHeight;
            const paddingPx = (innerHeight * fixedPadding / 100);
            const moveRatio =  0.8;
            const moveStart = paddingPx + (moveRatio * scrollHeight);

            obj.ContContainer.classList.remove(FIXED);
            obj.ContContainer.style.top = `${value.sectionPaddingTop}vh`;

            //ContContainer positon 변경 조건
            if (scrollRatio > fixedRatio && scrollRatio < moveRatio) {
                obj.ContContainer.classList.add(FIXED);
                obj.ContContainer.style.top = `${fixedPadding}vh`;
            } else if (scrollRatio >= moveRatio && scrollRatio < 1) {
                obj.ContContainer.classList.remove(FIXED);
                obj.ContContainer.style.top = `${moveStart}px`;
            }

            //canavas container effect
            if(scrollRatio < 0.2){
                obj.ContContainer.style.opacity = calcValue(value.container_opacity_in,currentYOffset);
            }else{
                obj.ContContainer.style.opacity = 1;
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
            if (scrollRatio > 0.15) {
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

            if (scrollRatio > 0.3) {
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
            //sceInfo[3]cavanvasContainer 초기 image 설정
            scenInfo[3].obj.backgroundContext.drawImage(scenInfo[3].obj.imgs[0], 0, 0);
            break;

        case 3:
            //캔버스 블랜딩 초기값 설정
            value.canvasblendImage[0] = 0;
            value.canvasblendImage[1] = 2000;
            value.canvasblendImage[2].start = 0;
            value.canvasblendImage[2].end = 0.7;
            const blendHeight = calcValue(value.canvasblendImage, currentYOffset);

            //이미지 블랜딩
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

            //canvas position 변경 조건
            moveStartPoint = value.textContainer_Y[2].end + 0.05;
            if(scrollRatio > 0 && scrollRatio < moveStartPoint){
                obj.canvasContainer.style.position = 'fixed';
                obj.canvasContainer.style.top = 0;
            }else if (scrollRatio >= moveStartPoint) {
                const moveheight = moveStartPoint * scrollHeight;
                obj.canvasContainer.style.position = 'absolute';
                obj.canvasContainer.style.top = `${moveheight}px`;
            }
        break;
        
        case 5:
            //scenInfo[7] canvas 초기 이미지 랜더링
            scenInfo[6].obj.backgroundContext.drawImage(scenInfo[6].obj.videoImg[0], 0, 0);
        break;

        case 6:
            //cavas image 랜더링
            let imageSequence =Math.floor(calcValue(value.imageSequence, currentYOffset));
            if(imageSequence < 0) imageSequence=0;
            if(imageSequence >value.imageSequence[1]) imageSequence = value.imageSequence[1];
            obj.context.drawImage(obj.videoImg[imageSequence], 0, 0);
            
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

            //canvas position 변경 조건
            moveStartPoint = 0.8;
            if(scrollRatio > 0 && scrollRatio < moveStartPoint){
                obj.container.style.opacity = 1;
            }else if (scrollRatio >= moveStartPoint) {
                obj.container.style.opacity = calcValue(value.canvas_opacity, currentYOffset);
            }

            //scenInfo[7] conContianer effect
            scenInfo[7].obj.conContainer.classList.remove(FIXED);
            if(innerWidth >= 1024){
                scenInfo[7].value.dolpinTool_width[0] = 100;
                scenInfo[7].value.dolpinTool_width[1] = 60;
            }else if(innerWidth >= 1920){
                scenInfo[7].value.dolpinTool_width[0] = 300;
                scenInfo[7].value.dolpinTool_width[1] = 90;
            }else{
                scenInfo[7].value.dolpinTool_width[0] = 100;
                scenInfo[7].value.dolpinTool_width[1] = 90;
            }
            if(scrollRatio > 0.85){
                scenInfo[7].obj.dolpinTool.style.transform = `translate3d(${calcValue(scenInfo[7].value.dolpinTool_translateX, currentYOffset)}vw,${calcValue(scenInfo[7].value.dolpinTool_translateY, currentYOffset)}vw,0) rotate(${calcValue(scenInfo[7].value.dolpinTool_rotate, currentYOffset)}deg)`;
                scenInfo[7].obj.dolpinTool.style.width = `${calcValue(scenInfo[7].value.dolpinTool_width, currentYOffset)}vw`;
                scenInfo[7].obj.dolpinTool.style.opacity = `${calcValue(scenInfo[7].value.dolpinTool_opacity, currentYOffset)}`;
            }
           
        break;
        case 7 :
            console.log(scrollRatio)
            if(scrollRatio >= 0){
                scenInfo[6].obj.container.style.opacity = 0;
            }
            //sceInfo[6] cavas 마지막 image 유지
            scenInfo[6].obj.context.drawImage(scenInfo[6].obj.videoImg[scenInfo[6].obj.videoImg.length-1], 0, 0);
            
            //conContainer fixed
                obj.conContainer.classList.add(FIXED);
                obj.conContainer.style.top = 0;
                obj.conContainer.style.opacity = 1;

            //svg effect
            obj.svgPath.style.strokeDashoffset = calcValue(value.svgObjcet_draw, currentYOffset);
            
            //conContainer remove fixed
            let conContainerMoveStart;
            if(innerWidth < 1024){
                conContainerMoveStart= 0.6;
                moveStartPoint = 0.6;

            }else{
                conContainerMoveStart= 0.36;
                moveStartPoint = conContainerMoveStart-0.03;
            }
            if(scrollRatio >= conContainerMoveStart){
                obj.conContainer.classList.remove(FIXED);
                obj.conContainer.style.marginTop = `${(moveStartPoint)* scrollHeight}px`;
            console.log(conContainerMoveStart);
            }else{
                obj.conContainer.style.marginTop = 0;
            }

            //title
            obj.title.style.opacity = calcValue(value.title_opacity, currentYOffset);
            obj.title.style.transform = `translate3d(0,${calcValue(value.title_translateY, currentYOffset)}%,0)`;

            //imageA
            obj.imageA.style.opacity = calcValue(value.imageA_opacity, currentYOffset);
            obj.imageA.style.transform = `translate3d(0,${calcValue(value.imageA_translateY, currentYOffset)}%,0)`;

            //messageA
            obj.messageA.style.opacity = calcValue(value.messageA_opacity, currentYOffset);
            obj.messageA.style.transform = `translate3d(0,${calcValue(value.messageA_translateY, currentYOffset)}%,0)`;

            //imageB
            obj.imageB.style.opacity = calcValue(value.imageB_opacity, currentYOffset);
            obj.imageB.style.transform = `translate3d(0,${calcValue(value.imageB_translateY, currentYOffset)}%,0)`;

            //messageB
            obj.messageB.style.opacity = calcValue(value.messageB_opacity, currentYOffset);
            obj.messageB.style.transform = `translate3d(0,${calcValue(value.messageB_translateY, currentYOffset)}%,0)`;

            //imageC
            obj.imageC.style.opacity = calcValue(value.imageC_opacity, currentYOffset);
            obj.imageC.style.transform = `translate3d(0,${calcValue(value.imageC_translateY, currentYOffset)}%,0)`;

            //messageC
            obj.messageC.style.opacity = calcValue(value.messageC_opacity, currentYOffset);
            obj.messageC.style.transform = `translate3d(0,${calcValue(value.messageC_translateY, currentYOffset)}%,0)`;
            
            //scenInfo[8]의 image 랜더링
            function sceinfor8CanvasDraw(drawObj){
                if(window.innerWidth > 1024){
                    drawObj.drawImage(scenInfo[8].obj.imgs[0], 0, 0,scenInfo[8].obj.imgs[0].width, scenInfo[8].obj.imgs[0].height,
                        0, 0, scenInfo[8].obj.canvas.width/2,  scenInfo[8].obj.canvas.height/2);
                    drawObj.drawImage(scenInfo[8].obj.imgs[1], 0, 0,scenInfo[8].obj.imgs[1].width, scenInfo[8].obj.imgs[1].height,
                    0,  scenInfo[8].obj.canvas.height/2, scenInfo[8].obj.canvas.width/2,  scenInfo[8].obj.canvas.height/2);
                    drawObj.drawImage(scenInfo[8].obj.imgs[2], 0, 0 ,scenInfo[8].obj.imgs[2].width, scenInfo[8].obj.imgs[2].height,
                        scenInfo[8].obj.canvas.width/2,  0, scenInfo[8].obj.canvas.width/2, scenInfo[8].obj.canvas.height);
                }else{
                    drawObj.drawImage(scenInfo[8].obj.imgs[0], 0, 0,scenInfo[8].obj.imgs[0].width, scenInfo[8].obj.imgs[0].height,
                        0, 0, scenInfo[8].obj.canvas.width,  scenInfo[8].obj.canvas.height);
                }
            };
            
            sceinfor8CanvasDraw(scenInfo[8].obj.backgroundContext);
        break;

        case 8 :
            sceinfor8CanvasDraw(scenInfo[8].obj.context);


            //이미지 블랜딩
            value.canvasblendImage[0] = obj.canvas.height;
            value.canvasblendImage[2].end = 0.5;
            const blendHeight_8 = calcValue(value.canvasblendImage,currentYOffset);
            obj.context.drawImage(obj.imgs[obj.imgs.length-1],
                0, blendHeight_8 , obj.imgs[obj.imgs.length-1].width,  obj.imgs[obj.imgs.length-1].height - blendHeight_8,
                0, blendHeight_8, obj.canvas.width, obj.imgs[obj.imgs.length-1].height - blendHeight_8 );
            
            //text  블랜딩
            value.textContainer_Y[2].start = value.canvasblendImage[2].end /2;
            value.textContainer_Y[2].end = value.canvasblendImage[2].end;
            value.textContainer_opacity[2].start = value.textContainer_Y[2].start;
            value.textContainer_opacity[2].end = value.textContainer_Y[2].end;
            obj.textContainer.style.marginTop = `${calcValue(value.textContainer_Y, currentYOffset)}%`;
            obj.textContainer.style.opacity = calcValue(value.textContainer_opacity,currentYOffset);
            console.log(scrollRatio);
            //블랜딩 완료 후
            if(scrollRatio >= 0.8){
                obj.canvasContainer.style.position = 'absolute';
                obj.canvasContainer.style.top = `${0.8 * scrollHeight}px`;
            }else{
                obj.canvasContainer.style.position = 'fixed';
                obj.canvasContainer.style.top = 0;
            }
            
        break;
    }
}