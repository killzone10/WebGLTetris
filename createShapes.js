/* --------- simple example of loading external files --------- */


//a few shapes that I created I use choices var to select vertices
function createShape(color) {
    /* --------- define vertex positions & colors --------- */
    /* -------------- 3 vertices per triangle ------------- */
    let colorData = []

    const vertices = [
        // X, Y, Z, W
        0.1, 0.1, 0.1, 1,
        -0.1, 0.1, 0.1, 1,
        0.1, -0.1, 0.1, 1,

        -0.1, 0.1, 0.1, 1,
        -0.1, -0.1, 0.1, 1,
        0.1, -0.1, 0.1, 1, // front face end

        -0.1, -0.1, -0.1, 1,
        -0.1, -0.1, 0.1, 1,
        -0.1, 0.1, 0.1, 1,

        -0.1, -0.1, -0.1, 1,
        -0.1, 0.1, 0.1, 1,
        -0.1, 0.1, -0.1, 1, // left face end

        0.1, 0.1, -0.1, 1,
        -0.1, -0.1, -0.1, 1,
        -0.1, 0.1, -0.1, 1,

        0.1, 0.1, -0.1, 1,
        0.1, -0.1, -0.1, 1,
        -0.1, -0.1, -0.1, 1, // back face end

        0.1, -0.1, 0.1, 1,
        -0.1, -0.1, -0.1, 1,
        0.1, -0.1, -0.1, 1,

        0.1, -0.1, 0.1, 1,
        -0.1, -0.1, 0.1, 1,
        -0.1, -0.1, -0.1, 1, // bottom face end

        0.1, 0.1, 0.1, 1,
        0.1, -0.1, -0.1, 1,
        0.1, 0.1, -0.1, 1,

        0.1, -0.1, -0.1, 1,
        0.1, 0.1, 0.1, 1,
        0.1, -0.1, 0.1, 1, // right face end

        0.1, 0.1, 0.1, 1,
        0.1, 0.1, -0.1, 1,
        -0.1, 0.1, -0.1, 1,

        0.1, 0.1, 0.1, 1,
        -0.1, 0.1, -0.1, 1,
        -0.1, 0.1, 0.1, 1, // Top face end

        //////////////
        
    ];


    const vertices1 = [
      // X, Y, Z, W
      0.1, 0.085, 0.1, 1,
      -0.1, 0.085, 0.1, 1,
      0.1, -0.085, 0.1, 1,

      -0.1, 0.085, 0.1, 1,
      -0.1, -0.085, 0.1, 1,
      0.1, -0.085, 0.1, 1, // front face end

      -0.1, -0.085, -0.1, 1,
      -0.1, -0.085, 0.1, 1,
      -0.1, 0.085, 0.1, 1,

      -0.1, -0.085, -0.1, 1,
      -0.1, 0.085, 0.1, 1,
      -0.1, 0.085, -0.1, 1, // left face end

      0.1, 0.085, -0.1, 1,
      -0.1, -0.085, -0.1, 1,
      -0.1, 0.085, -0.1, 1,

      0.1, 0.085, -0.1, 1,
      0.1, -0.085, -0.1, 1,
      -0.1, -0.085, -0.1, 1, // back face end

      0.1, -0.085, 0.1, 1,
      -0.1, -0.085, -0.1, 1,
      0.1, -0.085, -0.1, 1,

      0.1, -0.085, 0.1, 1,
      -0.1, -0.085, 0.1, 1,
      -0.1, -0.085, -0.1, 1, // bottom face end

      0.1, 0.085, 0.1, 1,
      0.1, -0.085, -0.1, 1,
      0.1, 0.085, -0.1, 1,

      0.1, -0.085, -0.1, 1,
      0.1, 0.085, 0.1, 1,
      0.1, -0.085, 0.1, 1, // right face end

      0.1, 0.085, 0.1, 1,
      0.1, 0.085, -0.1, 1,
      -0.1, 0.085, -0.1, 1,

      0.1, 0.085, 0.1, 1,
      -0.1, 0.085, -0.1, 1,
      -0.1, 0.085, 0.1, 1, // Top face end

      //////////////
      
  ];
    switch(color){
      case 'I':
         colorData = [1,1,0,1];
         break;
      case 'O':
        colorData = [1,0,1,1];
        break;
      case 'T':
        colorData = [0.5,1,0,1];
        break;
      case 'J':
        colorData = [0,1,0,1];
        break;
      case 'L':
        colorData = [0,0,1,1];
        break; 
      case 'S':
        colorData = [0,1,1,1];
        break;      
      case 'Z':
      colorData = [1,1,1,1];

        break;  

      default:
         colorData = [
          [0.0, 0.0, 0.0, 1.0],    // Front face: black
          [1.0, 0.0, 0.0, 1.0],    // left face: red
          [0.0, 1.0, 0.0, 1.0],    // back face: green
          [0.0, 0.0, 1.0, 1.0],    // Bottom face: blue
          [1.0, 1.0, 0.0, 1.0],    // Right face: yellow
          [1.0, 0.0, 1.0, 1.0],    // top face: purple
      ];
      break;

    }
    

    const colors = [];
        
    const normalData = [
        [0, 0, 1], // front
        [-1, 0, 0], // left
        [0, 0, -1], // back
        [0, -1, 0], // bottom
        [1, 0, 0], // right
        [0, 1, 0], // top
    ];
         // add one color and normal per vertex
    const normals = [];
        /* --------- add one color per face, so 6 times for each color --------- */


         // left column front
         const textureCoordinates = [
          // Front
          1.0,  0.0,
          0.0,  1.0,
          1.0 , 1.0, 

          0,     1,
          0.0,  0.0,
          1.0,  1.0,

          // 1.0,  0.0,

          // 0.0,  1.0,

          // 1.0,  1.0,
          
          // 0.0,  1.0,

          
          // Back
          // 0.0,  0.0,
          // 0.0,  1.0,
          // 1.0,  0.0,
          // 0.0,  1.0,

       
        


          // Top
          // 0.0,  0.0,
          // 1.0,  0.0,
          // 1.0,  1.0,
          // 0.0,  1.0,
          // Bottom
          // 0.0,  0.0,
          // 1.0,  0.0,
          // 1.0,  1.0,
          // 0.0,  1.0,
          // // Right
          // 0.0,  0.0,
          // 1.0,  0.0,
          // 1.0,  1.0,
          // 0.0,  1.0,
          // // Left
          // 0.0,  0.0,
          // 1.0,  0.0,
          // 1.0,  1.0,
          // 0.0,  1.0,
    
        ];
         
 

    const texture = []

    for (let i = 0; i < 6; ++i) {
      texture.push(textureCoordinates)

        for (let j = 0; j < 6; ++j) {
            normals.push(normalData[i]);
            colors.push(colorData);

        }
    }

        /* --------- create shape object and initialize data --------- */
    const cube = new Shape();
    // console.log(colors)
    cube.initData(vertices, colors, normals, texture, vertices1)

    return cube;
}
   



