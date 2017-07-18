var drawing=false;		//true while mouse is pressed over the canvas
var drawables=[];			//array of objects to draw
var currentdraw=null;		//the object currently drawn
var mode="line";			//drawMode (
												//Line,			A Single Line
												//rect,			A Rectangular shape between start and end point 	
												//lines,		Manny Lines in a Row Also known as Brush
												//ellipse,	A Ellipse with its center at the beginning
												//ellipse2	A Ellipse between start and Endpoint
var selected=0;				//hold the position of the selected Onject in drawables , back or new
var backColor="#FF0000";	//stores the Backgroundcollor

/*-----------------------------------------------------------------------------------*/  
//Name:		setup()
//Use:		initialisation function of p5
function setup() { 					// The Setup function of p5
  createCanvas(400, 400);		// Creates the Canvas to draw on
}  

/*---------------------------------------------------------------------------------------*/
//Name:		draw()
//Use:		periodically (de:aufgerufene) function for drawing on the canvas
function draw() { 
  background(color(backColor)); 				//fills the background with backColor
  drawables.forEach(function(element){	//foreach lopp for drawing each drawable
   element.draw(); 											//draw the current drawable
  });
  
  if( drawing)
    currentdraw.show(mouseX,mouseY);		//draws the privew of the current drawable
}
/*---------------------------------------------------------------------------*/
//Name:		mouseInCan()
//Use:		returns true if the mouse is inside the canvas otherwise false
function mouseInCan(){
 return (mouseX>1&mouseX<width&mouseY>0&mouseY<height); 	//compares the mouse position with the canvas
}
/*------------------------------------------------------------------------------*/
//Name:		touchStarted()
//UsE:		Function called by p5 when the mouse gets pressed or the touchscreen touch begins.
//					Creates a new object to draw according to the drawmode
function touchStarted() {
  if(mouseInCan()){			//if the mouse is inside the canvas
    drawing=true;				//drawing is enabled
  switch(mode){					//diferentiate the drawmodes
    case "ellipse":			//drawing an ecipse with the beginning in the center
      console.log("start ellipse");
      currentdraw=new Ellipse(		//creating a new Ellipse
        		createVector(mouseX,mouseY),		// start position
        		color(document.getElementById("html5colorpicker").value),	//take the color from the colorpicker
          	document.getElementById("width").value					//takes the width from the slider
      );
      break;	
    case "line":			//drawing a line
      console.log("start line");
      currentdraw=new Line(
        		createVector(mouseX,mouseY),		// start position
        		color(document.getElementById("html5colorpicker").value),	//take the color from the colorpicker
          	document.getElementById("width").value					//takes the width from the slider
      );
    	break;
    case "lines":			//drawing Lines
      console.log("start lines");
      currentdraw=new Lines(
        		createVector(mouseX,mouseY),		// start position
        		color(document.getElementById("html5colorpicker").value),	//take the color from the colorpicker
          	document.getElementById("width").value					//takes the width from the slider
      );
      break;
    case "rect":			//drawing a rectangle
      console.log("start rect");
      currentdraw=new Rect(
        		createVector(mouseX,mouseY),		// start position
        		color(document.getElementById("html5colorpicker").value),	//take the color from the colorpicker
          	document.getElementById("width").value					//takes the width from the slider
      );
      break;
    case "ellipse2":	//drawing a ellipse inbetween start and end point
      console.log("start ellipse2");
      currentdraw=new Ellipse2(
        		createVector(mouseX,mouseY),		// start position
        		color(document.getElementById("html5colorpicker").value),	//take the color from the colorpicker
          	document.getElementById("width").value					//takes the width from the slider
      );
      break;
     	}
  }
}

/*-------------------------------------------------------*/
//Name:		touchEnded()
//Use:		called by p5 when mouse is released or the touchscreen is released
//					finalizes the object to draw and put it onto the stack
function touchEnded(){
  if(!currentdraw.isfinal){				// checks if the current drawable is already finalized
  currentdraw.final(mouseX,mouseY);	//finalizes the current drawable
  drawing=false;										//sets the drawing to false
  drawables.push(currentdraw);			// pushes the current drawable onto the stack
  drawsDisplay();										//Updates the drawables shown in the gui
  selected="new";										//Selects a new drawable as the selected
  document.getElementById("thingName").text=drawables[selected].name;		//sets the name of the selected drawavle to the text input on the gui
  console.log("stop drawing");
 }
}

