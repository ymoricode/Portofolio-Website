'use strict';

// add event listener mutiple elements
const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

// PRELOADER
const preloader = document.querySelector("[data-preloader]");
window.addEventListener("DOMContentLoaded", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});

// NAVBAR
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    navToggleBtn.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

// HEADER
const header = document.querySelector("[data-header]");
window.addEventListener("scroll", function () {
    if (window.scrollY >= 100) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
});

// Slider
const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function (currentSlider) {

    const sliderContainer = currentSlider.querySelector("[data-slider-container]");
    const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
    const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

    let totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
    let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

    let currentSliderPos = 0;

    const moveSliderItem = function () {
        sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSliderPos]
            .offsetLeft}px)`;
    }
    // Next Slide
    const slideNext = function () {
        const slideEnd = currentSliderPos >= totalSlidableItems;

        if (slideEnd) {
            currentSliderPos = 0;
        } else {
            currentSliderPos++;
        }

        moveSliderItem();
    }

    sliderNextBtn.addEventListener("click", slideNext);

    // Previous Slide
    const slidePrev = function () {
        if (currentSliderPos <= 0) {
            currentSliderPos = totalSlidableItems;
        } else {
            currentSliderPos--;
        }
        moveSliderItem();
    }

    sliderPrevBtn.addEventListener("click", slidePrev);

    const dontHaveExtraItem = totalSlidableItems <= 0;
    if (dontHaveExtraItem) {
        sliderNextBtn.style.display = 'none';
        sliderPextBtn.style.display = 'none';
    }

    // slide with shift + muse whell
    currentSlider.addEventListener("wheel", function (event) {
        if (event.shiftKey && event.deltaY > 0) slideNext();
        if (event.shiftKey && event.deltaY < 0) slidePrev();
    });

    // Responsive
    window.addEventListener("resize", function () {
        totalSliderVisibleItems = totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue
            ("--slider-items"));
        totalSlidableItems = sliderContainer.childElementCount - totalSlidableItems;

        moveSliderItem();
    });


}

for (let i = 0, len = sliders.length; i < len; i++) {
    initSlider(sliders[i])
}