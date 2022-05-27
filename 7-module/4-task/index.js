export default class StepSlider {
  // Используемые при проектировании значения и элементы:
  constructor({ steps, value = 0 }) {
    this.steps = steps;         // Количество шагов
    this.value = value;         // Текущее целое значение
    this.elem = null;           // Root - элемент
    this.sliderProgress = null; // Значение закрашенной шкалы слайдера
    this.point = null;          // Элемент "ползунок"
    this.tabs = [];             // Числовые значения текущего положения
    this.render();              // Первоначальный рендер слайдера
  }

  // Создание слайдера:
  render() {
    // Формирование необходимой вёрстки:
    this.elem = document.createElement("div");
    this.elem.classList.add("slider");
    this.elem.innerHTML = `
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">${this.value + 1}</span>
      </div>
      <div class="slider__progress" style="width: 50%;"></div>
      <div class="slider__steps"></div>
    `;
    const sliderSteps = this.elem.querySelector(".slider__steps");
    for (let i = 0; i < this.steps; i++) {
      const newSpan = document.createElement("span");
      this.tabs.push(newSpan);
      sliderSteps.append(newSpan);
    }

    // Получение необходимых элементов:
    this.sliderProgress = this.elem.querySelector(".slider__progress");
    this.point = this.elem.querySelector(".slider__thumb");

    // Первоначальное выставление "ползунка"
    this.updateScale(this.value * 100 / (this.steps - 1));
    this.updatePoint(this.value * 100 / (this.steps - 1));
    this.updateActiveTab();

    // Отключение встроенного DragAndDrop:
    this.point.ondragstart = () => false;

    // После клика по шкале слайдера происходит перемещение "ползунка":
    this.elem.addEventListener("click", this.move);

    // После нажатия на ползунок происходит:
    this.point.addEventListener("pointerdown", () => {
      this.elem.classList.add("slider_dragging");               // Добавление класса активности слайдера
      document.addEventListener("pointermove", this.move);      // Обработка события движения мыши

      // После деактивации "ползунка" происходит:
      document.addEventListener("pointerup", event => {
        this.move(event);                                       // Установка ползунка на допустимое значение
        document.removeEventListener("pointermove", this.move)  // Удаление обработчика события на движение мыши
        this.elem.classList.remove("slider_dragging");          // Удаление класса активности слайдера
      }, { once: true });
    });
  }

  // Функция, осуществляющая дввижение:
  move = event => {
    event.preventDefault();                                                         // Отмена стандартного поведения браузера
    const cursPos = event.clientX - this.elem.getBoundingClientRect().left;         // Подсчёт расстояния от начала слайдера до курсора (по Х)
    const segWidth = this.elem.getBoundingClientRect().width / (this.steps - 1);    // Подсчёт ширины сегмента
    let newPointPos = null;

    // Если курсор вышел за левую границу движения "ползунка", то:
    if (cursPos < 0) {
      this.value = 0;               // Устанавливаем целочисленное значение
      this.updateScale(0);          // Настраиваем активную шкалу
      this.updatePoint(0);          // Настраиваем положение ползунка

    // Если курсор вышел за правую границу движения "ползунка", то:
    } else if (cursPos > this.elem.getBoundingClientRect().width) {
      this.value = this.steps - 1;  // Устанавливаем целочисленное значение
      this.updateScale(100);        // Настраиваем активную шкалу
      this.updatePoint(100);        // Настраиваем положение ползунка

    // Если курсор находится в области движения слайдера, то:
    } else {
      // Устанавливаем целочисленное значение:
      this.value = Math.round(cursPos / segWidth);

      // Если произошло событие клика или деактивации,
      // то высчитываем строгое положение "ползунка":
      if (event.type === "click" || event.type === "pointerup") {
        newPointPos = this.value * 100 / (this.steps - 1);
        this.createCustomEvent();

      // Если произошло событие движения мыши, то высчитываем
      // положение "ползунка" соответствующее положению курсора:
      } else if (event.type === "pointermove") {
        newPointPos = cursPos * 100 / this.elem.getBoundingClientRect().width;  //
      } else {
        console.log("Что-то сильно пошло не так...");
      }
    }
    // Устанавливаем активную шкалу, положение ползунка и значения таба относительно
    // подсчитанного положения:
    this.updateScale(newPointPos);
    this.updatePoint(newPointPos);
    this.updateActiveTab();
  }

  // Установка цифрового значения текущего положения:
  updateActiveTab() {
    this.tabs.forEach(tab => tab.classList.remove("slider__step-active"));
    this.tabs[this.value].classList.add("slider__step-active");
  }

  // Заполнение активной части шкалы:
  updateScale(offset) {
    this.sliderProgress.style.width = `${offset}%`;
  }

  // Установка "ползунка"
  updatePoint(offset) {
    this.point.style.left = `${offset}%`;
    this.point.querySelector(".slider__value").innerHTML = this.value + 1;
  }

  // Создание пользовательского события:
  createCustomEvent() {
    const eventSliderChange = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(eventSliderChange);
  }
}
