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



//获取元素
var box = tools.$('#box'); //获取到放新建的文件夹的div
//var newWJ = $('div',box);
var newFile = tools.$('#newFile'); 
var allCheckbox = tools.$('#allCheckbox');
var ckk = allCheckbox.firstElementChild; //全选
var deletes = tools.$('#delete');  //删除
var anew = tools.$('#anew');   //重命名
var onOff = true;

/********************    渲染数据      ******************/

//function xrFn(data){
//	var newdiv = document.createElement('div');
//	//newdiv.innerHTML = '<i class="conCkBox"></i><em class="conBg"></em><span class="conName"><input type="text"/><p>'+ data.title +'</p></span>';
//	var newDiv = document.createElement('div');
//	var newI = document.createElement('i');
//	var newEm = document.createElement('em');
//	var newSpan = document.createElement('span');
//	var txt = document.createElement('input');
//	var newP = document.createElement('p');
//	newDiv.className = 'contents'; //div
//	newI.className = 'conCkBox';  //小方块
//	newEm.className = 'conBg';   //文件夹背景
//	newSpan.className = 'conName';  //文件夹名字
//	box.appendChild(newDiv);
//	newDiv.appendChild(newI);
//	newDiv.appendChild(newEm);
//	newDiv.appendChild(newSpan);
//	newSpan.appendChild(txt);
//	newSpan.appendChild(newP);
//	newP.innerHTML = data.title;
//	txt.style.display = 'none';
//	newP.style.display = 'block';
//	newDiv.onmouseover = function(){
//		//console.log(this.children[2].children[0].className);
//		if(this.children[2].children[0].className === 'aaa'){
//			this.style.background = '#fff';
//			this.style.borderColor = '#fff';
//			newDiv.firstElementChild.style.display = 'none';
//		}else{
//			if(this.firstElementChild.className === 'conCkBox2'){
//				this.style.background = '#e9f3fd';
//				this.style.borderColor = '#c3d8f0';
//				newDiv.firstElementChild.style.display = 'block';
//			}else{
//				this.style.background = '#f3f9fe';
//				this.style.borderColor = '#c3d8f0';
//				newDiv.firstElementChild.style.display = 'block';
//			}
//		}
//		
//	}
//	//鼠标移出div
//	newDiv.onmouseout = function(){
//		//当鼠标移出 判断如果当前小方块的类名如果不是被点击的过的类名 那么就改回初始状态
//		if( this.firstElementChild.className != 'conCkBox2' ){
//			this.style.background = '#fff';
//			this.style.borderColor = '#fff';
//			newDiv.firstElementChild.style.display = 'none';
//		}
//	}
//	return newDiv;
//}
//for(var i = 0; i<data.files.length; i++){
//	if(data.files[i].pid === 0){
//		box.appendChild(xrFn(data.files[i]));
//	}
//	
//}

