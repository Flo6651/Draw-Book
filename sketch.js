/*
<a href="data:application/octet-stream;foo=bar,DATA">text file</a><br/>
http://coderstoolbox.net/string/#!encoding=xml&action=encode&charset=us_ascii
*/
/*
var drawer=function(sketch){
	this.setup=function(){}
	this.draw=function(){}
}

var myp5=new p5(drawer);*/

var canvas;						//stores the html5 canvas object for clearign the background for save
var drawing=false;		//true while mouse is pressed over the canvas
//var drawables=[];			//array of objects to draw
var name="";
var layers=[];					//Layer Stack
var currentdraw=null;		//the object currently drawn
var mode="line";			//drawMode (
												//Line,			A Single Line
												//rect,			A Rectangular shape between start and end point 	
												//lines,		Manny Lines in a Row Also known as Brush
												//ellipse,	A Ellipse with its center at the beginning
												//ellipse2	A Ellipse between start and Endpoint
var selected="new";				//holds the position of the selected drawable in the Layers drawables Stack , "back" or "new"
var selectedLayer=0;			//holds the position of the selected Layer
var backColor="#FF0000";	//stores the Backgroundcollor
var saving=false;					// falg for saving the image 
var fexport = false;

/*-----------------------------------------------------------------------------------*/  
//Name:		setup()
//Use:		initialisation function of p5
function setup() { 					// The Setup function of p5
  frameRate(25); 						//sets the framrate to 25 for less weight on the system
  createCanvas(							//creat a new camnvas
    document.getElementById("sketch-holder").getBoundingClientRect().width, //canvas fills teh sketch-holder in width
    document.getElementById("sketch-holder").getBoundingClientRect().height	//canvas fills teh sketch-holder in height
  	).parent('sketch-holder');																								//positionate the canvas to the sketch-holder
  canvas = document.getElementById("defaultCanvas0");												//save the canvas to canvas
  layers.push(new Layer("background"));																			//create first Layer
  document.getElementById("layerName").value=layers[selectedLayer].name;		//
  layersDisplay();					//update the selects displaying the drawable and Layers
  window.onresize = function(event) {																				//called when window is resized
    resizeCanvas(document.getElementById( "sketch-holder").getBoundingClientRect().width, document.getElementById("sketch-holder").getBoundingClientRect().height);
 }
  if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
	} else {
  	alert('The File APIs are not fully supported in this browser.');
	}
}

/*---------------------------------------------------------------------------------------*/
//Name:		draw()
//Use:		periodically (de:aufgerufene) function for drawing on the canvas
function draw() { 
  if(saving|fexport) {		//if the saving flag is set
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);	//cleaer the canvas
  }else{
  drawBackground(20,color(100),color(200));		//draw tha background with blocksize of 20px
  }
  
  layers.forEach(function(element){	//foreach lopp for drawing each drawable
   element.draw(); 											//draw the current drawable
  }); 
  
  if( drawing)
    currentdraw.show(mouseX,mouseY);		//draws the privew of the current drawable
  if(saving==true){						//if save flag is setsaveCanvas();							//save canvas as image
  	saving=false;							//clear save flag
    saveAs("data:application/octet-stream;foo=bar,"+encodeURI(tojson()),name+".drb"); 
  }
  if(fexport){
	saveCanvas(name,"png");
	fexport=false;
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
  for(var i=(layers[selectedLayer].drawables.length-1);i>=0;i-=1){		//cycles throu the stack
   out+="<option value='"+i+"'>"+i+":"+layers[selectedLayer].drawables[i].name+"</option>"; 	//for each drawable its id and name is added to the html code
  	console.log(out);
  }
  out="<option value='new'> new </option>"+out+"<option value='back'>background</option>";		// adding background and new to out
  console.log(out); 
  document.getElementById("drawables").innerHTML=out;		// sets the selects inner html to out
	document.getElementById("drawables").value=selected;		// sets the selects inner html to out
  if(selected>=0) {			// if a drawable is selected
    document.getElementById("drawableName").value=layers[selectedLayer].drawables[selected].name;		//set drawableName to the selected drawables name
  }else{
    document.getElementById("drawableName").value=selected;		//write background or new to drawabeName
  }
} 
/*---------------------------------------------------------------------------*/
//Name:		layersDisplay()
//Use:		updates the list of Layers
function layersDisplay(){
 	var out ="";														//defining out as ""
  for(var i=0;i<layers.length;i+=1){		//cycles throu the stack
   out+="<option value='"+i+"'>"+i+":"+layers[i].name+"</option>"; 	//for each Layer its id and name is added to the html code
  }
  console.log("Layers:"+out); 
  document.getElementById("layers").innerHTML=out;		// sets the selects inner html to out
	document.getElementById("layers").value=selectedLayer;		//selects the current layer
  drawsDisplay();										//displays all drawables of the current layer
}

