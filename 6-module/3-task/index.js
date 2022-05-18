import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  // <=============================== РЕАЛИЗАЦИЯ КОНСТРУКТОРА ===============================> \\
  constructor(slides) {
    this.slides = slides;       // Данные о слайдах
    this.elem = null;           // Элемент "Карусель"
    this.carouselInner = null;  // Движимый элемент (содержащит внутри себя все слайды)
    this.curSlide = 1;          // Индекс текущего слайда (начинается с 1)
    this.position = 0;          // Позиция слайдера (отступ от начального положения)
    this.widthSlide = 0;        // Ширина слайда
    this.numSlides = 0;         // Количество слайдов
    this.arrowLeft = null;      // Элемент управления "Влево"
    this.arrowRight = null;     // Элемент управления "Вправо"
    this.btnAdd = null;         // Кнопка добавления
    this.render();              // Производим первоначальное отображение элементов
  }

  // <=================================== РЕНДЕР СЛАЙДЕРА ===================================> \\
  render() {
    // Создание вёрстки слайдера:
    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map(slide => {
            return `
              <div class="carousel__slide" data-id=${slide.id}>
                <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
                <div class="carousel__caption">
                  <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                  <div class="carousel__title">${slide.name}</div>
                  <button type="button" class="carousel__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                  </button>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `);

    // Получаем "Движимый" элемент:
    this.carouselInner = this.elem.querySelector(".carousel__inner");

    // Получаем ораганы управления:
    this.arrowLeft = this.elem.querySelector(".carousel__arrow_left");
    this.arrowRight = this.elem.querySelector(".carousel__arrow_right");

    // Начинаем прослушивание событие клина на органах управления:
    this.arrowLeft.addEventListener("click", () => this.move("left"));
    this.arrowRight.addEventListener("click", () => this.move("right"));

    // Первоначальная калиброввка органов управления:
    this.arrowControl(true);

    // Начинаем прослушивание событие клина на кнопке добавления:
    this.elem.addEventListener("click", event => {
      // Если нажатый элемент - кнопка или картинка внутри кнопки, то вызываем метод добавления:
      if (event.target.classList.contains("carousel__button") || event.target.parentElement.classList.contains("carousel__button")) {
        this.onAddClick();
      }
    });
  }

  // <=================================== ДВИЖЕНИЕ СЛАЙДОВ ==================================> \\
  move(direction) {
    // При самом первом нажатии на органы управления подсчитываем количество
    // слайдов и их ширину соответственно:
    if (this.widthSlide === 0 && this.numSlides === 0) {
      this.widthSlide = this.carouselInner.offsetWidth;
      this.numSlides = this.carouselInner.querySelectorAll(".carousel__slide").length;
    }

    // Если была нажата клавиша "Влево", то:
    if (direction === "left") {
      // Сдвигаем слайд влево:
      this.curSlide--;
      this.position += this.widthSlide;
      this.carouselInner.style.transform = `translateX(${this.position}px)`;
    // Если была нажата клавиша "Вправо", то:
    } else if (direction === "right") {
      // Сдвигаем слайд вправо:
      this.curSlide++;
      this.position -= this.widthSlide;
      this.carouselInner.style.transform = `translateX(${this.position}px)`;
      // В случае ошибки выводим соответствующее уведомление:
    } else {
      console.log("Что-то сильно пошло не так...");
    }
    // При любой нажатой клавише производим калибровку органов управления:
    this.arrowControl();
  }

  // <=========================== КАЛИБРОВКА ОРГАНОВ УПРАВЛЕНИЯ ===========================> \\
  arrowControl(start = false) {
    // При первоначальном запуске просто скрываем левувю кнопку:
    if (start) {
      this.arrowLeft.style.display = 'none';
    // При всех последующих запусках кнопка скрывается на основании текущего слайда:
    } else {
      if (this.curSlide + 1 > this.numSlides) {
        this.arrowRight.style.display = 'none';
      } else if (this.curSlide - 1 < 1) {
        this.arrowLeft.style.display = 'none';
      } else {
        this.arrowRight.style.display = '';
        this.arrowLeft.style.display = '';
      }
    }
  }

  // <=============================== РЕАЛИЗАЦИЯ ДОБАВЛЕНИЯ ===============================> \\
  onAddClick() {
    // Формируем кастомное событие:
    const event = new CustomEvent('product-add', {
      // ID текущего слайда определяем из индекса текущего слайда
      detail: this.slides[this.curSlide-1].id,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
  }
}