/********************    新建文件夹      ******************/
newFile.onmousedown = function(ev){
	ev.cancelBubble = true;
}
newFile.onclick = function(){
	var newDiv = document.createElement('div');
	var newI = document.createElement('i');
	var newEm = document.createElement('em');
	var newSpan = document.createElement('span');
	var txt = document.createElement('input');
	var newP = document.createElement('p');
	newDiv.className = 'contents'; //div
	newI.className = 'conCkBox';  //小方块
	newEm.className = 'conBg';   //文件夹背景
	newSpan.className = 'conName';  //文件夹名字
	//box.appendChild(newDiv);
	box.insertBefore(newDiv,box.firstElementChild);
	newDiv.appendChild(newI);
	newDiv.appendChild(newEm);
	newDiv.appendChild(newSpan);
	newSpan.appendChild(txt);
	newSpan.appendChild(newP);
	
	this.abc = true;
	//input标签获取焦点
	newSpan.children[0].style.display = 'block';  //先把input显示出来
	newSpan.children[0].focus(); //当点击新建文件夹的时候 input获取焦点
	addClass(newSpan.children[0],"aaa");
	newSpan.children[0].onblur = function(){	
		if(newSpan.children[0].value){  //如果input有value值  失去焦点保留名字 新建div
			newSpan.children[1].innerHTML = newSpan.children[0].value;
			newSpan.children[0].value = '';
			newSpan.children[0].style.display = 'none';
			newSpan.children[1].style.display = 'block';
			removeClass(newSpan.children[0],"aaa");
			ckk.className = 'allCbox';
		}else{  //如果没有value  删除新建的div
			box.removeChild(newDiv); 
			//在新建文件的时候 判断一下全选按钮是不是选中状态 如果是 取消新建还是保留选中状态
			if(ckk.className === 'allCbox2'){
				ckk.className = 'allCbox2';
			}
		}
		
		newFile.abc = false;
	}
	//鼠标移入div
	//var onOff = true;  //声明一个开关  初始状态为true
	newDiv.onmouseover = function(){
		// .log(this.children[2].children[0].className);
		if(this.children[2].children[0].className === 'aaa'){
			this.style.background = '#fff';
			this.style.borderColor = '#fff';
			newDiv.firstElementChild.style.display = 'none';
		}else{
			if(this.firstElementChild.className === 'conCkBox2'){
				this.style.background = '#e9f3fd';
				this.style.borderColor = '#c3d8f0';
				newDiv.firstElementChild.style.display = 'block';
			}else{
				this.style.background = '#f3f9fe';
				this.style.borderColor = '#c3d8f0';
				newDiv.firstElementChild.style.display = 'block';
			}
		}	
	}
	//鼠标移出div
	newDiv.onmouseout = function(){
		//当鼠标移出 判断如果当前小方块的类名如果不是被点击的过的类名 那么就改回初始状态
		if( this.firstElementChild.className != 'conCkBox2' ){
			this.style.background = '#fff';
			this.style.borderColor = '#fff';
			newDiv.firstElementChild.style.display = 'none';
		}
	}
	clickFn();
}

var off = true;
ckk.onclick = function(){
	//把box里面所有的div找到
	var boxDiv = box.getElementsByTagName('div');
	if(off){ //当全选按钮没有被点击过
		addClass(this,"allCbox2");  //给全选按钮添加一个新类名 变成勾选状态
		removeClass(this,"allCbox"); //把之前的类名删除
		for(var i = 0; i < boxDiv.length; i++){ //找到所有的最外层div 循环
			boxDiv[i].firstElementChild.style.display = 'block';  //把小方块显示出来
			addClass((boxDiv[i].firstElementChild),"conCkBox2"); //给小方块添加类名 变成勾选状态
			removeClass(boxDiv[i].firstElementChild,"conCkBox"); //删除之前的类名
			boxDiv[i].style.background = '#e9f3fd';//div的背景
			boxDiv[i].style.borderColor = '#c3d8f0';//div的边框
		}
		m = 0;
		onOff = false;
		off = false; //当点击之后改变开关状态
	}else{
		addClass(this,"allCbox");
		removeClass(this,"allCbox2");
		for(var i = 0; i < boxDiv.length; i++){
			boxDiv[i].firstElementChild.style.display = 'none';
			addClass(boxDiv[i].firstElementChild,"conCkBox");
			removeClass(boxDiv[i].firstElementChild,"conCkBox2");
			boxDiv[i].style.background = '#fff';
			boxDiv[i].style.borderColor = '#fff';
		}
		m = cks.length;
		off = true;
		onOff = true;
	}
}

