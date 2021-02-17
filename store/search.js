export const state = () => ({
    loading: false,          // 화면 로딩 on/off
    mobileOrderBoxOn: false,    // (모바일) 정렬순 선택 박스  on/off
    mobileFilterOn: false,    // (모바일) 정렬순 선택 박스  on/off
    searchOption: { // 검색에 필요한 옵션들
        url: '/api/datalists',
        param: {
            keyword: '',                // 검색어
            search_type:'title',        // 카테고리 (title: 데이터명, detail: 데이터설명, column: 컬럼)
            dt_type: [],                // 파일형식 선택
            dt_range: [],               // 최소단위 선택
            dt_category: [],            // 분야 선택
            dt_organ: [],               // 제공기관 선택
            dt_col: [],              // 컬럼 선택 (??)
            orderby_list: 'accuracy',   // 정렬방식 선택 (accuracy: 정확도, dt_down: 다운로드, dt_date: 최신순, dt_byte: 용량순)
            orderby_name: '정확도',   // 정렬방식 선택 (accuracy: 정확도, dt_down: 다운로드, dt_date: 최신순, dt_byte: 용량순)
            page_size: 5,               // 한페이지에 보여질 리스트 사이즈
            page: 1,                    // 페이지
            page_list_size: 5           // 한 페이지에 보여질 페이지 리스트 수
        },
        storeName:'search',
        // urlParam: {}
    },
    searchList: {   // 검색 결과 리스트
        title_count: 0,     // 데이터명 검색결과 총 수
        detail_count: 0,    // 데이터설명 검색결과 총 수
        column_count: 0,    // 컬럼 검색결과 총 수
        result: []
    },
    otherList: {    // 그 밖의 리스트
        option:{
            url: '/api/datalists/linkdata',
            param: {
                keyword: '',                // 검색어
                search_type:'title',        //카테고리 (title: 데이터명, detail: 데이터설명, column: 컬럼)
                dt_type: [],                // 파일형식 선택
                dt_range: [],               // 최소단위 선택
                dt_category: [],            // 분야 선택
                dt_organ: [],               // 제공기관 선택
                orderby_list: 'accuracy',   // 정렬방식 선택 (accuracy: 정확도, dt_down: 다운로드, reg_date: 최신순, dt_byte: 용량순)
                page_size: 5,               // 한페이지에 보여질 페이지 사이즈
                page: 1,                    // 페이지
            },
            storeName:'search'
        },
        result: []
    },
    filterNameList: [
        {'id': 'type', 'list_id': 'file_type', 'name': '데이터 형식', 'm_id':'file_type'},
        {'id': 'col', 'list_id': 'column_list7', 'name':'컬럼명', 'more_id':'column_list', 'm_id':'column_list20'},
        {'id': 'range', 'list_id': 'range_type', 'name':'공간단위', 'm_id': 'range_type'},
        {'id': 'category', 'list_id': 'category_type7', 'name':'분야', 'more_id': 'category_type', 'm_id': 'category_type'},
        {'id': 'organ', 'list_id': 'dt_organ_column7', 'name':'제공기관', 'more_id':'dt_organ_column', 'm_id':'dt_organ_column20'}
    ],
    filterList: {   // 필터리스트
        filter_file_type:[],       // 파일형식 필터
        filter_column_list:[],     // 컬럼 필터
        filter_column_list20:[],     // 컬럼 필터(20)
        filter_column_list7:[],    // 컬럼 필터 (7)
        filter_range_type:[],      // 공간단위 필터
        filter_category_type7:[],   // 분야 필터 (7)
        filter_category_type:[],   // 분야 필터
        filter_dt_organ_column:[],    // 제공기관 필터
        filter_dt_organ_column20:[],    // 제공기관 필터(20)
        filter_dt_organ_column7:[],   // 제공기관 필터 (7)
    },
    pasteSearch: {  // 붙여넣기
        url: '/api/datalists/',
        param: {
            // id: ''
        }
    },
    preview: {  // 미리보기
        previewon: false,
        option: {
            url: '/api/datalists/file/',
            param: {
                id: ''
            }
        },
        loading: true,
        result: {}
    },
    allfilter: {    // 필터 전체 보기
        allfilteron: false,
        name: '',
        listname: '',
        itemname: '',
    },
    downloadCnt:{       // 다운로드 수 카운터
        url: '/api/files/datalists/'
    },
    counts:{            // 조회수, 복사수, 붙여넣기수 카운터
        url: '/api/datalists/colUpdate/',
        param: {
            col_nm : 'dt_hit'   // dt_hit, dt_copy, dt_paste
        }
    },
    changeCategory: false
});

