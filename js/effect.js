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
        console.log(rv);
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
            //messageA
            if(scrollRatio <= 0.32){
                obj.messageA.style.opacity = calcValue(value.a_opacity_in, currentYOffset);
                obj.messageA.style.transform = `translate3d(0, ${calcValue(value.a_translateY_in, currentYOffset)}%, 0)`;
            }else{
                obj.messageA.style.opacity = calcValue(value.a_opacity_out, currentYOffset);
                obj.messageA.style.transform = `translate3d(0, ${calcValue(value.a_translateY_out, currentYOffset)}%, 0)`;
            }
            //messageB
            if(scrollRatio <= 0.53){
                obj.messageB.style.opacity = calcValue(value.b_opacity_in, currentYOffset);
            }else{
                obj.messageB.style.opacity = calcValue(value.b_opacity_out, currentYOffset);
            }
            //messageC
            if(scrollRatio <= 0.73){
                obj.messageC.style.opacity = calcValue(value.c_opacity_in, currentYOffset);
            }else{
                obj.messageC.style.opacity = calcValue(value.c_opacity_out, currentYOffset);
            }
            //messageD
            if(scrollRatio <= 0.92){
                obj.messageD.style.opacity = calcValue(value.d_opacity_in, currentYOffset);
            }else{
                obj.messageD.style.opacity = calcValue(value.d_opacity_out, currentYOffset);
            }

        case 1 :
    }
}