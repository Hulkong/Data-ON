<template>
  <div>
    <div
      id="doc"
      :class="[{'main': main_class},
                   {'sub': !main_class}, 
                   {'board': board_class}]"
    >
      <!-- main / sub -->
      <!-- s : #header-wrap //-->
      <include-header :keyword="keyword" v-if="!main_class || (main_class && msec01H <= pageY)"></include-header>
      <!-- e : #header-wrap //-->
      <!-- s: fog1 -->
      <div class="header-slider-ovclick" v-show="headerFog" @click="closeFog('pop')" ></div>
      <!-- e: fog1 -->
      <!-- s : #container-wrap //-->

      <div
        id="container-wrap"
        :class="[{'mcontainer': main_class}, 
                    {'scontainer': !main_class}, 
                    {'div-cont': !main_class}, 
                    {'full': board_class}]"
      >
        <loading-data :loading="getLoading"></loading-data>
        <!-- s: fog2 -->
        <div class="content-slider-ovclick" v-if="bodyFog" @click="closeFog('')" />
        <!-- e: fog2 -->
        <!-- s: snb-wrap-->
        <include-filter v-if="search_class"></include-filter>
        <!-- e: snb-wrap-->
        <Nuxt :nuxtChildKey="routerViewKey" />
        <div class="__bottom-buttons">
          <contact :isShow="isShowContact" @close="closeContact"></contact>
          <div class="contact-button" @click="isShowContact = true"></div>
          <a
            href="javascript:void(0);"
            @click="$scrollToTop"
            class="top-btn over"
            v-show="(msec01H <= pageY)"
          >
            <span class="blind">top</span>
          </a>
        </div>
      </div>
      <popup-preview v-if="getPreviewOn"></popup-preview>
      <popup-allfilter v-if="getAllFilterOn"></popup-allfilter>
      <!-- s : layer-wrap selBox -->
      <include-sel-box v-show="search_class && getMobileOrderBoxOn"></include-sel-box>
      <!-- e : layer-wrap selBox -->
      <!-- e : #container-wrap //-->
      <!-- s : #footer-wrap //-->
      <include-footer></include-footer>
      <!-- e : #footer-wrap //-->
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data: function() {
    return {
      isShowContact: false,
      main_class: true,
      search_class: false,
      board_class: false,
      keyword: "",
      bodyFog: false, // 모바일 필터 검은 배경
      headerFog: false, // 팝업 검은 배경
      docW: 0, // 화면 widht 사이즈
      msec01H: 0, // 첫번째 페이지의 높이
      pageY: 0 // 현재 보고있는 높이
    };
  },
  computed: {
    ...mapGetters("search", [
      "getMobileOrderBoxOn", // [모바일] 필터 on/off
      "getPreviewOn", // preview popup on/off
      "getAllFilterOn", // allfilter popup on/off
      "getLoading" // 로딩 on/off 가져오기
    ]),
    routerViewKey() {
      this.setStyles(this.$route.matched[0].path);
    }
  },
  mounted() {
    var that = this;
    this.msec01H = $(".msec-01").outerHeight();

    // 화면 사이즈 조절 & 스크롤 높이 측정
    this.$nextTick(function() {
      this.onResize();
      window.addEventListener("load", this.onResize);
      window.addEventListener("resize", this.onResize);
      window.addEventListener("scroll", this.onScroll);
    });
  },
  created() {
    var that = this;
    this.$nuxt.$on("default-fog", (use, type) => {
      // 사용위치: search/index.vue, preview-popup
      if (type !== undefined && type == "pop") that.headerFog = use;
      else that.bodyFog = use;

      // 스크롤 처리
      if (use) $("html").css({ overflow: "hidden" });
      else $("html").css({ overflow: "auto" });
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("default-fog");
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("load", this.onResize);
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    ...mapMutations("search", [
      "setPreview", // 미리보기 화면  on/off
      "setMobileOrderBoxOn", // 검색 파라미터 추가
      "setAllFilter", // 필터 전체 검색
      "setMobileFilterOn" // 모바일 필터 창
    ]),
    onResize: function(event) {
      var that = this;
      setTimeout(function() {
        that.docW = $("#doc").outerWidth();
      }, 10);
    },
    onScroll: function(evnet) {
      this.pageY = evnet.path[1].pageYOffset;
    },
    /**
     * 검은 배경 클릭시 닫기
     */
    closeFog: function(type) {
      if (type == "pop") {
        // 정렬
        this.setMobileOrderBoxOn(false);
        this.setPreview(false);
        this.setAllFilter({ open: false, list_id: "" });

        $nuxt.$emit("default-fog", false, "pop");
      } else {
        // 팝업
        this.setMobileFilterOn(false);
        $nuxt.$emit("default-fog", false);
      }
    },
    /**
     * 화면별 스타일 적용
     */
    setStyles: function(path) {
      if (path == "/" || path == "") {
        this.main_class = true;
        this.search_class = false;
        this.board_class = true;
      } else if (path.indexOf("/notice") != -1) {
        this.main_class = false;
        this.search_class = false;
        this.board_class = true;
      } else if (path.indexOf("/search") != -1) {
        this.keyword = this.$route.query.keyword;
        this.main_class = false;
        this.board_class = false;
        this.search_class = true;
      } else {
        this.main_class = false;
      }
    },

    /**
     * @description click to close button in contact layout
     */
    closeContact() {
      this.isShowContact = false;
    }
  }
};
</script>
<style scoped>
.act_hide {
  display: none;
}

.__bottom-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  bottom: 20px;
  right: 0;
  padding-right: 23px;
  position: fixed;
  z-index: 2299;
}

.__bottom-buttons .contact-button {
  width: 60px;
  height: 60px;
  background-image: url(/images/ask/bt-inquire.png);
  background-repeat: no-repeat;
  background-size: contain;
  padding-bottom: 10px;
  cursor: pointer;
}

.contact {
  z-index: 2500;
  background: white;
  margin-bottom: -60px;
  position: relative;
  top: 100vh;
  width: 0;
  height: 0;
}

.__bottom-buttons .contact-button:hover {
  background-image: url(/images/ask/bt-inquire-hover.png);
}

.__bottom-buttons .top-btn.over {
  position: static;
}

@media only screen and (max-width: 999px) {
  .contact {
    margin-bottom: -45px;
  }
  .__bottom-buttons .contact-button {
    width: 44px;
    height: 44px;
  }
}

@media (min-width: 320px) and (max-width: 480px) {
  .__bottom-buttons .contact-button {
    /* background-image: url(/images/ask/bt-inquire-mobile.png); */
  }
}
</style>