export const getters = {
    getLoading: (state) => {
        return state.loading;
    },
    /* 데이터 가져올 정보 가져오기 */
    getUrl: (state) => {
        return state['searchOption'].url;
    },
    getParam: (state) => {
        return state['searchOption'].param;
    },
    getSearchOption: (state) => {
        return state['searchOption'];
    },
    // getUrlParam: (state) => {
    //     if(Object.keys(state['searchOption']['urlParam']).length > 0)
    //         return state['searchOption']['urlParam'];
    //     else
    //         return false;
    // },
    getLinkOption: (state) => {
        return state['otherList']['option'];
    },
    getKeyword:(state) => {
        return state['searchOption'].param.keyword;
    },
    getCategory:(state) => {
        return state['searchOption'].param.search_type;
    },
    getOrderby:(state) => {
        return state['searchOption'].param.orderby_list;
    },
    getOrderbyNm:(state) => {
        return state['searchOption'].param.orderby_name;
    },

    getcPage:(state) => (id) => {
        return state['searchOption'].param.page;
    },
    getPageListSize:(state) => (id) => {
        return state['searchOption'].param.page_list_size;
    },
    getListSize:(state) => (id) => {
        return state['searchOption'].param.page_size;
    },

    /* (모바일) 정렬순서 on/off  */
    getMobileOrderBoxOn:(state) => {
        return state.mobileOrderBoxOn;
    },
    /* (모바일) 필터 리스트 on/off  */
    getMobileFilterOn:(state) => {
        return state.mobileFilterOn;
    },

    /* 팝업( 전체 필터 리스트 보기 )  */
    getAllFilterOn:(state) => {
        return state['allfilter'].allfilteron;
    },
    getAllFilterListNm: (state) => {
        return state['allfilter'].name;
    },
    getAllFilterListId: (state) => {
        return state['allfilter'].listname;
    },
    getAllFilterItemId: (state) => {
        return state['allfilter'].itemname;
    },
    /* 팝업( 미리보기 )  */
    getPreLoading: (state) => {
        return state['preview'].loading;
    },
    getPreviewOn:(state) => {
        return state['preview'].previewon;
    },
    getPreviewId:(state) => {
        return state['preview'].option.param.id;
    },
    getPreviewUrl:(state) => {
        return state['preview']['option'].url;
    },
    getPreviewInfoLen:(state) => {
        var data = state['preview']['result'];
        if(data.result !== undefined) return Object.keys(data.result).length;
        else return 0;
    },
    getPreviewInfo:(state) => {
        var id = state['preview'].option.param.id;
        var data = state['preview']['result'];
        if(data.result !== undefined) return data.result;
        else return state['searchList'].result.filter(obj => obj.id == id)[0];
    },
    getPreviewSampleHeader:(state) => {
        var data = state['preview']['result'];
        if(data.file !== undefined) return data.file[0];
        else return [];
    },
    getPreviewSampleData:(state) =>  {
        var data = state['preview']['result'];
        if(data.file !== undefined) return data.file.slice(1);
        else return [];
    },

    /* 검색리스트  */
    getCount:(state) => (id) => {
        return state['searchList'][id];
    },
    getList:(state) => {
        return state['searchList'].result;
    },
    getOtherList:(state) => {
        return state['otherList'].result;
    },

    /* 필터 명칭 리스트 가져오기 */
    getFilterNameList: (state) => {
        return state['filterNameList'];
    },
    /* 필터 리스트 가져오기 */
    getFilterList:(state) => (id) => {
        return state['filterList']['filter_'+id];
    },
    /* 검색 필터 개수 가져오기 */
    getFilterCnt:(state) => {
        let cnt = 0;
        const searchParam = state['searchOption']['param'];
        Object.keys(searchParam).map(paramNm => {
            if(paramNm.indexOf('dt_') == 0){
                cnt += searchParam[paramNm].length;
            }
        });
        return cnt;
    },
    /* 검색한 필터 구분별 리스트 가져오기 - 보여주는 name 리스트 */
    getSelectFilter:(state) => (id) => {
        return state['searchOption']['param']['dt_'+id];
    },
    /* 선택된 필터인지 구분 */
    getChkSelFilter: (state) => (obj) => {
        let item = state['searchOption']['param']['dt_'+obj.name];
        var chkArr = item.filter( ff => ff == obj.id);
        // var chkArr = item.filter( ff => ff.id == obj.id);
        if( chkArr.length > 0 ) return true;
        else return false;
    },
    /* 붙여넣기 검색할 때 필요한 param 챙기기 */
    getPasteOption: (state) => {
        return state['pasteSearch'];
    }
};

