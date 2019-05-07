// Мобильное меню

var mainNav = document.querySelector('.main-nav');
var mainNavToggle = mainNav.querySelector('.main-nav__toggle');


mainNavToggle.addEventListener('click', function () {

	if (mainNav.classList.contains('main-nav--close')) {
		mainNav.classList.remove('main-nav--close');
	} else {
		mainNav.classList.add('main-nav--close');
	}
})


// Слайдер

var effectSlider = document.querySelector('.effect-slider');
var effectSliderItemBefore = effectSlider.querySelector('.effect-slider__item--before');
var effectSliderItemAfter = effectSlider.querySelector('.effect-slider__item--after');
var effectSliderLabelBefore = effectSlider.querySelector('.effect-slider__label--before');
var effectSliderLabelAfter = effectSlider.querySelector('.effect-slider__label--after');
var effectSliderButton = effectSlider.querySelector('.effect-slider__button');

effectSliderLabelBefore.addEventListener('click', function () {
	effectSliderItemAfter.classList.remove('effect-slider__item--active');
	effectSliderItemBefore.classList.add('effect-slider__item--active');
	effectSliderButton.classList.remove('effect-slider__button--after');
	effectSliderButton.classList.add('effect-slider__button--before');
})

effectSliderLabelAfter.addEventListener('click', function () {
	effectSliderItemBefore.classList.remove('effect-slider__item--active');
	effectSliderItemAfter.classList.add('effect-slider__item--active');
	effectSliderButton.classList.remove('effect-slider__button--before');
	effectSliderButton.classList.add('effect-slider__button--after');
})