export const state = () => ({ 
    region: {
        url: '/api/standards',
        param: {group_id:'admiBound'},
        result:[],
        stdr_date:''
    },
    stdr: {
        url: '/api/standards',
        param: {group_id:'stndrdCode'},
        result:[],
        stdr_date:''
    },
    notice: {
        url: '/api/notices',
        param: {page_size: 5},
        result:[]
    },
    keyword: {
        url: '/api/datalists/wordranks',
        param: {},
        result:[]
    }
}); 

export const getters = { 
    getUrl: (state) => (id) => {
        return state[id].url;
    },
    getParam: (state) => (id) => {
        return state[id].param;
    },
    getStdrDate:(state) => (id) => {
        return state[id].stdr_date;
    },
    getResult:(state) => (id) => {
        return state[id].result.lists;
    },
    getNoticeList:(state) => {
        let list = [];
        let pageSize = state['notice'].param.page_size;

        if(state['notice'].result && state['notice'].result['results']){
            let noticeLen = state['notice'].result['results']['notice_y_list'].length;
            if( noticeLen < 5){ // 공지가 5개보다 작으면,  공지+일반
                list = state['notice'].result['results']['notice_y_list'];
                state['notice'].result['results']['notice_n_list'].map((item, index) =>{
                    if(index < (pageSize-noticeLen)) list.push(item);
                });
            } else {            // 공지만 5개 return
                state['notice'].result['results']['notice_y_list'].map((item, index) =>{
                    if(index < pageSize) list.push(item);
                });
            }
        } 
        return list;
    },
    getResultKeyword:(state) => {
        return state['keyword'].result;
    },
};

export const mutations = { 
    addList: (state,result) => {
        // 데이터 commit
        state[result.storeName].result = result.data; 
        
        // 기준년월 저장
        if(("region,stdr").indexOf(result.storeName) != -1){
            var obj = {};
            if(result.data.standards_date){
                var stdrDate = result.data.standards_date.toString();
                // 기준년월 commit
                 state[result.storeName].stdr_date = stdrDate.substr(0,4)+"년 "+stdrDate.substr(4,2)+"월 기준"; 
            } 

        }
            
    }
};

export const actions = {
    async getData({ commit }, posts) { 
        await this.dispatch('setData', posts).then((result)=>{
            result.storeName = posts.storeName;
            commit('addList', result);
        });
    },
};
