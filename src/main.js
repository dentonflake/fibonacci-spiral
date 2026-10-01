import p5 from 'p5';
import './style.css';

new p5((p) => {

  const fibonacci = (previous, current, remaining, type) => {
    if (remaining <= 0) return

    if (type === 'arc') {
      p.stroke(255)
      p.arc(current, 0, current * 2, current * 2, p.HALF_PI, p.PI)
    } else {
      p.stroke(50)
      p.rect(0, 0, current, current)
    }

    p.push()

    p.translate(current, current)
    p.rotate(-p.HALF_PI)

    fibonacci(current, previous + current, remaining - 1, type)

    p.pop()
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.noFill()
  }

  p.draw = () => {

    // p.rotate(p.millis() * 0.0001)

    p.background(25)

    p.push()
    p.translate(p.width / 2, p.height / 2)

    fibonacci(0, 1, 14, 'rect')
    fibonacci(0, 1, 14, 'arc')

    p.pop()
  }

}, document.querySelector('#app'))