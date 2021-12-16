let cubeTotal = 0;
const cubeBox = $("#main #cubeBox");
const paginationUL = $(".pagination ul");
let random = 0;
let oldRandom = random;
let autoCount = 0;
const cube = `<div class="scene">
<div class="cube">
  <div class="face front">B</div>
  <div class="face back">E</div>
  <div class="face top">T</div>
  <div class="face bottom">T</div>
  <div class="face left"></div>
  <div class="face right"></div>
</div>
</div>`;
const famousList = [
  "Better is to bow than break.",
  "The difficulty in life is the choice.",
  "Life itself is a quotation",
  "Rome was not built in a day.",
  "Seeing is Believing.",
  "Faith without deeds is useless.",
  "Habit is second nature.",
  "Life itself is a quotation.",
  "Envy and wrath shorten the life.",
  "Where there is no desire, there will be no industry.",
  "To be trusted is a greater compliment than to be loved.",
  "All fortune is to be conquered by bearing it.",
];

cubeTotal = 60;

function makeCube() {
  let output = "";
  for (let i = 0; i < cubeTotal; i++) {
    //cubeBox.append(cube);
    output += cube;
  }
  cubeBox.html(output);
}

const rotationArray = [
  { tx: 0, ty: 0 },
  { tx: 0, ty: -90 },
  { tx: 0, ty: -180 },
  { tx: 0, ty: 90 },
  { tx: -90, ty: 0 },
  { tx: 90, ty: 0 },
];

function showTxt(selected) {
  $("#cubeBox .scene").show();
  for (let i = 0; i < cubeTotal; i++) {
    if (random === 0) {
      $("#cubeBox .scene").eq(i).find(".front").text(famousList[selected].charAt(i));
    } else if (random === 1) {
      $("#cubeBox .scene").eq(i).find(".right").text(famousList[selected].charAt(i));
    } else if (random === 2) {
      $("#cubeBox .scene").eq(i).find(".back").text(famousList[selected].charAt(i));
    } else if (random === 3) {
      $("#cubeBox .scene").eq(i).find(".left").text(famousList[selected].charAt(i));
    } else if (random === 4) {
      $("#cubeBox .scene").eq(i).find(".top").text(famousList[selected].charAt(i));
    } else if (random === 5) {
      $("#cubeBox .scene").eq(i).find(".bottom").text(famousList[selected].charAt(i));
    }
    if (i >= famousList[selected].length) {
      $("#cubeBox .scene").eq(i).hide();
    }
    // if (i >= famousList[1].length) {
    //   $("#cubeBox .scene").eq(i).hide();
    // }
  }
}
function makePaginationItem() {
  const total = famousList.length;
  let output = "";
  for (let i = 0; i < total; i++) {
    if (i === 0) {
      output += `<li class="on">${i + 1}</li>`;
    } else {
      output += `<li>${i + 1}</li>`;
    }
  }
  paginationUL.html(output);
}
function clickPaginationItem() {
  paginationUL.on("click", "li", function () {
    if ($(this).hasClass("on")) return;
    $(this).addClass("on").siblings("li").removeClass("on");
    random = Math.floor(Math.random() * 6);
    if (random === oldRandom) {
      random = (random + 1) % 6;
    }
    showTxt($(this).index());
    gsap.to("#cubeBox .scene .cube", {
      rotateY: rotationArray[random].ty,
      rotateX: rotationArray[random].tx,
      z: -40,
      ease: "back.inOut",
      duration: 1.25,
      stagger: {
        from: "random",
        amount: 0.5,
      },
    });
    oldRandom = random;
    autoCount = $(this).index();
  });
}
let clearId = null;
function playAuto() {
  $(".pagination ul").addClass("off");
  clearId = setInterval(function () {
    autoCount++;
    autoCount %= famousList.length;
    $(".pagination li").eq(autoCount).trigger("click");
  }, 3000);
}
function stopAuto() {
  $(".pagination ul").removeClass("off");
  clearInterval(clearId);
}

function autoAndPause() {
  $(".pagination .auto").on("click", function () {
    $(this).removeClass("play").siblings("button").addClass("play");
    playAuto();
  });
  $(".pagination .pause").on("click", function () {
    $(this).removeClass("play").siblings("button").addClass("play");
    stopAuto();
  });
}

makeCube();
showTxt(0);
makePaginationItem();
clickPaginationItem();
autoAndPause();
