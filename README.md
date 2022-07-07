# Aromatica  - interactive web site

## 프로젝트 목적
1. `애플사이트의 인터랙션을 구현과 여러가지 인터랙션 효과 공부`를 목적으로 만들어진 사이트입니다.
2. 라이브러리를 사용하지 않고, `javascript로만`으로 구현되었습니다.
3. `반응형 웹사이트`로 제작 되었습니다. 

## [✨ Project Demo](https://anise-002.github.io/Aromatica/)

## Project Preview 
<div class='img-flex'>
    <img class='pc' src='./img/site-preview.gif' width='70%'>
    <img class='mobile' src='./img/site-preview-mobile.gif' width = '20%'>
</div>

<br>
<br>

## 프로젝트 주요 기능
### 1. 스크롤에 따라 움직이 요소들
#### 배열에 각 section별 데이터를 가진 객체 생성
```javascript
const scenInfo = [
    {
        //0
        type: STICKY,
        heightNum: 5,
        scrollHeight: 0,
        imageCount: 213,
        obj: {
            container: document.querySelector('#section-0'),
            messageA: document.querySelector('#section-0 .a'),
            messageB: document.querySelector('#section-0 .b'),
           ....
        },
        value: {
            //cavas
            videoImgCount: 213,
            imageSequence: [1, 212],
            canvas_opacity: [1, 0, { start: 0.95, end: 1 }],
        ....
    }
    },
]
```
배열의 index를 이용해 각 section의 알맞은 데이터값을 저장합니다.

#### 스크롤에 맞춰 변화되는 값을 반환해주는 함수
```javascript
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
```
`calcValue`함수를 통해 각 섹션별 스크롤의 비율을 구해 그에 알맞은 인터랙션의 타이밍과 css의 style요소의 값을 변화시켜 적용된 요소의 인터랙션을 부여합니다.

+ `value` : 각 요소가 가지고 있는 변화값, 타이밍을 가지고 있는 객체 요소
+ `currentYOffset` : 현재 section에서의 window.pageYOffset의 값을 비율로 나타내는 값

#### switch문을 이용한 section 움직임 제어
```javascript
switch (currentScene) {
        case 0:
            //canvas
            let sequence = Math.round(calcValue(value.imageSequence, currentYOffset));
            if (sequence < 0 || sequence > 212) return;
            obj.context.drawImage(obj.videoImg[sequence], 0, 0);
            obj.canvas.style.opacity = calcValue(value.canvas_opacity, currentYOffset);
            ....
            //messageD
            obj.messageD.style.opacity = calcValue(value.d_opacity_in, currentYOffset);
            obj.messageD.style.transform = `translate3d(0, ${calcValue(value.d_translateY_in, currentYOffset)}%, 0)`;
        break;
        case 1:
            obj.container.style.opacity = calcValue(value.container_opacity_out, currentYOffset);
            .....
            //scenInfo[2] - contContainer 효과 지정
            scenInfo[2].obj.ContContainer.style.opacity = 0;
        break;
            ....
}
```
### 2. Canvas를 이용한 부드러운 이미지 랜더링
```javascript
function setCanvasImage() {
    let imgElem;
    for (let i = 1; i < scenInfo[0].value.videoImgCount + 1; i++) {
        imgElem = new Image();
        if (i < 10) i = `00${i}`;
        if (i >= 10 && i < 100) i = `0${i}`;
        imgElem.src = `./video/1/${i}.jpg`;
        scenInfo[0].obj.videoImg.push(imgElem);
    }
    ....
}
``` 
이미지를 canvas에 랜더링 하기 위해 이미지 객체를 담습니다.
```javascript
obj.context.drawImage(obj.videoImg[sequence], 0, 0);
```
canvas의 context(`canvas.getContext('2d')`)에 `drawImage()`를 이용해 캔버스에 이미지를 그려줍니다.
```javascript
let sequence = Math.round(calcValue(value.imageSequence, currentYOffset));
```
`calcValue함수`를 이용해 스크롤에 따른 변화되는 값을 이용합니다.
이미지가 캔버스에 유동적으로 변화하여, 이미지가 스크롤함에 따라 변화됩니다.


### 3. nav click 이벤트
```javascript
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
```
상단의 메뉴의 버튼을 클릭했을 경우, <br>
사이드 메뉴가 나타나며 사이트메뉴의 닫힘버튼을 클릭했을 때 사이드 메뉴가 사라지도록 sideMenu의 `show`클래스를 유동적으로 제어할 수 있는 `classList.toggle`를 이용하여 구현하였습니다.

<br>
<br>

## 개선사항
1. section의 canvas가 `position:fixed`가 될때, canvas가 지정한 위치보다 위로 올라갔다 제자리를 찾는 오류를 발견했습니다.
      + `position:sticky`를 이용하는 방법을 시도 요망

2. 각 section의 인터랙션의 흐름의 스피드가 각기 다름으로서 사용자가 느끼기에 안정적이지 않은 느낌은 줍니다.
3. 로그인 기능과 API를 이용할 수 있는 사이드 프로젝트를 만들어 실제 사용되는 사이트처럼 구현하여 보충하도록 합니다.

<br>
<br>

## 프로젝트를 통해 알게 된 것
+ 브라우저의 스크롤과 HTML 구조의 관계 이해 
+ 스크롤에 따른 인터랙티브한 움직임
+ 배열을 이용한 데이터 관리
+ canvas, svg의 기초
+ 반응형 웹사이트 이해
+ [`position:fixed` 오류 이슈 대응](https://stackoverflow.com/questions/27612691/html-position-fixed-error), [2](https://zeronines.tistory.com/163)
+ 

이번 프로젝트를 하면서, 스크롤을 이용해 인터랙티브한 모션을 익힐 수 있었습니다. 
인터랙티브한 웹사이트를 만들때에는 HTML의 구조와 스크롤의 관계를 이해해야 하는점, 그리고 그것을 함수의 계산식으로 표현해야 하는 점을 배울수 있었습니다. 또한 각 요소들의 데이터를 배열을 이용해 관리함으로서, 일일이 찾지 않고, 간결하게 데이터 값을 찾는 방법에 대해 배우고, 고민하는 시간이었습니다. 다음 프로젝트에는 `position:sticky`를 이용한 프로젝트를 만들어, 현재 프로젝트의 오류를 해결할 수 있는지 확인해보고 싶습니다.