export const mutations = {
    setLoading:(state, loading) => {
        state.loading = loading;
    },
    setPreLoading:(state, loading) => {
        state['preview'].loading = loading;
    },
    /**
     * 검색 결과 저장
     */
    addList: (state,result) => {
        const data = result.data.results

        // 카테고리별 리스트 총 수
        state['searchList'].title_count = data.queryset_title_count;
        state['searchList'].detail_count = data.queryset_detail_count;
        state['searchList'].column_count = data.queryset_column_count;

        // 검색결과 리스트
        var comData = result.store.$findkeyword(data.lists, state['searchOption'].param.keyword);
        state['searchList'].result = comData;

        // 평가지수 리스트 와 메타정보 리스트 만들기

        // 필터종류별 리스트
        Object.keys(data).map((key)=>{
            if(key.indexOf('filter_') == 0){
                state['filterList'][key] = data[key];
            }
        });

    },
    /**
     * 붙여넣기 데이터일 경우, 결과 저장
     */
    addPasteList: (state,result) => {
        var data = result.data.result;

        // 카테고리별 리스트 총 수
        state['searchList'].title_count = 1;

        // 검색결과 리스트
        // var comData = result.store.$findkeyword(data.lists, state['searchOption'].param.keyword);
        state['searchList'].result.push(data);

        // 평가지수 리스트 와 메타정보 리스트 만들기

    },
    /**
     * 링크 리스트 검색 결과 저장
     */
    addOtherList:(state,result) =>{
        var data = result.data;
        var comData = result.store.$findTitlekeyword(data, state['otherList'].option.param.keyword, 20);
        state['otherList'].result = comData;
    },
    /**
     * 미리보기 데이터 저장
     */
    addPreview:(state, result)=>{
        if(result) state['preview'].result = result.data;
    },

    /**
     * 검색 키워드 저장
     */
    setKeyword: (state, keyword) => {
        state['searchOption']['param'].keyword = keyword;
        state['otherList']['option']['param'].keyword = keyword;
    },
    /**
     * 카테고리 저장
     */
    setCategory: (state, value) => {
        state['searchOption']['param'].search_type = value;

        // 페이지 초기화
        // state['searchOption']['param'].page = 1;
    },
    /**
     * 정렬순 저장
     */
    setOrderby: (state, obj) => {
        state['searchOption']['param'].orderby_list = obj.id;
        state['searchOption']['param'].orderby_name = obj.name;

        // 페이지 초기화
        state['searchOption']['param'].page = 1;
    },
    /**
     * 현재 페이지 저장
     */
    setPage: (state, obj) => {
        state['searchOption']['param'].page = obj.page;
        obj.out = "succeed";
    },

    /**
     * allfilter popup on
     */
    setAllFilter: (state, obj) => {
        // console.log(obj);
        state['allfilter'].allfilteron = obj.open;
        state['allfilter'].name = obj.list_nm;
        state['allfilter'].listname = obj.list_id;
        state['allfilter'].itemname = obj.item_id;
    },
    /**
     * preview popup on
     */
    setPreview: (state, obj) => {
        state['preview'].previewon = obj.open;
        state['preview'].option.param.id = obj.pop_id;
    },
    /**
     * preview popup off
     */
    setPreviewOff: (state, value) => {
        state['preview'].previewon = value;
        state['preview'].option.param.id = '';
    },
    /**
     * (모바일) 정렬 선택 박스 on/off
     */
    setMobileOrderBoxOn: (state, value) => {
        state['mobileOrderBoxOn'] = value;
    },
    /**
     * (모바일) 필터 선택 박스 on/off
     */
    setMobileFilterOn: (state, value) => {
        state['mobileFilterOn'] = value;
    },
    /**
     * 검색 필터 추가
     */
    addFilter: (state, info) => {
        // 필터 추가
        let obj = {}
        obj.id = info.item['dt_'+info.name];
        obj.nm = info.item['dt_'+info.name+'_nm'];
        obj.cnt = info.item['max_count'];

        state['searchOption']['param']['dt_'+info.name].push(info.item['dt_'+info.name]);
        // state['searchOption']['param']['dt_'+info.name].push(obj);
        // state['searchOption']['param']['dt_'+info.name].push(info.item['dt_'+info.name]);

        // 페이지 초기화
        state['searchOption']['param'].page = 1;
    },
    /**
     * 검색 필터 삭제 ( by id )
     */
    removeFilter: (state, info) => {
        // 필터 삭제
        let arrFilter = state['searchOption']['param']['dt_'+info.name];
        state['searchOption']['param']['dt_'+info.name] = arrFilter.filter(
            item => item != info.item['dt_'+info.name]
            // item => item.id != info.item['dt_'+info.name]
        );

        // 페이지 초기화
        state['searchOption']['param'].page = 1;
    },
    /**
     * 검색 필터 삭제 ( by list_id )
     */
    removeFilterListId: (state, filterId) => {
        state['searchOption']['param']['dt_'+filterId] = [];
    },
    /**
     * 검색 필터 초기화 ( all )
     */
    allRemoveFilter: (state, info) => {
        // 필터 추가
        let arrFilter = state['searchOption']['param'];
        Object.keys(arrFilter).map((key)=>{
            if(key.indexOf('dt_') == 0){
                state['searchOption']['param'][key] =[];
            }
        });

        // 페이지 초기화
        state['searchOption']['param'].page = 1;
    },

    /**
     * 새로고침시 param 초기화
     */
    resetParam: (state, param) => {
        Object.keys(param).map(nm => {
            if(nm.indexOf('dt_') == 0){
                if(param[nm].length > 0)
                    state['searchOption']['param'][nm]  = param[nm].split(',');
            }else{
                state['searchOption']['param'][nm] = param[nm];
            }
        });
        param.out = 'succeed';
    },
    /**
     * 카테고리 변경 확인
     */
    setChangeCategory: (state, is_change) => {
      state['changeCategory'] = is_change
    }
};

