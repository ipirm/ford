"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MobileNavMenu =
/*#__PURE__*/
function () {
  function MobileNavMenu(props) {
    var _this = this;

    _classCallCheck(this, MobileNavMenu);

    if (typeof props.menu === 'string') {
      this.menu = document.querySelector(props.menu);
    } else if (props.menu.nodeType) {
      this.menu = props.menu;
    }

    if (typeof props.menuButton === 'string') {
      this.menuButton = document.querySelector(props.menuButton);
    } else if (props.menuButton.nodeType) {
      this.menuButton = props.menuButton;
    }

    this.menuButton.addEventListener('click', function (e) {
      e.stopPropagation();

      _this.toggleMenu();
    });
    this.menu.addEventListener('click', function (e) {
      _this.toggleMenu();
    });
  }

  _createClass(MobileNavMenu, [{
    key: "toggleMenu",
    value: function toggleMenu() {
      var _this2 = this;

      if (!this.menuButton.classList.contains('active')) {
        this.menu.classList.add('active');
        this.menuButton.classList.add('active');
        window.addEventListener('click', function () {
          _this2.toggleMenu();
        }, {
          once: true
        });
      } else {
        this.menu.classList.remove('active');
        this.menuButton.classList.remove('active');
      }
    }
  }]);

  return MobileNavMenu;
}();

var MultiSelect =
/*#__PURE__*/
function () {
  function MultiSelect(props) {
    var _this3 = this;

    _classCallCheck(this, MultiSelect);

    this.className = props.className || 'form-select';
    this.multiple = props.multiple || false;
    if (!props.container) return false;

    if (typeof props.container === 'string') {
      this.container = document.querySelector(props.container);
    } else if (props.container.nodeType) {
      this.container = props.container;
    }

    if (!props.select) {
      this.select = this.container.querySelector('select');
    } else if (typeof props.select === 'string') {
      this.select = document.querySelector(props.select);
    } else if (props.select.nodeType) {
      this.select = props.select;
    }

    this.name = props.name || this.select.getAttribute('name');
    this.title = props.title || this.select.getAttribute('data-title');
    var titleEl = document.createElement('div');
    titleEl.classList.add(this.className + '-title');
    titleEl.innerText = this.title;
    this.container.appendChild(titleEl);
    this.button = titleEl;

    if (this.multiple) {
      //  CSS Class for proper styling
      this.container.classList.add('multiple'); //  Dropdown button controller

      this.button.addEventListener('click', function (e) {
        _this3.container.classList.toggle('expanded');
      });
    }

    this.optionListEl = document.createElement('div');
    this.optionListEl.classList.add(this.className + '-list');
    this.container.appendChild(this.optionListEl); //  Selected options amount

    if (this.multiple) {
      var amountWrapper = document.createElement('div');
      amountWrapper.classList.add(this.className + '-amount');
      amountWrapper.innerText = 'Выбрано: ';
      this.container.appendChild(amountWrapper);
      this.amountEl = document.createElement('span');
      this.amountEl.classList.add(this.className + '-amount-value');
      this.amountEl.innerText = 0;
      amountWrapper.appendChild(this.amountEl);
      this.selectedAmount = 0;
    } // this.selectItemsData = [];


    this.listItemsArr = [];
    Array.from(this.select.querySelectorAll('option')).forEach(function (item) {
      var selectItemData = {
        title: item.innerHTML,
        value: item.value
      }; // this.selectItemsData.push(selectItemData);

      var optionEl = document.createElement('div');
      optionEl.classList.add(_this3.className + '-list-item');
      optionEl.setAttribute('data-checked', false);
      optionEl.setAttribute('data-value', selectItemData.value);
      var optionTitleEl = document.createElement('span');
      optionTitleEl.classList.add(_this3.className + '-list-item__title');
      optionTitleEl.innerText = selectItemData.title;
      optionEl.appendChild(optionTitleEl);

      if (_this3.multiple) {
        var checkboxEl = document.createElement('div');
        checkboxEl.classList.add(_this3.className + '-list-item__checkbox');
        optionEl.appendChild(checkboxEl);
      }

      _this3.optionListEl.appendChild(optionEl);

      _this3.listItemsArr.push(optionEl);
    });

    if (!this.multiple) {
      this.listItemsArr[0].setAttribute('data-checked', true);
      this.listItemsArr[0].classList.add('selected');
      this.selectedOption = this.listItemsArr[0];
    } //  Value change listeners


    this.listItemsArr.forEach(function (item) {
      if (_this3.multiple) {
        item.addEventListener('click', function (e) {
          if (item.getAttribute('data-checked') == 'false') {
            item.setAttribute('data-checked', true);
            item.classList.add('checked');
          } else {
            item.setAttribute('data-checked', false);
            item.classList.remove('checked');
          }

          _this3.updateSelectedAmount();
        });
      } else {
        item.addEventListener('click', function (e) {
          _this3.container.classList.toggle('expanded');

          if (_this3.selectedOption == item) return;

          _this3.selectedOption.setAttribute('data-checked', false);

          _this3.selectedOption.classList.remove('selected');

          _this3.selectedOption = item;

          _this3.selectedOption.setAttribute('data-checked', true);

          _this3.selectedOption.classList.add('selected'); // this.container.classList.remove('expanded');

        });
      }
    }); //  Control buttons

    if (this.multiple) {
      this.buttonApply = document.createElement('button');
      this.buttonApply.classList.add(this.className + '__button-apply');
      this.buttonApply.innerText = 'Применить';
      this.container.appendChild(this.buttonApply);
      this.buttonApply.addEventListener('click', function (e) {
        _this3.container.classList.remove('expanded');
      });
      this.buttonClear = document.createElement('button');
      this.buttonClear.classList.add(this.className + '__button-clear');
      this.buttonClear.innerText = 'Сбросить';
      this.container.appendChild(this.buttonClear);
      this.buttonClear.addEventListener('click', function (e) {
        Array.from(_this3.container.querySelectorAll('[data-checked=true]')).forEach(function (item) {
          item.setAttribute('data-checked', false);
          item.classList.remove('checked');

          _this3.updateSelectedAmount();
        });
      });
    }
  }

  _createClass(MultiSelect, [{
    key: "updateSelectedAmount",
    value: function updateSelectedAmount() {
      this.selectedAmount = Array.from(this.container.querySelectorAll('[data-checked=true]')).length; // console.log(this.selectedAmount);

      this.amountEl.innerHTML = this.selectedAmount;
    }
  }, {
    key: "getData",
    value: function getData() {
      if (this.multiple) {
        var outArr = [];
        Array.from(this.container.querySelectorAll('[data-checked=true]')).forEach(function (item) {
          outArr.push(item.getAttribute('data-value'));
        });
        return outArr;
      } else {
        return this.selectedOption.getAttribute('data-value');
      }
    }
  }]);

  return MultiSelect;
}();

