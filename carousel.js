const mainParent = document.querySelector(".carousel");
const carouselParent = document.querySelector(".carousel-items-container");
const carouselChildElmts = carouselParent.childNodes;

const createDomElement = (elmType) => document.createElement(elmType);
const setDomElmAttribute = (attributeType, attributeName, htmlElm) =>
  htmlElm.setAttribute(attributeType, attributeName);

const numberOffCarousels = 2;
const contentObj = [
  {
    title: "Fashion, Beauty and More",
    description: `Fashion (Upto 60 % off) on Men's, women's and kids clothing`,
    id: 0,
  },
  {
    title: "Bill Payments, Recharge & More",
    description: `Pay Bills fastly and earn Cashback`,
    id: 1,
  },
  {
    title: "Bags and Luggages & More",
    description: `SkyBags (Upto 70 % off)`,
    id: 2,
  },
];

const contentContainer = createDomElement("div");
setDomElmAttribute("class", "content_body", contentContainer);
mainParent.appendChild(contentContainer);
const title = createDomElement("h1");
const description = createDomElement("p");
setDomElmAttribute("class", "content_title", title);
setDomElmAttribute("class", "content_description", description);
contentContainer.innerHTML += title.outerHTML + description.outerHTML;
contentContainer.style.display = "none";

let setSessionStorageItem = (key, value) => sessionStorage.setItem(key, value);
setSessionStorageItem("carouselItemIdx", 0);
const getSessionStorageItem = (key) => +sessionStorage.getItem(key);
let currentCarouselIdx = getSessionStorageItem("carouselItemIdx");

const addCarouselElement = (elmType, id, key, parentElm) => {
  let element = createDomElement(elmType);
  setDomElmAttribute("id", `${id}_${key}`, element);
  setDomElmAttribute("class", `${id}`, element);
  const carouselImage = createDomElement("img");
  carouselImage.src = `./assets/carousel_items/carousel_img_${key + 1}.jpg`;
  setDomElmAttribute("class", "carousel_img", carouselImage);
  setDomElmAttribute("id", `carousel_img${key}`, carouselImage);
  element.appendChild(carouselImage);
  parentElm.appendChild(element);
};

const createCarouselItems = () => {
  let noOfItem = -1;
  while (noOfItem < numberOffCarousels) {
    noOfItem++;
    addCarouselElement(
      "div",
      "carousel_item",
      noOfItem,
      document.querySelector(".carousel-items-container")
    );
  }

  carouselChildElmts.forEach((e, i) => {
    const elm = document?.getElementById(`carousel_item_${i}`);
    if (i > 0) {
      elm.style.display = "none";
    }
  });
  disableCaretButtons();
};

const disableCaretButtons = () => {
  const caretLeft = document.querySelector("#caret_left");
  const caretRight = document.querySelector("#caret_right");
  const disableClsName = "btn-disable";
  caretRight.classList?.remove(disableClsName);
  caretLeft.classList?.remove(disableClsName);
  if (currentCarouselIdx <= 0) {
    console.log("left in active", currentCarouselIdx);
    caretLeft.classList.add(disableClsName);
    caretRight.classList?.remove(disableClsName);
  } else if (currentCarouselIdx === numberOffCarousels) {
    console.log("right in active");
    caretRight.classList.add(disableClsName);
    caretLeft.classList?.remove(disableClsName);
  }
};

const decriment = () => {
  currentCarouselIdx--;
  setSessionStorageItem("carouselItemIdx", currentCarouselIdx);
};

const increment = () => {
  currentCarouselIdx++;
  if (currentCarouselIdx > numberOffCarousels) {
    currentCarouselIdx = 0;
  }
  setSessionStorageItem("carouselItemIdx", currentCarouselIdx);
};

/**
 * Event Listeners
 *  @event click
 */
document.getElementById("caret_left").addEventListener("click", (e) => {
  if (currentCarouselIdx >= 1) {
    decriment();
    carouselItemChangeFun(carouselChildElmts, "left");
  } else {
    e.preventDefault();
  }
  disableCaretButtons();
});

document.getElementById("caret_right").addEventListener("click", (e) => {
  if (currentCarouselIdx >= 0 && currentCarouselIdx < numberOffCarousels) {
    increment();
    carouselItemChangeFun(carouselChildElmts, "right");
  } else {
    e.preventDefault();
  }
  disableCaretButtons();
  // contentContainer.style.display = "block";
});

carouselParent.addEventListener("click", (e) => {
  contentContainer.style.display = "block";
  const content = contentObj.filter(
    (data) => data.id === currentCarouselIdx
  )[0];
  console.log(content);
  const textNode = `${content.description}`;
  const titleTextNode = `${content.title}`;
  const titleContent = document.querySelector(".content_title");
  const descContent = document.querySelector(".content_description");
  descContent.textContent = textNode;
  titleContent.textContent = titleTextNode;
  carouselParent.appendChild(contentContainer);
});

const carouselItemChangeFun = (carouselDomItems, direction) => {
  carouselDomItems.forEach((e, i) => {
    if (direction === "right") {
      console.log(e.id, e, e);
      if (e.id !== `carousel_item_${currentCarouselIdx}`) {
        document.getElementById(e.id).style.display = "none";
        document.getElementById(
          `carousel_item_${currentCarouselIdx}`
        ).style.display = "block";
      }
    } else {
      if (currentCarouselIdx === i) {
        document.getElementById(`carousel_item_${i + 1}`).style.display =
          "none";
        console.log(currentCarouselIdx + i + 1);
        document.getElementById(
          `carousel_item_${currentCarouselIdx}`
        ).style.display = "block";
      }
    }
  });
};

const autoSlide = setInterval(() => {
  increment();
  disableCaretButtons();
  carouselItemChangeFun(carouselChildElmts, "right");
}, 1000);

mainParent.addEventListener("mouseover", (e) => {
  clearInterval(autoSlide);
});

// mainParent.addEventListener("mouseleave", (e) => {
//   setInterval(() => {
//     increment();
//     carouselItemChangeFun(carouselChildElmts, "right");
//   }, 1000);
// });

// Function Callings
createCarouselItems();
