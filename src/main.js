import p5 from 'p5';
import './style.css';

new p5((p) => {

  p.setup = () => {

    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(25)

  }

}, document.querySelector('#app'))