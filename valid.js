		window.onload = function(){
				document.forms[0].onsubmit = validForm;
		}
		function validForm(){
			var allGood = true;
			var allTags = document.forms[0].getElementsByTagName("*");
			for(var i=0;i<allTags.length;i++){
				if(!validTag(allTags[i])){
					allGood = false;
				}
			}
			return allGood;	
			function validTag(thisTag){
				var outClass = "";  //用于还原存储一个标签中的所有class

				//以空格为分隔符分开一个标签中的所有class
				var allClasses = thisTag.className.split(" "); 
				for(var j=0;j<allClasses.length;j++){
					outClass += validBasedOnClass(allClasses[j])+" ";
					//validBasedOnClass函数用于判断一个标签中的class是否有值reqd并且用户是否未填文本框，若有reqd且用户未填，则在当期class内追加一个值，invalid，把“reqd invalid”整个class返回给这里的validBasedOnClass。详情看下面代码。
				}
				thisTag.className = outClass;
				
				if(outClass.indexOf("invalid")>-1){
					
					thisTag.focus();
					if(thisTag.nodeName=="INPUT"){

						thisTag.select();
						// var E_node = document.createElement("span");
						// E_node.className="test";
						// var T_node = document.createTextNode("请输入内容");
						// var newNode = E_node.appendChild(T_node);
						// var node = thisTag.parentNode;
						// node.insertBefore(newNode,node.childNodes[0]);

						// var reminder = document.getElementsByTagName("span");
						// reminder.style.color="red";
						

					}
					return false;
				}
				return true;

			
				function validBasedOnClass(thisClass){
					var classBack = "";
					switch(thisClass){
						case "":
						case "invalid":
							break;
						case "reqd":
							if(allGood && thisTag.value == ""){
								classBack = "invalid ";
							}
							classBack += thisClass;
							break;
						default:
							classBack += thisClass;
					}
					return classBack;
				}
			}
		}