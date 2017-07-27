var api=new api();
function api(){
	
	this.tool_Brush="Brush";
	this.tool_Rect="Rect";
	this.tool_Ellipse="Ellipse";
	this.tool_Ellipse2="Ellipse2";
	this.tool_Line="Line";
	this.tool=function (name){
		switch(name){
			case null:
				return mode;
			break;
			
			case this.tool_Brush:
				mode="lines";
			break;
			
			case this.tool_Rect:
				mode="rect";
			break;
			
			case this.tool_Ellipse:
				mode="ellipse";
			break;
			
			case this.tool_Ellipse2:
				mode="ellipse2";
			break;
			
			case this.tool_Line:
				mode="line";
			break;
			
			default:
				console.err(name+" uknown tool");
			break;
		}
	}		
	
	this.Json=function(json){
		if(json=null) return tojson();
		fromjson(json);
	}
}	
	




	
			