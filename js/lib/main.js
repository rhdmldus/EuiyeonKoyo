"use strict";

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
      }
  };
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChangingTitle = function () {
  function ChangingTitle() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, ChangingTitle);

    this.node = x;
    this.letterfy(this.node.querySelector("h1"));
  }

  _createClass(ChangingTitle, [{
    key: "letterfy",
    value: function letterfy(node) {
      var text = node.innerText;
      node.innerText = "";
      node.classList.add("current");
      for (var c in text) {
        var span = document.createElement("span");
        span.innerText = text[c];
        span.classList.add("letter", "in");
        span.style.animationDelay = c * 0.1 + "s";
        node.appendChild(span);
      }
    }
  }, {
    key: "changeText",
    value: function changeText(newText) {
      var oldTitle = this.node.querySelector(".current");
      var i = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = oldTitle.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var letter = _step.value;

          letter.style.animationDelay = i++ * 0.1 + "s";
          letter.classList.remove("in");
          letter.classList.add("out");
        }
      } catch (error) {
        _didIteratorError = true;
        _iteratorError = error;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      oldTitle.classList.remove("current");
      var newTitle = document.createElement("h1");
      newTitle.classList.add("current");
      for (var c in newText) {
        var span = document.createElement("span");
        span.innerText = newText[c];
        span.classList.add("letter", "in");
        span.style.animationDelay = c * 0.1 + 0.5 + "s";
        newTitle.appendChild(span);
      }
      this.node.appendChild(newTitle);
      setTimeout(this.removeNode(oldTitle), 2000);
    }
  }, {
    key: "removeNode",
    value: function removeNode(x) {
      return function () {
        x.remove();
      };
    }
  }]);

  return ChangingTitle;
}();

var ct = new ChangingTitle(document.querySelector(".changing-title"));
var texts = ["Creative", "Innovative", "flexible", "Passionate"];
var count = 0;
setInterval(function () {
  ct.changeText(texts[++count % texts.length]);
}, 2000);
// scrollspy
var sections = document.querySelectorAll("section");
var navLinks = document.querySelectorAll(".nav .item_list .item a");
window.onscroll = function () {
  var header = document.querySelector(".nav");
  var headerHeight = header.offsetHeight;
  var windowTop = window.scrollY;
  var back2top = document.querySelector('.back_to_top');
  if (windowTop >= headerHeight) {
    header.classList.add("drop");
    back2top.classList.add('on');
  } else {
    header.classList.remove("drop");
    back2top.classList.remove('on');
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

// let cards = document.querySelectorAll(".card");
// for (let i = 0; i < cards.length; i++) {
//   let count = 0;
//   cards[i].addEventListener("click", function () {
//     cards[i].classList.remove("on");
//     this.classList.toggle("on");
//     let counter = this.children[1].children[1];
//     let countNum = counter.getAttribute("data-num");
//     console.log(countNum);

//     setInterval(function () {
//       if (count == countNum) {
//         clearInterval(count);
//       } else {
//         count += 1;
//         counter.textContent = count + "%";
//       }
//     }, 32);
//   });
// }

var btns = document.querySelectorAll(".tab_header .btn");
btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {

    var target = e.currentTarget;
    var dataTab = target.getAttribute("data-tab");
    var content = document.querySelector("li[data-tab=" + dataTab + "]");
    var containers = document.querySelectorAll(".skills_list .item");
    var counter = content.childNodes[1].childNodes[3].childNodes[3];
    var countNum = counter.getAttribute('data-num');
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
      container.classList.add('di_no');
      var card = content.childNodes[1];
      card.classList.remove('on');
      setTimeout(function () {
        thisCard.classList.add('on');
      });
    });
    content.classList.remove('di_no');
  });
});
// sideNavi controller
var bar = document.querySelector(".bars");
var nav = document.querySelector(".item_list");
bar.addEventListener("click", function (e) {
  nav.classList.toggle("on");
});
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    nav.classList.remove('on');
  });
});
// 다크모드스위치
var switchGroup = document.querySelectorAll(".switch_group");
var body = document.querySelector("body");
switchGroup.forEach(function (switchbtn) {
  switchbtn.addEventListener("click", function (e) {
    body.classList.toggle("dark");
    e.currentTarget.classList.toggle("on");
  });
});