/*------------------------------------------------------------------------*/
//Name:		intToHex
//Use:		returns the string of an number with difrent bases and minimal length.
//Param:	number:
//				base:
//				digits:
function intToHex( number, base,digits){
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
  return color('hsl('+360-hue(ccolor)+', '+100-saturation(ccolor)+'%, '+100-lightness(ccolor)+'%)');		//returns the inverted color for hsl colorrooom
}

/*------------------------------------------------------------------*/
//Name:		drawBackground(rsize, c1 ,c2)
//Use:		inverts the given color
//Parm:		rsize:	teh size of teh blocks
//				c1:	color of haf blocks
//				c2:	color of the other haf blocks
function drawBackground(rsize,c1=100,c2=200){
//	c1 =200;
	//c2=100;
  noStroke();	//disables the stroke
  for(var x=0; x<width;x+=rsize){		//cycles through the width
   for(var y=0;y<height;y+=rsize){	// cycles through the heigh
      if((Math.floor(x/rsize)+Math.floor(y/rsize))%2==0){		//selects the collor of the current block
      	fill(c1);		//sets fillcolor to c1
      }else{
        fill(c2);		//sets fillcolor to c2
      }
       rect(x,y,rsize,rsize); 	//drawing the block
   }
  }
} 

function selectDrawable(id){
  
  if(selected>=0) layers[selectedLayer].drawables[selected].selected=false;			//if a drawable is selected its selected tag is removed
  selected=id;				//selecting the selected element from the <select>
  if(selected>=0){					//if a drawable is selected 
  	document.getElementById("width").disabled=false;		//enables the use of the width slider
  	document.getElementById("drawableName").value=layers[selectedLayer].drawables[selected].name;	//sets the <input type=text> to drawables name 
  	document.getElementById("width").value=layers[selectedLayer].drawables[selected].width;			//sets the <input type=range> to the selected drawables width
    var c="#"+ 			
      intToHex(red(		layers[selectedLayer].drawables[selected].color),16,2)+		//converting red of the drawables color to hex
      intToHex(green(	layers[selectedLayer].drawables[selected].color),16,2)+		//converting green of the drawables color to hex
      intToHex(blue(	layers[selectedLayer].drawables[selected].color),16,2);		//converting blue of the drawables color to hex
    document.getElementById("html5colorpicker").value=c;	//setting the value of the colorpicker to the drawable ones
    document.getElementById("Alpha").value=alpha(layers[selectedLayer].drawables[selected].color);		//setting the value of the Alfa range input to the alfa of the drawable
    console.log(selected+""+id+" "+c+layers[selectedLayer].drawables[selected].color);
  	layers[selectedLayer].drawables[selected].selected=true;			//sets the selected flag of the selected drawable
    document.getElementById("calAdvanced").innerHTML="<table>"+
      "<tr><th>Begin</th><th>"+layers[selectedLayer].drawables[selected].begin+"</th></tr>"+
      "<tr><th>End</th><th>"+layers[selectedLayer].drawables[selected].end+"</th></tr>"+
        "</table>";
  }else{
    switch(selected){				//switches selected
     case "back":			//if selected is back
      document.getElementById("width").disabled=true;							//disable with slider
        document.getElementById("drawableName").value="background";	//sets the input drawableName to background
     //document.getElementById("html5colorpicker").value=layers[selectedLayer].bgcolor;	//sets the colorpicker to teh background color
     var d="#"+ 			
      intToHex(red(		layers[selectedLayer].bgcolor),16,2)+		//converting red of the drawables color to hex
      intToHex(green(	layers[selectedLayer].bgcolor),16,2)+		//converting green of the drawables color to hex
      intToHex(blue(	layers[selectedLayer].gbcolor),16,2);		//converting blue of the drawables color to hex
    	document.getElementById("html5colorpicker").value=d;	//setting the value of the colorpicker to the drawable ones
    	document.getElementById("Alpha").value=alpha(layers[selectedLayer].bgcolor);//setting the value of the Alfa range input to the alfa of the drawable
    	break;  
     case "new":		//if selected is new
        document.getElementById("drawableName").value="New";					//sets the input drawableName to new
        document.getElementById("width").disabled=false;					//enables the width slider
       break;
   }
  }
  document.getElementById("drawables").value=id;
}


