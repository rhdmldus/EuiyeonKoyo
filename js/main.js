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
const texts = ["Creative", "Innovative", "flexible", "Passionate"];
let count = 0;
setInterval(() => {
  ct.changeText(texts[++count % texts.length]);
}, 2000);
//
// let links = document.querySelectorAll(".item_list li a");
// links.forEach((link) => {
//   link.addEventListener("click", function (e) {
//     e.preventDefault();
//     let target = e.currentTarget;
//     let idMoveTo = target.getAttribute("href");
//     let tagetElement = document.querySelector(`${idMoveTo}`);
//     tagetElement.scrollIntoView({
//       behavior: "smooth",
//       block: "end",
//       inline: "nearest",
//     });
//     links.forEach((link) => link.classList.remove("on"));
//     target.classList.add("on");
//   });
// });
// headerdrop
// window.onscroll = function () {
//   let header = document.querySelector(".nav");
//   let headerHeight = header.offsetHeight;
//   let windowTop = window.scrollY;
//   if (windowTop >= headerHeight) {
//     header.classList.add("drop");
//   } else {
//     header.classList.remove("drop");
//   }
// };

// scrollspy
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll(".nav .item_list .item a");
window.onscroll = function () {
  let header = document.querySelector(".nav");
  let headerHeight = header.offsetHeight;
  let windowTop = window.scrollY;
  if (windowTop >= headerHeight) {
    header.classList.add("drop");
  } else {
    header.classList.remove("drop");
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
