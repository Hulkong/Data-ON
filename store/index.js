import axios from 'axios';
export const strict = false; 

/* ** STATES */ 
export const state = () => {}; 

/* ** GETTERS */ 
export const getters = { };

/* ** MUTATIONS(동기 처리) */ 
export const mutations = { }; 

/* ** ACTIONS (비동기처리) */ 
export const actions = {
    setData({ commit }, posts) {
        return new Promise( function(resolve, reject){
            axios
            .get(posts.url,{
                params: posts.param
            })
            .then(res => {
                // console.log(res);
                var result = {}
                result.data = res.data;
                resolve(result)
            })
            .catch(e => {
                // console.log(e);
                if (!e.response || !e.response.status) return;
                reject(({statusCode:e.response.status, message: ''}));
            })
        }).catch(e => {
            console.log(e);
            if (e.statusCode == 404 ){
                location.href="/error/500";
                // window.$nuxt.$router.push({path: '/error/500', params:{ 'message' : e.statusCode}})
            }
        })
        
    },
    setPost({ commit }, posts) {
        return new Promise( function(resolve, reject){
            axios
            .post(
                posts.url, 
                posts.param
            )
            .then(res => {
                resolve(res)
            })
            .catch(e => {
                console.log(e);
                if (!e.response || !e.response.status) return;
                reject(({statusCode:e.response.status, message: ''}));
            })
        }).catch(e => {
            console.log(e);
            return [];
        })
        
    }

}; 


