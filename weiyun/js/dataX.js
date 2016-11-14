/*
	程序是从上到下加载的
		如果一个文件用到了另一个文件中的属性或方法，要把这个文件
		放在另一个文件的下面

	要先等到html记载完成之后，也就是先出现页面，在进行交互
		所有要把js文件加载放在body结束标签之前
		除非有特殊要求，先加载js，可以放在head中
*/
//把这个文件中的变量保护起来，只在这个文件中使用
(function (){

	//让下面这一块自适应屏幕的高度
	//var weiyunContent = tools.$("#nav");
	//var header = tools.$("#header")[0];
	//console.log(header.offsetHeight);
	//changeHeight();
//	function changeHeight(){
//		var clinetH = tools.view().H;  //可视区的高
//		weiyunContent.style.height = clinetH - header.offsetHeight + "px";	
//	}
	//绑定一个resize
	//tools.addEvent(window,"resize",changeHeight);

	var initId = 0;
	//得到数据
	var datas = data.files;
	//找到指定id下所有的子数据
	//初始第一层的id是为0
	var initId = 0;
	//找到0这个id下所有子数据
	//找到这些数据中那些数据的pid为0
	var childs = dataAction.getChildsById(datas,initId);
	//根据数据，生成一个文件的结构
	function createFileConstruct(item){
		var html = '<div class="contents" data-file-id='+item.id+'>'
                +'<i class="conCkBox"></i>'
                +'<em class="conBg"></em>'
                +'<span class="conName">'
                	+'<input type="text"/>'
                    +'<p>'+item.title+'</p>'
                +'</span>'
                +'</p>'
           +' </div>'
           +'<strong id="CMMWXZ"></strong>'
	       +'<strong id="CMMCT"></strong>'
		   +'<strong id="CMMCG"></strong>';
        return html;	
	}	
    //循环拿到的数据，拼写结构，放在文件区域
    function createFilesHtml(datas,id){
      var childs = dataAction.getChildsById(datas,id);  
      var str = '';
      for( var i = 0; i < childs.length; i++ ){
      	str += createFileConstruct(childs[i]);
      }
      return str;
    }
    //文件区域的容器
    var filesList = tools.$("#box"); 
    filesList.innerHTML = createFilesHtml(datas,initId);
    //点击了一下文件，在文件区域渲染这个文件下的子文件
    //（找到这个文件id对应的子数据）
    //1. 这个文件的id 2. 通过这个id找到的子数据
    //找到所有的文件
    var files = tools.$(".contents",filesList);
    //初始调用，让所有的文件有点击处理
    addEventFile();
    function addEventFile(){
        for( var i = 0; i < files.length; i++ ){
            tools.addEvent(files[i],"click",function (){
                var fileId = this.dataset.fileId;  //找到这个文件的id
                var childs = dataAction.getChildsById(datas,fileId);

                var str = '';
                for( var i = 0; i < childs.length; i++ ){
                    str += createFileConstruct(childs[i]);
                }
                //新添加的内容，没有事件处理了
                filesList.innerHTML = str;
                addEventFile();
                pathNav.innerHTML = createPathNavConstruct(datas,fileId);
                console.log(pathNav);
            });
            var off = true;
            files[i].onmouseover = function(){
            	this.firstElementChild.onclick = function(ev){
            		ev.cancelBubble = true;
            		if(off){
            			this.className = 'conCkBox2';
            			off = false;
            			onOff = false;
            		}else{
            			this.className = 'conCkBox';
            			off = true;
            			onOff = true;
            		}
            	}
			if(this.children[2].children[0].className === 'aaa'){
				this.style.background = '#fff';
				this.borderColor = '#fff';
				this.firstElementChild.style.display = 'none';
			}else{
				if(this.firstElementChild.className === 'conCkBox2'){
					this.style.background = '#e9f3fd';
					this.style.borderColor = '#c3d8f0';
					this.firstElementChild.style.display = 'block';
				}else{
					this.style.background = '#f3f9fe';
					this.style.borderColor = '#c3d8f0';
					this.firstElementChild.style.display = 'block';
				}
			}
        }
            
        files[i].onmouseout = function(){
			if( this.firstElementChild.className != 'conCkBox2' ){
				this.style.background = '#fff';
				this.style.borderColor = '#fff';
				this.firstElementChild.style.display = 'none';
			}
		} 
	}
}	
		
	function createPathNavConstruct(datas,id){
        //初始的时候找到指定id的所有的父级
        var parents = dataAction.getParentsById(datas,id).reverse();
        //根据数据生成文件导航的结构
        var str = '';
        //["微云","我的音乐","周杰伦"]
        //最后一个使用span来包含的
        var zIndex = parents.length+10;
       for( var i = 0; i < parents.length-1; i++ ){
           str += '<a href="javascript:;"'
           +' style="z-index:'+(zIndex--)+'" data-file-id="'+parents[i].id+'">'+parents[i].title+'</a>';                                    
       }
       str += '<span class="current-path" style="z-index:'+zIndex+'" data-file-id="0">'+parents[parents.length-1].title+'</span>';   
        return str;
    }	
	 //文件导航区域的容器
   var pathNav = tools.$(".path-nav")[0];
   pathNav.innerHTML = createPathNavConstruct(datas,initId);
    // 利用事件委托，把点击处理添加在文件导航区域的容器pathNav
   tools.addEvent(pathNav,"click",function (ev){
      var target = ev.target;
      if( target.nodeName === "A" ){
          var fileId = target.dataset.fileId;
          //点击导航区域渲染文件区域的内容
          filesList.innerHTML = createFilesHtml(datas,fileId);
          addEventFile();
          //点击导航区域渲染点击导航区域
          pathNav.innerHTML = createPathNavConstruct(datas,fileId);
           var tree = getTreeById("tree-title",fileId);
               tools.removeClass(prevObj,"tree-nav");
               tools.addClass(tree,"tree-nav");
               prevObj = tree;
      }
   })	
	
	
	
/*树形菜单*/
//树形菜单区域
   var treeMenu = tools.$(".tree-menu")[0];
   //找到数据  通过id，找到这个id下的所有的子元素
   //初始的时候是找 -1 下的所有的子级
   //获取到的数据中有多少项，就有多少个li
   function createTreeHtml(datas,id){
        var tree_childs = dataAction.getChildsById(datas,id);
        var html =   '<ul>';
          for( var i = 0; i < tree_childs.length; i++ ){
            //有一个阶梯状的树形菜单，需要给div缩进一下，padding-left 相差是14px
            //问题：当这个id在树形菜单中是第几级？？？
            // tree_childs[i]
            var level = dataAction.getLevel(datas,tree_childs[i].id);
            /*
              背景      tree-nav
              是否有图标   没有图标 tree-contro-none
              图标是展开还是关闭的  展开的 tree-contro
            */
            var treeNav = id === -1 ? "tree-nav" : "";
            //var treeContro = 
            //没有子级就添加 tree-contro-none 有子级默认都是展开的 添加tree-contro
            //判断某个id下是否有子级
            var hasChild = dataAction.hasChilds(datas,tree_childs[i].id);
            var treeContro = hasChild ? "tree-contro" : "tree-contro-none";
              html += '<li>'
                +'<div data-file-id="'+tree_childs[i].id+'" class="tree-title '+treeNav+' '+treeContro+'" style="padding-left:'+level*14+'px;">'
                    +'<span>'
                        +'<strong class="ellipsis">'+tree_childs[i].title+'</strong>'
                        +'<i class="ico"></i>'
                    +'</span>'
                +'</div>'
              html += createTreeHtml(datas,tree_childs[i].id);
              html += '</li>'
          }
         html += '</ul>';
         return html;
   }
   treeMenu.innerHTML = createTreeHtml(datas,-1);
   //找到所有的树形菜单的标题 div tree-title
   var treeTitle = tools.$(".tree-title");
   var prevObj = treeTitle[0];
   for( var i = 0; i < treeTitle.length; i++ ){
     tools.addEvent(treeTitle[i],"click",function (){
         var fileId = this.dataset.fileId;
         //点击导航区域渲染文件区域的内容
          filesList.innerHTML = createFilesHtml(datas,fileId);
          addEventFile();
          //点击导航区域渲染点击导航区域
          pathNav.innerHTML = createPathNavConstruct(datas,fileId);
          /*
            tools.removeClass(prevObj,"tree-nav")
            tools.addClass(this,"tree-nav")            
          */
          var tree = getTreeById("tree-title",fileId);
               tools.removeClass(prevObj,"tree-nav");
               tools.addClass(tree,"tree-nav");
               prevObj = tree;
     })
   }
   getTreeById("tree-title",2)
   //找到某一类class的元素，身上自定属性（格式：data-file-id），匹配到的元素
   function getTreeById(classNams,id){
       var classElement = tools.$("."+classNams);
       for( var i = 0; i < classElement.length; i++ ){
         if( classElement[i].dataset.fileId == id ){
            return  classElement[i];
         }
       }
       return null;
   }		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
  	
	
}())