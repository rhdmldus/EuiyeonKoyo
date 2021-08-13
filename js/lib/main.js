"use strict";

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}
// class ChangingTitle {
//   constructor(x = null) {
//     this.node = x;
//     this.letterfy(this.node.querySelector("h1"));
//   }
//   letterfy(node) {
//     let text = node.innerText;
//     node.innerText = "";
//     node.classList.add("current");
//     for (let c in text) {
//       let span = document.createElement("span");
//       span.innerText = text[c];
//       span.classList.add("letter", "in");
//       span.style.animationDelay = `${c * 0.1}s`;
//       node.appendChild(span);
//     }
//   }
//   changeText(newText) {
//     let oldTitle = this.node.querySelector(".current");
//     let i = 0;
//     for (let letter of oldTitle.children) {
//       letter.style.animationDelay = `${i++ * 0.1}s`;
//       letter.classList.remove("in");
//       letter.classList.add("out");
//     }
//     oldTitle.classList.remove("current");
//     let newTitle = document.createElement("h1");
//     newTitle.classList.add("current");
//     for (let c in newText) {
//       let span = document.createElement("span");
//       span.innerText = newText[c];
//       span.classList.add("letter", "in");
//       span.style.animationDelay = `${c * 0.1 + 0.5}s`;
//       newTitle.appendChild(span);
//     }
//     this.node.appendChild(newTitle);
//     setTimeout(this.removeNode(oldTitle), 2000);
//   }
//   removeNode(x) {
//     return () => {
//       x.remove();
//     };
//   }
// }

// let ct = new ChangingTitle(document.querySelector(".changing-title"));
// const texts = ["Creative", "Innovative", "flexible", "Passionate"];
// let count = 0;
// setInterval(() => {
//   ct.changeText(texts[++count % texts.length]);
// }, 2000);
// scrollspy
var sections = document.querySelectorAll("section");
var navLinks = document.querySelectorAll(".nav .item_list .item a");
window.onscroll = function () {
  var header = document.querySelector(".nav");
  var headerHeight = header.offsetHeight;
  var windowTop = window.scrollY;
  var back2top = document.querySelector(".back_to_top");
  if (windowTop >= headerHeight) {
    header.classList.add("drop");
    back2top.classList.add("on");
  } else {
    header.classList.remove("drop");
    back2top.classList.remove("on");
  }

  sections.forEach(function (section) {
    var top = window.scrollY;
    var offset = section.offsetTop - 100;
    var height = section.offsetHeight;
    var id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach(function (link) {
        link.classList.remove("on");
        document.querySelector(".nav .item_list .item a[href*=" + id + "]").classList.add("on");
      });
    }
  });
};

var btns = document.querySelectorAll(".tab_header .btn");
btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    var target = e.currentTarget;
    var dataTab = target.getAttribute("data-tab");
    var content = document.querySelector("li[data-tab=" + dataTab + "]");
    var containers = document.querySelectorAll(".skills_list .item");
    var counter = content.childNodes[1].childNodes[3].childNodes[3];
    var countNum = counter.getAttribute("data-num");
    var count = 0;
    setInterval(function () {
      if (count == countNum) {
        clearInterval(count);
      } else {
        count += 1;
        counter.textContent = count + "%";
      }
    }, 32);
    var thisCard = content.childNodes[1];
    btns.forEach(function (btn) {
      btn.classList.remove("on");
    });
    target.classList.toggle("on");
    containers.forEach(function (container) {
      container.classList.add("di_no");
      var card = content.childNodes[1];
      card.classList.remove("on");
      setTimeout(function () {
        thisCard.classList.add("on");
      });
    });
    content.classList.remove("di_no");
  });
});
// sideNavi controller
var bar = document.querySelector(".bars");
var nav = document.querySelector(".item_list");
var body = document.querySelector("body");
var back = document.querySelector('.background');
bar.addEventListener("click", function (e) {
  nav.classList.toggle("on");
  back.classList.toggle('di_no');
});
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    nav.classList.remove("on");
    back.classList.add('di_no');
  });
});
back.addEventListener('click', function (e) {
  nav.classList.remove("on");
  back.classList.add('di_no');
});

// 다크모드스위치
var switchGroup = document.querySelectorAll(".switch_group");
switchGroup.forEach(function (switchbtn) {
  switchbtn.addEventListener("click", function (e) {
    body.classList.toggle("dark");
    e.currentTarget.classList.toggle("on");
  });
});