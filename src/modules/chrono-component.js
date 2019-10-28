import chronoDisplay from './display-component.js';

if (!customElements.get ('chrono-display')) {
  customElements.define ('chrono-display', chronoDisplay);
}

export default class chronoComponent extends HTMLElement {
  constructor() {
    super();
    this.state = {
      hundredthSeconds: 0,
      interval: null
    };
  
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
      </style>
      <div>
        <span>
          <chrono-display minutes="" seconds="" hundredth=""></chrono-display>
        </span>
        <button id="start">Start</button>
        <button id="stop" hidden>Stop</button>
        <button id="reset">Reset</button>
      </div>
    `;
  
    this.$chronoDisplay = shadowRoot.querySelector('chrono-display');

    shadowRoot.querySelector('#start').addEventListener('click', this.onClickStart.bind(this));
    shadowRoot.querySelector('#stop').addEventListener('click', this.onClickStop.bind(this));
    shadowRoot.querySelector('#reset').addEventListener('click', this.onClickReset.bind(this));
  }
  
  connectedCallback() {
    this.setDisplayTime(this.state.hundredthSeconds);
  }
  
  onClickStart() {
    this.toggleStartStop();
    this.interval = setInterval(() => {
      this.state.hundredthSeconds++;
      this.setDisplayTime(this.state.hundredthSeconds);
    }, 10);
  }
  
  onClickStop() {
    this.toggleStartStop();
    clearInterval(this.interval);
  }
  
  toggleStartStop() {
    const stopBtn = this.shadowRoot.querySelector('#stop');
    const startBtn = this.shadowRoot.querySelector('#start');

    if (stopBtn.hasAttribute('hidden')){
      stopBtn.removeAttribute('hidden');
      startBtn.setAttribute('hidden','');
    } else {
      stopBtn.setAttribute('hidden','');
      startBtn.removeAttribute('hidden');
    }
  }
  
  onClickReset() {
    this.state.hundredthSeconds = 0;
    this.setDisplayTime(this.state.hundredthSeconds);
  }
  
  setDisplayTime(hundredthSeconds) {
    let min = Math.trunc(hundredthSeconds/(60*100))%60;
    let sec = Math.trunc(hundredthSeconds/(100))%60;
    let hund = hundredthSeconds%100;

    this.$chronoDisplay.setAttribute('minutes', this.getTimeString(min));
    this.$chronoDisplay.setAttribute('seconds', this.getTimeString(sec));
    this.$chronoDisplay.setAttribute('hundredth', this.getTimeString(hund));
  }
  
  getTimeString(time) {
    let timeString = time.toString();
    timeString = time < 10 ? `0${timeString}` : timeString;
    return timeString;
  }
}