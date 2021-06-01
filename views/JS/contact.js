// import Vue from "vue";

let app = new Vue({
    el: "#header-inner",
    data:{
        isActive:false
    },
    methods: {

        change:function(){
            if(this.isActive){
                this.isActive = false;
                document.removeEventListener('touchmove', noScroll, { passive: false });
                document.removeEventListener('mousewheel', noScroll, { passive: false });
            }
            else{
                this.isActive = true;
                document.addEventListener('touchmove', noScroll, { passive: false });
                document.addEventListener('mousewheel', noScroll, { passive: false });
            }
        }
    }
})

function noScroll(event) {
    event.preventDefault();
  }