export const actions = {
    /**
     * 검색
     * @param {*} posts
     */
    async getSearch({ commit, state }, pposts) {
        let posts = _.cloneDeep(pposts)

        // 수정 2020.12.29
        if(posts.param){
            let pparam = _.cloneDeep(posts.param);
            Object.keys(pparam).map((key)=>{
                if(key.indexOf('dt_') == 0){
                    if(pparam[key].length > 0){
                        pparam[key] = pparam[key].join(',');
                    }
                }
            });
            posts.param = pparam;
        }

        let result = await this.dispatch('setData', posts);
        if(result !== undefined){
          const data = result.data.results,
            type = state['searchOption'].param.search_type

          // 검색결과 건 확인
          if (!state['changeCategory'] && data['queryset_' + type + '_count'] === 0) {
            let new_category = ''

            if (type !== 'title' && data.queryset_title_count > 0) { // 데이터 명 0건 초과
              // 데이터 명 이동
              new_category = 'title'
            } else if (type !== 'detail' && data.queryset_detail_count > 0) { // 데이터 설명 0건 초과
              // 데이터 설명 이동
              new_category = 'detail'
            } else if (type !== 'column' && data.queryset_column_count > 0) { // 데이터 컬럼 1건 이상
              // 데이터 컬럼 이동
              new_category = 'column'
            }

            if (new_category) {
              commit('setCategory', new_category)
              posts = _.cloneDeep( state['searchOption'])

              if (posts.param) {
                let pparam = _.cloneDeep(posts.param)

                Object.keys(pparam).map((key) => {
                  if (key.indexOf('dt_') === 0) {
                    if (pparam[key].length > 0) {
                      pparam[key] = pparam[key].join(',')
                    }
                  }
                })

                posts.param = pparam
              }

              result = await this.dispatch('setData', posts)
            }
          }

          result.store = this;
          commit('addList', result);
          commit('setLoading', false);
          commit('setChangeCategory', false);
        }
    },
    /**
     * 외부데이터(링크데이터) 가져오기
     * @param {*} param0
     * @param {*} posts
     */
    async getLinkData({ commit }, posts) {
        let result = await this.dispatch('setData', posts);
        if(result !== undefined){
            result.store = this;
            commit('addOtherList', result);
        }
    },
    /**
     * 미리보기 가져오기
     * @param {*} param0
     * @param {*} posts
     */
    async getPreviewData({ commit }, posts) {
        let result = await this.dispatch('setData', posts);
        if(result !== undefined){
            commit('addPreview', result);
            commit('setPreLoading', false);
        }
    },
    /**
     * 조회수(dt_hit), 복사수(dt_copy), 붙여넣기수(dt_) 추가
     * @param {*} param0
     * @param {*} posts
     */
    async addCounts({ commit, state }, param) {
        let url = state.counts.url;
        this.dispatch('setPost', {
            'url':url,
            'param': param.post
        });
    },
    /**
     * 다운로드 수 추가
     * @param {*} param0
     * @param {*} posts
     */
    async addDownCnt({ commit, state }, id) {
        let url = state.downloadCnt.url + id;
        this.dispatch('setData', {'url':url});
    },
    /**
     * 붙여넣기 조회
     * @param {*} posts
     */
    async getPasteSearch({ commit }, posts) {
        let result = await this.dispatch('setData', posts);
        if(result !== undefined){
            result.store = this;
            commit('addPasteList', result);
            commit('setLoading', false);
        }
    },
};



