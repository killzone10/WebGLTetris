//Cube class

class Shape {
    constructor() {
        this.vertices = [];
        this.vertices1 = []
        this.colors = [];
        this.normals = [];
        this.base_pos = [];
        this.textures = [];
        this.buffers = {
            // initialize buffers
            vertexBuffer: gl.createBuffer(),
            // this one is for "b"
            vertexBuffer1: gl.createBuffer(),
            colorBuffer: gl.createBuffer(),
            normalBuffer: gl.createBuffer(),
            textureBuffer:gl.createBuffer(),
        }

        // initialize transformation and normal matrix
        this.transformationMatrix = mat4.create();
        this.normalMatrix = mat3.create();
    }

    initData(vertices, colors, normals, texture, vertices1) {
        // flatten & convert data to 32 bit float arrays
        this.vertices = new Float32Array(vertices.flat());
        this.colors = new Float32Array(colors.flat());
        this.normals = new Float32Array(normals.flat());
        this.textures = new Float32Array(texture.flat())
        this.vertices1 = new Float32Array(vertices1.flat());
        // send data to buffers

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertexBuffer1);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices1, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
    
       
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.textureBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,  this.textures, gl.STATIC_DRAW);

        // gl.activeTexture(gl.TEXTURE0);

            // Bind the texture to texture unit 0
     


