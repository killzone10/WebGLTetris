let outputKa = document.getElementById("KaVal");
let outputKd = document.getElementById("KdVal");
let outputKs = document.getElementById("KsVal");


window.onload = async () => {

    /* --------- basic setup --------- */
    let canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    gl.clearColor(0.729, 0.764, 0.674, 1);

    // load texture its important to be done in async function !
    texture = loadTexture(gl, "tex2.png");
    // create also white texture
    whiteTex = gl.createTexture();

    const program = createShaderProgram("v-shader", "f-shader");
    gl.useProgram(program);
    // Flip image pixels into the bottom-to-top order that WebGL expects.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);    /* --------- save attribute & uniform locations --------- */
       // calculate view and projection matrix

    // initialize ortho rojection Matrix and projectiomMatrix
    mat4.perspective(matrices.perspectiveProjectionMatrix, toRad(45), canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    mat4.ortho(matrices.orthoProjectionMatrix, -canvas.clientWidth / canvas.clientHeight,  canvas.clientWidth / canvas.clientHeight, -1.35, 1.35, 0.1, 100);
    mat4.lookAt(matrices.viewMatrix, cameraPos, [0, 0, 0], [0, 1, 0]);
    // create shader programs and enable one of them

    // Coefficients
    Ka = document.getElementById("Ka");
    Kd = document.getElementById("Kd");
    Ks = document.getElementById("Ks");

    // Update the coefficient values each time the slider is being moved
    Ka.oninput = function() {
        constAmbient = Ka.value / 100;
        kaVal.innerText = constAmbient

    }
    Kd.oninput = function() {
        constDiffuse = Kd.value / 100;
        kdVal.innerText = constDiffuse
    }
    Ks.oninput = function() {
        constSpecular = Ks.value / 100;
        ksVal.innerText = constSpecular

    }
    
    // shader programs
    shaderPrograms.withLightProgram = new ShaderProgram(shaders.withLight, shaders.fragment, shaderInfo);
    shaderPrograms.goraudSpecular = new ShaderProgram(shaders.goraudSpecularVertex, shaders.fragment, shaderInfo);
    shaderPrograms.phongSpecular = new ShaderProgram(shaders.phongDiffuseVertex, shaders.phongSpecularFragment, shaderInfo);

    /* --------- translate view matrix --------- */
    mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [-0, 0, 0])

    // translating light to -1,-1,-1 
    mat4.translate(matrices.lightMatrix, matrices.lightMatrix, [1, 1,  1]) // light matrix
    mat4.getTranslation(vectors.lightPos, matrices.lightMatrix) // light vector
    // enabling withLightProgram because why not
    shaderPrograms.withLightProgram.enable();

    
    // push bounding box
    shapes.push(createBoundingBox());
    // Initiaize collision array IMPORTANT !
    initializeCollisionArray()
    //initialize game
    gameStarted = true;
    /* --------- start render loop --------- */
    requestAnimationFrame(render);
}




function render() {
    
   if(rendering){

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // check if ortographic or perspective matrix should be used and send proper one
    if (orthographic){
      // scale factor is added for zooming !
        mat4.ortho(matrices.projectionMatrix, -canvas.clientWidth / canvas.clientHeight,  canvas.clientWidth / canvas.clientHeight, -1.35/ scaleFactor, 1.35 / scaleFactor, 0.1/ scaleFactor, 100 / scaleFactor);

        gl.uniformMatrix4fv(currentShaderProgram.uniforms.projectionMatrix, gl.FALSE, matrices.projectionMatrix);

    }
    else {
            mat4.perspective(matrices.projectionMatrix, toRad(60), canvas.clientWidth / canvas.clientHeight, 0.1, 100);

        gl.uniformMatrix4fv(currentShaderProgram.uniforms.projectionMatrix, gl.FALSE, matrices.projectionMatrix);

    }
    // sending data to shaders
    gl.uniformMatrix4fv(currentShaderProgram.uniforms.viewMatrix, gl.FALSE, matrices.viewMatrix);
    //rotation + translation
    gl.uniformMatrix4fv(currentShaderProgram.uniforms.lightMatrix, gl.FALSE, matrices.lightMatrix);
    gl.uniform3fv(currentShaderProgram.uniforms.lightPos, vectors.lightPos);

    // scaling
    gl.uniformMatrix3fv(currentShaderProgram.uniforms.normalMatrix, gl.FALSE, matrices.inverseTranspose);

    gl.uniform1f(currentShaderProgram.uniforms.ambientConst, constAmbient)
    gl.uniform1f(currentShaderProgram.uniforms.diffuseConst, constDiffuse)
    gl.uniform1f(currentShaderProgram.uniforms.specularConst, constSpecular)

    // draw bounding box + grid
    shapes.forEach(shape => {
        shape.draw(); // bounding box + mesh
        
    });
    // draw the rest
    tetraShapes.forEach(shape => {
        shape.draw();
        
    });
    //  play tetris ;)
    playGame();
    requestAnimationFrame(render)
  }
}



// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL
function loadTexture(gl, url) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
  
    // Because images have to be downloaded over the internet
    // they might take a moment until they are ready.
    // Until then put a single pixel in the texture so we can
    // use it immediately. When the image has finished downloading
    // we'll update the texture with the contents of the image.
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 255, 255, 255]); // opaque blue
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      width,
      height,
      border,
      srcFormat,
      srcType,
      pixel
    );
  
    const image = new Image();
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        level,
        internalFormat,
        srcFormat,
        srcType,
        image
      );
  
      // WebGL1 has different requirements for power of 2 images
      // vs. non power of 2 images so check if the image is a
      // power of 2 in both dimensions.
      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
        // Yes, it's a power of 2. Generate mips.
        gl.generateMipmap(gl.TEXTURE_2D);
      } else {
        // No, it's not a power of 2. Turn off mips and set
        // wrapping to clamp to edge
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
    };
    image.src = url;
  
    return texture;
  }
  
  function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
  }


 