//全选处理
var cks = box.getElementsByTagName('i');
var m = 0; 
function clickFn(){
	for(var i = 0; i<cks.length; i++){
	cks[i].onclick = function(){
		console.log(this.className);
		if(this.className === 'conCkBox'){  //如果当前的小方块的没有点击的状态
			m = 0;  
			this.className = 'conCkBox2';  //点击后变成勾选状态
			for (var k=0; k<cks.length; k++) { 
				//循环判断所有的小方块 如果有勾选的 就m+1
				if(cks[k].className == 'conCkBox2'){
					m++;
				}
			} //如果m的值和所有的小方块的length值相同  就把全选按钮加上勾选状态
			if(m == cks.length){
				ckk.className = 'allCbox2';
			}
		}else{ //只要有一个元素不被勾选  全选按钮就是allCbox 不被勾选状态
			ckk.className = 'allCbox'; //全选按钮变成没有勾选状态
			this.className = 'conCkBox'; //当前的小方块改成没有勾选状态
		}
	}
}
}
clickFn();
//新建文件夹  结束

/**************   删除     *****************/
//点击删除按钮事件处理
deletes.onclick = function(){
	for(var i = 0; i<cks.length; i++){
		if(cks[i].className === 'conCkBox2'){
			box.removeChild(cks[i].parentNode);
			i--;
		}
	}
	if(cks.length == 0){
		ckk.className = 'allCbox';
	}
}
/****************  删除结束    *****************/
/******************   重命名   ****************/
anew.onclick = function(){
	var CMMWCG = tools.$('#CMMWCG'); //重命名成功
	var CMMWXZ = tools.$('#CMMWXZ');  //重命名 未选中文件夹
	var CMMCT = tools.$('#CMMCT');  //重命名 未选中文件夹
	this.abb = true;
	var n = 0;
	for(var i = 0; i<cks.length; i++){
		if(cks[i].className === 'conCkBox2'){
			n++;
		}
	}
	if(n == 1){
		for(var j = 0; j<cks.length; j++){
			if(cks[j].className === 'conCkBox2'){
				//获取到当前是勾选状态的div下的input
				var inputCMM = cks[j].parentNode.children[2].children[0];
				//获取到当前是勾选状态的div下的p标签
				var pCMM = cks[j].parentNode.children[2].children[1];
				var divCMM = cks[j].parentNode;  //获取到勾选的div
				var inputCMMV = pCMM.innerHTML;  //获取没有处理之前的p标签的innerHTML
				pCMM.style.display = 'none';   //把p标签隐藏
				inputCMM.style.display = 'block'; //input显示出来
				inputCMM.select();       //input获得焦点
				inputCMM.value = inputCMMV;
				document.onmousedown = function(ev){  //当失去焦点
					if(inputCMM.value){  //判断input有value值的时候
						console.log(inputCMM.value);
						inputCMM.style.display = 'none';  //隐藏input
						pCMM.style.display = 'block';     //显示p
						pCMM.innerHTML = inputCMM.value;  //把input的value给p标签
						divCMM.style.background = '#fff'; //div恢复到没有勾选的状态
						divCMM.style.borderColor = '#fff';
						divCMM.firstElementChild.className = 'conCkBox';
						divCMM.firstElementChild.style.display = 'none';
						
						MTween(CMMWCG,{top:-140},500,"linear",function(){
							setTimeout(function (){
								MTween(CMMWCG,{top:-177},500,"linear",500);	
							},1000);
						},500);
						console.log('改名成功');
					}else{    //如果input没有value值
						inputCMM.style.display = 'none';
						pCMM.style.display = 'block';
						pCMM.innerHTML = inputCMMV;  //把原来p标签的innerHTML放回去
						divCMM.style.background = '#fff';
						divCMM.style.borderColor = '#fff';
						divCMM.firstElementChild.className = 'conCkBox';
						divCMM.firstElementChild.style.display = 'none';
						
					}
					anew.abb = false;
					MTween(CMMWCG,{top:-140},500,"linear",function(){
							setTimeout(function (){
								MTween(CMMWCG,{top:-177},500,"linear",500);	
							},1000);
						},500);
				}
			}
		}
	}else if(n == 0){
		MTween(CMMWXZ,{top:-140},500,"linear",function(){
			setTimeout(function (){
				MTween(CMMWXZ,{top:-177},500,"linear",500);	
			},1000);
		},500);
		
	}else if(n > 1){
		MTween(CMMCT,{top:-140},500,"linear",function(){
			setTimeout(function (){
				MTween(CMMCT,{top:-177},500,"linear",500);	
			},1000);
		},500);
	}
}
/*******************   重命名  结束    ************************/