function tojson(){ 
   var out= '{"type":"img",'+
	 '"name":"'+this.name+'",'+
     '"selected":"'+this.selected+'",'+
     '"selectedLayer":'+this.selectedLayer+','+
     '"layers":[';
     layers.forEach(function(element){
 			  out+=element.tojson( )+',';
	  	}); 
     out = out.substring(0, out.length - 1);
     out+='],"mode":"'+this.mode+'"'+
  	'}';
    return out;
  } 

function fromjson(json){
	var img=JSON.parse(json);
  layers=[];
  name=img.name
  selected=img.selected;
  selectedLayer=img.selectedLayer;
  mode=img.mode;
  document.getElementById("Name").value=name;
  img.layers.forEach(function(element){
    var templayer=new Layer(element.name);
    templayer.visible=element.visible;
    element.drawables.forEach(function(element2){
      var tempdrawable=null;
      switch(element2.type){
        case "Line":
       		tempdrawable=new Line(createVector(element2.begin.x,element2.begin.y),color(element2.color.r,element2.color.g,element2.color.b,element2.color.a),element2.width);
          tempdrawable.isfinal=element2.isfinal;
          tempdrawable.end=createVector(element2.end.x,element2.end.y);
          tempdrawable.selected=element2.selected;
          break;
        case "Ellipse":
       		tempdrawable=new Ellipse(createVector(element2.begin.x,element2.begin.y),color(element2.color.r,element2.color.g,element2.color.b,element2.color.a),element2.width);
          tempdrawable.isfinal=element2.isfinal;
          tempdrawable.end=createVector(element2.end.x,element2.end.y);
          tempdrawable.selected=element2.selected;
          break;
        case "Ellipse2":
      	 	tempdrawable=new Ellipse2(createVector(element2.begin.x,element2.begin.y),color(element2.color.r,element2.color.g,element2.color.b,element2.color.a),element2.width);
          tempdrawable.isfinal=element2.isfinal;
          tempdrawable.end=createVector(element2.end.x,element2.end.y);
          tempdrawable.selected=element2.selected;
          break;
        case "Rect":
       		tempdrawable=new Rect(createVector(element2.begin.x,element2.begin.y),color(element2.color.r,element2.color.g,element2.color.b,element2.color.a),element2.width);
          tempdrawable.isfinal=element2.isfinal;
          tempdrawable.end=createVector(element2.end.x,element2.end.y);
          tempdrawable.selected=element2.selected;
          break;
        case "Lines":
       		tempdrawable=new Lines(createVector(element2.pos[0].x,element2.pos[0].y),color(element2.color.r,element2.color.g,element2.color.b,element2.color.a),element2.width);
          tempdrawable.isfinal=element2.isfinal;
          tempdrawable.pos=[];
          element2.pos.forEach(function(element3){
          	tempdrawable.pos.push(createVector(element3.x,element3.y));
          });
          
          tempdrawable.selected=element2.selected;
          break;
          }
      templayer.drawables.push(tempdrawable);
    });
  	layers.push(templayer);
  });
  layersDisplay();
  console.log(img);
}

function saveAs(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);
    
    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}



