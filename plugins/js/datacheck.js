export default ({app}, inject) => {
    /**
     * 검색 리스트의 title, detail 내의 검색어 하이라이트
     * arr 데이터 리스트
     * keyword 검색어
     */
    inject('findkeyword', (arr, keyword) => {
        return arr.map(item => {
            item.dt_title = regExp_test(item.dt_title, keyword);
            item.dt_detail = regExp_test(item.dt_detail, keyword);
            return item;
        });
    })
    /**
     * 검색 리스트의 title내의 검색어 하이라이트 (링크데이터용)
     * arr 데이터 리스트
     * keyword 검색어
     */
    inject('findTitlekeyword', (arr, keyword) => {
        return arr.map(item => {
            // item.lnk_title = item.lnk_title.replace("(?i)"+keyword,"<span>"+keyword+"</span>");
            item.lnk_title = regExp_test(item.lnk_title, keyword);
            return item;
        })
    })

}

function  regExp_test(str, keyword){
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