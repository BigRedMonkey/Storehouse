/*
	命名空间
	tools
		把封装的工具方法都放在这个tools下
*/
var tools = (function(){

	var toolsObj = {
		$:function(selector,context){
			/*

			 * #id
			 * .class
			 * 标签
			 * "#id li"
			 * ".class a"
			 * */
			context = context || document;
			if(selector.indexOf(" ") !== -1){
				return context.querySelectorAll(selector);
			}else if( selector.charAt(0) === "#" ){
				return document.getElementById(selector.slice(1))
			}else if( selector.charAt(0) === "." ){
				return context.getElementsByClassName(selector.slice(1));
			}else{
				return context.getElementsByTagName(selector);
			}
		},
		view:function (){
			return {
				W:document.documentElement.clientWidth,
				H:document.documentElement.clientHeight
			}	
		},
		addEvent:function (obj,evName,fnName){
			obj.addEventListener(evName,fnName,false);	
		},
		removeEvent:function (obj,evName,fnName){
			obj.removeEventListener(evName,fnName,false);	
		},
		addClass:function (element,clsNames){
			if( typeof clsNames === "string" ){
				if(!tools.hasClass(element,clsNames)){
					element.className += " "+clsNames;
				}
			}
		},
		removeClass:function (element,clsNames){
			var classNameArr = element.className.split(" ");
			for( var i = 0; i < classNameArr.length; i++ ){
				if( classNameArr[i] === clsNames ){
					classNameArr.splice(i,1);
					i--;
				}
			}
			element.className = classNameArr.join(" ");
		},
		hasClass:function(ele,classNames){
			
			var classNameArr = ele.className.split(" ");
			for( var i = 0; i < classNameArr.length; i++ ){
				if( classNameArr[i] === classNames ){
					return true;
				}
			}

			return false;
		},
		toggleClass:function (ele,classNames){
			if( tools.hasClass(ele,classNames) ){
				tools.removeClass(ele,classNames);
				return false;
			}else{
				tools.addClass(ele,classNames);
				return true;
			}
		},
		parents:function (element,selector){

			var first = selector.charAt();
			//怎么判断是doucment

			if( first === "#" ){
				selector = selector.slice(1); 
				while(element.nodeType != 9 && element.id != selector){  //当前这个元素的id不为box
					element = element.parentNode;
				}
			}else if(first === "."){
				selector = selector.slice(1); 
				while(element.nodeType != 9 && !tools.hasClass(element,selector)){  //当前这个元素的id不为box
					element = element.parentNode;

					//console.log( element );
				}
			}else {
				while(element.nodeType != 9 && element.nodeName.toLowerCase() != selector){  //当前这个元素的id不为box
					element = element.parentNode;
				}
			}

			return element.nodeType === 9 ? null : element;
		}
	}

	return toolsObj;

}())