// read object .obj // trzeba dodac




// check shiftmenf in transformationMatrix
function createTransVector(shapes, id){
    vector = [
        shapes[id].transformationMatrix[12], 
        shapes[id].transformationMatrix[13],
        shapes[id].transformationMatrix[14],
    ]
    return vector
}

// fr





//https://github.com/PKlempe/3D-Tetris-WebGL// // i was too lazy to create it in blender (I cant use that) so i took indices from him
function createGrid(){
  vertices = [
    // top
    [ 0.40,  1.20,  0.40, 1.0],
    [-0.40,  1.20,  0.40, 1.0],
    [-0.40,  1.20, -0.40, 1.0],
    [ 0.40,  1.20, -0.40, 1.0],

    // Top vert
    [ 0.2,  1.20,  0.40, 1.0],
    [ 0.2,  1.20, -0.40, 1.0],
    [ 0.00,  1.20,  0.40, 1.0],
    [ 0.00,  1.20, -0.40, 1.0],
    [-0.2,  1.20,  0.40, 1.0],
    [-0.2,  1.20, -0.40, 1.0],

    // Top horiz
    [ 0.40,  1.20,  0.2, 1.0],
    [-0.40,  1.20,  0.2, 1.0],
    [ 0.40,  1.20,  0.00, 1.0],
    [-0.40,  1.20,  0.00, 1.0],
    [ 0.40,  1.20, -0.2, 1.0],
    [-0.40,  1.20, -0.2, 1.0],

    // Right corn
    [ 0.40, -1.20, -0.40, 1.0],
    [ 0.40, -1.20,  0.40, 1.0],

    // Right: crosses
    [ 0.40, -1.20,  0.2, 1.0],
    [ 0.40, -1.20,  0.0, 1.0],
    [ 0.40, -1.20, -0.2, 1.0],

    // Right: crosses
    [ 0.40,  1.0,  0.40, 1.0],
    [ 0.40,  1.0, -0.40, 1.0],
    [ 0.40,  0.80,  0.40, 1.0],
    [ 0.40,  0.80, -0.40, 1.0],
    [ 0.40,  0.60,  0.40, 1.0],
    [ 0.40,  0.60, -0.40, 1.0],
    [ 0.40,  0.40,  0.40, 1.0],
    [ 0.40,  0.40, -0.40, 1.0],
    [ 0.40,  0.2,  0.40, 1.0],
    [ 0.40,  0.2, -0.40, 1.0],
    [ 0.40,  0.00,  0.40, 1.0],
    [ 0.40,  0.00, -0.40, 1.0],
    [ 0.40, -0.2,  0.40, 1.0],
    [ 0.40, -0.2, -0.40, 1.0],
    [ 0.40, -0.40,  0.40, 1.0],
    [ 0.40, -0.40, -0.40, 1.0],
    [ 0.40, -0.60,  0.40, 1.0],
    [ 0.40, -0.60, -0.40, 1.0],
    [ 0.40, -0.80,  0.40, 1.0],
    [ 0.40, -0.80, -0.40, 1.0],
    [ 0.40, -1.0,  0.40, 1.0],
    [ 0.40, -1.0, -0.40, 1.0],
    [ 0.40, -1.20,  0.40, 1.0],
    [ 0.40, -1.20, -0.40, 1.0],

    // Front: Additional Corners
    [ 0.40, -1.20,  0.40, 1.0],
    [-0.40, -1.20,  0.40, 1.0],

    // Front: Additional Vertical Cross Lines
    [ 0.2, -1.20,  0.40, 1.0],
    [ 0.00, -1.20,  0.40, 1.0],
    [-0.2, -1.20,  0.40, 1.0],

    // Front: Additional Horizontal Cross Lines
    [ 0.40,  1.0,  0.40, 1.0],
    [-0.40,  1.0,  0.40, 1.0],
    [ 0.40,  0.80,  0.40, 1.0],
    [-0.40,  0.80,  0.40, 1.0],
    [ 0.40,  0.60,  0.40, 1.0],
    [-0.40,  0.60,  0.40, 1.0],
    [ 0.40,  0.40,  0.40, 1.0],
    [-0.40,  0.40,  0.40, 1.0],
    [ 0.40,  0.2,  0.40, 1.0],
    [-0.40,  0.2,  0.40, 1.0],
    [ 0.40,  0.00,  0.40, 1.0],
    [-0.40,  0.00,  0.40, 1.0],
    [ 0.40, -0.2,  0.40, 1.0],
    [-0.40, -0.2,  0.40, 1.0],
    [ 0.40, -0.40,  0.40, 1.0],
    [-0.40, -0.40,  0.40, 1.0],
    [ 0.40, -0.60,  0.40, 1.0],
    [-0.40, -0.60,  0.40, 1.0],
    [ 0.40, -0.80,  0.40, 1.0],
    [-0.40, -0.80,  0.40, 1.0],
    [ 0.40, -1.0,  0.40, 1.0],
    [-0.40, -1.0,  0.40, 1.0],
    [ 0.40, -1.20,  0.40, 1.0],
    [-0.40, -1.20,  0.40, 1.0],

    // Top-Bottom: Additional Vertical Cross Lines
    [-0.2,  1.20,  0.2, 1.0],
    [-0.2, -1.20,  0.2, 1.0],
    [ 0.00,  1.20,  0.2, 1.0],
    [ 0.00, -1.20,  0.2, 1.0],
    [ 0.2,  1.20,  0.2, 1.0],
    [ 0.2, -1.20,  0.2, 1.0],
    [-0.2,  1.20,  0.00, 1.0],
    [-0.2, -1.20,  0.00, 1.0],
    [ 0.00,  1.20,  0.00, 1.0],
    [ 0.00, -1.20,  0.00, 1.0],
    [ 0.2,  1.20,  0.00, 1.0],
    [ 0.2, -1.20,  0.00, 1.0],
    [-0.2,  1.20, -0.2, 1.0],
    [-0.2, -1.20, -0.2, 1.0],
    [ 0.00,  1.20, -0.2, 1.0],
    [ 0.00, -1.20, -0.2, 1.0],
    [ 0.2,  1.20, -0.2, 1.0],
    [ 0.2, -1.20, -0.2, 1.0],

    // Left-Right: Additional Horizontal Cross Lines
    [-0.40,  1.0,  0.2, 1.0],
    [ 0.40,  1.0,  0.2, 1.0],
    [-0.40,  1.0,  0.00, 1.0],
    [ 0.40,  1.0,  0.00, 1.0],
    [-0.40,  1.0, -0.2, 1.0],
    [ 0.40,  1.0, -0.2, 1.0],
    [-0.40,  0.80,  0.2, 1.0],
    [ 0.40,  0.80,  0.2, 1.0],
    [-0.40,  0.80,  0.00, 1.0],
    [ 0.40,  0.80,  0.00, 1.0],
    [-0.40,  0.80, -0.2, 1.0],
    [ 0.40,  0.80, -0.2, 1.0],
    [-0.40,  0.60,  0.2, 1.0],
    [ 0.40,  0.60,  0.2, 1.0],
    [-0.40,  0.60,  0.00, 1.0],
    [ 0.40,  0.60,  0.00, 1.0],
    [-0.40,  0.60, -0.2, 1.0],
    [ 0.40,  0.60, -0.2, 1.0],
    [-0.40,  0.40,  0.2, 1.0],
    [ 0.40,  0.40,  0.2, 1.0],
    [-0.40,  0.40,  0.00, 1.0],
    [ 0.40,  0.40,  0.00, 1.0],
    [-0.40,  0.40, -0.2, 1.0],
    [ 0.40,  0.40, -0.2, 1.0],
    [-0.40,  0.2,  0.2, 1.0],
    [ 0.40,  0.2,  0.2, 1.0],
    [-0.40,  0.2,  0.00, 1.0],
    [ 0.40,  0.2,  0.00, 1.0],
    [-0.40,  0.2, -0.2, 1.0],
    [ 0.40,  0.2, -0.2, 1.0],
    [-0.40,  0.00,  0.2, 1.0],
    [ 0.40,  0.00,  0.2, 1.0],
    [-0.40,  0.00,  0.00, 1.0],
    [ 0.40,  0.00,  0.00, 1.0],
    [-0.40,  0.00, -0.2, 1.0],
    [ 0.40,  0.00, -0.2, 1.0],
    [-0.40, -0.2,  0.2, 1.0],
    [ 0.40, -0.2,  0.2, 1.0],
    [-0.40, -0.2,  0.00, 1.0],
    [ 0.40, -0.2,  0.00, 1.0],
    [-0.40, -0.2, -0.2, 1.0],
    [ 0.40, -0.2, -0.2, 1.0],
    [-0.40, -0.40,  0.2, 1.0],
    [ 0.40, -0.40,  0.2, 1.0],
    [-0.40, -0.40,  0.00, 1.0],
    [ 0.40, -0.40,  0.00, 1.0],
    [-0.40, -0.40, -0.2, 1.0],
    [ 0.40, -0.40, -0.2, 1.0],
    [-0.40, -0.60,  0.2, 1.0],
    [ 0.40, -0.60,  0.2, 1.0],
    [-0.40, -0.60,  0.00, 1.0],
    [ 0.40, -0.60,  0.00, 1.0],
    [-0.40, -0.60, -0.2, 1.0],
    [ 0.40, -0.60, -0.2, 1.0],
    [-0.40, -0.80,  0.2, 1.0],
    [ 0.40, -0.80,  0.2, 1.0],
    [-0.40, -0.80,  0.00, 1.0],
    [ 0.40, -0.80,  0.00, 1.0],
    [-0.40, -0.80, -0.2, 1.0],
    [ 0.40, -0.80, -0.2, 1.0],
    [-0.40, -1.0,  0.2, 1.0],
    [ 0.40, -1.0,  0.2, 1.0],
    [-0.40, -1.0,  0.00, 1.0],
    [ 0.40, -1.0,  0.00, 1.0],
    [-0.40, -1.0, -0.2, 1.0],
    [ 0.40, -1.0, -0.2, 1.0]
];

indices = [
    // Bottom
    0,  1,
    1,  2,
    2,  3,
    3,  0,

    // Bottom
    4,  5,
    6,  7,
    8,  9,

    // Bottom
    10, 11,
    12, 13,
    14, 15,

    // Left
    16, 17,
    16,  3,
    17,  0,

    // Left
    18, 10,
    19, 12,
    20, 14,

    // Left
    21, 22,
    23, 24,
    25, 26,
    27, 28,
    29, 30,
    31, 32,
    33, 34,
    35, 36,
    37, 38,
    39, 40,
    41, 42,
    43, 44,

    // Back
    45, 46,
    45,  0,
    46,  1,

    // Back
    47,  4,
    48,  6,
    49,  8,

    // Back
    50, 51,
    52, 53,
    54, 55,
    56, 57,
    58, 59,
    60, 61,
    62, 63,
    64, 65,
    66, 67,
    68, 69,
    70, 71,
    72, 73,

    // Top-Bottom
    74, 75,
    76, 77,
    78, 79,
    80, 81,
    82, 83,
    84, 85,
    86, 87,
    88, 89,
    90, 91,

    // Left-Right
    92, 93,
    94, 95,
    96, 97,
    98, 99,
    100, 101,
    102, 103,
    104, 105,
    106, 107,
    108, 109,
    110, 111,
    112, 113,
    114, 115,
    116, 117,
    118, 119,
    120, 121,
    122, 123,
    124, 125,
    126, 127,
    128, 129,
    130, 131,
    132, 133,
    134, 135,
    136, 137,
    138, 139,
    140, 141,
    142, 143,
    144, 145,
    146, 147,
    148, 149,
    150, 151,
    152, 153,
    154, 155,
    156, 157
];


    const colorData = [1.0, 1.0, 1.0, 1.0]   // Front face: black;

    const colors = [];
    
   
     // add one color and normal per vertex
    const normals = [];
    /* --------- add one color per face, so 6 times for each color --------- */
    for (let i = 0; i < indices.length; ++i) {
        colors.push(colorData);
        
    }

    /* --------- create shape object and initialize data --------- */
    const grid = new Local();
    grid.initData(vertices, indices, colors, normals)

    return grid;
}

