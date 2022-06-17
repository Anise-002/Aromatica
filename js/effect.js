function calcValue(value, currentYOffset){
    let rv;
    const scrollHeight = scenInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;   //섹션을 기준으로 한 yoffsest값 

    if(value.length === 3){
        const start = value[2].start * scrollHeight;
        const end = value[2].end * scrollHeight;
        const playPart = end - start;
        const partRatio = (currentYOffset -start) / playPart;  //움직이고자 하는 부분의 yoffset값의 비율

        if(currentYOffset >= start && currentYOffset <= end){
            //움직이고자 하는 영역을 기준으로 한 yoffset의 비율
            rv = partRatio * (value[1]-value[0]) + value[0];
        }else if(currentYOffset < start){
            rv = value[0];
        }else if(currentYOffset > end){
            rv = value[1];
        }
    }else{
        rv = scrollRatio * (value[1]-value[0]) + value[0];
    }
    return rv;
}


function playAnimation(){
    const current = scenInfo[currentScene]
    const obj = current.obj;
    const value = current.value;
    const scrollHeight = current.scrollHeight;
    const currentYOffset = YOffset - prevScrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch(currentScene){
        case 0 :
            //canvas
            let sequence = Math.round(calcValue(value.imageSequence, currentYOffset));
            if(sequence < 0 || sequence > 212) return; 
            obj.context.drawImage(obj.videoImg[sequence], 0, 0);
            obj.canvas.style.opacity = calcValue(value.canvas_opacity, currentYOffset);
            //messageA
            if(scrollRatio <= 0.22){
                obj.messageA.style.opacity = calcValue(value.a_opacity_in, currentYOffset);
                obj.messageA.style.transform = `translate3d(${calcValue(value.a_translateX_in, currentYOffset)}%, 0, 0)`;
            }else{
                obj.messageA.style.opacity = calcValue(value.a_opacity_out, currentYOffset);
                obj.messageA.style.transform = `translate3d(0, ${calcValue(value.a_translateY_out, currentYOffset)}%, 0)`;
            }
            //messageB
            if(scrollRatio <= 0.58){
                obj.messageB.style.opacity = calcValue(value.b_opacity_in, currentYOffset);
                obj.messageB.style.transform = `translate3d(0, ${calcValue(value.b_translateY_in, currentYOffset)}%, 0)`;
            }else{
                obj.messageB.style.opacity = calcValue(value.b_opacity_out, currentYOffset);
                obj.messageB.style.transform = `translate3d(0, ${calcValue(value.b_translateY_out, currentYOffset)}%, 0)`;
            }
            //messageC
            if(scrollRatio <= 0.85){
                obj.messageC.style.opacity = calcValue(value.c_opacity_in, currentYOffset);
                obj.messageC.style.transform = `translate3d(0, ${calcValue(value.c_translateY_in, currentYOffset)}%, 0)`;
            }else{
                obj.messageC.style.opacity = calcValue(value.c_opacity_out, currentYOffset);
                obj.messageC.style.transform = `translate3d(0, ${calcValue(value.c_translateY_out, currentYOffset)}%, 0)`;
            }
            //messageD
                obj.messageD.style.opacity = calcValue(value.d_opacity_in, currentYOffset);
                obj.messageD.style.transform = `translate3d(0, ${calcValue(value.d_translateY_in, currentYOffset)}%, 0)`;

            break;
        case 1 :
            obj.container.style.opacity = calcValue(value.container_opacity_out,currentYOffset);
          //titleCon
            obj.title.style.opacity = calcValue(value.title_opacity_in, currentYOffset); 
            obj.subTitle.style.opacity = calcValue(value.subTitle_opacity_in, currentYOffset); 
            obj.button.style.opacity = calcValue(value.button_opacity_in, currentYOffset); 

            obj.title.style.transform = `translate3d(0, ${calcValue(value.title_translateY_in, currentYOffset)}%,0)`; 
            obj.subTitle.style.transform = `translate3d(0, ${calcValue(value.subTitle_translateY_in, currentYOffset)}%,0)`; 
            obj.button.style.transform = `translate3d(-50%, ${calcValue(value.button_translateY_in, currentYOffset)}%,0)`; 

            break;
        case 2 :
            
            //leftContent
            obj.leftContent.style.opacity = calcValue(value.leftContent_opacity_in, currentYOffset);
            obj.leftContent.style.transform = `translate3d( ${calcValue(value.leftContent_transformX_in, currentYOffset)}%,0, 0)`;
            obj.leftHorizon.style.width = `${calcValue(value.left_horizon_line, currentYOffset)}vw`;
            obj.leftVertical.style.width = `${calcValue(value.left_vertical_line, currentYOffset)}vw`;

            if(scrollRatio > 0.2){
                obj.rightContainer.style.display = "block";

                //rightContent
                obj.rightContent.style.opacity = calcValue(value.rightContent_opacity_in, currentYOffset);
                obj.rightContent.style.transform = `translate3d( ${calcValue(value.leftContent_transformY_in, currentYOffset)}%,0, 0)`;
                obj.rightHorizon.style.width = `${calcValue(value.right_horizon_line, currentYOffset)}vw`;
                obj.rightVertical.style.width = `${calcValue(value.right_vertical_line, currentYOffset)}vw`;
            }else{
                obj.rightContainer.style.display = "none";
            }

            //conceptText
            obj.conceptText.style.opacity = calcValue(value.conceptText_opacity_in,currentYOffset);
            obj.conceptText.style.transform = `translate3d(0, ${calcValue(value.conceptText_translateY_in, currentYOffset)}%, 0)`;
            
            //bottomContent
            obj.bottomContent.style.opacity = calcValue(value.bottomContent_opacity_in,currentYOffset);
            obj.bottomContent.style.transform = `translate3d(0, ${calcValue(value.bottomContent_translateY_in, currentYOffset)}%, 0)`;

            


    }
}