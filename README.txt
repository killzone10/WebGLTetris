#This is a 3d tetris game implemented in WebGL and javascript.
##Movement and rotations were implemented so game should be normally playable.

#How to run
##To run the program use command : python -m  http.server {port}

<kbd>-></kbd> or "d": move the object drawn one unit in the positive x direction
"<-" or "a": move the object drawn one unit in the negative x direction
"/\" or "w": move the object drawn one unit in the negative z direction
"\/" or "s": move the object drawn one unit in the positive z direction
"x": rotate the object drawn 90 degrees counterclockwise around the x axis
"X": rotate the object drawn 90 degrees clockwise around the x axis
"y": rotate the object drawn 90 degrees counterclockwise around the y axis
"Y": rotate the object drawn 90 degrees clockwise around the y axis
"z": rotate the object drawn 90 degrees counterclockwise around the z axis
"Z": rotate the object drawn 90 degrees clockwise around the z axis
"p": (un)pause the game (i.e. stop/restart gravity) It pauses only gravity and mouse camera movement.
"g"

"j": the viewpoint should rotate counterclockwise about the Y-axis around the center of the grid.
"l": the viewpoint should rotate clockwise about the Y-axis around the center of the grid.
"i": the viewpoint should rotate counterclockwise about the X-axis around the center of the grid.
"k": the viewpoint should rotate clockwise about the X-axis around the center of the grid.
"u": the viewpoint should rotate counterclockwise about the Z-axis around the center of the grid.
"o": the viewpoint should rotate clockwise about the Z-axis around the center of the grid.
"+": zoom in
"-": zoom out.
"v": toggle between orthographic and perspective viewing.
"f": change between phong and goraud shading
"b": change between smaller and bigger cubes (change of vertices)

Runs on 
google chrome
version 113.0.5672.127 (Oficjalna wersja) (64-bitowa)
OS
Windows 10 Education N version 22H2
