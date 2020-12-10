import Vue from 'vue';

export default ({ app }) => {
    /*
     ** Only run on client-side and only in production mode
     */
    if (process.env.NODE_ENV !== 'production')
      return 

    /*
     ** Every time the route changes (fired on initialization too)
     */
    app.router.afterEach((to, from) => {
        /*
        ** We tell Google Analytics to add a `pageview`
        */
        app.$gtag('config', 'G-YQX8MQCG3Z', {
            'page_title' : to.name,
            'page_path': to.path
        });
    });
        
  }