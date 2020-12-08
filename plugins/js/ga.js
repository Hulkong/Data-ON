/* eslint-disable */

export default ({ app }) => {
    /*
     ** Only run on client-side and only in production mode
     */
    // if (process.env.NODE_ENV !== 'production')
    //   return 
    
    /*
     ** Set the current page
     */

    /*
     ** Every time the route changes (fired on initialization too)
     */
    app.router.afterEach((to, from) => {
      /*
       ** We tell Google Analytics to add a `pageview`
       */
      app.$ga.page(to.fullPath);
    });
        
  }