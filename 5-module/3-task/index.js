function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const arrowLeft = carousel.querySelector(".carousel__arrow_left");
  const arrowRight = carousel.querySelector(".carousel__arrow_right");
  const carouselInner = carousel.querySelector(".carousel__inner");

  const widthSlide = carouselInner.offsetWidth;
  let position = 0;
  const numSlides = carouselInner.querySelectorAll(".carousel__slide").length;
  let curSlide = 1;

  arrowControl(curSlide, numSlides, arrowLeft, arrowRight);

  //=== ! Не очень понятно почему, но тесты принимают только вариант, когда ! ===\\
  //=== ! слайд сдвигается ровно на 500px,  однако его реальная ширина, как ! ===\\
  //=== ! в  консоли  разработчика,  так  и в "offsetWidth" равняется 988px ! ===\\
  //=== ! Оставляю  2  варианта.  Сдвиг  в  500px  проходит через тесты, но ! ===\\
  //=== ! сдвигает  слайд  лишь  на  половину.  Сдвиг  через  "offsetWidth" ! ===\\
  //=== ! сдвигает   слайд   полностью,   но   не   проходит   через  тесты ! ===\\

  //=== ! Ответ: "Попробуй взять carouselInner.offsetWidth" ! ===\\

  //=== ! Да,  действительно,  проблема  была  только в этом... Я почему то ! ===\\
  //=== ! думал что  offsetWidth предоставляет полную ширину элемента, а не ! ===\\
  //=== ! его видимую часть... Но, изучив документацию, оказалось наоборот) ! ===\\
  //=== ! Теперь всё работает корректно                                     ! ===\\

  arrowLeft.addEventListener("click", () => {
    curSlide--;
    arrowControl(curSlide, numSlides, arrowLeft, arrowRight);
    position += widthSlide;
    carouselInner.style.transform = `translateX(${position}px)`;
  });

  arrowRight.addEventListener("click", () => {
    curSlide++;
    arrowControl(curSlide, numSlides, arrowLeft, arrowRight);
    position -= widthSlide;
    carouselInner.style.transform = `translateX(${position}px)`;
  });
}

function arrowControl(curSlide, numSlide, arrowLeft, arrowRight) {
  if (curSlide + 1 > numSlide) {
    arrowRight.style.display = 'none';
  } else if (curSlide - 1 < 1) {
    arrowLeft.style.display = 'none';
  } else {
    arrowRight.style.display = '';
    arrowLeft.style.display = '';
  }
}
