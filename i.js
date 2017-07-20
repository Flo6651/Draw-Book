var cDrawable = "Drawable";
var cLayer="Layer";
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
  layers[selectedLayer].drawables.pop();		//removes the latest drawable from the stack
  drawsDisplay(); 		//updates the select displaying the drawable
  console.log("last action removed");
}
/*---------------------------------------------------------------------*/
//Name:		iSave()
//Use:		called  by the Saveimages onClick tag
//					Saves the Canvas as Image
function iSave(){ 
  //saveCanvas();		//downloads the canvas as image
  saving=true
}
/*--------------------------------------------------------------------------*/
//Name:		iNew()
//Use:		called  by the Newimage's onClick tag
//					clears the stack
function iNew(){
  layers=[];		//clear the stack
  iNewLayer();
  drawsDisplay(); //update the select displaying the drawable
}
/*--------------------------------------------------------------------------*/
//Name:		iNewLayer()
//Use:		called  by the Newimage's onClick tag
//					clears the stack
function iNewLayer(){
  layers.push(new Layer("NewLayer"+layers.length));
  selectedLayer=layers.length-1;
  layersDisplay(); //update the select displaying the drawable
  console.log("new Layer Created");
  document.getElementById("layerName").value=layers[selectedLayer].name;
}
/*------------------------------------------------------------------*/
/*//Name:		resize()
//Use:		called  by one of the size inputs's onChange tag
//					changes the size of the canvas
function resize(){
	var sx=int( document.getElementById("X").value) ;		//saves the value of the input "X" to sx 
  var sy=int( document.getElementById("Y").value );		//saves the value of the input "Y" to sy
  resizeCanvas(sx ,sy);			//sets the size of the canvas to sx and sy
  console.log("canvas set to "+sx+":"+sy);
}*/
/*--------------------------------------------------------------------------*/
//Name:		itVisibleLayer()
//Use:		called  by the Newimage's onClick tag
//					clears the stack
function itVisibleLayer(){
  if(layers[selectedLayer].visible==true) {
    document.getElementById("layerVisible").src="img/hideLayer.png";
    layers[selectedLayer].visible=false;
  }else{
    document.getElementById("layerVisible").src="img/showLayer.png";
    layers[selectedLayer].visible=true;
  }
	console.log("visibility of "+layers[selectedLayer].name+" set to "+layers[selectedLayer].visible);
	}
/*---------------------------------------------------------------------------*/
//
//
//
function renameLayer(){
  layers[selectedLayer].name=document.getElementById("layerName").value;
  layersDisplay();
  
}
/*-------------------------------------------------------------------------*/
//Name:		clickcolor()
//Use:		called by the colorpickers onChange tag
//					sets the collor of the selected object or background
function clickColor() {
    var c = color(document.getElementById("html5colorpicker").value);		//saves the Hex string of the color from the colorpicker
  console.log(c+" "+document.getElementById("Alpha").value);
  if(selected>=0) layers[selectedLayer].drawables[selected].color=color(red(c),green(c),blue(c),alpha(layers[selectedLayer].drawables[selected].color));						// if a drawable is selected its color is updated
  console.log("sroke color set to: "+c);
  //if(selected=="back") layers[selectedLayer].bgcolor= color(red(c),green(c),blue(c),alpha(layers[selectedLayer].bgcolor));//,document.getElementById("Alpha").value);		//if the background is selected its color is updated
  console.log(selected);
}


function setAlpha(){
   if(selected>=0) 
     layers[selectedLayer].drawables[selected].color=color(red(layers[selectedLayer].drawables[selected].color),green(layers[selectedLayer].drawables[selected].color),blue(layers[selectedLayer].drawables[selected].color), parseInt(document.getElementById("Alpha").value));						// if a drawable is selected its color is updated

  if(selected=="back") 
    layers[selectedLayer].bgcolor= color(red(layers[selectedLayer].bgcolor),green(layers[selectedLayer].bgcolor),blue(layers[selectedLayer].bgcolor),parseInt(document.getElementById("Alpha").value));		//if the background is selected its color is updated  
 console.log(document.getElementById("Alpha").value);
}
 /*---------------------------------------------------------------------------*/
//Name:		resizeStroke()
//Use:		called by the tag range inputs onChange tag
//					sets the drawmode to eclipse2
function resizeStroke(){
  if(selected>=0) layers[selectedLayer].drawables[selected].width=document.getElementById("width").value;  //if a drawable is selected its width is updated 
  }
