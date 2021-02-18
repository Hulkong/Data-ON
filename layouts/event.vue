<template>
  <div id="layout--event">
    <div class="layout--event__participate" v-scroll-to="'#container--event'">이벤트 참여하기</div>
    <img src="/images/event/bg_web_event_01.png" class="event__image web" />
    <img src="/images/event/bg_mob_event_01.png" class="event__image mobile" />
    <Nuxt />
  </div>
</template>

<style scoped>
#layout--event {
  min-width: 1260px;
}

.event__image {
  width: 100%;
}

.layout--event__participate {
  position: absolute;
  top: 40vw;
  left: 40vw;
  width: 20vw;
  height: 4vw;
  min-width: 255px;
  min-height: 51px;
  background: transparent linear-gradient(90deg, #0062AC 0%, #0091E1 100%);
  border-radius: 68px;
  opacity: 1;
  text-align: center;
  line-height: 4vw;
  color: #fff;
  cursor: pointer;
}

.event__image.web {
  display: block;
}
.event__image.mobile {
  display: none;
}

@media (max-width: 1280px) {

  .layout--event__participate {
    top: 510px;
    left: 510px;
  }
}

/* 
  ##Device = Desktops
  ##Screen = 1441px to higher resolution desktops
*/
@media (min-width: 1441px) {

  /* CSS */
}

/* 
  ##Device = Laptops
  ##Screen = B/w 1081px to 1440px
  ##Laptop with HiDPI screen
*/

@media (min-width: 1281px) and (max-width: 1440px) {
  
  /* CSS */
  #layout--event >>> .container--event__description {
    padding: 6.7rem 14%;
  }

  #layout--event >>> .container--event__link {
    padding: 3.2rem 14%;
  }
}

/* 
  ##Device = Laptops
  ##Screen = B/w 1025px to 1280px
  ##Laptop with MDPI screen
*/

@media (min-width: 1025px) and (max-width: 1280px) {

  .layout--event__participate {
    top: 510px;
    left: 510px;
  }
  
  /* CSS */
  #layout--event >>> .container--event__description {
    padding: 6.7rem 14%;
  }

  #layout--event >>> .container--event__link {
    padding: 2.3rem 14%;
  }
}

/* 
  ##Device = Tablets, Ipads (portrait)
  ##Screen = B/w 768px to 1024px
*/

@media (min-width: 768px) and (max-width: 1024px) {
  
  /* CSS */
  
}

/* 
  ##Device = Tablets, Ipads (landscape)
  ##Screen = B/w 768px to 1024px
*/

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  
  /* CSS */
  
}

/* 
  ##Device = Low Resolution Tablets, Mobiles (Landscape)
  ##Screen = B/w 481px to 767px
*/

@media (min-width: 481px) and (max-width: 767px) {
  
  /* CSS */
  
}

/* 
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/

@media (min-width: 320px) and (max-width: 480px) {
  
  /* CSS */
 .event__image.web {
    display: none;
  }
  .event__image.mobile {
    display: block;
  } 
}

</style>