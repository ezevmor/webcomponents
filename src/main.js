import chronoComponent from './modules/chrono-component.js'

if (!customElements.get ('chrono-comp')) {
  customElements.define('chrono-comp', chronoComponent);
}
