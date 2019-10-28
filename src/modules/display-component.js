export default class chronoDisplay extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
      </style>
      <div>
        <span id="min">--</span>:<span id="sec">--</span>:<span id="hund">--</span>
      </div>
    `;
  }
  
  static get observedAttributes() {
    return ['minutes', 'seconds', 'hundredth'];
  }
  
  attributeChangedCallback(name, odlValue, newValue) {
    const attributes = {
      minutes: '#min',
      seconds: '#sec',
      hundredth: '#hund'
    };

    let $element = this.shadowRoot.querySelector(attributes[name]);
    $element.innerHTML = newValue;
  }
}
