toggle()

function toggle(){
  $('.header-humberger,.nav-item').on("click",function(){
    $('.humberger').toggleClass('clicked');
    $("body").toggleClass("noScroll");
    $(".header-nav").fadeToggle(500);
  });
}