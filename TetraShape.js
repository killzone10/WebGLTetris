const tetrominos = {
    0: 'I',
    1: 'O',
    2: 'T',
    3: 'J',
    4: 'L',
    5: 'S',
    6: 'Z',

}

class TetraShape {
    constructor() {
        this.shapes = [];
        this.letters = ['a','b','c','d']
        this.random = Math.floor(Math.random() * 7); // from 0 to 6  because we have 7 tetrominos
        this.tetromino = tetrominos[this.random];
        this.transformationMatrix = mat4.create();
        this.normalMatrix = mat3.create();
        this.remaining_pieces = 0
        //random coordinates
        this.shiftmentX =  Math.floor(Math.random() * 3);
        this.shiftmentZ =  Math.floor(Math.random() * 4);
        this.counter = false;
        this.whiteTexture = gl.createTexture();
        // random tetromino
        // each of these tetrominos is randomly translated !
        switch(this.tetromino){
            case 'I':
                this.sendShapes(4, this.tetromino);
                this.shapes[1].translate([0.2, 0.0, 0])
                this.shapes[2].translate([0.4, 0.0, 0])
                this.shapes[3].translate([0.6, 0.0, 0])
                this.translate([0,0,  0.2 * this.shiftmentZ], true)
                break;
            case 'O':
                this.sendShapes(4, this.tetromino);
                this.shapes[1].translate([0, 0.2, 0])
                this.shapes[2].translate([0.2,0 , 0])
                this.shapes[3].translate([0.2, 0.2, 0])
                this.translate([0.2 * this.shiftmentX ,0,  0.2 * this.shiftmentZ], true)

                break;
            case 'T':
                this.sendShapes(4, this.tetromino);
                this.shapes[1].translate([0.2, 0.0, 0])
                this.shapes[2].translate([0.2, 0.2, 0])
                this.shapes[3].translate([0.4, 0.0, 0])
                if (this.shiftmentX >= 2){
                    this.shiftmentX = 1
                }
                this.translate([0.2 * this.shiftmentX ,0,  0.2 * this.shiftmentZ], true)

                break;
            case 'J':
                this.sendShapes(4, this.tetromino);
                this.shapes[0].translate([0.2, 0.0, 0])
                this.shapes[1].translate([0.2, 0.2, 0])
                this.shapes[2].translate([0.2, 0.4, 0])
                this.shapes[3].translate([0, 0.4, 0])
                this.translate([0.2 * this.shiftmentX ,0,  0.2 * this.shiftmentZ], true)

                break;
            case 'L':
                this.sendShapes(4, this.tetromino);
                this.shapes[1].translate([0, 0.2, 0])
                this.shapes[2].translate([0, 0.4, 0])
                this.shapes[3].translate([0.2, 0.4, 0])
                this.translate([0.2 * this.shiftmentX ,0,  0.2 * this.shiftmentZ], true)

                break;
            case 'S':
                this.sendShapes(4, this.tetromino);
                this.shapes[0].translate([0, 0.2, 0])
                this.shapes[1].translate([0.2, 0.2, 0])
                this.shapes[2].translate([0.2, 0.0, 0])
                this.shapes[3].translate([0.4, 0.0, 0])
                if (this.shiftmentX >= 2){
                    this.shiftmentX = 1
                }
                this.translate([0.2 * this.shiftmentX ,0,  0.2 * this.shiftmentZ], true)

                break;      
            case 'Z':
                this.sendShapes(4, this.tetromino);
                this.shapes[1].translate([0.2, 0, 0])
                this.shapes[2].translate([0.2, 0.2, 0])
                this.shapes[3].translate([0.4, 0.2, 0])
                if (this.shiftmentX >= 2){
                    this.shiftmentX = 1
                }
                this.translate([0.2 * this.shiftmentX ,0,  0.2 * this.shiftmentZ], true)
                break;  
            default:
                break;       
        }
        // move to proper place
        // this.shapes.forEach(shape => {
        //     // shape.translate([0.0, 0.0, 0], false)
        //     shape.translate([-0.0, -0.2, -0.0], true)
        // })
        // MOVE TO BEGGINING OF THE COORDINATE SYSTEM
        this.translate(([-0.3, 1.3, -0.3])); // [0][0][0]
        let coordinates = checkArrayIndexes(this.transformationMatrix[12],
                                            this.transformationMatrix[14],
                                            this.transformationMatrix[13])

        // gl.uniformMatrix4fv(this.uniforms.projectionMatrix, gl.FALSE, matrices.projectionMatrix);
        // gl.uniformMatrix4fv(this.uniforms.viewMatrix, gl.FALSE, matrices.viewMatrix);
        // gl.uniformMatrix4fv(this.uniforms.lightMatrix, gl.FALSE, matrices.lightMatrix);
        // gl.uniform3fv(this.uniforms.lightPos, vectors.lightPos);
        if (counter %5 == 0){
            this.counter = true;
            gl.bindTexture(gl.TEXTURE_2D,this.whiteTexture)
            // gl.bindTexture(gl.TEXTURE_2D, whiteTex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                          new Uint8Array([1, 1, 1, 1]));

        }
        else {
            gl.bindTexture(gl.TEXTURE_2D, this.whiteTexture);
            let whitePixel = new Uint8Array([255, 255, 255, 255]);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, 
                gl.RGBA, gl.UNSIGNED_BYTE, whitePixel);   
        }
        counter++

    }   


    draw() {
        this.shapes.forEach(shape => {
             /* --------- set up attribute arrays --------- */
             if (!changeShape){
                Shape.setupAttribute(shape.buffers.vertexBuffer, currentShaderProgram.attributes.vertexLocation);

             }
             else{
                Shape.setupAttribute(shape.buffers.vertexBuffer1, currentShaderProgram.attributes.vertexLocation);

             }

            Shape.setupAttribute(shape.buffers.normalBuffer, currentShaderProgram.attributes.normalLocation, true);
            Shape.setupAttribute(shape.buffers.colorBuffer, currentShaderProgram.attributes.colorLocation);
            Shape.setupTextureAttribute(shape.buffers.textureBuffer, currentShaderProgram.attributes.textureLocation);
            // every 5th
            if (this.counter){
                gl.disableVertexAttribArray(currentShaderProgram.attributes.colorLocation);
                gl.vertexAttrib4f(currentShaderProgram.attributes.colorLocation, 1, 1, 1, 1);
                // Shape.setupTextureAttribute(shape.buffers.textureBuffer, currentShaderProgram.attributes.textureLocation);
                gl.bindTexture(gl.TEXTURE_2D, texture);


        }
        else{            
            Shape.setupAttribute(shape.buffers.colorBuffer, currentShaderProgram.attributes.colorLocation);

            gl.bindTexture(gl.TEXTURE_2D, this.whiteTexture);  // use the white texture
            // gl.bindTexture(gl.TEXTURE_2D, whiteTex);

            // gl.vertexAttrib4f(currentShaderProgram.attributes.colorLocation, currentShaderProgram.attributes.colorLocation);


        }

        /* --------- combine view and model matrix into modelView matrix --------- */
        const modelViewMatrix = mat4.create();
        let modelMatrix = mat4.create();
        
        mat4.mul(modelMatrix, this.transformationMatrix, shape.transformationMatrix, )
        mat4.mul(modelViewMatrix, matrices.viewMatrix, modelMatrix);
        // construct normal matrix as inverse transpose of modelView matrix
        mat3.normalFromMat4(this.normalMatrix, modelViewMatrix);

        // send modelView and normal matrix     to GPU
        gl.uniformMatrix4fv(currentShaderProgram.uniforms.modelViewMatrix, gl.FALSE, modelViewMatrix);
        gl.uniformMatrix3fv(currentShaderProgram.uniforms.normalMatrix, gl.FALSE, this.normalMatrix);
        gl.uniform1i(currentShaderProgram.uniforms.texture, 0);

        // draw the shape
        gl.drawArrays(gl.TRIANGLES, 0, shape.vertices.length / 4);
            
        });
       
    }
    // create x shapes with color
    sendShapes(amount, color){
        for (let i = 0; i <= amount - 1; i++ ){
            let cube = createShape(color);
            this.shapes.push(cube);
        }
    }
    
   
    //rotation can be done in 2 ways -- either translate object to origin, rotate, and translate back or 1 huge rotation !

    rotate(angle, axis ) {
    
        const rotationMatrix = mat4.create();
        this.translate_vector =  [[this.transformationMatrix[12] , 
                                    this.transformationMatrix[13]  ,
                                    this.transformationMatrix[14] ,
                                ],[
                                -this.transformationMatrix[12] , 
                                -this.transformationMatrix[13] ,
                                -this.transformationMatrix[14] ,
                                ]]

        let transf = mat4.create();
        let translation = this.translate_vector[0]
        let inverseTranslation = this.translate_vector[1]

        let invtransMat = mat4.create();
        let transMat = mat4.create();
        mat4.fromTranslation(invtransMat, inverseTranslation);
        mat4.fromTranslation(transMat, translation) ;                        
        mat4.fromRotation(rotationMatrix, angle, axis);

        mat4.mul(transf, rotationMatrix, invtransMat);
        mat4.mul(transf, transMat, transf);
        mat4.mul(this.transformationMatrix, transf, this.transformationMatrix);
        /* THIS WORKS TOO BUT MATRIX MULTIPLICATION AS 1 SHOULD BE BETTER 
        this.translate(this.translate_vector[0], false)
                               console.log(this.transformationMatrix)
       
            const rotationMatrix = mat4.create();
            this.translate(this.translate_vector[1], true)
            mat4.rotate(rotationMatrix, rotationMatrix, angle, axis);
            mat4.mul(this.transformationMatrix, rotationMatrix, this.transformationMatrix)
            this.translate(this.translate_vector[0], true)
        */

    }
    // only translation in global is legit there

    translate(vector, global) { // translation 
        if (global){    
            this.transformationMatrix = translateInGlobal(this.transformationMatrix, vector)


        }
        else {
            mat4.translate(this.transformationMatrix, this.transformationMatrix, vector);
        }
    }
    //get coordinates of each cube

    getCubeCoordinates(){
        let coordinates = [];
        let cords = [];
        this.shapes.forEach(shape => {
            let coordinate = vec4.create();
            let transformationMatrix = mat4.create();

            mat4.multiply(transformationMatrix, this.transformationMatrix, shape.transformationMatrix);
            vec4.transformMat4(coordinate, [0, 0, 0, 1], transformationMatrix);
            for ( let i = 0; i < 4 ; i++){
                cords[i] = coordinate[i].toFixed(3);
            }
            coordinates.push(coordinate);
        });  
        return coordinates;
    }
    //destroy speceified cube

    destroy(letter)
    {  
        let index = 0 ;
        index = this.letters.findIndex(element => element == letter)
        console.log(index)
        this.letters.splice(index, 1)
        // frankly speaking this switch case is not needed
        switch(letter){
            case 'a': // 
                this.shapes.splice(index,1)
                break;
            case 'b':
                this.shapes.splice(index,1)
                break;
            case 'c':
                this.shapes.splice(index,1)
                break;
            case 'd':
                this.shapes.splice(index,1)
                break;
            default:
                break;
        }
    }
 
}


function translateInGlobal(transformationMatrix, vector){
    transformationMatrix[12] = transformationMatrix[12] + vector[0]
    transformationMatrix[13] = transformationMatrix[13]+ vector[1]
    transformationMatrix[14] = transformationMatrix[14]+ vector[2]
    return transformationMatrix
}