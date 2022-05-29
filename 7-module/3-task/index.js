export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = null;
    this.sliderProgress = null;
    this.point = null;
    this.tabs = [];
    this.render();
  }
  render() {
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
    this.sliderProgress = this.elem.querySelector(".slider__progress");
    this.point = this.elem.querySelector(".slider__thumb");

    for (let i = 0; i < this.steps; i++) {
      const newSpan = document.createElement("span");
      this.tabs.push(newSpan);
      sliderSteps.append(newSpan);
    }
    this.elem.addEventListener("click", event => this.move(event));
    this.updateActiveTab();
    this.updateScale();
    this.updatePoint();
  }
  move(event) {
    let clickPos = event.clientX - this.elem.getBoundingClientRect().left;
    let segWidth = this.elem.getBoundingClientRect().width / (this.steps - 1);
    let newPos = Math.round(clickPos / segWidth);
    this.value = newPos;
    this.updateActiveTab();
    this.updateScale();
    this.updatePoint();

    const eventSliderChange = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.elem.dispatchEvent(eventSliderChange);
  }
  updateActiveTab(idxActiveTab) {
    this.tabs.forEach(tab => tab.classList.remove("slider__step-active"));
    this.tabs[this.value].classList.add("slider__step-active");
  }
  updateScale() {
    this.sliderProgress.style.width = `${this.value * 100 / (this.steps-1)}%`;
  }
  updatePoint() {
    console.log(this);
    this.point.style.left = `${this.value * 100 / (this.steps-1)}%`;
    this.point.querySelector(".slider__value").innerHTML = this.value + 1;
  }
}
