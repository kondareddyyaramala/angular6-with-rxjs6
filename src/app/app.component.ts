import { Component } from '@angular/core';
import { of, Observable, from, concat } from 'rxjs';
import { filter, catchError, tap, concatAll } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public formattedArray = [];
  public capitalizedInput;

  ngOnInit() {
    this.fromAndFilterExample();
    this.initializeWebGl();
  }

  // Creating an array from the static array and filtering to get out even numbers 
  // and then subscribing to it and concatenating to the array
  fromAndFilterExample() {
    const obs = from(this.array).pipe(
      filter(v => v % 2 === 0),
    )
    obs.subscribe(v => this.formattedArray.push(v));
  }


  // Javscript method chaining fromAndFilterExample
  capitalize(sentence = '') {
    // capitalize the first word in each word in the five sentence
    this.capitalizedInput = sentence
      .split('')
      .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join('');
  }

  // web gl
  initializeWebGl() {
    const canvas = document.querySelector('#glCanvas') as any;
    const gl = canvas.getContext('webgl')
    if (gl === null) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Vertex shader program

    const vsSource = `
        attribute vec4 aVertexPosition;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        void main() {
          gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }
      `;
    const fsSource = `
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
      `;
  }

  initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }

    return shaderProgram;
  }

  //
  // creates a shader of the given type, uploads the source and
  // compiles it.
  //
  loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

}