/************************  框选          ************************/
function getRect(obj){
	return obj.getBoundingClientRect();
}
function duang(obj1,obj2){
	var obj1Info = getRect(obj1);	
	var obj2Info = getRect(obj2);	

	//obj1的上下左右

	var obj1L = obj1Info.left;
	var obj1R = obj1Info.right;
	var obj1T = obj1Info.top;
	var obj1B = obj1Info.bottom;

	//obj2的上下左右
	var obj2L = obj2Info.left;
	var obj2R = obj2Info.right;
	var obj2T = obj2Info.top;
	var obj2B = obj2Info.bottom;

	//排除掉没碰上的区域

	if( obj1R < obj2L || obj1L > obj2R || obj1B < obj2T || obj1T > obj2B){
		return false;
	}else{
		return true;
	}
}


//先有一个框
document.onmousedown = function (ev){
	var boxs = document.querySelectorAll(".contents");
	var newDivs = null;
	var disX = ev.clientX;
	var disY = ev.clientY;
	document.onmousemove = function (ev){
		if( Math.abs(ev.clientX - disX) > 20 ||  Math.abs(ev.clientY - disY) > 20 ){
			if( !newDivs ){
				newDivs = document.createElement("p");
				newDivs.className = "dialog";
				newDivs.style.left = disX + "px";
				newDivs.style.top = disX + "px";
				document.body.appendChild(newDivs);
			}
			newDivs.style.width = Math.abs(ev.clientX - disX) + "px";
			newDivs.style.height = Math.abs(ev.clientY - disY) + "px";
			newDivs.style.left = Math.min(ev.clientX , disX)+1 + "px";
			newDivs.style.top = Math.min(ev.clientY , disY)+1 + "px";
			//拖拽的过程中，newDiv和哪一个box碰上了
			for( var i = 0; i < boxs.length; i++ ){
				if( duang(newDivs,boxs[i]) ){
					boxs[i].style.background  ="#f3f9fe";
					boxs[i].style.borderColor = '#c3d8f0';
					boxs[i].firstElementChild.style.display = 'block';
					boxs[i].firstElementChild.className = 'conCkBox2';
				}else{
					boxs[i].style.background  ="#fff";
					boxs[i].style.borderColor = '#fff';
					boxs[i].firstElementChild.style.display = 'none';
					boxs[i].firstElementChild.className = 'conCkBox';
				}
			}
		}
	};
	document.onmouseup = function (){
		document.onmousemove =document.onmouseup= null;
		if( newDivs ){
			document.body.removeChild(newDivs);
		}
		var n = 0;
		for(var i = 0; i<cks.length; i++){
			if(cks[i].className === 'conCkBox2'){
				n++;
			}
		}
		if(cks.length !==0 && n == cks.length){
			ckk.className = 'allCbox2';
		}
	}
	
	if(!newFile.abc && !anew.abb){ //当点击之后变为false
		ev.preventDefault();
	}	
};
var allDiv = box.getElementsByTagName('div');
for(var t = 0; t<allDiv.length; t++ ){
	allDiv[t].parentNode.onmousedown = function(ev){
		//console.log(1111111111111111111111111111111111);
		ev.cancelBubble = true;
		ev.preventDefault();
	}
}
/*********************     框选       **********************/
/*********************     点击box  取消选中       **************/
//box.onclick = function(){
//	for(var i = 0; i < cks.length; i++){
//		console.log(66666666666666666666666666666666666666666);
//		cks[i].parentNode.className = 'conCkBox';
//		cks[i].parentNode.style.background = '#fff';
//		cks[i].parentNode.style.borderColor = '#fff';
//		cks[i].style.display = 'none';
//		console.log(cks[i].parentNode);
//	}
//}

/*********************      点击box  取消选中      结束   **********************/
/*********************   控制box高度   ***************************/
