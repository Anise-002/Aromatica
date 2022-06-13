
const STICKY = 'sticky';
const NORMAL = 'normal';

const scenInfo = [
    {
        //0
        type: STICKY,
        heightNum : 5,
        scrollHeight : 0,
        imageCount : 213,
        obj : {
            container :document.querySelector('#section-0'),
            messageA: document.querySelector('#section-0 .a'),
            messageB: document.querySelector('#section-0 .b'),
            messageC: document.querySelector('#section-0 .c'),
            messageD: document.querySelector('#section-0 .d'),
            canvas : document.querySelector('#video-canvas-0'),
            context : document.querySelector('#video-canvas-0').getContext('2d'),   
            videoImg : []
        },
        value :{
            //cavas
            videoImgCount : 213,
            imageSequence : [1, 212],
            canvas_opacity : [1, 0,{start : 0.97, end : 1}],
            //a
            a_opacity_in : [0,1,{start : 0.1, end : 0.2}],
            a_translateX_in : [-100,0,{start : 0.1, end : 0.2}],
            a_opacity_out : [1,0,{start : 0.2, end : 0.3}],
            a_translateY_out : [0,-100,{start : 0.2, end : 0.3}],
            //b
            b_opacity_in : [0,1,{start : 0.45, end : 0.55}],
            b_translateY_in : [-100,0,{start : 0.45, end : 0.55}],
            b_opacity_out : [1,0,{start : 0.55, end : 0.7}],
            b_translateY_out : [0,100,{start : 0.55, end : 0.7}],
            //c
            c_opacity_in : [0,1,{start : 0.7, end : 0.85}],
            c_translateY_in : [100,0,{start : 0.7, end : 0.85}],
            c_opacity_out : [1,0,{start : 0.85, end : 0.88}],
            c_translateY_out : [0,-100,{start : 0.85, end : 0.88}],
            //d
            d_opacity_in : [0,1,{start : 0.88, end : 0.93}],
            d_translateY_in : [-100,0,{start : 0.88, end : 0.93}]

        }
        
    },
    {
        //1
        type: NORMAL,
        heightNum : 3,
        scrollHeight : 0,
        obj : {
            container :document.querySelector('#section-1'),
        },        
    },
    {
        //2
        type: NORMAL,
        heightNum : 2,
        scrollHeight : 0,    
        obj : {
            container :document.querySelector('#section-2'),
        },        
    },
    {
        //3
        type: STICKY,
        heightNum : 2,
        scrollHeight : 0,   
        obj : {
            container :document.querySelector('#section-3'),
        },         
    },
    {
        //4
        type: NORMAL,
        heightNum : 2,
        scrollHeight : 0,
        obj : {
            container :document.querySelector('#section-4'),
        },         
    },
    {
        //5
        type: NORMAL,
        heightNum : 2,
        scrollHeight : 0,  
        obj : {
            container :document.querySelector('#section-5'),
        },          
    },
    {
        //6
        type: STICKY,
        heightNum : 2,
        scrollHeight : 0,
        obj : {
            container :document.querySelector('#section-6'),
        },            
    },
    {
        //7
        type: NORMAL,
        heightNum : 2,
        scrollHeight : 0,  
        obj : {
            container :document.querySelector('#section-7'),
        },          
    },
    {
        //8
        type: STICKY,
        heightNum : 2,
        scrollHeight : 0,   
        obj : {
            container :document.querySelector('#section-8'),
        },         
    },
    {
        //9
        type: NORMAL,
        heightNum : 2,
        scrollHeight : 0,      
        obj : {
            container :document.querySelector('#section-9'),
        },      
    }
];