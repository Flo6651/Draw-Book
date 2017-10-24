/*
<a href="data:application/octet-stream;foo=bar,DATA">text file</a><br/>
http://coderstoolbox.net/string/#!encoding=xml&action=encode&charset=us_ascii
*/
var canvas;
var drawing=false;		//true while mouse is pressed over the canvas
//var drawables=[];			//array of objects to draw
var layers=[];
var currentdraw=null;		//the object currently drawn
var mode="line";			//drawMode (
												//Line,			A Single Line
												//rect,			A Rectangular shape between start and end point 	
												//lines,		Manny Lines in a Row Also known as Brush
												//ellipse,	A Ellipse with its center at the beginning
												//ellipse2	A Ellipse between start and Endpoint
var selected="new";				//hold the position of the selected Onject in drawables , back or new
var selectedLayer=0;
var backColor="#FF0000";	//stores the Backgroundcollor
var saving=false;

/*-----------------------------------------------------------------------------------*/  
//Name:		setup()
//Use:		initialisation function of p5
function setup() { 					// The Setup function of p5
  frameRate(25); 
  createCanvas(document.getElementById("sketch-holder").getBoundingClientRect().width, document.getElementById("sketch-holder").getBoundingClientRect().height).parent('sketch-holder');
  canvas = document.getElementById("defaultCanvas0");
  layers.push(new Layer("background"));
  document.getElementById("layerName").value=layers[selectedLayer].name;
  window.onresize = function(event) {		//called when window is resized
    resizeCanvas(document.getElementById("sketch-holder").getBoundingClientRect().width, document.getElementById("sketch-holder").getBoundingClientRect().height);//
 }
  drawsDisplay(); //update the select displaying the drawable
  layersDisplay();
  
  
} 