document.addEventListener('DOMContentLoaded', function (e) {
  var introSlider = new Swiper('#js-intro-slider', {
    autoplay: {
      delay: 10000
    },
    loop: true,
    pagination: {
      el: '.intro-slider-pagination',
      type: 'bullets',
      clickable: true
    },
    allowTouchMove: false,
    breakpoints: {
      960: {
        allowTouchMove: true
      }
    }
  });
  var reviewSlider = new Swiper('#js-review-slider', {
    slidesPerView: 'auto',
    allowTouchMove: false,
    pagination: {
      el: '.review-slider-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
        allowTouchMove: true
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 20,
        allowTouchMove: true
      }
    }
  });
  var newsSlider = new Swiper('#js-news-slider', {
    // slidesPerView: 'auto',
    slidesPerColumn: 2,
    slidesPerColumnFill: 'row',
    allowTouchMove: false,
    pagination: {
      el: '.news-slider-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      960: {
        slidesPerView: 3,
        slidesPerColumn: 3,
        slidesPerGroup: 3
      },
      768: {
        slidesPerView: 2,
        slidesPerColumn: 1,
        spaceBetween: 20,
        allowTouchMove: true
      },
      480: {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        allowTouchMove: true
      }
    }
  });
  var discussionSlider = new Swiper('#js-discussion-slider', {
    allowTouchMove: false,
    slidesPerColumn: 3,
    breakpoints: {
      550: {
        slidesPerColumn: 1,
        slidesPerView: 1,
        allowTouchMove: true,
        spaceBetween: 20
      }
    },
    pagination: {
      el: '.discussion-slider-pagination',
      type: 'bullets',
      clickable: true
    }
  }); //  Mobile nav menu

  var mobMenu = new MobileNavMenu({
    menuButton: '.header__nav-menu-button',
    menu: '.header__nav'
  }); //  Mobile account menu

  var accountMenu = new MobileNavMenu({
    menuButton: '.header__account-button',
    menu: '.header-account-ref-wrapper'
  }); //  Fancybox popups

  $('[data-fancybox]').fancybox({
    autoFocus: false,
    touch: false
  }); // Popup forms input validation

  var inputsArray = Array.from(document.querySelectorAll('.form-input__input'));
  inputsArray.forEach(function (item) {
    item.addEventListener('blur', function (e) {
      if (item.value) {
        item.parentElement.classList.remove('--empty');
        item.parentElement.classList.add('--filled');

        if (item.checkValidity()) {
          item.parentElement.classList.add('--valid');
          item.parentElement.classList.remove('--invalid');
        } else {
          item.parentElement.classList.add('--invalid');
          item.parentElement.classList.remove('--valid');
        }
      } else {
        item.parentElement.classList.add('--empty');
        item.parentElement.classList.remove('--filled');
        item.parentElement.classList.remove('--valid');
        item.parentElement.classList.remove('--invalid');
      }
    });
    item.addEventListener('focus', function (e) {
      item.parentElement.classList.remove('--empty');
      item.parentElement.classList.remove('--invalid');
    });
  });
  var modelSelect = new MultiSelect({
    container: '#js-select-model',
    multiple: true
  });
  var optionsSelect = new MultiSelect({
    container: '#js-select-options',
    multiple: true
  });
  var engineSelect = new MultiSelect({
    container: '#js-select-engine',
    multiple: true
  });
  var sortSelect = new MultiSelect({
    container: '#js-select-sort',
    multiple: false
  });
});