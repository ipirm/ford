"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var bigSlider = new Swiper('.car-review-gallery-big__container', {
  navigation: {
    prevEl: '.car-review-gallery-big__button-prev',
    nextEl: '.car-review-gallery-big__button-next'
  },
  spaceBetween: 10
});
var smallSlider = new Swiper('.car-review-gallery-small__container', {
  spaceBetween: 24,
  slidesPerView: 5,
  breakpoints: {
    768: {
      slidesPerView: 4,
      spaceBetween: 12
    }
  }
});
bigSlider.controller.control = smallSlider;
smallSlider.controller.control = bigSlider;
var benefitsDataArray = [];
benefitsDataArray.push({
  top: '33.428%',
  left: '28.6667%',
  title: 'Освещение',
  text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae, dolorem animi.',
  position: 'bottomright'
});
benefitsDataArray.push({
  top: '25.714%',
  left: '51.8333%',
  title: 'Крыша',
  text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae, dolorem animi.',
  position: 'bottomleft'
});
benefitsDataArray.push({
  top: '36.571%',
  left: '73.3333%',
  title: 'Заднее стекло',
  text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae, dolorem animi.',
  position: 'bottomleft'
});
benefitsDataArray.push({
  top: '53.142%',
  left: '21.6667%',
  title: 'Капот',
  text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae, dolorem animi.',
  position: 'bottomright'
});
benefitsDataArray.push({
  top: '59%',
  left: '42.416%',
  title: 'Колесо',
  text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae, dolorem animi.',
  position: 'topright'
});
benefitsDataArray.push({
  top: '57.714%',
  left: '57.3333%',
  title: 'Шумоизоляция',
  text: 'Шумоизоляция в новой Fiesta находится на очень высоком уровне',
  position: 'bottomleft'
});

var PlusTooltip =
/*#__PURE__*/
function () {
  function PlusTooltip(container, props) {
    var _this = this;

    _classCallCheck(this, PlusTooltip);

    if (!container) {
      return false;
    }

    if (typeof container == 'string') {
      this.container = document.querySelector(container);
    } else if (container.nodeType) {
      this.container = container;
    }

    this.buttonClass = props.buttonClass || 'tooltip-button';
    this.popupClass = props.popupClass || 'tooltip-popup';
    this.position = props.data.position || 'bottomleft';
    this.top = props.data.top || 0;
    this.left = props.data.left || 0;
    this.buttonEl = document.createElement('div');
    this.buttonEl.classList.add(this.buttonClass);
    this.buttonEl.style.top = this.top;
    this.buttonEl.style.left = this.left;
    this.container.appendChild(this.buttonEl);
    this.popupEl = document.createElement('div');
    this.popupEl.classList.add(this.popupClass);
    this.popupEl.style.top = this.top;
    this.popupEl.style.left = this.left;
    var popupTitle = document.createElement('h3');
    popupTitle.classList.add(this.popupClass + '-title');
    popupTitle.innerHTML = props.data.title;
    var popupText = document.createElement('p');
    popupText.classList.add(this.popupClass + '-text');
    popupText.innerHTML = props.data.text;
    this.popupEl.appendChild(popupTitle);
    this.popupEl.appendChild(popupText);

    switch (this.position) {
      case 'topleft':
        this.popupEl.classList.add('--topleft');
        break;

      case 'topright':
        this.popupEl.classList.add('--topright');
        break;

      case 'bottomright':
        this.popupEl.classList.add('--bottomright');
        break;

      case 'bottomleft':
        this.popupEl.classList.add('--bottomleft');
        break;

      default:
        this.popupEl.classList.add('--bottomleft');
        break;
    }

    this.container.appendChild(this.popupEl);
    this.tooltipIsShown = false;
    this.buttonEl.addEventListener('click', function () {
      _this.toggleTooltip();
    });
    this.container.addEventListener('click', function (e) {
      e.stopPropagation();

      if (!e.target.classList.contains(_this.buttonClass) && !e.target.classList.contains(_this.popupClass)) {
        _this.hideTooltip();
      }
    });
    return this;
  }

  _createClass(PlusTooltip, [{
    key: "toggleTooltip",
    value: function toggleTooltip() {
      if (!this.tooltipIsShown) {
        this.showTooltip();
      } else {
        this.hideTooltip();
      }
    }
  }, {
    key: "hideTooltip",
    value: function hideTooltip() {
      this.popupEl.classList.remove('visible');
      this.tooltipIsShown = false;
      this.container.classList.remove('--darken');
    }
  }, {
    key: "showTooltip",
    value: function showTooltip() {
      if (window.innerWidth <= 700) {
        this.popupEl.classList.add('--mobile');
        var y = this.buttonEl.offsetTop;
        var height = this.container.offsetHeight;

        if (y - height / 2 >= 0) {
          this.popupEl.style.top = "10%";
          this.popupEl.style.bottom = "auto";
        } else {
          this.popupEl.style.top = "auto";
          this.popupEl.style.bottom = "10%";
        }

        this.popupEl.style.left = "50%";
        this.popupEl.style.transform = "translateX(-50%)";
        this.container.classList.add('--darken');
      } else {
        this.popupEl.classList.remove('--mobile');
        this.popupEl.style.top = this.top;
        this.popupEl.style.left = this.left;
        this.popupEl.style.transform = "";
      }

      this.popupEl.classList.add('visible');
      this.tooltipIsShown = true;
    }
  }]);

  return PlusTooltip;
}(); // let plus = new PlusTooltip('.benefits-block', {
//   buttonClass: 'benefits-block__plus',
//   popupClass: 'benefits-block__info',
//   data: benefitsDataArray[0]
// })


var tooltips = [];
benefitsDataArray.forEach(function (item) {
  tooltips.push(new PlusTooltip('.benefits-block', {
    buttonClass: 'benefits-block__plus',
    popupClass: 'benefits-block__info',
    data: item
  }));
});