//https://github.com/PKlempe/3D-Tetris-WebGL// // i was too lazy to create it in blender (I cant use that) so i took indices from him

function createBoundingBox(){
  vertices = [
      // bot corners
      [-0.40, -1.2, -0.40, 1.0],                  /////////////////////
      [ 0.40, -1.2, -0.40, 1.0],
      [ 0.40, -1.2,  0.40, 1.0],
      [-0.40, -1.2,  0.40, 1.0],
      // Bottom vertical (x1.0
      [-0.20, -1.2, -0.40, 1.0],
      [-0.20, -1.2,  0.40, 1.0],
      [ 0.00, -1.2, -0.40, 1.0],
      [ 0.00, -1.2,  0.40, 1.0],
      [ 0.20, -1.2, -0.40, 1.0],
      [ 0.20, -1.2,  0.40, 1.0],
      // Bottom: hor (z)1.0
      [-0.40, -1.2, -0.20, 1.0],
      [ 0.40, -1.2, -0.20, 1.0],
      [-0.40, -1.2,  0.00, 1.0],
      [ 0.40, -1.2,  0.00, 1.0],
      [-0.40, -1.2,  0.20, 1.0],
      [ 0.40, -1.2,  0.20, 1.0],

      // bottom left
      [-0.40,  1.2,  0.40, 1.0],
      [-0.40,  1.2, -0.40, 1.0],
      // bottom left up1.0
      [-0.40,  1.2, -0.20, 1.0],
      [-0.40,  1.2,  0.00, 1.0], // 2.4
      [-0.40,  1.2,  0.20, 1.0], // 0.8
      // all on left1.0
      [-0.40, -1.0, -0.40, 1.0],
      [-0.40, -1.0,  0.40, 1.0],
      [-0.40, -0.80, -0.40, 1.0],
      [-0.40, -0.80,  0.40, 1.0],
      [-0.40, -0.60, -0.40, 1.0],
      [-0.40, -0.60,  0.40, 1.0],
      [-0.40, -0.40, -0.40, 1.0],
      [-0.40, -0.40,  0.40, 1.0],
      [-0.40, -0.20, -0.40, 1.0],
      [-0.40, -0.20,  0.40, 1.0],
      [-0.40,  0.00, -0.40, 1.0],
      [-0.40,  0.00,  0.40, 1.0],
      [-0.40,  0.20, -0.40, 1.0],
      [-0.40,  0.20,  0.40, 1.0],
      [-0.40,  0.40, -0.40, 1.0],
      [-0.40,  0.40,  0.40, 1.0],
      [-0.40,  0.60, -0.40, 1.0],
      [-0.40,  0.60,  0.40, 1.0],
      [-0.40,  0.80, -0.40, 1.0],
      [-0.40,  0.80,  0.40, 1.0],
      [-0.40,  1.0, -0.40, 1.0],
      [-0.40,  1.0,  0.40, 1.0],
      [-0.40,  1.2, -0.40, 1.0],
      [-0.40,  1.2,  0.40, 1.0],
      // back up1.0
      [-0.40,  1.2, -0.40, 1.0],
      [ 0.40,  1.2, -0.40, 1.0],
      // Back: up vert1.0
      [-0.20,  1.2, -0.40, 1.0],
      [ 0.00,  1.2, -0.40, 1.0],
      [ 0.20,  1.2, -0.40, 1.0],
      // rest1.0
      [-0.40, -1.0, -0.40, 1.0],
      [ 0.40, -1.0, -0.40, 1.0],
      [-0.40, -0.80, -0.40,1.0],
      [ 0.40, -0.80, -0.40, 1.0],
      [-0.40, -0.60, -0.40, 1.0],
      [ 0.40, -0.60, -0.40, 1.0],
      [-0.40, -0.40, -0.40, 1.0],
      [ 0.40, -0.40, -0.40, 1.0],
      [-0.40, -0.20, -0.40, 1.0],
      [ 0.40, -0.20, -0.40, 1.0],
      [-0.40,  0.00, -0.40, 1.0],
      [ 0.40,  0.00, -0.40, 1.0],
      [-0.40,  0.20, -0.40, 1.0],
      [ 0.40,  0.20, -0.40, 1.0],
      [-0.40,  0.40, -0.40, 1.0],
      [ 0.40,  0.40, -0.40, 1.0],
      [-0.40,  0.60, -0.40, 1.0],
      [ 0.40,  0.60, -0.40, 1.0],
      [-0.40,  0.80, -0.40, 1.0],
      [ 0.40,  0.80, -0.40, 1.0],
      [-0.40,  1.0, -0.40, 1.0],
      [ 0.40,  1.0, -0.40, 1.0],
      [-0.40,  1.2, -0.40, 1.0],
      [ 0.40,  1.2, -0.40, 1.0],
  ];
  indices = [
      // Bottom: Square
      0,  1,
      1,  2,
      2,  3,
      3,  0,

      // Bottom: Vertical Cross Lines
      4,  5,
      6,  7,
      8,  9,

      // Bottom: Horizontal Cross Lines
      10, 11,
      12, 13,
      14, 15,

      // Left: Square
      16, 17,
      16,  3,
      17,  0,

      // Left: Vertical Cross Lines
      18, 10,
      19, 12,
      20, 14,

      // Left: Horizontal Cross Lines
      21, 22,
      23, 24,
      25, 26,
      27, 28,
      29, 30,
      31, 32,
      33, 34,
      35, 36,
      37, 38,
      39, 40,
      41, 42,
      43, 44,

      // Back: Square
      45, 46,
      45,  0,
      46,  1,

      // Back: Vertical Cross Lines
      47,  4,
      48,  6,
      49,  8,

      // Back: Horizontal Cross Lines
      50, 51,
      52, 53,
      54, 55,
      56, 57,
      58, 59,
      60, 61,
      62, 63,
      64, 65,
      66, 67,
      68, 69,
      70, 71,
      72, 73
  ];

  const colorData = [1.0, 1.0, 1.0, 1.0]    // Front face: black;

  const colors = [];
  
 
   // add one color and normal per vertex
  const normals = [];
  /* --------- add one color per face, so 6 times for each color --------- */
  for (let i = 0; i < indices.length; ++i) {
      colors.push(colorData);
      
  }

  /* --------- create shape object and initialize data --------- */
  console.log(colors)
  const boundingBox = new Local();
  boundingBox.initData(vertices, indices, colors, normals)

  return boundingBox;
}



