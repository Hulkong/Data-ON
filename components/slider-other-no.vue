<template>
    <div class="other">
        <h4>전국데이터는 아니지만...<br />이런 데이터도 있어요!</h4>
		<div  class="other-slide no-data">
            <div class="item">
                <div class="txt">
                    <p>검색 결과가 없습니다</p>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
	computed: {
	},
	props:{
		isData: Boolean
	},
	created(){
	},
	updated(){
		this.setSilder();
	},
	methods:{
		setSilder: function(){
			var otherSlide = $('.other-slide.no-data');
			this.$setSlider(otherSlide, {
                items: 1, 
            })
			
		}
		
	}
}
</script>
<style scoped src="../assets/css/content.css"></style>
<style scoped>
</style>
