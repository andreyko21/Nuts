var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /*when an item is clicked, update the original select box,
        and the selected item:*/
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

document.addEventListener("DOMContentLoaded", function () {
  var burgerOpen = document.querySelectorAll(".icon-burger-menu");
  var burgerClose = document.querySelector(".burger-exit");
  var menu = document.querySelector(".header-menu-container");
  burgerOpen[0].addEventListener("click", function () {
    menu.classList.toggle("active");
    console.log("open");
  });
  burgerOpen[1].addEventListener("click", function () {
    menu.classList.toggle("active");
    console.log("open");
  });
  burgerClose.addEventListener("click", function () {
    console.log("close");
    menu.classList.remove("active");
  });
});

// Swiper
document.addEventListener("DOMContentLoaded", function () {
  var mySwiper = new Swiper(".about-manufactures__swiper", {
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var mySwiper = new Swiper(".text-block-with-swiper__swiper-block", {
    allowTouchMove: false,
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var mySwiper = new Swiper(".product-item__swiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var mySwiper = new Swiper(".swiper-news-block-swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      // when window width is >= 320px
      0: {
        slidesPerView: 1,
      },
      // when window width is >= 480px
      601: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is >= 640px
      961: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
});

// map

// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: 46.42391, lng: 30.724514 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: uluru,
    disableDefaultUI: true,
    styles: [
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            lightness: 100,
          },
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            visibility: "on",
          },
          {
            color: "#C6E2FF",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#C5E3BF",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#D1D1B8",
          },
        ],
      },
    ],
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

window.initMap = initMap;

var currentUrl = window.location.href;

document.addEventListener("DOMContentLoaded", function () {
  var currentUrl = window.location.href;
  var menuLinks = document.getElementsByClassName("menu__item");

  for (var i = 0; i < menuLinks.length; i++) {
    var link = menuLinks[i];
    var linkUrl = link.href;

    if (currentUrl === linkUrl) {
      link.classList.add("active");
    }
  }
});

function openTab(nameTab, element) {
  var i;
  var x = document.getElementsByClassName("tabs-block__text-block-with-img");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(nameTab).style.display = "flex";

  var tabs = document.getElementsByClassName("tab-button");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  // Додаємо клас "active" до обраної вкладки
  element.classList.add("active");
}


document.addEventListener("DOMContentLoaded", function () {
  var mySwiper = new Swiper(".swiper-news-block-swiper-big", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});