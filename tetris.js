// timing coefficients
let then = Date.now();
let now = 0;
let ratio = 1000;
//game coefficients
let spawn = true;
let gameOver = false;let collisionArray = [];
let pause = false;
let save = false;
//collision array coefficients
let colArrayX = 4;
let colArrayZ = 4;
let colArrayY = 14;
let HeightY = 2.8;
let WidthX = 0.8;
let xRatio = WidthX/colArrayX;
let zRatio = xRatio;
let yRatio = HeightY/colArrayY

let globalCounter = 0;
//init of collision array

function initializeCollisionArray(){
    collisionArray = Array(4).fill().map(e => Array(4).fill().map(e => Array(14).fill("0").map(e => e)));

}
function checkArrayIndexes(posX, posZ, posY){
    let coordinates  = [ posX / xRatio ,
                        posZ /  zRatio,
                        posY / yRatio, 
                      ];
    return coordinates;

}
// main loop

function playGame(){
    now  = Date.now();    
    // if !gameOver play 

    if (!gameOver){
        // if !pause play
        if (!pause){
            // if tetromino should be saved
            if (save){
                save = false;
                //update collision matrix of current tetromino
                updateCollisionMatrix(tetraShape);
                // check if we lost
                checkGameOver();
            }
            if (spawn){
                let destroyList = checkIfFloorShouldDestroy()
                let list = destroyList[0][1].sort()

                if (destroyList[0][0] === true){
                    for (let i = 0; i< destroyList[0][1].length; i++){
                        destroyFloor(list[i])
                      
                    }
                    for (let i = 0; i< destroyList[0][1].length; i++){
                        moveEverythingAboveDown(list[i]) // move every tetromino above floor x down
                        matrixUpdateAfterDestroy(list[i]); // update collision matrix
                    }
                }
                toMove.clear()  // clear toMove Set
                // create new tetromino add it to global list and to toMove array
                tetraShape = new TetraShape;

                toMove.add(tetraShape)
                tetraShapes.push(tetraShape)

                // add shape so it can be movable
                spawn = false;
                space = false;

            }
            if (now - then > ratio){
                then = now;
                toMove.forEach(tetraShape =>{
                    if (!checkIfCollisionTranslation(tetraShape,  [0, - 0.2, 0])){
                        tetraShape.translate([0, - 0.2, 0], true)
                    }
                    else {
                        if (checkIfCollisionTranslation(tetraShape,  [0, -0.2, 0])){
                            save = true;
                            spawn = true;

                        }
                    
                    }

                })    

            }
        }
    }    
    else{
        // ife we lost and we click start it restarts the game
        let start = startAgain()
        if (start){
            while(tetraShapes.length > 0 ){
                tetraShapes.pop();
            }
            initializeCollisionArray();

        gameOver = false;
        spawn = true
        }
        else {
            alert("GAME OVER")
            rendering = false;

        }
        

    }
}
// function which check collision in translation
function checkIfCollisionTranslation(tetraShape, vector){
    let coordinates = tetraShape.getCubeCoordinates();

    let mockTransformationMatrix = mat4.create() // transformation matrix of our shape
    // we need to create artificial transformations and check if something in collision array collides
    let collision = false;
    mockTransformationMatrix = mat4.clone(tetraShape.transformationMatrix)
        // also check collision with borders !
        // tetraShape.shapes.forEach(shape =>{
        //     let localTransformationMatrix = mat4.create();
        let begPosition = vec3.create()
        let endPostion = vec3.create()
        let diff = vec3.create()
        let translationMatrix = mat4.create()
        mat4.getTranslation(begPosition, mockTransformationMatrix)
        // console.log(begposition) // here we have to return getcubecoordinates moved by translation vector !!
        mat4.fromTranslation(translationMatrix, vector)
        // console.log("MATRIX TRANSLACJI", translationMatrix)
        // transformationMatrix = translateInGlobal(transformationMatrix, vector)
        mat4.mul(mockTransformationMatrix, mockTransformationMatrix, translationMatrix)
        // console.log(mockTransformationMatrix)

        mat4.getTranslation(endPostion, mockTransformationMatrix)
        // console.log("Beggining", begPosition) // here we have to return getcubecoordinates moved by translation vector !!
        // console.log("End", endPostion) // here we have to return getcubecoordinates moved by translation vector !!
        vec3.sub(diff, endPostion, begPosition)
        // })
        // for (let i = 0 ; i < 3 ; i++){
        //     diff1.push(diff[i].toFixed(2))
        // }
        // console.log(coordinates)
        // FRANKLY SPEAKING I USED ONLY CODE BELOW, because it was easier ;)
        coordinates.forEach(coordinate => {
            coordinate[0] = coordinate[0] + vector[0];
            coordinate[1] = coordinate[1] + vector[1];
            coordinate[2] = coordinate[2] + vector[2];

        });
        collision = checkIfCollide(coordinates)
        // console.log(collision)
        return collision
        
}
   
    // return newPos

    
