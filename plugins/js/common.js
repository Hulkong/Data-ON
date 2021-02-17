import Vue from 'vue'
/**
 * 입력된 문장을 정해진 부분만큼 자르기
 * @param {*} text 자를 문장
 * @param {*} str 잘린 text뒤에 붙일 문장
 * @param {*} len 완성된 문장의 길이
 * @param {*} start 자르기 시작할 부분의 index
 */
Vue.prototype.$cutText = (text, str, len, start=0) => {
    if(text && text.length >= (len+start)) return text.substr(start,len) + str;
    // else if (start > 0) return "";
    else return text;
    
}
/**
 * String to Date
 * @param {*} date 자를 문장 (날짜로 표현할 text)
 */
Vue.prototype.$stringToDate = (date) => {
    var separator = ['년','월','일'];
    if(!date) return "";
    
    var result ="";
    var dArr = [];
    dArr.push(date.substr(0,4));
    dArr.push(date.substr(4,2));
    dArr.push(date.substr(6,2));
    
    dArr.map((dd,index) => {
        if(dd != '00') result += dd + separator[index]+" ";
    });

    return result;
}

/**
 * string to Date format
 * @param {*} date  날짜 string
 * @param {*} separator 날짜 사이의 구분값
 */
Vue.prototype.$dateFormat = (date, separator) => {
    if(!date) return "";
    let result = [];
    let dateStr = new Date(date);
    
    result.YYYY = dateStr.getFullYear();
    result.MM = dateStr.getMonth() + 1;
    if(Number(result.MM) < 10) result.MM = "0"+result.MM;
    result.DD = dateStr.getDate();
    if(Number(result.DD) < 10) result.DD = "0"+result.DD;

    if(separator)
        return Object.keys(result).map((key)=> result[key]).join(separator);
    
    else return result;
}

/**
 * string to Date format
 * @param {*} date  날짜 string
 */
Vue.prototype.$dateFormat2 = (date) => {
    if(!date) return "";
    let result = [];
    let dateStr = new Date(date);

    result.YYYY = dateStr.getFullYear();
    result.MM = dateStr.getMonth() + 1;
    if(Number(result.MM) < 10) result.MM = "0"+result.MM;
    result.DD = dateStr.getDate();
    if(separator) return Object.keys(result).map((key)=> result[key]).join(separator);
    else return result;
}

/**
 * 3자리마다 콤마찍기
 * @param {*} num 
 */
Vue.prototype.$setComma = (num) => {
    if(typeof num == 'number')
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else
        return num;
}

/**
 * 데이터 정렬
 * @param {*}} data 
 * @param {*} column 
 * @param {*} order 
 */
Vue.prototype.$dataSort = (data, column, order) => {
    
}

/**
 * 두 배열에 대한 정렬
 * @param {*} allList  전체 리스트
 * @param {*} allId    전체 리스트의 비교 변수 명
 * @param {*} selList  선택 리스트
 * @param {*} selId    선택 리스트의 비교 변수 명
 */
Vue.prototype.$twoArrSort = (allList, allId, selList, selId) => {
    let selArr = [];
    let otherArr = [];
    allList.map(allItem => {
        var onSel = true;
        if(selList !== undefined && selList.length > 0){

            selList.map(selItem => {
                if(selId){
                    if(allItem[allId] == selItem[selId]){
                        selArr.push(allItem);
                        onSel = false;
                    }   
                }else{
                    if(allItem[allId] == selItem){
                        selArr.push(allItem);
                        onSel = false;
                    }   
                }
            });

            if(onSel) otherArr.push(allItem);
        } else {
            otherArr = allList;
        }
    });

    return {'selArr': selArr, 'otherArr': otherArr};
}

/**
 * 바이트 단위 계산
 * @param {*} num byte 단위 숫자
 */
Vue.prototype.$setByteUnit = (num=0) => {
    var unit = ['Btye', 'KB', 'MB', 'GB']
    var index = 0;
    var value = num;
    while (value > 1024){
        value = value / 1024;
        index++;
    }
    return (Math.round(value*10)/10)+unit[index];
}
/**
 * draggable 함수
 * @param {*} elmnt 움직일 div 
 */
Vue.prototype.$dragElement = (elmnt, handler) => {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0; 
    var defaultTop = elmnt.offsetTop, defaultLeft = elmnt.offsetLeft;
    handler.onmousedown = dragMouseDown; 
    
    function dragMouseDown(e) { 
        e = e || window.event; 
        e.preventDefault(); 
        pos3 = e.clientX; 
        pos4 = e.clientY; 
        document.onmouseup = closeDragElement; 
        document.onmousemove = elementDrag; 
    } 

    function elementDrag(e) { 
        e = e || window.event; 
        e.preventDefault(); 
        pos1 = pos3 - e.clientX; 
        pos2 = pos4 - e.clientY; 
        pos3 = e.clientX; 
        pos4 = e.clientY; 
        
        elmnt.style.top = (elmnt.offsetTop - defaultTop - pos2) + "px"; 
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"; 
    } 

    function closeDragElement() { 
        document.onmouseup = null; 
        document.onmousemove = null; 
        // console.log("현재 요소의 위치 y는 " + elmnt.offsetTop +", x는" + elmnt.offsetLeft + "입니다."); 
    }
}
/**
 * nicescroll 적용
 * @param {*} elmnt 스크롤 넣을 요소
 */
Vue.prototype.$setNiceScrolls = (elmnt) => {
    if(!elmnt.getNiceScroll(0)){
        elmnt.niceScroll({
            cursorcolor:"#707070",
            autohidemode:false,
            cursoropacitymax:0.7,
            boxzoom:false,
            touchbehavior:false,
            cursorminheight:60,
            cursorfixedheight:60
        }).resize();
    }
}

