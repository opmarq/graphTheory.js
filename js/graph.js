/**
 *	TO DO :
 * 	save vetrex and thier positions in a json file
 *	save the arcs of vetrex in json file 
 * 	draw vetrex and thier arcs 
 *	when the user click on a vetrex , he can change it's value
 *  user can enter some data , which will be translated to a graph
 */

var canvas = document.getElementById("workshop")
var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var lineIt = document.getElementById("lineit");
var from = document.getElementById("from");
var to = document.getElementById("to");
var del = document.getElementById("delete");
var delsommet = document.getElementById("delsommet");
var delsommetid = document.getElementById("delsommetid");
var setnumber = document.getElementById("setnumber");
var popEnter = document.getElementById("pop_enter");
var graphOrder = document.getElementById("graph-order");
var graphTaille = document.getElementById("graph-taille");
var explortGraph = document.getElementById("export");
var weightGraph = document.getElementById("weight");



var moveThisSommet = false;
var indexOfSommet = null;
var movingElement = null;

var radius = 15;
var EXTRA = 1.5;
var LEXTRA = -3;
var sommetOffset = [];
var arcArray = [];
var index = 0;

defineMax = function(){
	from.setAttribute("max", index);
	to.setAttribute("max",index);
};

render = function()
{
	context.clearRect(0, 0, canvas.width, canvas.height);

	graphOrder.innerHTML = sommetOffset.length;
	graphTaille.innerHTML = arcArray.length;

	for(var i=0;i<arcArray.length;i++)
	{
		if( arcArray[i].from == arcArray[i].to)
		{
				context.beginPath();
				context.arc(sommetOffset[arcArray[i].from].X -10,sommetOffset[arcArray[i].from].Y -10,radius,0,Math.PI * 2);
				context.stroke();
				continue;
		}
		context.beginPath();
		console.log(returnSommet(arcArray[i].from));
		context.moveTo(
			sommetOffset[returnSommet(arcArray[i].from)].X,
			sommetOffset[returnSommet(arcArray[i].from)].Y
			);
		context.lineTo(
			sommetOffset[returnSommet(arcArray[i].to)].X,
			sommetOffset[returnSommet(arcArray[i].to)].Y
			);
		context.stroke();
		context.fill();
		
		var px = sommetOffset[returnSommet(arcArray[i].from)].X + (sommetOffset[returnSommet(arcArray[i].to)].X - sommetOffset[returnSommet(arcArray[i].from)].X) / 2;
		var py = sommetOffset[returnSommet(arcArray[i].from)].Y + (sommetOffset[returnSommet(arcArray[i].to)].Y - sommetOffset[returnSommet(arcArray[i].from)].Y) / 2 - 10;
 
		console.log(px);
		console.log(py);

		context.font="20px Tahoma";
		context.fillStyle="black";
		context.fillText(arcArray[i].weight,px,py);
	}
	for(var i=0;i<sommetOffset.length;i++)
	{
		context.beginPath();
		context.fillStyle="black";
		context.arc(sommetOffset[i].X,sommetOffset[i].Y,radius,0,Math.PI * 2);
		context.fill();
		context.font="20px Tahoma";
		context.fillStyle="white";
		if(sommetOffset[i].sommet < 10){
			context.fillText(sommetOffset[i].sommet,sommetOffset[i].X - (radius/2) + EXTRA,sommetOffset[i].Y + (radius / 2));	
		}else{
			context.fillText(sommetOffset[i].sommet,sommetOffset[i].X - (radius/2) + LEXTRA,sommetOffset[i].Y + (radius / 2));	
		}
	}
		context.closePath();
}

returnSommet = function(iden)
{
	for(var i=0;i<sommetOffset.length;i++)
	{
		if(sommetOffset[i].sommet == iden)
			return i;
	}
}

alreadyExist = function(sommeto){
	for(var i=0;i<sommetOffset.length;i++)
	{
		if( sommetOffset[i].sommet == sommeto)
		{
			return true;
		}
	}
	return false;
}

drawIt = function(e){
	newElem = {
		"X":e.offsetX,
		"Y":e.offsetY
	}

	popEnter.style.top = (e.offsetY - 100) +"px";
	popEnter.style.left = (e.offsetX - 60)+"px";

	popEnter.style.display =  "block";

	var sommetNbr = document.getElementById("sommetnumber").value;

	console.log(sommetNbr);

	if(!colisionDetec(newElem) && !alreadyExist(sommetNbr))
	{
		sommetOffset.push({
			"X":e.offsetX,
			"Y":e.offsetY,
			"sommet": sommetNbr
		});

		render();
		defineMax();
		index++;
	}else{
		console.log("You can't add New Vetrex");
	}

};

