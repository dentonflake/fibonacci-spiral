import p5 from 'p5';
import './style.css';

new p5((p) => {

  // Helper to draw the fibonacci
  const fibonacci = (previous, current, remaining, type) => {

    // If there are no remaining iterations
    if (remaining <= 0) return

    // Arc
    if (type === 'arc') {
      p.stroke(255)
      p.arc(current, 0, current * 2, current * 2, p.HALF_PI, p.PI)
    }

    // Triangle
    else if (type === 'triangle') {
      p.push()
      p.fill(60, 140, 220, 80)
      p.triangle(0, 0, current, 0, current, current)
      p.pop()
    }

    // Circle
    else if (type === 'circle') {
      p.push()
      p.noFill()
      p.stroke(255, 180, 60)
      p.circle(current / 2, current / 2, current)
      p.pop()
    }

    // Rect
    else {
      p.stroke(50)

      const extra = current * 0.1

      p.line(-extra, 0, current + extra, 0)
      p.line(-extra, current, current + extra, current)
      p.line(0, -extra, 0, current + extra)
      p.line(current, -extra, current, current + extra)
    }

    // Save current draw settings
    p.push()

    // Move/rotate the canvas for the next iteration
    p.translate(current, current)
    p.rotate(-p.HALF_PI)

    // Call the function recursively
    fibonacci(current, previous + current, remaining - 1, type)

    // Restore draw settings
    p.pop()
  }

  // Function to create the canvas and configure settings
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.noFill()
  }

  // Function to draw the sketch
  p.draw = () => {

    // Draw the canvas background
    p.background(25)

    // Save current draw settings
    p.push()

    // Move/rotate the canvas
    p.translate(p.width / 2, p.height / 2)
    p.rotate(p.PI / 2)

    // Draw the fibonacci
    fibonacci(0, 1, 20, 'rect')
    // fibonacci(0, 1, 20, 'arc')
    // fibonacci(0, 1, 20, 'triangle')
    // fibonacci(0, 1, 20, 'circle')

    // Restore draw settings
    p.pop()
  }

  // Event handler for key presses
  p.keyPressed = () => {

    // If 's' is pressed
    if (p.key.toLowerCase() === 's') {

      // Save the canvas as a png
      p.saveCanvas('drawing', 'png')
    }
  }

}, document.querySelector('#app'))