/*------------------------------------------------------------*/
//Name:		iEllipse()
//Use:		called by the circleimage's onClick tag
//					sets the drawmode to eclipse
function iEllipse(){
  mode="ellipse";		//sets the drawmode to ellipse
 console.log("Tool changes to "+ mode); 
}
/*--------------------------------------------------------------*/
//Name:		iEllipse2()
//Use:		called  by the second circleimage's onClick tag
//					sets the drawmode to eclipse2
function iEllipse2(){
  mode="ellipse2";		//sets the drawmode to ellipse2
  console.log("Tool changes to "+ mode); 
}
/*----------------------------------------------------------------*/
//Name:		iLine()
//Use:		called  by the Lineimage's onClick tag
//					sets the drawmode to line
function iLine(){
  mode="line";		//sets the drawmode to line
 console.log("Tool changes to "+ mode); 
}
/*------------------------------------------------------------------*/
//Name:		iLines()
//Use:		called  by the linesimage's onClick tag
//					sets the drawmode to lines
function iLines(){
  mode="lines";		//sets the drawmode to lines
 console.log("Tool changes to "+ mode); 
}
/*--------------------------------------------------------------------*/
//Name:		iRect()
//Use:		called  by the Rectimage's onClick tag
//					sets the drawmode to rect
function iRect(){
  mode="rect";		//sets the drawmode to rectangle
 console.log("Tool changes to "+ mode); 
}
/*-------------------------------------------------------------------*/
//Name:		iPxel()		#Unused
//Use:		called  by the Pensilimage's onClick tag
//					sets the drawmode to pixel
function iPixel(){
  mode="pixel";		//Sets the drawmode to pixel
 console.log("Tool changes to "+ mode); 
}
/*------------------------------------------------------------------*/
//Name:		iBack()
//Use:		called  by the Backimage's onClick tag
//					removes the last drawn object from the stack
function iBack(){
  drawables.pop();		//removes the latest drawable from the stack
  drawsDisplay(); 		//updates the select displaying the drawable
  console.log("last action removed");
}
/*---------------------------------------------------------------------*/
//Name:		iSave()
//Use:		called  by the Saveimages onClick tag
//					Saves the Canvas as Image
function iSave(){ 
  saveCanvas();		//downloads the canvas as image
}
/*--------------------------------------------------------------------------*/
//Name:		iNew()
//Use:		called  by the Newimage's onClick tag
//					clears the stack
function iNew(){
  drawables=[];		//clear the stack
  drawsDisplay(); //update the select displaying the drawable
}
/*------------------------------------------------------------------*/
//Name:		resize()
//Use:		called  by one of the size inputs's onChange tag
//					changes the size of the canvas
function resize(){
	var sx=int( document.getElementById("X").value) ;		//saves the value of the input "X" to sx 
  var sy=int( document.getElementById("Y").value );		//saves the value of the input "Y" to sy
  resizeCanvas(sx ,sy);			//sets the size of the canvas to sx and sy
  console.log("canvas set to "+sx+":"+sy);
}
/*-------------------------------------------------------------------------*/
//Name:		clickcolor()
//Use:		called by the colorpickers onChange tag
//					sets the collor of the selected object or background
function clickColor() {
    var c = document.getElementById("html5colorpicker").value;		//saves the Hex string of the color from the colorpicker
  	if(selected>=0) drawables[selected].color=color(c);						// if a drawable is selected its color is updated
  console.log("sroke color set to: "+c);
  	if(selected=="back") backColor= document.getElementById("html5colorpicker").value;		//if the background is selected its color is updated
  console.log(selected);
}
 /*---------------------------------------------------------------------------*/
