//event listeners
window.addEventListener("keydown", (event) => {
    /* ----- this event contains all the information you will need to process user interaction ---- */
   
  
    // translation
    if (['ArrowLeft','a','ArrowRight','d','ArrowUp','w','ArrowDown', 's', '.'].includes(event.key)){ //arrows  , .
        const transVector = {
            "ArrowLeft": [-0.2, 0, 0],
            "a": [-0.2, 0, 0],
            "ArrowRight": [0.2, 0, 0],
            "d": [0.2, 0, 0],
            "ArrowUp": [0, 0, -0.2],
            "w": [0, 0, -0.2],
            "ArrowDown": [0, 0, 0.2],
            "s": [0, 0, 0.2],
            ".": [0, -0.2, 0],
        }[event.key] ?? [0, 0, 0, 0]
            
        toMove.forEach(shape =>{
            if (!checkIfCollisionTranslation(shape, transVector)){
                shape.translate(transVector, true)
            }
            else {
                if (checkIfCollisionTranslation(shape, [0, -0.2, 0])){
                    save = true;
                    spawn = true;
                }
            }
        })
        
      
    }
 
   

    // rotations
    else if (['x','X','y','Y','z','Z'].includes(event.key)){
        let angleInRadians = 90 * Math.PI / 180;
        console.log(angleInRadians)
        const transVector = { // same as scaling but mat4. rotate used instead of scale
            "x": [[-angleInRadians],[ 1, 0, 0]],
            "X": [[angleInRadians],[ 1, 0, 0]],
            "y": [[-angleInRadians],[ 0, 1, 0]],
            "Y": [[angleInRadians],[ 0, 1, 0]],
            "z": [[-angleInRadians],[ 0, 0, 1]],
            "Z":[[angleInRadians],[ 0, 0, 1]],
        }[event.key] ?? [0, 0, 0]   

        toMove.forEach(shape =>{
            if (!checkIfCollisionRotation(shape, transVector[0], transVector[1])){
                shape.rotate(transVector[0], transVector[1], true)
        }
        })
        
       
    }
    else if (['f'].includes(event.key)){
        if (goraud){
            shaderPrograms.goraudSpecular.enable();   
            
        }
        else {
            shaderPrograms.phongSpecular.enable();

        }
        goraud =!goraud
    }
    else if (event.key == 'p'){
        pause = !pause
      } 
    else if (event.key == ' '){ 
        if (space === false){
            transVector = [0, -0.2, 0]
            toMove.forEach(shape =>{
                while (!checkIfCollisionTranslation(tetraShape, transVector)){
                    shape.translate(transVector, true)
                }
                if (checkIfCollisionTranslation(tetraShape, [0, -0.2, 0])){
                    save = true;
                    spawn = true;
                    space = true;

                }
            
            })
        }

    }
    else if (event.key == 'g'){
        grid = !grid;

        if(grid){
            shapes.push(createGrid());
        }
        else {
            shapes.pop()
        }

    }

    else if (['j','l','i','k','u','o'].includes(event.key)){
        let angleInRadians = 10 * Math.PI / 180;
        const transVector = { // same as scaling but mat4. rotate used instead of scale
            "j": [[-angleInRadians],[ 0, 1, 0]],
            "l": [[angleInRadians],[ 0, 1, 0]],
            "k": [[-angleInRadians],[ 1, 0, 0]],
            "i": [[angleInRadians],[ 1, 0, 0]],
            "u": [[-angleInRadians],[ 0, 0, 1]],
            "o":[[angleInRadians],[ 0, 0, 1]],
        }[event.key] ?? [0, 0, 0]   

      rotateCamera(transVector[0], transVector[1])
       
    }
            
    else if (['+', "-"].includes(event.key)){ // i am not sure if zooming is possible for ortho matrix
        const transVector = { // same as scaling but mat4. rotate used instead of scale
            "+": [ 0.0, 0.0, 0.1],
            "-": [ 0.0, 0.0, -0.1],
        }[event.key] ?? [0, 0, 0]   
  
        if (orthographic){
            scaleFactor -= transVector[2]
            console.log(zoom)
        }
        else {
            zoom(transVector)

        }

       
    }
    else if( event.key === 'v'){
        orthographic = !orthographic
        currentShaderProgram.enable();

    }
    else if( event.key === 'b'){
        changeShape = !changeShape
    }
})

let pos_x = 0
let pos_y = 0;
window.addEventListener("mousemove", (event) => {
    if (!pause){

    
    let angle = 5*Math.PI/360
    if (pos_x > event.clientX ){ // left
        rotateCamera(angle, [0,1,0])
        pos_x = event.clientX
        pos_y = event.clientY
    }
    else if (pos_x < event.clientX ){ // right
        rotateCamera(-angle, [0,1,0])
        pos_x = event.clientX
        pos_y = event.clientY
    }
}
   

}
)




function rotateCamera(angle, axis) {

    const rotationMatrix = mat4.create();
    this.translate_vector =  [[matrices.viewMatrix[12] , 
                                matrices.viewMatrix[13]  ,
                                matrices.viewMatrix[14] ,
                            ],[
                            -matrices.viewMatrix[12] , 
                            -matrices.viewMatrix[13] ,
                            -matrices.viewMatrix[14] ,
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
    mat4.mul(matrices.viewMatrix, transf, matrices.viewMatrix);
    
}

function zoom(vector){
    let transf = mat4.create();
    mat4.fromTranslation(transf, vector)
    mat4.mul(matrices.viewMatrix, transf, matrices.viewMatrix)

}