// function which check collision in rotation 
// copying the transformatonMatrix of tetraShape, creating the transformationMatrix after translating it to
// oragin rotating it and translating back and cecking if the result coordinates colides with array 
function checkIfCollisionRotation(tetraShape, angle, axis){
    
    let mockTransformationMatrix = mat4.create() // transformation matrix of our shape
    // we need to create artificial transformations and check if something in collision array collides
    let collision = false;
    mockTransformationMatrix = mat4.clone(tetraShape.transformationMatrix)
//the easiest way to do that is to copy our object rotate it (because its implemented and return position)
      
    const rotationMatrix = mat4.create(); // creating artificial rotation  matrix
    let translate_vector =  [[mockTransformationMatrix[12] , 
                                mockTransformationMatrix[13]  ,
                                mockTransformationMatrix[14] ,
                            ],[
                            -mockTransformationMatrix[12] , 
                            -mockTransformationMatrix[13] ,
                            -mockTransformationMatrix[14] ,
                            ]]

    let transf = mat4.create();
    let translation = translate_vector[0]
    let inverseTranslation = translate_vector[1]
    let invtransMat = mat4.create();
    let transMat = mat4.create();
    mat4.fromTranslation(invtransMat, inverseTranslation);
    mat4.fromTranslation(transMat, translation) ;                        
    mat4.fromRotation(rotationMatrix, angle, axis);

    mat4.mul(transf, rotationMatrix, invtransMat);
    mat4.mul(transf, transMat, transf);
    mat4.mul(mockTransformationMatrix, transf, mockTransformationMatrix);
    let coordinates = [];
    let cords = [];
    tetraShape.shapes.forEach(shape => {
        let coordinate = vec4.create();
        let transformationMatrix = mat4.create();

        mat4.multiply(transformationMatrix, mockTransformationMatrix, shape.transformationMatrix);
        vec4.transformMat4(coordinate, [0, 0, 0, 1], transformationMatrix);
        for ( let i = 0; i < 4 ; i++){
            cords[i] = coordinate[i].toFixed(3);
        }
        coordinates.push(coordinate);
    });  

    collision = checkIfCollide(coordinates)
    return collision

}

    
// X, Z from - 0.3 to 0.3 ( its 0.4 and - 0.4 but the middle of the cube is in 0.3 in other words we cant move past 0.3 and -0.3)
// - 0.3 - 0.1  0.1 and 0.3 are middles of cubes
// this check if coordinates of tetrashape overlap with coordinates of saved tetras and returns True they collide
function checkIfCollide(position){
    let x = 0;
    let y = 0;
    let z = 0;
    let collision = false;
    position.forEach(element => {
        x = ((element[0] + 0.4)/xRatio).toFixed(3);
        y = (((element[1] + 1.2)/yRatio).toFixed(3));
        z = ((element[2] + 0.4)/zRatio).toFixed(3);
        // console.log(x,y,z)

        x = Math.floor(x);
        y = Math.floor(y);
        z = Math.floor(z);
    
        // collisionArray[x][z][y] = shapes1.length + str[i]
        // console.log(x,y,z)
     
        if (x < 0 || y < 0 || z < 0 || x > 3 || z > 3){
            collision = true;
        }
        else {
            if (collisionArray[x][z][y] !== "0"){
                collision = true
            }
        }   
        
       
       
    });
    return collision

}

function updateCollisionMatrix(tetraShape){
    let x = 0;
    let y = 0;
    let z = 0;
    let str = "abcd"
    let i = 0;
    let position = tetraShape.getCubeCoordinates();

    position.forEach(element => {
        x = ((element[0] + 0.4)/xRatio).toFixed(2);
        y = (((element[1] + 1.2)/yRatio).toFixed(3));
        z = ((element[2] + 0.4)/zRatio).toFixed(2);
        x = Math.floor(x);
        y = Math.floor(y);
        z = Math.floor(z);
        if (x < 0 || y < 0 || z < 0 || x > 3 || z > 3){
        }
        else{
            // collisionArray[x][z][y] = tetraShapes.length + str[i]
            // udating tetra and which cube
            collisionArray[x][z][y] = [tetraShape, str[i]]

        }
        i++

    });

}

