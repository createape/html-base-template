function counting(element) {
    element.prop('Counter', 0).animate({
        Counter: element.data("number")
    }, {
        duration: 600,
        step: function(now) {
            $(this).find("a").text(Math.ceil(now).toLocaleString());
        }
    });
}

function responsiveOffset() {
  if (window.matchMedia("(max-width: 767px)").matches) {
    return 37;
  }
  else {
    return 0;
  }
}

$(document).on("click",".clickTo",function(e) {

  e.preventDefault();
  // $($(this).data("target")).click();
  // console.log($());
  window.open($(this).data("url"),"_blank")
});
