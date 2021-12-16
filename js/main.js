const cube = $(".cube");
$(".pagination li").on("click", function () {
  if ($(this).hasClass("on")) {
    return; // 함수 끝....
  }
  $(this).addClass("on").siblings("li").removeClass("on");

  const tx = $(this).data("rotation-x");
  const ty = $(this).data("rotation-y");
  gsap.to(cube, { rotateX: tx, rotateY: ty, ease: "back.inOut", duration: 1 });
  //console.log(tx, "===", ty);
});
