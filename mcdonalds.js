//index : 8
//shoppingcart_choice :89
//singup:123
//shoppingcart:160
//login:208
//menber:266

 // ------------------------------------index--------------------------------------------
	var index_firstopen;
	var index_tmp = sessionStorage.getItem("first");
	var user = [];
	var defaultuser = {};
	var currentacc; //={};
	//var discount=[];defaultdiscount={};
	var transaction = []; //record of shoppying
	var login; //boolean to judge whether log in 
	//var defaultdiscount={};
	//alert(index_tmp);
		var SingUpAlluser = typeof JSON.parse(localStorage.getItem("User"))!='undefined'?[]:JSON.parse(localStorage.getItem("User"));

	var SingUpperuser = {}; //object customer
	var haveacc = false;
	function index_load() {
		//alert(index_tmp);
		if (!index_tmp) {
			currentacc = {};
			var flag = true;
			sessionStorage.setItem("current", currentacc);
			index_firstopen = flag;
			sessionStorage.setItem("first", index_firstopen);

			login = false;
			sessionStorage.setItem("havelogin", login);
			//--預設賬號--//
			defaultuser.id = 1;
			defaultuser.name = "yang";
			defaultuser.phone = "0910306986";
			defaultuser.address = "TaiPei-TaiWan";
			defaultuser.email = "A108222027@gmail.com";
			defaultuser.password = "test";
			defaultuser.discount = [];
			defaultuser.transaction = [];
			user.push(defaultuser);

			defaultuser = {};
			defaultuser.id = 2;
			defaultuser.name = "chen";
			defaultuser.phone = "0911234986";
			defaultuser.address = "TaiPei-TaiWan";
			defaultuser.email = "A108222026@gmail.com";
			defaultuser.password = "test";
			defaultuser.discount = [];
			defaultuser.transaction = [];
			user.push(defaultuser);

			defaultuser = {};
			defaultuser.id = 3;
			defaultuser.name = "zhang";
			defaultuser.phone = "0914634986";
			defaultuser.address = "TaiPei-TaiWan";
			defaultuser.email = "A108222024@gmail.com";
			defaultuser.password = "test";
			defaultuser.discount = [];
			defaultuser.transaction = [];
			user.push(defaultuser);
			//--預設折價券--//
			//			defaultdiscount.Img="img/D1.jpg";
			//			defaultdiscount.price=50;
			//			defaultdiscount.kind="all";
			//			defaultdiscount.menkan=1;
			//			discount.push(defaultdiscount);
			//			
			//			defaultdiscount.Img="img/D2.png";
			//			defaultdiscount.price=50;
			//			defaultdiscount.kind="all";
			//			defaultdiscount.menkan=1;
			//			discount.push(defaultdiscount);
			//			
			//			defaultdiscount.Img="img/D3.png";
			//			defaultdiscount.price=50;
			//			defaultdiscount.kind="drink";
			//			defaultdiscount.menkan=51;
			//			discount.push(defaultdiscount);
			//			
			//			localStorage.setItem("Discount",JSON.stringify(discount));
			localStorage.setItem("User", JSON.stringify(user));

		}
	}
 { // -------------------------------shoppingcart_choice-----------------------------------
	var shoppingCart = [];

	function shoppingcartLoad() {
		if (sessionStorage.getItem("SCart") !== "") {
			shoppingCart = JSON.parse(sessionStorage.getItem("SCart"));
		}

	}

	function checkCart(name) {
		var C = false;
		for (var i = 0; i < shoppingCart.length; i++) {
			if (shoppingCart[i].Name == name) {
				C = true;
				break;
			}

		}
		return C;
	}

	function cart(uname, uimg, button, price) {
		shoppingCart = JSON.parse(sessionStorage.getItem("SCart"));
		var product = {};
		product.Name = uname;
		//alert(product.Name.toString());
		product.Img = uimg;
		button.value = "已加入購物車";
		button.style = "width:120px;height:40px;border:2px blue none;"
		button.disable = true;
		product.Price = price;
		product.num = 1;
		//alert(product.Img.toString());
		try {
			if (checkCart(uname)) {
				button.value = "已在購物車內";
				button.disable = true;
				button.style = "width:120px;height:40px;border:2px blue none;"
				product = {};
				alert("此商品已被購買 請挑選其它商品");
			} else {

				shoppingCart.push(product);
			}
		} catch (e) {
			shoppingCart = [];
			shoppingCart.push(product);
		}
		setShoppingCarTosessionStorage();
	}

	function setShoppingCarTosessionStorage() {
		sessionStorage.setItem("SCart", JSON.stringify(shoppingCart)); //將陣列物件轉為字串
		//alert(sessionStorage.SCart);
	}
} { //--------------------------------- ---singup-------------------------------------------


	function signup() {
		var nowid = typeof JSON.parse(localStorage.getItem("User"))!='undefined'?0:JSON.parse(localStorage.getItem("User")).id + 1;
		SingUpperuser.id = nowid;
		//alert("now id:"+ peruser.id);
		SingUpperuser.name = ($.trim($("input[name='name']").val()).toString());
		SingUpperuser.phone = ($.trim($("input[name='phone']").val()).toString());
		SingUpperuser.address = ($.trim($("input[name='address']").val()).toString());
		SingUpperuser.email = ($.trim($("input[name='email']").val()).toString());
		SingUpperuser.password = ($.trim($("input[name='password']").val()).toString());
		SingUpperuser.discount = [];
		SingUpperuser.transaction = [];

		if (($.trim($("input[name='name']").val()).toString()).trim() != "" &&
			($.trim($("input[name='phone']").val()).toString()).trim() != "" &&
			($.trim($("input[name='address']").val()).toString()).trim() != "" &&
			($.trim($("input[name='email']").val()).toString()).trim() != "" &&
			($.trim($("input[name='password']").val()).toString()).trim() != "") {
			SingUpAlluser.push(SingUpperuser);
			localStorage.setItem("User", JSON.stringify(SingUpAlluser));
			//	window.location.assign("login.html");
			window.location.href = "login.html";
			alert("注冊成功！");

		} else {
			alert("不能有空白");
		}
	}
} { //----------------------------------shoppingcart----------------------------------------
	var a = false,
		b = false,
		c = false;

	function showdiscount() {
		var currid = localStorage.getItem("nowId");
		var all = JSON.parse(localStorage.getItem("User"));
		var cur;
		for (i = 0; i < all.length; i++) {
			if (all[i].id == currid) {
				cur = all[i];
				break;
			}
		}
		if (cur.discount.length > 0) {
			//document.getElementById("showdis").innerHTML="折價券";
			var table = document.getElementById("table4discount");
			var caption = table.createCaption();
			caption.align = "top";
			caption.textContent = "折價券";
			var row = table.insertRow(0);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = "";
			cell2.innerHTML = "";
			for (var i = 0; i < cur.discount.length; i++) {
				var row = table.insertRow(i + 1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				cell1.innerHTML = "<input type='radio' name='choice' value=" + i + " onclick='handleClick("+cur.discount[i].id+")'>";
				switch (cur.discount[i].id) {
					case 1:
						cell2.innerHTML = "滿一元折50（多不退少不補）適用全部商品";
						break;
					case 2:
						cell2.innerHTML = "50元 適用全部商品";
						break;
					case 3:
						cell2.innerHTML = "滿51折50 適用飲料點心";
						break;
				}
			}

		} else { //document.getElementById("showdis").innerHTML="";
		}
		//alert(currid);

	}

	function handleClick(id) {
		a = false, b = false, c = false;
		//alert(id.toString());
		if (id == 1) {
			a = true;
		} else if (id == 2) {
			b = true;
		} else if (id==3) {
			c = true;
		}
		tableCreate();
		//alert("a:" + a + "b:" + b + "c" + c);
	}

	function Totalshoppingload() {

		if (sessionStorage.getItem("SCart") !=null ) {
			shoppingCart = JSON.parse(sessionStorage.getItem("SCart"));
			if (shoppingCart.length == 0) {
				document.getElementById("show").innerHTML = "購物車空空的哦！";

			} else {
				var havelog = sessionStorage.getItem("havelogin");
				if(havelog == "true" || havelog == true){
				showdiscount();}
				tableCreate();
			}
		} else {
			document.getElementById("show").innerHTML = "購物車空空的哦！";
		}

	}
	var _value = 1;

	function subtotal(i, which) {
		_value = which.value;
		shoppingCart[i].num = _value;
		sessionStorage.setItem("SCart", JSON.stringify(shoppingCart));
		//alert(shoppingCart[i].Name);
		tableCreate();
	}

	var total = 0;

	function tableCreate() {
		shoppingCart = JSON.parse(sessionStorage.getItem("SCart"));
		if (shoppingCart.length > 0) {
			document.getElementById("show").innerHTML = " 購物車(" + shoppingCart.length + "項商品)";
			document.getElementById("show").textAlign = "center";
			var table = document.getElementById("table4shoppingcart");

			table.innerHTML = "";
			var _count = 1;
			var row = table.insertRow(0);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			var cell5 = row.insertCell(4);
			var cell6 = row.insertCell(5);
			var cell7 = row.insertCell(6);

			cell1.style.textAlign = "center";
			cell2.style.textAlign = "center";
			cell3.style.textAlign = "center";
			cell4.style.textAlign = "center";
			cell5.style.textAlign = "center";
			cell6.style.textAlign = "center";
			cell7.style.textAlign = "center";
			cell1.style.fontSize = "25px";
			cell2.style.fontSize = "25px";
			cell3.style.fontSize = "25px";
			cell4.style.fontSize = "25px";
			cell5.style.fontSize = "25px";
			cell6.style.fontSize = "25px";
			cell7.style.fontSize = "25px";
			cell1.innerHTML = "編號";
			cell2.innerHTML = "商品";
			cell3.innerHTML = "品項名稱";
			cell4.innerHTML = "數量";
			cell5.innerHTML = "單價";
			cell6.innerHTML = "SubTotal";
			cell7.innerHTML = " ";
			total = 0;
			var rowcount = 0;
			for (var i = 0; i < shoppingCart.length; i++) {
				var row = table.insertRow(i + 1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
				var cell6 = row.insertCell(5);
				var cell7 = row.insertCell(6);
				cell1.style.textAlign = "center";
				cell2.style.textAlign = "center";
				cell3.style.textAlign = "center";
				cell4.style.textAlign = "center";
				cell5.style.textAlign = "center";
				cell6.style.textAlign = "center";
				cell7.style.textAlign = "center";
				cell1.style.fontSize = "20px";
				cell2.style.fontSize = "20px";
				cell3.style.fontSize = "20px";
				cell4.style.fontSize = "20px";
				cell5.style.fontSize = "20px";
				cell6.style.fontSize = "20px";
				cell7.style.fontSize = "20px";
				cell1.innerHTML = _count;
				_count += 1;
				cell2.innerHTML = "<img src=" + shoppingCart[i].Img + " " + "width=30%" + ">";
				cell3.innerHTML = shoppingCart[i].Name;
				var _option = "";
				//alert( shoppingCart[i].num);
				for (var j = 1; j < 100; j++) {
					if (j == shoppingCart[i].num) {
						//alert("equal");
						_option += "<option value=" + j + " " + "selected" + ">" + j + "</option>"
					} else {
						_option += "<option value=" + j + ">" + j + "</option>"
					}
				}
				cell4.innerHTML = "<select id='howmany' onchange='subtotal(" + i + ",this)'>" + _option + "</select>"
				cell5.innerHTML = shoppingCart[i].Price;
				total += shoppingCart[i].Price * shoppingCart[i].num;
				cell6.innerHTML = shoppingCart[i].Price * shoppingCart[i].num;
				cell7.innerHTML = "<p stlye='color:red' onClick='_delete(" + i + ")'>X</p>";
				rowcount = i + 1;

			}
			//alert(rowcount);
			var row = table.insertRow(rowcount + 1);
			var cell1 = row.insertCell(0);
			cell1.colSpan = "4";
			var cell2 = row.insertCell(1);
			//	cell2.colSpan="2";		
			cell1.style.textAlign = "center";
			cell2.style.textAlign = "center";
			cell1.style.fontSize = "25px";
			cell2.style.fontSize = "25px";
			cell1.innerHTML = "總金額";
		//	alert("a:" + a + "b:" + b + "c" + c);
			if (a == true) {
				var ss = " ";
				var t = parseInt(total) - 50;
				if (parseInt(t) >= 0) {
					ss = total + "-50=" + t;
					total -= 50;
				} else {
					ss = total + "-50=0";
					total = 0;
				}
				cell2.innerHTML = ss;
			} else if (b == true) {
				var ss = " ";
				var t = parseInt(total) - 50;
				if (parseInt(t) >= 0) {
					ss = total + "-50=" + t;
					total -= 50;
				} else {
					total = 0;
					ss = total + "-50=0";
				}
				cell2.innerHTML = ss;
			} else if (c == true) {
				var ss = " ";
				var t = parseInt(total) - 50;
				if (parseInt(t) >= 0) {
					ss = total + "-50=" + t;
					total -= 50;
				} else {
					total = 0;
					ss = total + "-50=0";
				}
				cell2.innerHTML = ss;
			} else {
				cell2.innerHTML = total; //+"-"+dis=total-dis;
			}

		} else {
			document.getElementById("show").innerHTML = "購物車空空的哦！";
			var table = document.getElementById("table4shoppingcart");
			table.innerHTML = "";
		}
		//   document.getElementById("total").innerHTML="Total:"+total;}else{location.assign("shoppingcart.html")}
	} //end of create
	function _delete(i) {
		var tmp = [];
		shoppingCart = JSON.parse(sessionStorage.getItem("SCart"));
		for (j = 0; j < shoppingCart.length; j++) {
			if (j == i) {
				continue;
			} else {
				tmp.push(shoppingCart[i]);
			}
		}
		sessionStorage.setItem("SCart", JSON.stringify(tmp));
		tableCreate();
		//Totalshoppingload();
	} //end of delete
	var rec = 1;

	function buy() {		
		var shopping = JSON.parse(sessionStorage.getItem("SCart"));
		if(shopping!=null){
			
			if (shopping.length > 0) {
				var havelog = sessionStorage.getItem("havelogin");
				if (havelog == "true" || havelog == true) {
					//確定購買
					if (confirm('確定要購買？')) {
						var all = JSON.parse(localStorage.getItem("User"));
						var curr = JSON.parse(sessionStorage.getItem("current"));
						var currid = curr.id;
						var trans = {};
						for (j = 0; j < all.length; j++) {
							if (all[j].id == currid) {
								curr=all[j];
								break;
							}
						}
						rec = curr.transaction.length + 1;
						trans.title = "Transaction(" + rec + ")";
						trans.all = [];
						trans.all.push(shopping);
						trans.total = total;
						var tmpdis = [];
						//alert("count:"+curr.discount.length);
						if (a == true) {
							for (var i = 0; i < curr.discount.length; i++) {
								if (curr.discount[i].id == 1) {
									continue;
								} else {
									tmpdis.push(curr.discount[i]);
								}
							}
						}
						//alert("b="+b);
						//alert("count1:"+tmpdis.length);
					   if (b == true||b=="true") {
							for (var i = 0; i < curr.discount.length; i++) {
								if (curr.discount[i].id == 2) {
									continue;
								} else {
									tmpdis.push(curr.discount[i]);
								}
							}
						}//alert("count2:"+tmpdis.length);
						if (c == true) {
							for (var i = 0; i < curr.discount.length; i++) {
								if (curr.discount[i].id == 3) {
									continue;
								} else {
									tmpdis.push(curr.discount[i]);
								}
							}
						}//alert("count3:"+tmpdis.length);

						curr.discount = tmpdis;
						curr.transaction.push(trans);
						for (j = 0; j < all.length; j++) {
							if (all[j].id == currid) {
								all[j] = curr;
								break;
							}
						}

						localStorage.setItem("User", JSON.stringify(all));
						shopping = []; //清空購物車
						sessionStorage.setItem("SCart", JSON.stringify(shopping));
						sessionStorage.setItem("current", JSON.stringify(curr));
						window.location.reload();

					}
				} else { //沒登錄
					if (confirm('你還沒登錄！要現在登錄嗎')) {
						// alert("sure");
						location.assign("login.html");
					}
				}
			} //end of length
			else {
				alert("購物車沒有東西！");
			}
		}else{
//			alert("s");
//			document.getElementById("zxc").value="購物去";
//			document.getElementById("zxc").disable=true;
			alert("購物車沒有東西！");
		}
	}

	{ //-------------------------------------login--------------------------------------------
		var Login_alluser; //=JSON.parse(localStorage.getItem("User"));
		var Login_haveacc = false;
		var havelog;

		function LoginLoad() {
			Login_alluser = JSON.parse(localStorage.getItem("User"));
			havelog = sessionStorage.getItem("havelogin");
			//alert("havelog:"+havelog);
			if (havelog == "true" || havelog == true) {
				location.href = "member.html";
			}
		}
	}

	function check() {
		//<1>先去全部使用者裏面找有沒有email，有就進<2>
		//<2>判斷密碼是否正確？登錄：提醒錯誤
		var index = 0;
		Login_haveacc = false;
		Login_alluser=JSON.parse(localStorage.getItem("User"));
		for (var i = 0; i < Login_alluser.length; i++) {
			//alert(alluser[i].name);
			if (Login_alluser[i].email == $.trim($("input[name='email']").val()).toString()) //get mail
			{
				Login_haveacc = true;
				index = i;
				break;
			}

		}
		if (Login_haveacc) {
			if (Login_alluser[index].password == $.trim($("input[name='ps']").val()).toString()) {
				//alert("great!");
				//登錄
				havelog = true;

				sessionStorage.setItem("havelogin", havelog);
				var user = Login_alluser[index]; //alert("now id:"+ user.id);
				sessionStorage.setItem("current", JSON.stringify(user));
				//alert(user.name);
				location.href = "member.html";
			} else {
				document.getElementById("inputmailinline").value = "";
				document.getElementById("inputpasswordinline").value = "";
				alert("wrong password");
			}
		} else {
			document.getElementById("inputmailinline").value = "";
			document.getElementById("inputpasswordinline").value = "";
			alert("沒有該賬號");
		}
	}
} { //-------------------------------------member--------------------------------------------
	var firstopen; //judge if first run
	var currentuser; //now user
	var alluser; //all user
	var nowid = -1; //user id
	var discount = [], //all discount
		defaultdiscount = {}; //discount object
	var dis = [1, 2, 3];
	var tmp = sessionStorage.getItem("first1");

	function menberLoad() {
		//alert('1'+tmp);
		alluser = JSON.parse(localStorage.getItem("User"));
		if (tmp == null || tmp == "null") //first run
		{
			//-----------------------------------------------	
			var flag = true;
			firstopen = flag;
			sessionStorage.setItem("first1", firstopen);
			//---------------------------------------------
			currentuser = JSON.parse(sessionStorage.getItem("current"));
			nowid = currentuser.id;
			localStorage.setItem("nowId", nowid);
		}
		//alert("now id:"+nowid);

		if (tmp == "true") //open above once
		{ //restore currentuser!		
			nowid = localStorage.getItem("nowId");
			//alert("in le "+nowid);
			for (var i = 0; i < alluser.length; i++) {
				if (alluser[i].id == nowid) {
					currentuser = alluser[i];
					break;
				}
			}
		}

		var tabcontent;
		// Get all elements with class="tabcontent" and hide them
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}
		//  alert(currentuser.name);
		document.getElementById("user").innerHTML = currentuser.name;
		var group;
		group = document.getElementsByClassName("form-control");
		for (i = 0; i < group.length; i++) {
			group[i].readOnly = true;
		}
		document.getElementById("g1").value = currentuser.name;
		document.getElementById("g2").value = currentuser.phone;
		document.getElementById("g3").value = currentuser.address;
		document.getElementById("g4").value = currentuser.email;
		document.getElementById("g5").value = currentuser.password;
	}

	function c1(flag) {
		discount = [];
		reloaduser();

		//to check if the discount repeat!
		var have = true;
		for (var i = 0; i < discount.length; i++) {
			if (discount[i].id == 1) {
				have = false;
				break; //repeat!
			}
		}
		if (have == true || have == "true") //have ==true?沒有折價券:有;
		{
			//alert("c1here");
			if (flag == "true" || flag == true) //is click event or reload
			{
				defaultdiscount = {};
				defaultdiscount.id = 1;
				defaultdiscount.Img = "img/D1.jpg";
				defaultdiscount.price = 50;
				defaultdiscount.kind = "all";
				defaultdiscount.menkan = 1;
				discount.push(defaultdiscount);
				//save discount
				for (var i = 0; i < alluser.length; i++) {
					if (alluser[i].name == currentuser.name) {
						alluser[i].discount = discount;
					}
				}
				localStorage.setItem("User", JSON.stringify(alluser));
				//window.location.reload();
				//c1(false);
				loaddiscount();
			}

		} else {
			alert("你已經領過這個優惠券了！");
			//document.getElementById("geta").disable=true;
			//document.getElementById("geta").value="已領取";
		}
	}

	function c2(flag) {
		discount = [];
		reloaduser();
		//to check if the discount repeat!
		var have = true;
		for (var i = 0; i < discount.length; i++) {
			if (discount[i].id == 2) {
				have = false;
				break; //repeat!
			}
		}
		if (have == true || have == "true") //have ==true?沒有折價券:有;
		{
			//alert("c1here");
			if (flag == "true" || flag == true) //is click event or reload
			{
				defaultdiscount = {};
				defaultdiscount.id = 2;
				defaultdiscount.Img = "img/D2.png";
				defaultdiscount.price = 50;
				defaultdiscount.kind = "all";
				defaultdiscount.menkan = 1;
				discount.push(defaultdiscount);
				//save discount
				for (var i = 0; i < alluser.length; i++) {
					if (alluser[i].name == currentuser.name) {
						alluser[i].discount = discount;
					}
				}
				localStorage.setItem("User", JSON.stringify(alluser));
				//window.location.reload();
				//c2(false);
				loaddiscount();
			}

		} else {
			alert("你已經領過這個優惠券了！");
			//	document.getElementById("getb").disable=true;
			//	document.getElementById("getb").value="已領取";
		}
	}

	function c3(flag) {
		discount = [];
		reloaduser();
		//to check if the discount repeat!
		var have = true;
		for (var i = 0; i < discount.length; i++) {
			if (discount[i].id == 3) {
				have = false;
				break; //repeat!
			}
		}
		if (have == true || have == "true") //have ==true?沒有折價券:有;
		{
			//alert("c1here");
			if (flag == "true" || flag == true) //is click event or reload
			{
				defaultdiscount = {};
				//	discount=currentuser.discount;	
				defaultdiscount.id = 3;
				defaultdiscount.Img = "img/D3.png";
				defaultdiscount.price = 50;
				defaultdiscount.kind = "drink";
				defaultdiscount.menkan = 51;
				discount.push(defaultdiscount);
				//save discount
				for (var i = 0; i < alluser.length; i++) {
					if (alluser[i].name == currentuser.name) {
						alluser[i].discount = discount;
					}
				}
				localStorage.setItem("User", JSON.stringify(alluser));
				//window.location.reload();
				//c3(false);
				loaddiscount();
			}

		} else {
			alert("你已經領過這個優惠券了！");
			//	document.getElementById("getc").disable=true;
			//	document.getElementById("getc").value="已領取";
		}

	}

	function lookalltrans(now) {
		var cur = JSON.parse(sessionStorage.getItem("current"));
		//alert("now:"+now);
		//alltrans
		//try{
		document.getElementById("detail").innerHTML = "訂單詳情: " + cur.transaction[now].title;
		var table = document.getElementById("checktrans");
		table.innerHTML = "";
		var row = table.insertRow(0);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		cell1.innerHTML = "商品名稱";
		cell2.innerHTML = "價錢";
		cell3.innerHTML = "個數";
		cell4.innerHTML = "Subtotal";
		//alert(cur.transaction[now].all[0].length);

		//alert(cur.transaction[now].all[0][0].Name);
		for (var j = 0; j < cur.transaction[now].all[0].length; j++) {
			var row = table.insertRow(j + 1);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			cell1.innerHTML = cur.transaction[now].all[0][j].Name;
			cell2.innerHTML = cur.transaction[now].all[0][j].Price;
			cell3.innerHTML = cur.transaction[now].all[0][j].num;
			cell4.innerHTML = cur.transaction[now].all[0][j].Price * cur.transaction[now].all[0][j].num;
		}
		//}

		//catch{alert("wrong");}
	}

	function _switch(evt, Name) {
		// Declare all variables
		var i, tabcontent, tablinks;

		// Get all elements with class="tabcontent" and hide them
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}

		// Get all elements with class="tablinks" and remove the class "active"
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}

		// Show the current tab, and add an "active" class to the link that opened the tab
		document.getElementById(Name).style.display = "block";
		evt.currentTarget.className += " active";
		if (Name == "b") {
			if (currentuser.transaction.length > 0) {
				var table = document.getElementById("mytrans");
				table.innerHTML = "";
				var row = table.insertRow(0);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				cell1.innerHTML = "訂單名稱";
				cell2.innerHTML = "價錢";
				for (var i = 0; i < currentuser.transaction.length; i++) {
					var row = table.insertRow(i + 1);
					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
					cell1.innerHTML = '<label onClick="lookalltrans(' + i + ')"><u>' + currentuser.transaction[i].title + '</u></label>'; //+"<table id='alltrans'></table>";
					cell2.innerHTML = currentuser.transaction[i].total;
				}
			} else {
				document.getElementById("showtrans").innerHTML = "nothing!";
			}
		}
		if (Name == "c") {
			reloaduser();
			if (currentuser.discount.length > 0) {
				var table = document.getElementById("mydis");
				table.innerHTML = "";
				for (var i = 0; i < currentuser.discount.length; i++) {
					var row = table.insertRow(i);
					var cell1 = row.insertCell(0);
					cell1.innerHTML = "<img src=" + discount[i].Img + " " + "width=90%" + ">";
				}
			} else {
				document.getElementById("showno").innerHTML = "nothing!";
			}
		}
		if (Name == "d") {
			loaddiscount();
		}
	}

	function reloaduser() {
		alluser = JSON.parse(localStorage.getItem("User"));
		for (var i = 0; i < alluser.length; i++) {
			if (alluser[i].id == nowid) {
				currentuser = alluser[i];
				break;
			}
		}
		discount = currentuser.discount;
	}

	function loaddiscount() {
		reloaduser();
		discount = currentuser.discount;
		for (var i = 0; i < discount.length; i++) {
			var num = dis.indexOf(discount[i].id);
			if (num != -1) {
				switch (num) {
					case 0:
						document.getElementById("geta").disable = true;
						document.getElementById("geta").value = "已領取";
						break;
					case 1:
						document.getElementById("getb").disable = true;
						document.getElementById("getb").value = "已領取";
						break;
					case 2:
						document.getElementById("getc").disable = true;
						document.getElementById("getc").value = "已領取";
						break;
				}
			} else {
				switch (i + 1) {
					case 1:
						document.getElementById("geta").disable = false;
						document.getElementById("geta").value = "領取";
						break;
					case 2:
						document.getElementById("getb").disable = false;
						document.getElementById("getb").value = "領取";
						break;
					case 3:
						document.getElementById("getc").disable = false;
						document.getElementById("getc").value = "領取";

						break;
				}
			}
		}
	}
	//更改會員資料
	function modify() {
		var group;
		group = document.getElementsByClassName("form-control");

		if (document.getElementById("cbx").checked == true) {
			for (i = 0; i < group.length; i++) {
				group[i].readOnly = false;
			}
		} else {

			for (i = 0; i < group.length; i++) {
				group[i].readOnly = true;
			}
		}
	}
	//保存會員資料
	function save() {
		//alert( alluser.length);
		for (var i = 0; i < alluser.length; i++) {
			if (alluser[i].name == currentuser.name) {
				alluser[i].name = document.getElementById("g1").value;
				alluser[i].phone = document.getElementById("g2").value;
				alluser[i].address = document.getElementById("g3").value;
				alluser[i].email = document.getElementById("g4").value;
				alluser[i].password = document.getElementById("g5").value;
			}
		}
		localStorage.setItem("User", JSON.stringify(alluser));
		window.location.reload();
	}

	function dengchu() {
		var log = sessionStorage.getItem("havelogin");
		log = false;
		sessionStorage.setItem("havelogin", log);
		var user = null; //alert("now id:"+ user.id);
		sessionStorage.setItem("current", JSON.stringify(user));
		var tmp = "null";
		sessionStorage.setItem("first1", tmp);
		location.assign("login.html");
	}
}
