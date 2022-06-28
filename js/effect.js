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

            if (scrollRatio > fixedRatio && scrollRatio < value.bottomContent_opacity_in[2].end) {
                obj.ContContainer.classList.add(FIXED);
                obj.ContContainer.style.top = `${fixedPadding}vh`;
            } else if (scrollRatio >= value.bottomContent_opacity_in[2].end && scrollRatio < 1) {
                obj.ContContainer.classList.remove(FIXED);
                obj.ContContainer.style.top = `${moveStart}px`;
            }


            //leftContent
            if (scrollRatio > 0.1) {
                obj.leftContainer.style.display = "block";
                obj.leftContent.style.opacity = calcValue(value.leftContent_opacity_in, currentYOffset);
                obj.leftContent.style.transform = `translate3d( ${calcValue(value.leftContent_transformX_in, currentYOffset)}%,0, 0)`;
                obj.leftHorizon.style.width = `${calcValue(value.left_horizon_line, currentYOffset)}vw`;
                obj.leftVertical.style.width = `${calcValue(value.left_vertical_line, currentYOffset)}vw`;
            } else {
                obj.leftContainer.style.display = "none";
            }

            if (scrollRatio > 0.2) {
                obj.rightContainer.style.display = "block";

                //rightContent
                obj.rightContent.style.opacity = calcValue(value.rightContent_opacity_in, currentYOffset);
                obj.rightContent.style.transform = `translate3d( ${calcValue(value.leftContent_transformY_in, currentYOffset)}%,0, 0)`;
                obj.rightHorizon.style.width = `${calcValue(value.right_horizon_line, currentYOffset)}vw`;
                obj.rightVertical.style.width = `${calcValue(value.right_vertical_line, currentYOffset)}vw`;
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
                textStartPoint, obj.canvas.height - blendHeight, obj.canvas.width, blendHeight
            );
            //Text 블랜딩
            value.canvasText[0] = obj.canvas.height + 100;
            value.canvasText[1] = obj.canvas.height / 2 - 100;

            function makeText(positionX, contfont, subfont, margin) {
                let positionY = calcValue(value.canvasText, currentYOffset);
                const TextArr = ["따스한 온기를 전달하여 ", "고요한 무드로 이끌어주는 ", "바디 오일 "];
                obj.context.font = `${contfont}vw 'Black Han Sans'`;

                TextArr.map((i) => {
                    obj.context.fillStyle = "white";
                    obj.context.textAlign = "center";
                    obj.context.fillText(i, positionX, positionY, window.innerWidth);
                    positionY += margin;
                })
                obj.context.font = `${subfont}vw 'Black Han Sans'`;
                obj.context.fillText("서런 바디오일 라벤터 & 마조람", positionX, positionY + 30);

            }





            //태블릿 이상 대비 블랜딩
            if (window.innerWidth < 768) {
                makeText(obj.canvas.width / 2, 10, 7, 50);
            } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                makeText(obj.canvas.width / 2, 10, 5, 100);
            } else if (window.innerWidth >= 1024 && window.innerWidth < 1920) {
                obj.context.drawImage(obj.imgs[1],
                    0, 1500 - blendHeight, obj.canvas.width / 2, blendHeight,
                    0, obj.canvas.height - blendHeight, obj.canvas.width / 2, blendHeight
                );
                obj.context.fillStyle = 'rgb(180,141,98)';
                obj.context.fillRect(
                    obj.canvas.width / 2, obj.canvas.height - blendHeight, obj.canvas.width / 2, blendHeight
                )
                makeText(obj.canvas.width * 0.7, 4, 2, 80);
                // obj.context.fillStyle = "white";
                // obj.context.font = "5vw 'Black Han Sans'";
                // obj.context.textAlign = "center";
                // obj.context.fillText("따스한 온기를 전달하여 ", canvasTextPosition, calcValue(value.canvasText, currentYOffset));
                // obj.context.fillText("고요한 무드로 이끌어주는 ", canvasTextPosition, calcValue(value.canvasText, currentYOffset) + 60);
                // obj.context.fillText("바디 오일 ", canvasTextPosition, calcValue(value.canvasText, currentYOffset) + 120);
                // obj.context.font = "3vw 'Black Han Sans'"
                // obj.context.fillText("서런 바디오일 라벤터 & 마조람", canvasTextPosition, calcValue(value.canvasText, currentYOffset) + 220);
            } else {
                obj.context.drawImage(obj.imgs[1],
                    0, 1500 - blendHeight, obj.canvas.width / 2, blendHeight,
                    0, obj.canvas.height - blendHeight, obj.canvas.width / 2, blendHeight
                );
                obj.context.fillStyle = 'rgb(180,141,98)';
                obj.context.fillRect(
                    obj.canvas.width / 2, obj.canvas.height - blendHeight, obj.canvas.width / 2, blendHeight
                )
                makeText(obj.canvas.width * 0.75, 4, 2, 100);
            }

            //블랜딩 후
            if (scrollRatio > value.canvasblendImage[2].end + 0.05) {
                const moveheight = `${(value.canvasblendImage[2].end + 0.05) * scrollHeight}`;
                obj.canvasContainer.classList.remove(FIXED);
                obj.canvasContainer.style.top = `${moveheight}px`;

            }


    }
}