function checkIfFloorShouldDestroy(){
    let boolDestroyList = []
    let mapping = [];
    let list = []
    //initializing 12 trues to boolDestroyList

    for ( let i = 0 ; i < 12; i ++  ){      // 12 trues
        boolDestroyList.push(true);
        mapping.push(i);
    }
        // iterating 1 time through [0][0][z] so it it maps which iterations can be skipped

    for (let k = 0 ; k < collisionArray[0][0].length - 2; k++){ // do one iteration to check which pieces have to be iterated thourugly
        if (collisionArray[0][0][collisionArray[0][0].length - 2 - k] === "0"){
                boolDestroyList[collisionArray[0][0].length - 2 - k] = false;
                mapping.splice(collisionArray[0][0].length - 2 - k, 1) 
        }   
    }
    //iteratingh throudh the rest

    for (let i = 0; i < collisionArray.length; i++){ // X
        for (let j = 0 ; j < collisionArray[0].length ; j++){
            for (let k = 0 ; k < mapping.length ; k++)
                if (collisionArray[i][j][mapping[k]] === "0"){
                        boolDestroyList[mapping[k]] = false;
                }   

        }
    }    
    // creating arr which tells if there is something to destroy (first element) and second element is what should be destroyed

    let arr = [[
        false,list
    ]]    
    // pushing to this arr

    for (let i = 0 ; i < boolDestroyList.length; i++){
        if (boolDestroyList[i] === true){
            arr[0][0] = true
            list.push(i)
        }  
    }
    return arr // returning arr with true/ false and indexes of things to destroy
}

//destroying the floor. In the collision matrix there are tetrashapes saved and also the cube which is in this space e.g
// [tetrashape, A] [tetrashape, B] meaning that here is tetrashape, and from that tetrashape its Cube B
function destroyFloor(floor){
    let str;
    let cubeSign = 'z';
    let tetra;
    for (let i = 0 ; i < collisionArray.length; i ++){
        for (let j = 0; j <collisionArray[0].length; j++){
            // we need figure.lenght and divide on the n-1 place
            str = collisionArray[i][j][floor]
            tetra = str[0]
            cubeSign = str[1]
            // tetraNumber = str.substr(0, str.length - 1) - 1
            if (tetra == null){
                continue;
            }
            // destroying tetra cube
            tetra.destroy(cubeSign)
            collisionArray[i][j][floor] = "0"

        }
    }
    // destroyArr if tetrashape is null then destroy it
    let destroyArr = []
    for (let i = 0; i < tetraShapes.length; i ++){
        if (tetraShapes[i].shapes.length === 0){
            destroyArr.push(i)
        }
    }
   // destroy from the last element so splice doesnt interfere with rest of the list
    for (let i = 0 ; i< destroyArr.length; i ++){
        tetraShapes.splice(destroyArr[destroyArr.length - i - 1], 1)
        
    }
    
    
}

// after destroy everything that is above floor should be moved 1 unit down
function moveEverythingAboveDown(floor){
    let moveDown = new Set()
    for (let i  = 0 ; i < collisionArray.length; i++){
        for (let j = 0; j <collisionArray[0].length; j++){
            for (let k = floor + 1 ; k < collisionArray[0][0].length ; k++ ){
                if (collisionArray[i][j][k][0] !== "0"){
                    moveDown.add(collisionArray[i][j][k][0])
                }
                
            }
        }
    }
    console.log(moveDown)
    moveDown.forEach(tetraShape => {
        tetraShape.translate([0, - 0.2, 0], true) // translate the ones above destruction point //
        // collision matrix 1 below

    });
}


// update matrix
function matrixUpdateAfterDestroy(floor){
    for (let i = 0; i < collisionArray.length; i++){ // X
        for (let j = 0 ; j < collisionArray[0].length ; j++){
            for (let k = floor ; k < 14 ; k++){
                if (k === 13){
                    collisionArray[i][j][k] = "0"

                }
                else {  
                    collisionArray[i][j][k] = collisionArray[i][j][k+1]

                }
                
            }
        }
    }
}


// check if gameover (above floors 12 there shouldnt be any of tetrominos)
function checkGameOver(){
    for (let i  = 0 ; i < collisionArray.length; i++){
        for (let j = 0; j <collisionArray[0].length; j++){
            for (let k = 12 ; k < collisionArray[0][0].length ; k++ ){
                if (collisionArray[i][j][k] !== "0"){
                    gameOver = true
                }
                
            }
        }
    }
}


// start again
function startAgain() {
    let start = false;
    if (confirm("You Lost!! Do you want to restart the game?")) {
      start = true;
    } 
    return start
  }