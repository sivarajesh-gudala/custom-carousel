const carouselParent = document.querySelector(".carousel-items-container");
const carouselChildElmts = carouselParent.childNodes;

const addCarouselElement = (elmType, id, key, parentElm) => {
  let element = document.createElement(elmType);
  element.setAttribute("id", `${id}_${key}`);
  element.setAttribute("class", `${id}`);
  const carouselImage = document.createElement("img");
  carouselImage.src = `./assets/carousel_items/carousel_img_${key + 1}.jpg`;
  carouselImage.setAttribute("class", "carousel_img");
  element.appendChild(carouselImage);
  parentElm.appendChild(element);
};

const createCarouselItems = () => {
  let noOfItem = -1;
  while (noOfItem < 2) {
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
};

createCarouselItems();

carouselParent.addEventListener("click", (e) => {
  console.log(e.target.id);
});

let carouselItemIdx = 0;
const setSessionStorageItem = (key, value) =>
  sessionStorage.setItem(key, value);
setSessionStorageItem("carouselItemIdx", carouselItemIdx);
const getSessionStorageItem = (key) => +sessionStorage.getItem(key);
let currentCarouselIdx = getSessionStorageItem("carouselItemIdx");

const decriment = () => {
  currentCarouselIdx--;
  setSessionStorageItem("carouselItemIdx", currentCarouselIdx);
};

const increment = () => {
  currentCarouselIdx++;
  setSessionStorageItem("carouselItemIdx", currentCarouselIdx);
};

document.getElementById("caret_left").addEventListener("click", (e) => {
  if (currentCarouselIdx >= 1) {
    decriment();
    carouselItemChangeFun(carouselChildElmts, "left");
  } else {
    e.stopImmediatePropagation();
  }
});

document.getElementById("caret_right").addEventListener("click", (e) => {
  if (currentCarouselIdx >= 0 && currentCarouselIdx < 2) {
    increment();
    carouselItemChangeFun(carouselChildElmts, "right");
  } else {
    e.stopImmediatePropagation();
  }
});

const carouselItemChangeFun = (carouselDomItems, direction) => {
  carouselDomItems.forEach((e, i) => {
    if (direction === "right") {
      if (currentCarouselIdx === i + 1) {
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