/*---------------------------------------------------------------------------------------*/
//Name:		draw()
//Use:		periodically (de:aufgerufene) function for drawing on the canvas
function draw() { 
  if(saving) {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  }else{
  drawBackground(20);
  }
  
  layers.forEach(function(element){	//foreach lopp for drawing each drawable
   element.draw(); 											//draw the current drawable
  }); 
  
  if( drawing)
    currentdraw.show(mouseX,mouseY);		//draws the privew of the current drawable
	if(saving==true){
  	saveCanvas();
  	saving=false;
  }
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
    case "ellipse":		 	//drawing an ecipse with the beginning in the center
      console.log("start ellipse");
      currentdraw=new Ellipse(		//creating a new Ellipse
        		createVector(mouseX,mouseY),		// start position
        		color(
              	red(color(document.getElementById("html5colorpicker").value)),
              	green(color(document.getElementById("html5colorpicker").value)),
                blue(color(document.getElementById("html5colorpicker").value)),
                parseInt(document.getElementById("Alpha").value)),	//take the color from the colorpicker
          	document.getElementById("width").value					//takes the width from the slider
      );
      break;	
    case "line":			//drawing a line
      console.log("start line");
      currentdraw=new Line(
        		createVector(mouseX,mouseY),		// start position
        		color(
              	red(color(document.getElementById("html5colorpicker").value)),
              	green(color(document.getElementById("html5colorpicker").value)),
                blue(color(document.getElementById("html5colorpicker").value)),
                parseInt(document.getElementById("Alpha").value)),	//take the color from the colorpicker
          	document.getElementById("width").value					//takes the width from the slider
      );
    	break;
    case "lines":			//drawing Lines
      console.log("start lines");
      currentdraw=new Lines(
        		createVector(mouseX,mouseY),		// start position
        		color(
              	red(color(document.getElementById("html5colorpicker").value)),
              	green(color(document.getElementById("html5colorpicker").value)),
                blue(color(document.getElementById("html5colorpicker").value)),
                parseInt(document.getElementById("Alpha").value)),	//take the color from the colorpicker
          	document.getElementById("width").value					//takes the width from the slider

      );
      break;
    case "rect":			//drawing a rectangle
      console.log("start rect");
      currentdraw=new Rect(
        		createVector(mouseX,mouseY),		// start position
        		color(
              	red(color(document.getElementById("html5colorpicker").value)),
              	green(color(document.getElementById("html5colorpicker").value)),
                blue(color(document.getElementById("html5colorpicker").value)),
                parseInt(document.getElementById("Alpha").value)),	//take the color from the colorpicker
          	document.getElementById("width").value					//takes the width from the slider
      );
      break;
    case "ellipse2":	//drawing a ellipse inbetween start and end point
      console.log("start ellipse2");
      currentdraw=new Ellipse2(
        		createVector(mouseX,mouseY),		// start position
        		color(
              	red(color(document.getElementById("html5colorpicker").value)),
              	green(color(document.getElementById("html5colorpicker").value)),
                blue(color(document.getElementById("html5colorpicker").value)),
                parseInt(document.getElementById("Alpha").value)),	//take the color from the colorpicker
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
  if(!currentdraw.isfinal){						// checks if the current drawable is already finalized
  currentdraw.final(mouseX,mouseY);		//finalizes the current drawable
  drawing=false;											//sets the drawing to false
  layers[selectedLayer].drawables.push(currentdraw);				// pushes the current drawable onto the stack
  drawsDisplay();											//Updates the drawables shown in the gui
	if(selected>=0) layers[selectedLayer].drawables[selected].selected=false; 	//if a drawable is selected its selected tag is removed
  selected="new";																				//Selects a new drawable as the selected
  document.getElementById("drawableName").value="new";		//sets the name of the selected drawavle to the text input on the gui
  console.log("stop drawing");
 }
}

/*---------------------------------------------------------------------------*/
//Name:		drawsDisplay()
//Use:		updates the list of drawn objects
function drawsDisplay(){
 	var out ="";														//defining out as ""
  for(var i=0;i<layers[selectedLayer].drawables.length;i+=1){		//cycles throu the stack
   out+="<option value='"+i+"'>"+i+":"+layers[selectedLayer].drawables[i].name+"</option>"; 	//for each drawable its id and name is added to the html code
  }
  out="<option value='back'>background</option>"+out+"<option value='new'> new </option>";		// adding background and new to out
  console.log(out); 
  document.getElementById("drawables").innerHTML=out;		// sets the selects inner html to out
	document.getElementById("drawables").value=selected;		// sets the selects inner html to out
} 
/*---------------------------------------------------------------------------*/
//Name:		layersDisplay()
//Use:		updates the list of drawn objects
function layersDisplay(){
 	var out ="";														//defining out as ""
  for(var i=0;i<layers.length;i+=1){		//cycles throu the stack
   out+="<option value='"+i+"'>"+i+":"+layers[i].name+"</option>"; 	//for each drawable its id and name is added to the html code
  }
  //out="<option value='back'>background</option>"+out+"<option value='new'> new </option>";		// adding background and new to out
  console.log("Layers:"+out); 
  document.getElementById("layers").innerHTML=out;		// sets the selects inner html to out
	document.getElementById("layers").value=selectedLayer;
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
  //console.log(hue(ccolor))
  return color('hsl('+360-hue(ccolor)+', '+100-saturation(ccolor)+'%, '+100-lightness(ccolor)+'%)')		//returns the inverted color for hsl colorrooom
}

/*------------------------------------------------------------------*/
//Name:		colorInvert(color)
//Use:		inverts the given color
//Parm:		color:	the reference color
//				return:	the inverted color
function drawBackground(rsize=10,c1=250,c2=200){
  noStroke();
  for(var x=0; x<width;x+=rsize){
   for(var y=0;y<height;y+=rsize){
      if((Math.floor(x/rsize)+Math.floor(y/rsize))%2==0){
      	fill(c1);
      }else{
        fill(c2);
      }
       rect(x,y,rsize,rsize); 
   }
  }
}