/*--------------------------------------------------------------------*/
//Name:		chooseDrawable()
//Use:		called by the onChange tag from the object diplayer
//					sets the selected variable and color, Name and width of the GUI
function chooseDrawable(){
  if(selected>=0) layers[selectedLayer].drawables[selected].selected=false;			//if a drawable is selected its selected tag is removed
  selected=document.getElementById("drawables").value;				//selecting the selected element from the <select>
  if(selected>=0){					//if a drawable is selected 
  	document.getElementById("width").disabled=false;		//enables the use of the width slider
  	document.getElementById("drawableName").value=layers[selectedLayer].drawables[selected].name;	//sets the <input type=text> to drawables name 
  	document.getElementById("width").value=layers[selectedLayer].drawables[selected].width;			//sets the <input type=range> to the selected drawables width
    var c="#"+ 			
      intToHex(red(		layers[selectedLayer].drawables[selected].color),16,2)+		//converting red of the drawables color to hex
      intToHex(green(	layers[selectedLayer].drawables[selected].color),16,2)+		//converting green of the drawables color to hex
      intToHex(blue(	layers[selectedLayer].drawables[selected].color),16,2);		//converting blue of the drawables color to hex
    document.getElementById("html5colorpicker").value=c;	//setting the value of the colorpicker to the drawable ones
    document.getElementById("Alpha").value=alpha(layers[selectedLayer].drawables[selected].color);
    console.log(selected+""+document.getElementById("drawables").value+" "+c+layers[selectedLayer].drawables[selected].color);
  	layers[selectedLayer].drawables[selected].selected=true;			//sets the selected flag of the selected drawable
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
    	document.getElementById("Alpha").value=alpha(layers[selectedLayer].bgcolor);
    
    	break;  
     case "new":		//if selected is new
        document.getElementById("drawableName").value="New";					//sets the input drawableName to new
        document.getElementById("width").disabled=false;					//enables the width slider
       break;
   }
  }
}
/*--------------------------------------------------------------------*/
//Name:		chooseLayer()
//Use:		called by the onChange tag from the object diplayer
//					sets the selected variable and color, Name and width of the GUI
function chooseLayer(){
  
  if(selected>=0) layers[selectedLayer].drawables[selected].selected=false;			//if a drawable is selected its selected tag is removed
  selected="new"
  selectedLayer=document.getElementById("layers").value;
  if(layers[selectedLayer].visible==false) {
    document.getElementById("layerVisible").src="img/hideLayer.png";
  }else{
    document.getElementById("layerVisible").src="img/showLayer.png";
  }
  drawsDisplay();
  console.log("current Layer is set to: " +layers[selectedLayer].name);
  document.getElementById("layerName").value=layers[selectedLayer].name;
}	
/*---------------------------------------------------------------------*/
//Name:		renameTrawable()
//Use:		called by the onChange tag of the textinput displaying the object name
//					changes the name of the selected object
function renameDrawable(){
  layers[selectedLayer].drawables[selected].name=document.getElementById("drawableName").value;		//updates the name of the selected to the enterd into the input drawablename
  drawsDisplay();		//update the select for the drawables
}

/*---------------------------------------------------------------------*/
//Name:		iRemoveLayer()
//Use:		called by the onChange tag of the textinput displaying the object name
//					changes the name of the selected object
function iRemoveLayer(){
  console.log("remove Layer "+layers[selectedLayer].name);
  layers.splice(selectedLayer,1);
  selectedLayer=0; 
  if(layers.length<1) iNewLayer();
  layersDisplay();
  drawsDisplay();
}
/*------------------------------------------------------------------------------------------*/
//
//
//
function  iToDisplay(id){
  console.log("id:img"+id);
	var img=document.getElementById("img"+id);
  var cla=document.getElementById("cal"+id);
  switch(cla.className){
    case "noDisplay":
      cla.className="dfDisplay";
      img.src="img/open.png";
      break;
    case "dfDisplay":
      cla.className="noDisplay";
      img.src="img/close.png"; 
      break;
    }
}

/*------------------------------------------------------------------------------------------*/
//
//
//
function iRemoveDraw(){
  console.log("removing "+selected);
  if(selected>=0){
 		layers[selectedLayer].drawables.splice(selected,1);
		selected="new";
  drawsDisplay();
  }
}
/*------------------------------------------------------------------------------------------*/
//
//
//
function iUpDraw(){
  if(selected>0){
		var temp=layers[selectedLayer].drawables[selected];
    layers[selectedLayer].drawables[selected]=layers[selectedLayer].drawables[selected-1];
    layers[selectedLayer].drawables[selected-1]=temp;
    selected-=1;
    drawsDisplay(); 
  }
}
/*------------------------------------------------------------------------------------------*/
//
//
//
function iDownDraw(){
  if(selected>=0&selected<(layers[selectedLayer].drawables.length-1)){
		var temp=layers[selectedLayer].drawables[selected];
    layers[selectedLayer].drawables[selected]=layers[selectedLayer].drawables[selected+1];
    layers[selectedLayer].drawables[selected+1]=temp;
    selected+=1;
    drawsDisplay();
  }
}
/*------------------------------------------------------------------------------------------*/
//
//
//
function iUpLayer(){
  if(selectedLayer>0){
		var temp=layers[selectedLayer];
    layers[selectedLayer]=layers[selectedLayer-1];
    layers[selectedLayer-1]=temp;
    selectedLayer-=1;
  }
}
/*------------------------------------------------------------------------------------------*/
//
//
//
function iDownLayer(){
  if(selectedLayer>=0&selectedLayer<(layers.length-1)){
		var temp=layers[selectedLayer];
    layers[selectedLayer]=layers[selectedLayer+1];
    layers[selectedLayer+1]=temp;
    selectedLayer+=1;
  }
}
  