colisionDetec = function(newElem)
{
	for( var i=0;i<sommetOffset.length;i++ )
	{
		var disX = sommetOffset[i].X - newElem.X;
		var disY = sommetOffset[i].Y - newElem.Y;

		var theDis = Math.sqrt(disX*disX + disY*disY);

		if( theDis < radius*2)
		{
			return true;
		}
	}
	return false;
};

drawline = function(e)
{
	var elem = {
		"from":from.value,
		"to":to.value,
		"weight":weightGraph.value
	}
	if(findIndexOf(elem) == null){
		arcArray.push({
		"from":from.value,
		"to":to.value,
		"weight":weightGraph.value
		}); 	
	}	
	render();
};

findIndexOf = function(elem){
	for(var k=0;k < arcArray.length;k++)
	{
		if( arcArray[k].from == elem.from && arcArray[k].to == elem.to || arcArray[k].from == elem.to && arcArray[k].to == elem.from  )
		return k;
	}
	return null;
}

deleteArc = function(e)
{
	delElement = {
		"from":from.value,
		"to":to.value
	};
	var iden = findIndexOf(delElement);
	if(iden != null)
	arcArray.splice(iden, 1);
	render();
}

delsommeFunc = function()
{	
	var sommetDeleted = delsommetid.value;
	var elementsToDelet = [];

	for(var i=0;i<arcArray.length;i++)
	{
		if(arcArray[i].from == sommetDeleted || arcArray[i].to == sommetDeleted)
		{
			elementsToDelet.push(i) ;
		}
	}

	for(var i=0;i<elementsToDelet.length;i++)
	{
		for(var j=i;j<elementsToDelet.length;j++)
		{
			if(  elementsToDelet[j] > elementsToDelet[i] )
			{
				elementsToDelet[j]--;
			}
		}
		arcArray.splice(elementsToDelet[i],1);
	}

	for(var i=0;i<sommetOffset.length;i++)
	{
		if( sommetOffset[i].sommet == sommetDeleted )
		{
			sommetOffset.splice(i,1);
			break;
		}
	}
	render();
}


document.onmousemove = function(e){
	var toMove = null;
	if(moveThisSommet){
		//console.log("X : "+e.clientX+" Y : "+e.clientY);
		//console.log("that :"+indexOfSommet);
		// we could use indexOfsommet
		sommetOffset[movingElement].X = e.clientX;
		sommetOffset[movingElement].Y = e.clientY;

		render();
	}
}

colisionMove = function(newElem)
{
	for( var i=0;i<sommetOffset.length;i++ )
	{
		var disX = sommetOffset[i].X - newElem.X;
		var disY = sommetOffset[i].Y - newElem.Y;

		var theDis = Math.sqrt(disX*disX + disY*disY);

		if( theDis < radius)
		{
			movingElement = i;
			console.log("moving element :"+i);
			return true;
		}
	}
	return false;
};

moveItFunction = function(e)
{	
	var eleme = {
		"X":e.offsetX,
		"Y":e.offsetY
	}
	if(colisionMove(eleme))
	{
		moveThisSommet = true;
	
		canvas.style.cursor = "pointer";
	
		for(var i=0;i<sommetOffset.length;i++)
		{
			if(sommetOffset[i].sommet == movingElement )
			{
				indexOfSommet = i;	
			} 
		}
	}
	
}

StopItFunction = function(){
	moveThisSommet = false;
	canvas.style.cursor = "auto";
}

whenLoad = function(){
	popEnter.style.display =  "none";
}

exportFunction = function(){

	selectid = document.getElementById("mySelect").selectedIndex;
	algo = document.getElementsByTagName("option")[selectid].value;
	dijfrom = document.getElementById("dijfrom").value;
	dijto = document.getElementById("dijto").value;

	orderGrahpz = sommetOffset.length;

	exportS = "graph="+JSON.stringify(arcArray)+"&order="+orderGrahpz+"&algo="+algo+"&dijfrom="+dijfrom+"&dijto="+dijto;

	 $.post( 
          "save.php",
           exportS,
          function(data) {
             console.log(data);
          }
       );

}

canvas.addEventListener("mouseup", StopItFunction)
canvas.addEventListener("mousedown", moveItFunction)
delsommet.addEventListener("click",delsommeFunc);
canvas.addEventListener("mouseup", drawIt);
lineIt.addEventListener("click", drawline);
del.addEventListener("click", deleteArc);
explortGraph.addEventListener("click", exportFunction);


