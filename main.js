var ref = null;

var js;

var dialog;
var dialog2;
var dialog3;

var abdiag;

var mod;

var storage = {data : []};

var currimg = "http://i.imgur.com/EZURwQI.jpg";


function donel()
{

	dialog = document.getElementById('modal');
	dialog2 = document.getElementById('selector');
	dialog3 = document.getElementById('logconcon');
	mod = document.getElementById('logcon');

	abdiag = document.getElementById('about');
	if(localStorage.d)
	{
		storage = JSON.parse(localStorage.d);
	}
	showstuff();
}


function getIMG()
{
	dialog2.open();
	document.getElementById("content").innerHTML = "<paper-spinner id='spinner' class='blue' active></paper-spinner>";
	hello('google').api('me/photos','get',function(json)
	{
		document.getElementById("content").innerHTML = "";
		js = json;

		var bdiv = document.getElementById("content");

		console.log(js);

	for(var i = 0;i<js.data.length;i++)
	{
		console.log(js.data[i]);

		var elem = document.createElement("div");
		elem.setAttribute("class","frame-square");

		var elem2 = document.createElement("div");
		elem2.setAttribute("class","crop");


		var img = document.createElement("img");
		img.src = js.data[i].pictures[1].source;
		img.a = js.data[i].pictures[2].source;
		//elem.innerHTML += js.data[i].name;
		elem.appendChild(img);
		elem2.appendChild(elem);

		var pic = js.data[i].pictures[2].source;
		img.onclick = function(){
			if(currimg=="http://i.imgur.com/EZURwQI.jpg")
				currimg = this.a;
			CKEDITOR.instances.editor1.insertHtml("<img style='width:30%' src='" + this.a + "'>");
			dialog2.close();
		};
		bdiv.appendChild(elem2);


	}
	dialog2.center();
	});
}


var trips = [];
hello.init({
	google: "183120761017-g8svdrt8jnrdqpsg4s58td8t6bkrjb40.apps.googleusercontent.com"
}, {redirect_uri: 'http://shreyas.net.in/memoir/index.html'});

hello.on('auth.login', function(auth) {

	$("#landing").fadeOut("slow", "swing");


/*
	ref = new Firebase("https://dazzling-inferno-6565.firebaseio.com/");
ref.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
    console.log(ref);
  }

 
});*/
});


function showstuff()
{
	var div = document.getElementById('main-con');
	div.innerHTML = "";
	if(storage.data.length == 0)
	{
		div.innerHTML = "<h2>Time to go and travel!</h2>"
	}
	else
	{

		for(var i = 0;i<storage.data.length;i++){

			var outerElem = document.createElement("div");
			outerElem.setAttribute("class","large-4 columns er");

			var elem = document.createElement("paper-card");
			elem.setAttribute("heading",storage.data[i].name);
			elem.setAttribute("image",storage.data[i].img)
			elem.setAttribute("class","hi");
			outerElem.setAttribute("i",i);

			var dat = "" + storage.data[i]["html"] + "";
			outerElem.onclick = function(){gd(storage.data[this.getAttribute("i")].html)};

			outerElem.appendChild(elem);
			div.appendChild(outerElem);

		}
		

	}
}

function gd(a)
{
	dialog3.innerHTML = a;
				mod.open();
}

function subentry()
{
	var eh = CKEDITOR.instances.editor1.getData();

	var entry = {html:eh,name:document.getElementById('tname').value,img:currimg};
	CKEDITOR.instances.editor1.setData("");
	document.getElementById('tname').value = '';
	currimg = "http://i.imgur.com/EZURwQI.jpg";
	storage.data.push(entry);
	localStorage.setItem("d",JSON.stringify(storage));


	showstuff();
}
function openD()
{
	dialog.open();
}

/*function addtrip()
{
	hello('google').api('me/photos','get',function(json)
	{
		js = json;

		var bdiv = document.getElementById("content");

		console.log(js);

	for(var i = 0;i<js.data.length;i++)
	{
		console.log(js.data[i]);

		var elem = document.createElement("div");
		var img = document.createElement("img");
		img.src = js.data[i].pictures[0].source;
		//elem.innerHTML += js.data[i].name;
		elem.appendChild(img);

		var id = js.data[i].id;
		elem.onclick = function(){
			getfotos(id);
		};
		bdiv.appendChild(elem);


	}
	});



}*/