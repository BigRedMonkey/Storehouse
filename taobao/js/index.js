//工具函数
//添加类名
function hasClass(element,classNames) {
	var classAll = 	element.className.split(" ");  //"blue red"
	for( var i = 0; i < classAll.length; i++ ){
		if( classAll[i] === classNames ){
			return true;
		}
	}
	return false;
}
function addClass(element,classNames){
	var classAll = element.className; 
	if( !hasClass(element,classNames) ){
		classAll += " " + classNames;
	}
	element.className = classAll.trim();
}
//addClass(box,"red");
//删除类名
function removeClass(element,classNames){
	if( hasClass(element,classNames) ){  //如果有这个class，就删除
		var classAll = element.className.split(" "); // ["blue","red"]
		for( var i = 0; i < classAll.length; i++ ){
			if( classAll[i] === classNames ){
				classAll.splice(i,1);
				i--;
			}
		}
		//如果这个数组为kong，那么就删除标签上的class这个属性
		if( classAll.length === 0 ){
			element.removeAttribute("class");
		}else{
			element.className = classAll.join(" ");
		}
		

	}

}
//removeClass(box,"blue");

//获取搜索栏的a标签
var seekNav = document.getElementsByClassName('seekNav')[0];
var allSeekNavA = seekNav.getElementsByClassName('seekNavA');
//鼠标滑过变颜色
for(var i = 0; i < allSeekNavA.length; i++){
	allSeekNavA[i].onmouseover = function(){
		for(var j = 0; j<allSeekNavA.length; j++){
			allSeekNavA[j].style.background = '#fff';
			allSeekNavA[j].style.color = '#ff5400';
		}
		this.style.background = '#ff5400';
		this.style.color = '#fff';
	}
	allSeekNavA[i].onmouseout = function(){
		for(var j = 0; j < allSeekNavA.length; j++){
			allSeekNavA[j].style.background = '#fff';
			allSeekNavA[j].style.color = '#ff5400';
		}
	}
}
//点击关闭二维码
var RWMclose = document.getElementsByClassName('RWMclose')[0];
var RWM = document.getElementsByClassName('RWM')[0];
RWMclose.onclick = function(){
	RWMclose.style.display = 'none';
	RWM.style.display = 'none';
}
//图片滚动  banner
var list = $("#list");
var allLi = $("li",list);
var len = allLi.length;
var oneLiW = parseInt(getStyle(allLi[0],"width"));
list.style.width = len * oneLiW + "px";
for( var i = 1; i < allLi.length; i++ ){
	allLi[i].style.left = -50 * oneLiW + "px";
}
var navLi = $("li",$("#nav"));

//获取按钮
var next = $("#next");
var prev = $("#prev");

var n = 0 ;  //起始的下标值

//点击下一个
var old = 0;
next.onclick = function (){
    if( list.timer ) {
        return;
    }
    n++;

    if( n > len-1 ){
    	n = 0;
    }
    rock(true);
	
    
};

prev.onclick = function (){
    if( list.timer ) {
        return;
    }
    n--;

    if( n < 0 ){
    	n = len-1;
    }
    rock();     
};

for( var i = 0; i < len; i++ ){
	navLi[i].index = i;
	navLi[i].onclick  =function (){
		
		if( this.index > n ){
			n = this.index;
			rock(true);           			
		}else{
			n = this.index;
			rock();

		}	
	};
}

function rock(bl){
	var l = bl ? -oneLiW : oneLiW;
	allLi[n].style.left = -l + "px";
    list.style.left = 0;
    allLi[old].style.left = "0px";
    for(var i = 0;i<navLi.length;i++){
    	navLi[i].className = "";
    }
    navLi[n].className = "red";
    MTween(list,"left",1000,l,"linear",function (){
    	allLi[old].style.left = -50*oneLiW + "px";
    	old = n;
    });
}
















//左侧的导航
var ZTSC = document.getElementsByClassName('ZTSC')[0];  //ul
var leftAllLi = ZTSC.getElementsByClassName('allLi');
var TCLi = document.getElementById('TCLi');
//鼠标滑过 li变颜色
for(var i = 0; i<leftAllLi.length; i++){
	leftAllLi[i].onmousemove = function(){
		for(var j = 0; j<leftAllLi.length; j++){
			removeClass(leftAllLi[j],"allLi2");
		}
		addClass(this,"allLi2");
		TCLi.style.display = 'block';
	}
	leftAllLi[i].onmouseout = function(){
		removeClass(this,"allLi2");
		TCLi.style.display = 'none';
	}
}
