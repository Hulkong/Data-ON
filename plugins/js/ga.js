import Vue from 'vue';

export default ({ app }) => {
    /*
     ** Every time the route changes (fired on initialization too)
     */
    app.router.afterEach((to, from) => {
      /*
      ** We tell Google Analytics to add a `pageview`
      */
      let gAccounts = process.env.NODE_ENV === 'production' ? 'UA-155901869-4' : 'G-D4RPQCKTBY'

      // 관리자 제외
      if (!to.path.startsWith('/admin')) {
        app.$gtag('config', gAccounts, {
          'page_title' : to.name,
          'page_path': to.path
        });
      }
    });

  }
