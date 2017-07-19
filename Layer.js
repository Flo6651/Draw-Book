function Layer(name){
  this.name=name
  this.drawables=[];
  this.visible=true;
  this.bgcolor=color(0,0,0,0);
  this.draw=function () {
    fill(this.bgcolor);
    rect(0,0,width,height);
    if(this.visible)
      this.drawables.forEach(function(element){	//foreach lopp for drawing each drawable
   			element.draw(); 													//draw the current drawable
  		});
  }
}