//Name:		resizeStroke()
//Use:		called by the tag range inputs onChange tag
//					sets the drawmode to eclipse2
function resizeStroke(){
  if(selected>=0) drawables[selected].width=document.getElementById("width").value;  //if a drawable is selected its width is updated 
  }
/*---------------------------------------------------------------------------*/
//Name:		drawsDisplay()
//Use:		updates the list of drawn objects
function drawsDisplay(){
 	var out ="";														//defining out as ""
  for(var i=0;i<drawables.length;i+=1){		//cycles throu the stack
   out+="<option value='"+i+"'>"+i+":"+drawables[i].name+"</option>"; 	//for each drawable its id and name is added to the html code
  }
  out="<option value='back'>background</option>"+out+"<option value='new'> new </option>";		// adding background and new to out
  console.log(out);
  document.getElementById("things").innerHTML=out;		// sets the selects inner html to out
}
/*--------------------------------------------------------------------*/
//Name:		chooseThing()
//Use:		called by the onChange tag from the object diplayer
//					sets the selected variable and color, Name and width of the GUI
function chooseThing(){
  if(selected>=0) drawables[selected].selected=false;			//if a drawable is selected its selected tag is removed
  selected=document.getElementById("things").value;				//selecting the selected element from the <select>
  if(selected>=0){					//if a drawable is selected 
  	document.getElementById("width").disabled=false;		//enables the use of the width slider
  	document.getElementById("thingName").value=drawables[selected].name;	//sets the <input type=text> to drawables name 
  	document.getElementById("width").value=drawables[selected].width;			//sets the <input type=range> to the selected drawables width
    var c="#"+ 			
      intToHex(red(		drawables[selected].color),16,2)+		//converting red of the drawables color to hex
      intToHex(green(	drawables[selected].color),16,2)+		//converting green of the drawables color to hex
      intToHex(blue(	drawables[selected].color),16,2);		//converting blue of the drawables color to hex
    document.getElementById("html5colorpicker").value=c;	//setting the value of the colorpicker to the drawable ones
    console.log(selected+""+document.getElementById("things").value+" "+c+drawables[selected].color);
  	drawables[selected].selected=true;			//sets the selected flag of the selected drawable
  }else{
    switch(selected){				//switches selected
     case "back":			//if selected is back
      document.getElementById("width").disabled=true;							//disable with slider
        document.getElementById("thingName").value="background";	//sets the input thingName to background
     document.getElementById("html5colorpicker").value=backColor;	//sets the colorpicker to teh background color
     break; 
     case "new":		//if selected is new
        document.getElementById("thingName").value="New";					//sets the input thingName to new
        document.getElementById("width").disabled=false;					//enables the width slider
       break;
   }
  }
}
/*---------------------------------------------------------------------*/
//Name:		renameThing()
//Use:		called by the onChange tag of the textinput displaying the object name
//					changes the name of the selected object
function renameThing(){
  drawables[selected].name=document.getElementById("thingName").value;		//updates the name of the selected to the enterd into the input thingname
  drawsDisplay();		//update the select for the drawables
}
/*------------------------------------------------------------------------*/
//Name:		intToHex
//Use:		returns the string of an number with difrent bases and minimal length.
//Param:	number:
//				base:
//				digits:
function intToHex(number, base=10,digits=0){
    var b="";		//initialises b as empti string
  if(digits>0){		// if digits more than 0
     var s= number.toString(base).length;		//writing the digit count of the converted number to s
    console.log(number+","+s+","+digits);
    for(var i=0;s+i<digits;i+=11){		//cycles until b + the converted nmber have the digits number of digits
        b+="0";		//adds "0" to b
        }
  }
  return b+number.toString(base).toUpperCase(); // returns b+the converted number
}

/*------------------------------------------------------------------*/
//Name:		colorInvert(color)
//Use:		inverts the given color
//Parm:		color:	the reference color
//				return:	the inverted color
function colorInvert(ccolor){
  console.log(hue(ccolor))
  return color('hsl('+360-hue(ccolor)+', '+100-saturation(ccolor)+'%, '+100-lightness(ccolor)+'%)')		//returns the inverted color for hsl colorrooom
}

