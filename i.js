var cDrawable = "Drawable";		//constant for opening and closing the options
var cLayer = "Layer";						//constant for opening and closing the options
var cAdvanced = "Advanced";
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
  saving=true;			//sets the save flag
}
/*--------------------------------------------------------------------------*/
//Name:		iNew()
//Use:		called  by the Newimage's onClick tag
//					clears the stack
function iNew(){
  layers=[];		//clear the stack
  iNewLayer("background");		//creats a new Layer
  drawsDisplay(); //update the select displaying the drawable
}
/*--------------------------------------------------------------------------*/
//Name:		iNewLayer()
//Use:		called  by the NewLayerimage's onClick tag
//					create a new Layer
function iNewLayer(){
  layers.push(new Layer("NewLayer"+layers.length));	//push a new layer to the stack
  selectedLayer=layers.length-1;	//sets the new layer to active
  layersDisplay(); //update the select displaying the drawable
  console.log("new Layer Created");
  document.getElementById("layerName").value=layers[selectedLayer].name;		//displays the name of the created Layer
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
//Use:		called  by the TogelLayerimage's onClick tag
//					hides or shows a layer
function itVisibleLayer(){
  if(layers[selectedLayer].visible==true) {		//if the layer is visible
    document.getElementById("layerVisible").src="img/hideLayer.png";	//sets the image to hidden
    layers[selectedLayer].visible=false;		//hide the layer
  }else{
    document.getElementById("layerVisible").src="img/showLayer.png";	//sets the image to shown
    layers[selectedLayer].visible=true;		//shows the layer
  }
	console.log("visibility of "+layers[selectedLayer].name+" set to "+layers[selectedLayer].visible);
	}

/*---------------------------------------------------------------------------*/
//Name:		renameLayer
//Use:		called ba the onChange event of tha layerName input
//					
function renameLayer(){
  layers[selectedLayer].name=document.getElementById("layerName").value; // renames the layer to the layerName inputs value
  layersDisplay();		//Displays Layer and drawables
  
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

/*--------------------------------------------------*/
//Name:		setAlpa()
//Use:		sets the alpha value of the selected drawable
function setAlpha(){
   if(selected>=0) // if a drawable is selected
     layers[selectedLayer].drawables[selected].color=
       color(
         red(layers[selectedLayer].drawables[selected].color),
         green(layers[selectedLayer].drawables[selected].color),
         blue(layers[selectedLayer].drawables[selected].color), 
        parseInt(document.getElementById("Alpha").value));						// if a drawable is selected its Alpha is updated

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
  selectDrawable(document.getElementById("drawables").value); 
}
/*--------------------------------------------------------------------*/
//Name:		chooseLayer()
//Use:		called by the onChange tag from the object diplayer
//					sets the selected variable and color, Name and width of the GUI
function chooseLayer(){
  
  //if(selected>=0) layers[selectedLayer].drawables[selected].selected=false;			//if a layer is selected its selected tag is removed
  selected="new";		//selects the drawale new
  selectedLayer=document.getElementById("layers").value;		//selects the Layer from teh layerselects value
  if(layers[selectedLayer].visible==false) {		//if the layer is hidden 
    document.getElementById("layerVisible").src="img/hideLayer.png";		//sets the image to hidden
  }else{
    document.getElementById("layerVisible").src="img/showLayer.png";		//sets the image to shown
  }
  drawsDisplay();		//updates the draws displayed
  console.log("current Layer is set to: " +layers[selectedLayer].name);
  document.getElementById("layerName").value=layers[selectedLayer].name;		//displays the name of the the Layer
}	
/*---------------------------------------------------------------------*/
//Name:		renameTrawable()
//Use:		called by the onChange tag of the textinput displaying the object name
//					changes the name of the selected object
function renameDrawable(){
  layers[selectedLayer].drawables[selected].name=document.getElementById("drawableName").value;		//updates the name of the selected to the enterd into the input drawablename
  drawsDisplay();		//update the select for the drawables
}


function rename(v){
	name=v;
}

/*---------------------------------------------------------------------*/
//Name:		iRemoveLayer()
//Use:		called by the onClick event of the Layer remove image
//					removes the current layer
function iRemoveLayer(){
  console.log("remove Layer "+layers[selectedLayer].name);
  layers.splice(selectedLayer,1);	//removes the current layer
  selectedLayer=0; 		//selects layer 0
  if(layers.length<1) iNewLayer();	// if no layer is left a new is created
  layersDisplay();		//update Layers and draws display
}
/*------------------------------------------------------------------------------------------*/
//Name:		iToDisplay(id)
//Use:		called from the <a>s onClick event of the obtion
//Param:	id:	the id of the obtion to toggle
function  iToDisplay(id){
  console.log("id:img"+id);
	var img=document.getElementById("img"+id);	//loads the image of the obtion
  var cla=document.getElementById("cal"+id);	//loads the div of the obtion
  switch(cla.className){			
    case "noDisplay":		//if not displayed
      cla.className="dfDisplay";		//display the div
      img.src="img/open.png";			//set the image to open
      break;
    case "dfDisplay":		//if displayd
      cla.className="noDisplay";		//hides the div
      img.src="img/close.png"; 		//sets the image to close
      break;
    }
}

/*------------------------------------------------------------------------------------------*/
//Name:		iRemoveDraw()
//Use:		called by the onClick event from the remove Drawable object image
//					removes teh current drawable 
function iRemoveDraw(){
  console.log("removing "+selected);
  if(selected>=0){			//if a drawable is selected
 		layers[selectedLayer].drawables.splice(selected,1);		//remove the specific drawable
		selected="new";			//set theselected drawable to "new"
  drawsDisplay();				//updates the displayment of drawables
  }
} 
/*------------------------------------------------------------------------------------------*/
//Name:		iUpDraw()
//Use:		
//					moves the crrent drawabel one position up
function iUpDraw(){
  if(selected>=0&selected<(layers[selectedLayer].drawables.length-1)){
		var temp=layers[selectedLayer].drawables[selected];
    layers[selectedLayer].drawables[selected]=layers[selectedLayer].drawables[selected+1];
    layers[selectedLayer].drawables[selected+1]=temp;
    selected+=1;
    
    console.log(layers[selectedLayer].drawables[0].name);
  
    drawsDisplay(); 

  } 
}
/*------------------------------------------------------------------------------------------*/
//Name:		iDownDraw()
//Use:		
//					moves the drawable one position down 
function iDownDraw(){
  if(selected>0){
		var temp=layers[selectedLayer].drawables[selected];
    layers[selectedLayer].drawables[selected]=layers[selectedLayer].drawables[selected-1];
    layers[selectedLayer].drawables[selected-1]=temp;
    selected-=1;
    drawsDisplay();
  }
}
/*------------------------------------------------------------------------------------------*/
//Name:		iUpLayer()
//Use:		
//					moves the selected layer one position up
function iUpLayer(){
  if(selectedLayer>0){
		var temp=layers[selectedLayer];
    layers[selectedLayer]=layers[selectedLayer-1];
    layers[selectedLayer-1]=temp;
    selectedLayer-=1;
  }
}
/*------------------------------------------------------------------------------------------*/
//Name:		iDownLayer()
//Use:		
//					moves the selected layer one position down
function iDownLayer(){
  if(selectedLayer>=0&selectedLayer<(layers.length-1)){
		var temp=layers[selectedLayer];
    layers[selectedLayer]=layers[selectedLayer+1];
    layers[selectedLayer+1]=temp;
    selectedLayer+=1;
  }
}



function handleFileSelect(evt) {
  var files = evt.target.files;
  var reader = new FileReader();
  reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) { // DONE == 2

        console.log("g");




        fromjson(reader.result);
      }
    };

  			reader.readAsText(files[0]);
  
}

  
function iExport(){
	fexport=true;
}