/**
 * 좌우 슬라이더 스크롤 (top filter list)
 * @param {*} elmnt         슬라이드를 넣을 요소
 * @param {*} customOption  특별 옵션
 */
Vue.prototype.$setSlider = (elmnt, customOption) => {
    
    let option = {
        items: 1,      
        autoHeight:false,
        loop: false,   
        margin: 10,    
        mouseDrag: true, 
        touchDrag: true, 
        nav:true,   
        autoplay: false,  
        dots:true,      
        smartSpeed: 600,
        autoplayTimeout: 4000,  
        autoplayHoverPause: false, 
        autoWidth:false, 
    }
    if(customOption) option = Object.assign(option, customOption);
    elmnt.owlCarousel(option);
}

/**
 * 파일 다운로드
 * @param {*} files     파일 리스트 or 파일 맵
 * @param {*} callback  다운로드 수 증가 함수
 */
Vue.prototype.$downloadFile = (files, callback) => {
    
    if(!files || files.length == 0){
        alert("준비중입니다.");
        return false;
    } 
    
    let downlowdType = "csv,zip,xml,json,xlsx";  // 다운로드 가능한 파일 확장자 정리
    
    try{
        if(Array.isArray(files)){
            let fileObj = files.filter(
                item => downlowdType.indexOf(item.file_ext) > -1
            ).map(
                file => { 
                    if(file.dt_download_yn){
                        downFile(file.origin_nm, file.file_path)
                        //다운로드 수 ++
                        if(callback) callback(file);
                    }
                }
            );
        }else if (typeof files == 'object'){
            downFile(files.origin_nm, files.file_path);
            // 다운로드 수 ++
            if(callback) callback(files);
        }
    }catch(e){
        console.log(e);
    }
    
    function downFile(file, url){
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file); 
        document.body.appendChild(link);
        link.click();
        
    }
    
    
}
/**
 * url 복시 ( 클립보드 복사 )
 * @param {*} id 글번호
 */
Vue.prototype.$clipBoardCopy = (id) => {
    let copyElem = document.createElement('input');
        copyElem.setAttribute('type', 'text');  
        if(id) copyElem.value = window.location.href + "&id=" + id;
        else copyElem.value = window.location.href;
        document.body.appendChild(copyElem);

        copyElem.select();
        document.execCommand("copy"); // 클립보드에 복사합니다.
        document.body.removeChild(copyElem);
        alert("URL이 클립보드에 복사되었습니다");
}

/**
 * 맨위로 이동
 */
Vue.prototype.$scrollToTop = () => {
    $("body, html").animate({
              scrollTop: 0
    }, 500);
}
    



Vue.prototype.$trim = (str) => {
    if(str)
        return str.replace(/^\s+|\s+$/g,"");
    else    
        return str;
}

/**
 * 검색어 유효성 검사 (custom)
 * @param {*} keyword         검색어
 */
Vue.prototype.$validateLen = (keyword, min, max) => {
    var result = {'status': true, 'message': '검색'}
    if(!keyword){
        result.status = false;
        result.message = "검색어를 입력해주세요.";
    }
    // 검색어 최소 2자에서 최대 50자까지
    if(keyword && keyword.length < min){
        result.status = false;
        result.message = "검색어를 "+min+"자 이상 입력해주세요.";
    } 
    if(keyword && keyword.length > max){
        result.status = false;
        result.message = "검색어를 "+max+"자 이하로 입력해주세요.";
    }
    
    return result;
}

/**
 * 필터 값들의 파라미터화
 * @param {*} item 필터array 
 */
Vue.prototype.$makeParam = (item) => {
    Object.keys(item).map((key)=>{
        if(key.indexOf('dt_') == 0){
            if(item[key].length > 0 && typeof item[key] != 'string'){ 
                item[key] = item[key].map(obj => obj).join(',');
            }
        }
    });

    return item;
}

/**
 * 키워드 하이라이트
 * @param {*} str 문구
 * @param {*} keyword 키워드
 */
Vue.prototype.$regExpText = (str, keyword) => {
    var regExp = /[\{\}\[\]V?.,;:|\)*~`~^\-+<>@\#$%&\\\=\(\'\"]/g;
    if(regExp.test(keyword)){    // 특수문자 있을 경우 치환
        return str.replace(keyword,"<span>"+keyword+"</span>");
    } else {                     // 특수문자 없을 경우
        var result = "";
        var reg = new RegExp(keyword, "gi");

        var indices = [];
        var elemn =[];
        while ( (elemn = reg.exec(str)) ) {
            indices.push(elemn.index);
        }

        for(var i = 0; i < str.length; i++){
            if(indices.includes(i)) result += "<span>";
            else if(indices.includes((i-keyword.length))) result += "</span>"
            
            result += str[i];
        }
        

        return result;
    }
}

/**
 * 구글 애널리틱스 이벤트 
 * @param {*} cate 
 * @param {*} act 
 * @param {*} label 
 * @param {*} value 
 */
Vue.prototype.$sendGA = (app, cate, act, label, value) => {
    app.$gtag('event', act,{
        event_category: cate,
        event_label: label,
        value: value
    });
}


Vue.prototype.$deviceChk = () => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
    else return false;
}


Vue.prototype.$markToHtml = (text) => {
    var html = text;
    
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        headerIds: false,
        tables: true,
        breaks: true,
        pedantic: false,
        smartLists: true,
        smartypants: false
    });
    if( typeof html !== 'undefined' && html !== null && html) html = marked(html);
    
    return html;
}