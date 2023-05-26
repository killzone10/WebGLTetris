To run : python -m  http.server {port}

T1: (10%) Render grid, setup camera
	My field is 4x4x12 - actually it should be bigger because its not that playable, but its too late to change that.
	Created in createShapes.js createBoundingBox()
T2: (20%) Object phase
	I used shape class from the previous tasks and extended it on tetrashape class (tetraShape.js).
	Each of tetrashape consists of 4 cubes (Each shape spawns in tetrashape constructor). The shape is chosen randomly in costructor and randomly
	moved to a chosen location (shapes spawn on height 13  above the boundingBox).
	Movement done as written wsad + arrows:
		"->" or "d": move the object drawn one unit in the positive x direction
		"<-" or "a": move the object drawn one unit in the negative x direction
		"/\" or "w": move the object drawn one unit in the negative z direction
		"\/" or "s": move the object drawn one unit in the positive z direction
		"x": rotate the object drawn 90 degrees counterclockwise around the x axis
		"X": rotate the object drawn 90 degrees clockwise around the x axis
		"y": rotate the object drawn 90 degrees counterclockwise around the y axis
		"Y": rotate the object drawn 90 degrees clockwise around the y axis
"		z": rotate the object drawn 90 degrees counterclockwise around the z axis
		"Z": rotate the object drawn 90 degrees clockwise around the z axis
		"p": (un)pause the game (i.e. stop/restart gravity) It pauses only gravity and mouse camera movement.

T3: (30%) Data structure and collision detection
	Game logic is saved in tetris.js. Function playGame() is executed in render().
	In the beggining I create the collisionArray of the size [4][4][14] filled with "0s" (its created in on windows.load())
	Then first tetromino spawns - it goes down with certain speed as long as it doesnt detectt floor or collision with any other object.
	If it collides with any other object and cant go below then it stops moving and another iteration goes on.
	In this iteration first there is a check if floor should be destroyed and if all objects should be moved downside
	(all of shapes above the destroyed floor have to be updated, and collisionArray has to be updated too).
	There are 3 functions which check if movement is possible. One of them is: checkIfCollisionTranslation() and the checkIfCollisionRotation():
	checkIfCollide(): it's the end function which maps cubes position to indexes in collisionArray - returns collision boolean. 
	checkIfCollisionRotation(): 
		there are 2 scenarios how this can work - the rotation is the same as the one specified in tetrashape
		so one idea is to move tetromino to center, rotate it and move it back
		and another one is to create 1 transformation Matrix. During implementing rotation I have implemented both, but here
		I am using one transformationMatrix. I am creating the mockTransformationMatrix, which is copy of tetraShape trasformationMatrix
		then its rotated, and in the end I extract positions of coordinate of 1 cube. Those coordinates are then moved to  
		checkIfCollide() function.
	checkIfCollisionTranslation(): after many attempts I just  take coordinates of every small Cube in tetrashape 
		I move it's coordinates by translation vector and check what are the mapped indexes in colission array by using function
		checkIfCollide() if it does it return true.



T4: (5%) Toggle grid
	Its created in createShapes.js createGrid(). I took indices (vertices are mine) from the man who published code from this subject on github:
	 https://github.com/PKlempe/3D-Tetris-WebGL
	because I havent ever worked with Blender and it looked like a long time to do.


T5: (15%) Change the viewpoint
	Applied rotation matrix to viewpoint essentially its the same as rotation of tetrominis
		"j": the viewpoint should rotate counterclockwise about the Y-axis around the center of the grid.
		"l": the viewpoint should rotate clockwise about the Y-axis around the center of the grid.
		"i": the viewpoint should rotate counterclockwise about the X-axis around the center of the grid.
		"k": the viewpoint should rotate clockwise about the X-axis around the center of the grid.
		"u": the viewpoint should rotate counterclockwise about the Z-axis around the center of the grid.
		"o": the viewpoint should rotate clockwise about the Z-axis around the center of the grid.
	And here I created perspective matrix and ! I wasnt sure how to implement zoom in and out in ortho and I ve found on stackoverflow that I can change
	the size of window so zoom in/out for ortho works as scaling (not sure if its correct)
	For perspective Matrix its normal translation in z axis
		"+": zoom in
		"-": zoom out.
		"v": toggle between orthographic and perspective viewing.

Moving the mouse to the left: the viewpoint should rotate clockwise about the Y-axis around the center of the grid.
Moving the mouse to the right: the viewpoint should rotate counterclockwise about the Y-axis around the center of the grid.

T6: (10%) Shading
Used  the same shaders as in lab1b.
I added a slides which take Ka, Kd, Ks. Sliders send value after clicking. Works for texture too.
The basic shading is withLight shading --> if you click "f" then its changed between goraud and phong shading.



T7: (5%) Texturing
Added one texture on every fifth block --> to do that I had to create 2 textures. The one which was loaded --> in this texture fragmentColor should be just white
and one white texture, so colors in fragment shader can be read too. I am not sure if its how it should work, but changing the entire shaders would be too complicated.
I have read on stackoverflow that its how people do it.


T8: (5%) Cylinders
I did it, but I didnt swap to cylinders, because didnt have  enought  time to create vertices
 --> I added another vertices in initialization and I create smaller cubes.

B1: (5%) "Game Over" Screen
Done.


I ve checked it several times, but if something  from lighting or collision doesnt work then I can send a version without textures where all worked.


2. 
google chrome
version 113.0.5672.127 (Oficjalna wersja) (64-bitowa)
OS
Windows 10 Education N version 22H2
