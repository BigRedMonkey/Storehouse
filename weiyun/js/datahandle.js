//这个文件中专门用来处理数据的
//对数据进行增删改查，都要通过这个文件中方法

/*
	纯函数，函数中不依赖外面任何的变量和函数
*/

var dataAction = (function(){

	return {
		//通过某个id找到下面所有的子数据
		/*
			参数：
				data:总的数据
				id:某一个文件的id
			返回值：
				类型：Array
				作用：子数据的集合
		*/
		getChildsById:function (data,id){ 
			var arr = [];
			for( var i = 0; i < data.length; i++ ){
				if( data[i].pid == id){
					arr.push(data[i]);
				}
			}
			return arr;
		},
		getParentsById : function (data,id){
	        var arr = [];
	        for( var i = 0; i < data.length; i++ ){
	            if( data[i].id == id ){
	                arr.push(data[i]);
	                arr = arr.concat(dataAction.getParentsById(data,data[i].pid));

	                //2 错误的方式
	               // arr.push(getParentsById(data,data[i].pid))
	            }        
	        } 

	        return arr;   
	   },
	   //找到指定id是在数据中是第几层
	    getLevel:function (datas,id){  
	    	return dataAction.getParentsById(datas,id).length;
	    },
	    //判断指定id下是否有子级
	    hasChilds:function (datas,id){
	    	return !!dataAction.getChildsById(datas,id).length;
	    }
	}

}())
