import p5 from 'p5'
import './style.css'

new p5((p) => {

  // Variable declarations to track the state of the sketch 
  let drawingType = 'arc'
  let iterations = 20
  let rotation = 0
  let zoom = 1
  let animate = false

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
      p.stroke(40)
      p.noStroke()
      p.fill(30)
      p.triangle(0, 0, current, 0, current, current)
      p.pop()
    }

    // Circle
    else if (type === 'circle') {
      p.push()
      p.noFill()
      p.stroke(50)
      p.circle(current / 2, current / 2, current)
      p.pop()
    }

    // Rectangle
    else if (type === 'rectangle') {
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

    // If animation is toggled on, add rotation
    if (animate) {
      rotation += 0.005
    }

    // Rotate and scale the canvas
    p.rotate(p.PI / 2 + rotation)
    p.scale(zoom)

    // Draw the fibonacci
    fibonacci(0, 1, iterations, drawingType)

    // Restore draw settings
    p.pop()
  }

  // Keyboard controls for the drawing
  p.keyPressed = () => {
    const key = p.key.toLowerCase()

    console.log('Key:', p.keyCode, 'Iterations:', iterations)

    // Save the current drawing
    if (key === 's') {
      p.saveCanvas('drawing', 'png')
    }

    // Choose a drawing style
    if (key === '1') {
      drawingType = 'arc'
    }

    if (key === '2') {
      drawingType = 'triangle'
    }

    if (key === '3') {
      drawingType = 'circle'
    }

    if (key === '4') {
      drawingType = 'rectangle'
    }

    // Toggle automatic rotation
    if (key === ' ') {
      animate = !animate
      return false
    }

    // Adjust the drawing size
    if (key === '+' || key === '=') {
      zoom = Math.min(zoom * 1.1, 10)
    }

    if (key === '-') {
      zoom = Math.max(zoom / 1.1, 0.1)
    }

    // Adjust the number of shapes
    if (key === 'arrowup') {
      iterations = Math.min(iterations + 1, 25)
      console.log('Iterations:', iterations)
      return false
    }

    if (key === 'arrowdown') {
      iterations = Math.max(iterations - 1, 1)
      console.log('Iterations:', iterations)
      return false
    }

    // Restore the original settings
    if (key === 'r') {
      drawingType = 'arc'
      iterations = 20
      rotation = 0
      zoom = 1
      animate = false
    }
  }

  // Keep the canvas fitted to the browser window
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }

}, document.querySelector('#app'))