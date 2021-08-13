if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}
class ChangingTitle {
  constructor(x = null) {
    this.node = x;
    this.letterfy(this.node.querySelector("h1"));
  }
  letterfy(node) {
    let text = node.innerText;
    node.innerText = "";
    node.classList.add("current");
    for (let c in text) {
      let span = document.createElement("span");
      span.innerText = text[c];
      span.classList.add("letter", "in");
      span.style.animationDelay = `${c * 0.1}s`;
      node.appendChild(span);
    }
  }
  changeText(newText) {
    let oldTitle = this.node.querySelector(".current");
    let i = 0;
    for (let letter of oldTitle.children) {
      letter.style.animationDelay = `${i++ * 0.1}s`;
      letter.classList.remove("in");
      letter.classList.add("out");
    }
    oldTitle.classList.remove("current");
    let newTitle = document.createElement("h1");
    newTitle.classList.add("current");
    for (let c in newText) {
      let span = document.createElement("span");
      span.innerText = newText[c];
      span.classList.add("letter", "in");
      span.style.animationDelay = `${c * 0.1 + 0.5}s`;
      newTitle.appendChild(span);
    }
    this.node.appendChild(newTitle);
    setTimeout(this.removeNode(oldTitle), 2000);
  }
  removeNode(x) {
    return () => {
      x.remove();
    };
  }
}

let ct = new ChangingTitle(document.querySelector(".changing-title"));
const texts = ["Creative", "Innovative", "cooperative", "Passionate"];
let count = 0;
setInterval(() => {
  ct.changeText(texts[++count % texts.length]);
}, 2000);
// scrollspy
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll(".nav .item_list .item a");
window.onscroll = function () {
  let header = document.querySelector(".nav");
  let headerHeight = header.offsetHeight;
  let windowTop = window.scrollY;
  let back2top = document.querySelector(".back_to_top");
  if (windowTop >= headerHeight) {
    header.classList.add("drop");
    back2top.classList.add("on");
  } else {
    header.classList.remove("drop");
    back2top.classList.remove("on");
  }

  sections.forEach((section) => {
    let top = window.scrollY;
    let offset = section.offsetTop - 100;
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("on");
        document
          .querySelector(".nav .item_list .item a[href*=" + id + "]")
          .classList.add("on");
      });
    }
  });
};

let btns = document.querySelectorAll(".tab_header .btn");
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let target = e.currentTarget;
    let dataTab = target.getAttribute("data-tab");
    let content = document.querySelector("li[data-tab=" + dataTab + "]");
    let containers = document.querySelectorAll(".skills_list .item");
    let counter = content.childNodes[1].childNodes[3].childNodes[3];
    let countNum = counter.getAttribute("data-num");
    let count = 0;
    setInterval(function () {
      if (count == countNum) {
        clearInterval(count);
      } else {
        count += 1;
        counter.textContent = count + "%";
      }
    }, 32);
    let thisCard = content.childNodes[1];
    btns.forEach((btn) => {
      btn.classList.remove("on");
    });
    target.classList.toggle("on");
    containers.forEach((container) => {
      container.classList.add("di_no");
      let card = content.childNodes[1];
      card.classList.remove("on");
      setTimeout(() => {
        thisCard.classList.add("on");
      });
    });
    content.classList.remove("di_no");
  });
});
// sideNavi controller
let bar = document.querySelector(".bars");
let nav = document.querySelector(".item_list");
let body = document.querySelector("body");
let back = document.querySelector('.background');
bar.addEventListener("click", (e) => {
  nav.classList.toggle("on");
  back.classList.toggle('di_no');
});
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("on");
    back.classList.add('di_no');
  });
});
back.addEventListener('click', (e) => {
  nav.classList.remove("on");
  back.classList.add('di_no');
})

// 다크모드스위치
let switchGroup = document.querySelectorAll(".switch_group");
switchGroup.forEach((switchbtn) => {
  switchbtn.addEventListener("click", (e) => {
    body.classList.toggle("dark");
    e.currentTarget.classList.toggle("on");
  });
});
