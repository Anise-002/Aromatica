
const STICKY = 'sticky';
const NORMAL = 'normal';
const FULLHEIGHT = "fullheight";

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
            messageC: document.querySelector('#section-0 .c'),
            messageD: document.querySelector('#section-0 .d'),
            canvas: document.querySelector('#video-canvas-0'),
            context: document.querySelector('#video-canvas-0').getContext('2d'),
            videoImg: []
        },
        value: {
            //cavas
            videoImgCount: 213,
            imageSequence: [1, 212],
            canvas_opacity: [1, 0, { start: 0.95, end: 1 }],
            //a
            a_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
            a_translateX_in: [-100, 0, { start: 0.1, end: 0.2 }],
            a_opacity_out: [1, 0, { start: 0.2, end: 0.3 }],
            a_translateY_out: [0, -100, { start: 0.2, end: 0.3 }],
            //b
            b_opacity_in: [0, 1, { start: 0.45, end: 0.55 }],
            b_translateY_in: [-100, 0, { start: 0.45, end: 0.55 }],
            b_opacity_out: [1, 0, { start: 0.55, end: 0.7 }],
            b_translateY_out: [0, 100, { start: 0.55, end: 0.7 }],
            //c
            c_opacity_in: [0, 1, { start: 0.7, end: 0.85 }],
            c_translateY_in: [100, 0, { start: 0.7, end: 0.85 }],
            c_opacity_out: [1, 0, { start: 0.85, end: 0.88 }],
            c_translateY_out: [0, -100, { start: 0.85, end: 0.88 }],
            //d
            d_opacity_in: [0, 1, { start: 0.88, end: 0.93 }],
            d_translateY_in: [-100, 0, { start: 0.88, end: 0.93 }]

        }

    },
    {
        //1
        type: FULLHEIGHT,
        heightNum: 2,
        scrollHeight: 0,
        obj: {
            container: document.querySelector('#section-1'),
            titleCon: document.querySelector('#section-1 .title-text'),
            title: document.querySelector('#section-1 .title-text h2'),
            subTitle: document.querySelector('#section-1 .title-text p'),
            button: document.querySelector('#section-1 .title-text .button')
        },
        value: {
            //container
            container_opacity_out: [1, 0, { start: 0.8, end: 0.9 }],
            //titleCon
            title_opacity_in: [0, 1, { start: 0.1, end: 0.3 }],
            title_translateY_in: [-150, 0, { start: 0.1, end: 0.3 }],
            //subTitle
            subTitle_opacity_in: [0, 1, { start: 0.2, end: 0.4 }],
            subTitle_translateY_in: [-150, 0, { start: 0.2, end: 0.4 }],
            //button
            button_opacity_in: [0, 1, { start: 0.4, end: 0.6 }],
            button_translateY_in: [-150, 0, { start: 0.4, end: 0.6 }],
        }
    },
    {
        //2
        type: STICKY,
        heightNum: 6,
        scrollHeight: 0,
        obj: {
            container: document.querySelector('#section-2'),
            ContContainer: document.querySelector('#section-2 .container1'),
            //leftContent
            leftContainer: document.querySelector('#section-2 .left-text'),
            leftContent: document.querySelector("#section-2 .left-text p"),
            leftHorizon: document.querySelector("#section-2 .left-text .horizon"),
            leftVertical: document.querySelector("#section-2 .left-text .vertical"),
            //rightContent
            rightContainer: document.querySelector('#section-2 .right-text'),
            rightContent: document.querySelector("#section-2 .right-text p"),
            rightHorizon: document.querySelector("#section-2 .right-text .horizon"),
            rightVertical: document.querySelector("#section-2 .right-text .vertical"),
            //concept_text
            conceptText: document.querySelector('#section-2 .concept-text-container'),
            //bottomContent
            bottomContent: document.querySelector('#section-2 .bottom-content-text')

        },
        value: {
            //container
            container_translateY: [],
            sectionPaddingTop: 50,
            paddingFixedTop: 40,
            container_opacity_in: [0,1, {start : 0 , end : 0.25}],
            //leftContent
            leftContent_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
            leftContent_transformX_in: [-50, 0, { start: 0.3, end: 0.4 }],
            left_horizon_line: [0, 0, { start: 0.2, end: 0.25 }],
            left_vertical_line: [0, 0, { start: 0.25, end: 0.3 }],

            //rightContent
            rightContent_opacity_in: [0, 1, { start: 0.45, end: 0.55 }],
            leftContent_transformY_in: [50, 0, { start: 0.45, end: 0.55 }],
            right_horizon_line: [0, 14.7, { start: 0.35, end: 0.4 }],
            right_vertical_line: [0, 8, { start: 0.4, end: 0.45 }],

            //conceptText
            conceptText_opacity_in: [0, 1, { start: 0.55, end: 0.65 }],
            conceptText_translateY_in: [50, 0, { start: 0.55, end: 0.65 }],

            //bottomContent
            bottomContent_opacity_in: [0, 1, { start: 0.65, end: 0.75 }],
            bottomContent_translateY_in: [50, 0, { start: 0.65, end: 0.75 }],
        }
    },
    {
        //3
        type: STICKY,
        heightNum: 4,
        scrollHeight: 0,
        imageCount: 2,
        obj: {
            container: document.querySelector('#section-3'),
            h2: document.querySelector("#section-3 h2"),
            textContainer: document.querySelector('#section-3 .text-container'),
            canvasContainer: document.querySelector("#section-3 .sticky-canvas"),
            canvas: document.querySelector('#video-canvas-1'),
            backgroundCanvas : document.querySelector('#background-1'),
            context: document.querySelector("#video-canvas-1").getContext('2d'),
            backgroundContext : document.querySelector('#background-1').getContext('2d'),
            canvasImgpath: ["./img/2.jpg", "./img/3.jpg"],
            imgs: [],

        },
        value: {
            textContainer_Y: [0, 0, { start: 0, end: 1 }],
            canvasblendImage: [0, 0, { start: 0, end: 0 }],
            canvasText: [0, 0, { start: 0, end: 0.6 }],
        }
    },
    {
        //4
        type: NORMAL,
        heightNum: 3,
        scrollHeight: 0,
        obj: {
            container: document.querySelector('#section-4'),
        },
    },
    {
        //5
        type: NORMAL,
        heightNum: 2,
        scrollHeight: 0,
        obj: {
            container: document.querySelector('#section-5'),

        },
    },
    {
        //6
        type: STICKY,
        heightNum: 7,
        scrollHeight: 0,
        obj: {
            container: document.querySelector('#section-6'),
            messageA : document.querySelector('#section-6 .text_a'),
            messageB : document.querySelector('#section-6 .text_b'),
            messageC : document.querySelector('#section-6 .text_c'),
            messageD : document.querySelector('#section-6 .text_d'),
            canvasContainer : document.querySelector('#section-6 .sticky-canvas'),
            backgroundCanvas : document.querySelector('#background-2'),
            canvas: document.querySelector('#video-canvas-2'),
            backgroundContext : document.querySelector('#background-2').getContext('2d'),
            context: document.querySelector("#video-canvas-2").getContext('2d'),
            videoImg: [],

        },
        value :{
            videoImgCount : 405,
            imageSequence : [0, 404,{start : 0, end : 1}],
            canvas_opacity : [1, 0,{start : 0.7, end : 0.9}],
            //a
            a_opacity_in: [0, 1, { start: 0.05, end: 0.15 }],
            a_translateY_in: [100, 0, { start: 0.05, end: 0.15 }],
            a_opacity_out: [1, 0, { start: 0.15, end: 0.2 }],
            a_translateY_out: [0, -100, { start: 0.15, end: 0.2 }],
            //b
            b_opacity_in: [0, 1, { start: 0.2, end: 0.3 }],
            b_translateY_in: [100, 0, { start: 0.2, end: 0.3 }],
            b_opacity_out: [1, 0, { start: 0.3, end: 0.4 }],
            b_translateY_out: [0, -100, { start: 0.3, end: 0.4 }],
            //c
            c_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
            c_translateY_in: [100, 0, { start: 0.5, end: 0.6 }],
            c_opacity_out: [1, 0, { start: 0.6,end: 0.7}],
            c_translateY_out: [0, -100, { start:0.6, end:0.7 }],
            //d
            d_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
            d_translateY_in: [-100, 0, { start: 0.7, end: 0.8 }],
            d_opacity_out: [1, 0, { start: 0.8,end: 0.85}],
            d_translateY_out: [0, -100, { start:0.8, end:0.85 }],
            
        }
    },
    {
        //7
        type: STICKY,
        heightNum: 3,
        scrollHeight: 0,
        obj: {
            container: document.querySelector('#section-7'),
            conContainer : document.querySelector('#section-7 .con-container'),
            svg : document.querySelector('#section-7 .svg-container svg'),
            svgPath : document.querySelector('#section-7 .svg-container svg path'),
            dolpinTool : document.querySelector('#section-7 .img_dolpin_tool'),
            title : document.querySelector('#section-7 h2'),
            imageA : document.querySelector('#section-7 .img1'),
            imageB : document.querySelector('#section-7 .img2'),
            imageC : document.querySelector('#section-7 .img3'),
            messageA : document.querySelector('#section-7 .text1'),
            messageB : document.querySelector('#section-7 .text2'),
            messageC : document.querySelector('#section-7 .text3'),
        },
        value : {
            svgObjcet_draw : [8098, 0, {start : 0, end : 0.8}],
            //dolpinTool
            dolpinTool_width : [0, 0, {start : 0.85, end : 1}],
            dolpinTool_translateY : [-50, 0, {start : 0.85, end : 1}],
            dolpinTool_translateX : [-50, 0, {start : 0.85, end : 1}],
            dolpinTool_opacity : [0, 1, {start : 0.9, end : 1}],
            dolpinTool_rotate : [0, 360, {start : 0.85, end : 1}],
            //titie
            title_opacity : [0, 1, {start : 0.08, end : 0.21}],
            title_translateY : [20, 0, {start : 0.08, end : 0.21}],
            //A
            imageA_opacity : [0, 1, {start : 0.17, end : 0.3}],
            imageA_translateY: [20, 0, {start : 0.17, end : 0.3}],
            messageA_opacity : [0, 1, {start :0.3, end : 0.43}],
            messageA_translateY: [20, 0, {start : 0.3, end : 0.43}],
            //B
            imageB_opacity : [0, 1, {start : 0.43, end : 0.56}],
            imageB_translateY: [20, 0, {start : 0.43, end : 0.56}],
            messageB_opacity : [0, 1, {start :0.56, end : 0.69}],
            messageB_translateY: [20, 0, {start : 0.56, end : 0.69}],
            //C
            imageC_opacity : [0, 1, {start : 0.55, end : 0.68}],
            imageC_translateY: [40, 0, {start : 0.55, end : 0.68}],
            messageC_opacity : [0, 1, {start :0.68, end : 0.71}],
            messageC_translateY: [40, 0, {start : 0.68, end : 0.71}],
        }
    },
    {
        //8
        type: STICKY,
        heightNum: 5,
        scrollHeight: 0,
        imageCount: 4,
        obj: {
            container: document.querySelector('#section-8'),
            textContainer : document.querySelector('#section-8 .text-container'),
            canvasContainer : document.querySelector('#section-8 .sticky-canvas'),
            backgroundCanvas : document.querySelector('#background-3'),
            canvas: document.querySelector('#video-canvas-3'),
            backgroundContext : document.querySelector('#background-3').getContext('2d'),
            context: document.querySelector("#video-canvas-3").getContext('2d'),
            canvasImgpath: ["./img/11.jpg", "./img/12.jpg","./img/13.jpg","./img/14.jpg"],
            imgs: [],

        },
        value : {
            canvasblendImage: [0, 0, { start: 0, end: 0}],
            textContainer_Y : [50, 0, {start : 0, end : 0}],
            textContainer_opacity :[0,1, {start : 0, end : 0}]
        }
    },
    {
        //9
        type: STICKY,
        heightNum: 5,
        scrollHeight: 0,
        obj: {
            container: document.querySelector('#section-9'),
            conContainer : document.querySelector('#section-9 .con-container'),
            svgPath : document.querySelector('#section-9 .svg-container svg path'),
            title : document.querySelector('#section-9 .content-wrap h2'),
            text : document.querySelector('#section-9 .content-wrap p'),
            imageWrap : document.querySelector('#section-9 .content-wrap .imgs-wrap'),
            image_1 : document.querySelector('#section-9 .imgs-wrap .circle-img'),
            image_2 : document.querySelector('#section-9  .imgs-wrap .pet-img'),
        },
        value : {
            svgObjcet_draw : [4412, 0, {start : 0, end : 0}],
            title_opacity : [0, 1,{start : 0.2, end : 0.3}],
            title_translateY : [100, 0,{start : 0.2, end : 0.3}],
            text_opacity : [0, 1,{start : 0.35, end : 0.45}],
            text_translateY : [100, 0,{start : 0.35, end : 0.45}],
            image_1_opacity : [0, 1,{start : 0.6, end : 0.7}],
            image_1_translateY : [50, 0,{start : 0.6, end : 0.7}],
            image_2_opacity : [0, 1,{start : 0.7, end : 0.8}],
            image_2_translateY : [20, 0,{start : 0.7, end : 0.8}],
        }
    }
];