// Tell the shader we bound the texture to texture unit 0
    }
    // draw() {
    //     /* --------- set up attribute arrays --------- */
    //     Shape.setupAttribute(this.buffers.vertexBuffer, currentShaderProgram.attributes.vertexLocation);
    //     Shape.setupAttribute(this.buffers.colorBuffer, currentShaderProgram.attributes.colorLocation);
    //     Shape.setupAttribute(this.buffers.normalBuffer, currentShaderProgram.attributes.normalLocation, true);

    //     /* --------- combine view and model matrix into modelView matrix --------- */
    //     const modelViewMatrix = mat4.create();
    //     mat4.mul(modelViewMatrix, matrices.viewMatrix, this.transformationMatrix);

    //     // construct normal matrix as inverse transpose of modelView matrix
    //     mat3.normalFromMat4(this.normalMatrix, modelViewMatrix);

    //     // send modelView and normal matrix     to GPU
    //     gl.uniformMatrix4fv(currentShaderProgram.uniforms.modelViewMatrix, gl.FALSE, modelViewMatrix);
    //     gl.uniformMatrix3fv(currentShaderProgram.uniforms.normalMatrix, gl.FALSE, this.normalMatrix);

    //     // draw the shape
    //     gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 4);
    // }

    rotate(angle, axis, global) {

        if (global){ // left most operand
            const rotationMatrix = mat4.create();
            this.translate_vector =  [[this.transformationMatrix[12] - this.base_pos[0], 
                                     this.transformationMatrix[13] - this.base_pos[1] ,
                                     this.transformationMatrix[14] - this.base_pos[2],
                                    ],[
                                    -this.transformationMatrix[12] + this.base_pos[0], 
                                    -this.transformationMatrix[13] + this.base_pos[1],
                                    -this.transformationMatrix[14] + this.base_pos[2],
                                    ]]
            let transf = mat4.create();
            let translation  = vec3.create();
            let inverseTranslation = vec3.create();
            translation = this.translate_vector[0]
            inverseTranslation = this.translate_vector[1]
            // console.log(translation)
            // console.log(this.transformationMatrix)
            let invtransMat = mat4.create();
            let transMat = mat4.create();

            mat4.fromTranslation(invtransMat, inverseTranslation);
            mat4.fromTranslation(transMat, translation) ;                        
            console.log(invtransMat)
            // this.translate(this.translate_vector[1], false)
            mat4.fromRotation(rotationMatrix, angle, axis);

            // mat4.rotate(rotationMatrix, rotationMatrix, angle, axis); //rotation matrix
            console.log(rotationMatrix)
            mat4.mul(transf, rotationMatrix, invtransMat);
            mat4.mul(transf, transMat, transf);
            // console.log(transf)
            mat4.mul(this.transformationMatrix, transf, this.transformationMatrix);
            // this.translate(this.translate_vector[0], false)
                                //    console.log(this.transformationMatrix)
             
        }
        else { // right most operand
            mat4.rotate(this.transformationMatrix, this.transformationMatrix, angle, axis);
            // we have to move our object to 0,0,0 then rotate it then move back

        }

        /**
         * To get global transformations, you need to apply the new transformation after all the other transformations, i.e. as the left-most operand:
         * rotationMatrix * transformationMatrix
         * 
         * You can do this manually by construction the transformation matrix and then using mat4.multiply(out, leftOperand, rightOperand).
         * Uncomment the code below (and comment out the code above) to do global rotations instead of local ones.
         * 
         */
        /*
            const rotationMatrix = mat4.create();
            mat4.rotate(rotationMatrix, rotationMatrix, angle, axes);
            mat4.mul(this.transformationMatrix, rotationMatrix, this.transformationMatrix)
        */
    }

    translate(vector, global) { // translation 
        if (global){ // i am not really sure if translation should works like that, If i translate 1 in gloobal coordinate system 
             
            /*  another approach below
            //let scale = []
            // mat4.getScaling( scale, this.transformationMatrix)
            // console.log(scale)
            // vector = calculateNormalVector(scale, vector)
            // mat4.translate(this.transformationMatrix, this.transformationMatrix, vector);
            // mat4.translate(translationMatrix, vector, translationMatrix)
            // mat4.add(translationMatrix,  translationMatrix, this.transformationMatrix)
            // this.transformationMatrix = translationMatrix
            // mat4.translate(this.transformationMatrix, this.transformationMatrix, vector); */

            this.transformationMatrix = translateInGlobal(this.transformationMatrix, vector)


        }
        else {
            mat4.translate(this.transformationMatrix, this.transformationMatrix, vector);

        }
    }

    scale(vector, global){
        if (global){
            this.translate_vector = [[ //  I move it to 0, 0 then move it to calculated place
            // new place
               this.transformationMatrix[12] * vector[0], 
               this.transformationMatrix[13] * vector[1],
               this.transformationMatrix[14]* vector[2],
            ],
            [
                // vector to 0,0,0
             -this.transformationMatrix[12], 
              - this.transformationMatrix[13] ,
              - this.transformationMatrix[14] ,
            ]]
            // move to 0,0, 0
           this.translate(this.translate_vector[1], global)
            // scale

            mat4.scale(this.transformationMatrix, this.transformationMatrix, vector)
            // move again with scaled amounts
            this.translate(this.translate_vector[0], global)
        }
        else {
            mat4.scale(this.transformationMatrix, this.transformationMatrix, vector)
        }
    }
    
    static setupAttribute(buffer, location, isNormal = false) {
        if (location === -1 || location === undefined) return;

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        gl.vertexAttribPointer(
            location, // the attribute location
            isNormal ? 3 : 4, // number of elements for each attribute/vertex
            gl.FLOAT, // type of the attributes
            gl.FALSE, // is data normalised?
            (isNormal ? 3 : 4) * Float32Array.BYTES_PER_ELEMENT, // size for one vertex
            0 // offset from begin of vertex to the attribute
        );

        // enable the attribute
        gl.enableVertexAttribArray(location);
    }
    static setupTextureAttribute(buffer, location) {
        if (location === -1 || location === undefined) return;

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        gl.vertexAttribPointer(
            location, // the attribute location
            2, // number of elements for each attribute/vertex
            gl.FLOAT, // type of the attributes
            gl.FALSE, // is data normalised?
            0, // size for one vertex
            0 // offset from begin of vertex to the attribute
        );

        // enable the attribute
        gl.enableVertexAttribArray(location);
    }
}


// translate in Global coordinate space /

function translateInGlobal(transformationMatrix, vector){
    transformationMatrix[12] = transformationMatrix[12] + vector[0]
    transformationMatrix[13] = transformationMatrix[13]+ vector[1]
    transformationMatrix[14] = transformationMatrix[14]+ vector[2]
    return transformationMatrix
}