// https://webglfundamentals.org/webgl/lessons/webgl-load-obj.html
// this function parses .obj file
function parseOBJ(text) {
    // because indices are base 1 let's just fill in the 0th data
    const objPositions = [[0, 0, 0]];
    const objTexcoords = [[0, 0]];
    const objNormals = [[0, 0, 0]];
  
    // same order as `f` indices
    const objVertexData = [
      objPositions,
      objTexcoords,
      objNormals,
    ];
  
    // same order as `f` indices
    let webglVertexData = [
      [],   // positions
      [],   // texcoords
      [],   // normals
    ];
  
    function newGeometry() {
      // If there is an existing geometry and it's
      // not empty then start a new one.
      if (geometry && geometry.data.position.length) {
        geometry = undefined;
      }
      setGeometry();
    }
  
    function addVertex(vert) {
      const ptn = vert.split('/');
      ptn.forEach((objIndexStr, i) => {
        if (!objIndexStr) {
          return;
        }
        const objIndex = parseInt(objIndexStr);
        const index = objIndex + (objIndex >= 0 ? 0 : objVertexData[i].length);
        webglVertexData[i].push(...objVertexData[i][index]);
      });
    }
  
    const keywords = {
      v(parts) {
        objPositions.push(parts.map(parseFloat));
      },
      vn(parts) {
        objNormals.push(parts.map(parseFloat));
      },
      vt(parts) {
        // should check for missing v and extra w?
        objTexcoords.push(parts.map(parseFloat));
      },
      f(parts) {
        const numTriangles = parts.length - 2;
        for (let tri = 0; tri < numTriangles; ++tri) {
          addVertex(parts[0]);
          addVertex(parts[tri + 1]);
          addVertex(parts[tri + 2]);
        }
      },
    };
  
    const keywordRE = /(\w*)(?: )*(.*)/;
    const lines = text.split('\n');
    for (let lineNo = 0; lineNo < lines.length; ++lineNo) {
      const line = lines[lineNo].trim();
      if (line === '' || line.startsWith('#')) {
        continue;
      }
      const m = keywordRE.exec(line);
      if (!m) {
        continue;
      }
      const [, keyword, unparsedArgs] = m;
      const parts = line.split(/\s+/).slice(1);
      const handler = keywords[keyword];
      if (!handler) {
        console.warn('unhandled keyword:', keyword);  // eslint-disable-line no-console
        continue;
      }
      handler(parts, unparsedArgs);
    }
  
    return {
      position: webglVertexData[0],
      texcoord: webglVertexData[1],
      normal: webglVertexData[2],
    };
  }
  //









function createLoadedShape(parsed_data){
  vertices = parsed_data.position
  norm = parsed_data.normal
  color = parsed_data.texcoord
  // console.log(parsed_data)
  let ver_arr = []
  let nor_arr = []
  let j = 1
  // vertices is vec3 - we need vec4 so i add 1 every 3 coordinates
  for ( let i = 0; i < vertices.length; i++){
      ver_arr.push(vertices[i])
      nor_arr.push(norm[i])

      if (j%3 == 0 && i !== 0 && i!== vertices.length - 1){
          ver_arr.push(1)
          nor_arr.push(norm[1])

      }
      j++
  }
  ver_arr.push(1)
  nor_arr.push(norm[1])

  // 1 color for every triangle
  const colorData = [
      [1.0, 0.0, 0.0, 1.0],    // Front face: black
     
  ];



  const colors =[]; //this hast o change
  for (let i = 0; i < ver_arr.length; ++i) {
      colors.push([1,0,0,1])
  }
  const object = new Shape();
  // console.log(ver_arr)
  // console.log(colors)
  object.initData(ver_arr, colors, norm)

  return object;    
}
async function loadData(txt) {
  const data = await fetch(txt).then(result => result.text());
  return data
}