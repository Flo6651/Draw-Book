function Layer(name){
  this.name=name;				//Name of the Layer
  this.drawables=[];		//drawable stack of the layer
  this.visible=true;		//visible flag of the layer
  this.bgcolor=color(0,0,0,0);	//backgroundcolor of the layer
  this.draw=function () {				//called every frame
    //fill(this.bgcolor);					
    if(this.visible)				//if the layer is visible
      this.drawables.forEach(function(element){	//foreach lopp for drawing each drawable
   			element.draw(); 													//draw the current drawable
  		});
  }
  
  this.tojson=function(){
   var out= '{"type":"Layer",'+
     '"name":"'+this.name+'",'+
     '"drawables":[';
     this.drawables.forEach(function(element){	
 			  out+=element.tojson()+',';
	  	}); 
     if(this.drawables.length>0) out = out.substring(0, out.length - 1);
     out+='],"visible":'+this.visible+
  	'}';
    return out;
  } 
}