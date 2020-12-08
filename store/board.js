export const state = () => ({ 
    notice: {
        url: '/api/notices/',
        param: {
            searchCondition: '1',   // 검색 조건 (1: 제목+내용, 2: 제목, 3: 내용)
            keyword: '',            // 검색 키워드
            page : 1,               // 현재 페이지
            page_size : 10,         // 현재 페이지 - 리스트 수
            page_list_size: 5       // 한페이지에 보여지는 페이지 리스트의 수
        },
        result:[]
    },
    detail: {
        notice:{
            url: '/api/notices/',
            param: {},
            result:[]
        }
    }
}); 

export const getters = { 
    getUrl: (state) => (id) => {
        return state[id].url;
    },
    getParam: (state) => (id) => {
        return state[id].param;
    },
    
    getcPage:(state) => (id) => {
        return state[id].param.page;
    },
    getPageListSize:(state) => (id) => {
        return state[id].param.page_list_size;
    },
    getListSize:(state) => (id) => {
        return state[id].param.page_size;
    },

    getCount:(state) => (id) => {
        if(state[id].result.results)
            return state[id].result.count;
        else
            return 0;
    },
    getList:(state) => (id) => {
        return state[id].result.results;
    },
    getNoticeList:(state) => (id) => {
        if(state[id].result.results === undefined)
            return [];
        else
            return state[id].result.results['notice_n_list'];
    },
    getNotice:(state) => (id) => {
        if(state[id].result.results === undefined)
            return [];
        else
            return state[id].result.results['notice_y_list'];
    },
    getDetailURL:(state) => (id) => {
        return state['detail'][id].url;
    },
    getDetailParam:(state) => (id) => {
        return state['detail'][id].param;
    },
    getDetailResult:(state) => (id) => {
        return state['detail'][id].result;
    }
    
};

export const mutations = { 
    addList: (state,result) => {
        state[result.storeName].result = result.data; 
    },
    addDetail: (state,result) => {
        state['detail'][result.storeName].result = result.data; 
    },
    setSearchCondition:(state, obj) => {
        state[obj.name].param.searchCondition = obj.searchCondition
    },
    setKeyword:(state, obj) => {
        state[obj.name].param.keyword = obj.keyword
    },
    setPage:(state, obj) => {
        state[obj.name].param.page = obj.page
    },
};

export const actions = {
    async getData({ commit }, posts) { 
        await this.dispatch('setData', posts).then(result => {
            result.storeName = posts.storeName;
            commit('addList', result);
        });
    },
    async getDetailData({ commit }, posts) { 
        await this.dispatch('setData', posts).then(result => {
            result.storeName = posts.storeName;
            commit('addDetail', result);
        });
    },
};
