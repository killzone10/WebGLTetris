class Local {
    constructor() {
        this.vertices = [];
        this.colors = [];
        this.normals = [];
        this.indexes = [];
        this.textures = [];
        this.whiteTexture = gl.createTexture();

        this.buffers = {
            /* --------- initialize buffers --------- */
            vertexBuffer: gl.createBuffer(),
            colorBuffer: gl.createBuffer(),
            normalBuffer: gl.createBuffer(),
            indexBuffer:gl.createBuffer(),
            textureBuffer:gl.createBuffer(),

        }

        /* --------- initialize transformation matrix --------- */
        this.transformationMatrix = mat4.create();
        this.normalMatrix = mat3.create();
        gl.bindTexture(gl.TEXTURE_2D, this.whiteTexture);
        let whitePixel = new Uint8Array([255, 255, 255, 255]);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, 
            gl.RGBA, gl.UNSIGNED_BYTE, whitePixel);   

    }

    initData(vertices, indices, colors) {
        /* --------- flatten & convert data to 32 bit float arrays --------- */
        this.vertices = new Float32Array(vertices.flat());
        this.colors = new Float32Array(colors.flat());
        // this.normals = new Float32Array(normals.flat());
        this.indexes = new Uint16Array(indices);

        /* --------- send data to buffers --------- */
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

    

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indexes, gl.STATIC_DRAW);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.textureBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,  this.textures, gl.STATIC_DRAW);

    }

    draw() {
        /* --------- set up attribute arrays --------- */
        Shape.setupAttribute(this.buffers.vertexBuffer, currentShaderProgram.attributes.vertexLocation);
        Shape.setupAttribute(this.buffers.colorBuffer, currentShaderProgram.attributes.colorLocation);
        Shape.setupAttribute(this.buffers.normalBuffer, currentShaderProgram.attributes.normalLocation, true);
        Shape.setupTextureAttribute(this.buffers.textureBuffer, currentShaderProgram.attributes.textureLocation);
        gl.bindTexture(gl.TEXTURE_2D, this.whiteTexture);  // use the white texture


        /* --------- combine view and model matrix into modelView matrix --------- */
        const modelViewMatrix = mat4.create();
        mat4.mul(modelViewMatrix, matrices.viewMatrix, this.transformationMatrix);
        mat3.normalFromMat4(this.normalMatrix, modelViewMatrix);

        /* --------- send modelView matrix to GPU --------- */
        gl.uniformMatrix4fv(currentShaderProgram.uniforms.modelViewMatrix, gl.FALSE, modelViewMatrix);
        gl.uniformMatrix3fv(currentShaderProgram.uniforms.normalMatrix, gl.FALSE, this.normalMatrix);

        /* --------- draw the shape --------- */
        // gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 4);   
        gl.drawElements(gl.LINES, this.indexes.length, gl.UNSIGNED_SHORT, 0);
    }

    rotate(angle, axis, global) {
        /**
         * The transformation functions that glMatrix provides apply the new transformation as the right hand operand,
         * which means the new transformation will be the first one to be applied (this will result in a local transformation)
         *
         * The function call below would look like this if you write down the matrices directly:
         * transformationMatrix * rotationMatrix
         * 
         */
        if (global){
            const rotationMatrix = mat4.create();
            mat4.rotate(rotationMatrix, rotationMatrix, angle, axis);
            mat4.mul(this.transformationMatrix, rotationMatrix, this.transformationMatrix)
        }
        else {
            mat4.rotate(this.transformationMatrix, this.transformationMatrix, angle, axis);
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

    translate(vector, global) {
        if (global){    
            // let scale = []
            // mat4.getScaling( scale, this.transformationMatrix)
            // console.log(scale)
            // vector = calculateNormalVector(scale, vector)
            // mat4.translate(this.transformationMatrix, this.transformationMatrix, vector);
            this.transformationMatrix = translateInGlobal(this.transformationMatrix, vector)


        }
        else {
            mat4.translate(this.transformationMatrix, this.transformationMatrix, vector);

        }
        
    }
    scale(vector, global){
        // if (global){
        //     // console.log(global)
        // }
        // else {
        //     mat4.scale(this.transformationMatrix, this.transformationMatrix, [1,1,1])
        // }
        if (global){
            this.translate_vector = [[
               this.transformationMatrix[12] * vector[0], 
               this.transformationMatrix[13] * vector[1],
               this.transformationMatrix[14]* vector[2],
            ],
            [
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
 
    setTransform(transformationMatrix){
        this.transformationMatrix = transformationMatrix
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
}

