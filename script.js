
// Adds ctx.getTransform() - returns an SVGMatrix
// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
let trackTransforms = (ctx) => {
	let svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
	let xform = svg.createSVGMatrix();
	ctx.getTransform = function(){ return xform; };
	
	let savedTransforms = [];
	let save = ctx.save;
	ctx.save = function(){
		savedTransforms.push(xform.translate(0,0));
		return save.call(ctx);
	};
	let restore = ctx.restore;
	ctx.restore = function(){
		xform = savedTransforms.pop();
		return restore.call(ctx);
	};

	let scale = ctx.scale;
	ctx.scale = function(sx,sy){
		xform = xform.scaleNonUniform(sx,sy);
		return scale.call(ctx,sx,sy);
	};
	let rotate = ctx.rotate;
	ctx.rotate = function(radians){
		xform = xform.rotate(radians*180/Math.PI);
		return rotate.call(ctx,radians);
	};
	let translate = ctx.translate;
	ctx.translate = function(dx,dy){
		xform = xform.translate(dx,dy);
		return translate.call(ctx,dx,dy);
	};
	let transform = ctx.transform;
	ctx.transform = function(a,b,c,d,e,f){
		let m2 = svg.createSVGMatrix();
		m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
		xform = xform.multiply(m2);
		return transform.call(ctx,a,b,c,d,e,f);
	};
	let setTransform = ctx.setTransform;
	ctx.setTransform = function(a,b,c,d,e,f){
		xform.a = a;
		xform.b = b;
		xform.c = c;
		xform.d = d;
		xform.e = e;
		xform.f = f;
		return setTransform.call(ctx,a,b,c,d,e,f);
	};
	let pt  = svg.createSVGPoint();
	ctx.transformedPoint = function(x,y){
		pt.x=x; pt.y=y;
		return pt.matrixTransform(xform.inverse());
	}
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
trackTransforms(ctx);

const BARNA = "#7b4f2c",
	  SZURKE = "#868b8f",
	  SOTET = "black",
	  KEK = "blue",
	  ZS = "green";

ctx.canvas.width  = window.innerWidth - 250;
ctx.canvas.height = window.innerHeight - 100;

let lastX = canvas.width / 2,
	cX = canvas.width / 2,
	lastY = canvas.height / 2;
	cY = canvas.height / 2;

let dragStart, dragged;

let lastLoopTime = Date.now();

let update = (delta) => {
	
}

let render = () => {
	let p1 = ctx.transformedPoint(0,0);
	let p2 = ctx.transformedPoint(canvas.width,canvas.height);
	ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

	ctx.font = "5px Arial";

	ctx.beginPath();
	ctx.lineWidth = 12;
	ctx.strokeStyle = SOTET;
	ctx.fillStyle = SOTET;

	//Ház test
	ctx.rect(250, 250, canvas.width - 250 * 2, canvas.height - 150 * 2);
	

	//Tető
	ctx.moveTo(100, 280);
	ctx.lineTo(cX, 100);
	ctx.lineTo(canvas.width - 100, 280);


	ctx.stroke();
	ctx.closePath();





	//Villanyóraszekrény
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.strokeStyle = "red";
	ctx.fillStyle = SOTET;

	ctx.rect(canvas.width - 250 * 2, canvas.height - 180 * 2, 75, 140);

	ctx.rect(canvas.width - 250 * 2, canvas.height - 180 * 2 + 160, 75, 75);

	ctx.stroke();
	ctx.closePath();

	//Földelőszonda
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.strokeStyle = ZS;
	ctx.fillStyle = SOTET;

	ctx.moveTo(canvas.width - 260 * 2, canvas.height - 150 * 2 + 200);
	ctx.lineTo(canvas.width - 260 * 2, canvas.height);



	ctx.stroke();
	ctx.closePath();




/*

	//Fővezetéki sorkapocs mérőórába
	drawSorkapocs(canvas.width - 250 * 2 + 12, canvas.height - 150 * 2 + 50, KEK);
	drawSorkapocs(canvas.width - 250 * 2 + 12 + (8.5 * 1), canvas.height - 150 * 2 + 50, SOTET);
	drawSorkapocs(canvas.width - 250 * 2 + 12 + (8.5 * 2), canvas.height - 150 * 2 + 50, BARNA);
	drawSorkapocs(canvas.width - 250 * 2 + 12 + (8.5 * 3), canvas.height - 150 * 2 + 50, SZURKE);
*/

	//Fővezetéki sorkapocs tokozatban
	drawSorkapocs(canvas.width - 250 * 2 + 12, canvas.height - 150 * 2 + 130, ZS);
	drawSorkapocs(canvas.width - 250 * 2 + 12 + 8.5, canvas.height - 150 * 2 + 130, KEK);

	drawSorkapocs(canvas.width - 250 * 2 + 12 + (8.5 * 2), canvas.height - 150 * 2 + 130, SOTET);
	drawSorkapocs(canvas.width - 250 * 2 + 12 + (8.5 * 3), canvas.height - 150 * 2 + 130, BARNA);
	drawSorkapocs(canvas.width - 250 * 2 + 12 + (8.5 * 4), canvas.height - 150 * 2 + 130, SZURKE);

	//Nullázás PE és PEN összekötése
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = ZS;

	ctx.moveTo(canvas.width - 250 * 2 + 10, canvas.height - 150 * 2 + 129.5);
	ctx.lineTo(canvas.width - 250 * 2 + 10, canvas.height - 150 * 2 + 126.5);
	ctx.lineTo(canvas.width - 250 * 2 + 10 + 5.5, canvas.height - 150 * 2 + 126.5);
	ctx.lineTo(canvas.width - 250 * 2 + 10 + 5.5, canvas.height - 150 * 2 + 129.5);

	ctx.stroke();
	ctx.closePath();

	//Földelő szonda összekötés sorkapocsal
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = ZS;

	ctx.moveTo(canvas.width - 520, canvas.height - 150 * 2 + 200);
	ctx.lineTo(canvas.width - 520, canvas.height - 150 * 2 + 147+3*4);
	ctx.lineTo(canvas.width - 250 * 2 + 7, canvas.height - 150 * 2 + 147+3*4);
	ctx.lineTo(canvas.width - 250 * 2 + 7, canvas.height - 150 * 2 + 143);

	ctx.stroke();
	ctx.closePath();

	//Házba menő szürke
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = SZURKE;

	ctx.moveTo(canvas.width - 459 + 3, canvas.height - 150 * 2 + 143.45);
	ctx.lineTo(canvas.width - 459 + 3, canvas.height - 150 * 2 + 147);
	ctx.lineTo(canvas.width - 400 + 3, canvas.height - 150 * 2 + 147);

	ctx.stroke();
	ctx.closePath();

	//Házba menő barna
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = BARNA;

	ctx.moveTo(canvas.width - 459 - 5.5 * 1, canvas.height - 150 * 2 + 143.45);
	ctx.lineTo(canvas.width - 459 - 5.5 * 1, canvas.height - 150 * 2 + 147+3*1);
	ctx.lineTo(canvas.width - 400 - 5.5 * 1 + (8.5 * 1), canvas.height - 150 * 2 + 147+3*1);

	ctx.stroke();
	ctx.closePath();

	//Házba menő SOTET
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = SOTET;

	ctx.moveTo(canvas.width - 459 - 8.5 * 2 + 3, canvas.height - 150 * 2 + 143.45);
	ctx.lineTo(canvas.width - 459 - 8.5 * 2 + 3, canvas.height - 150 * 2 + 147+3*2);
	ctx.lineTo(canvas.width - 400 - 8.5 * 2 + 3 + (8.5 * 2), canvas.height - 150 * 2 + 147+3*2);

	ctx.stroke();
	ctx.closePath();

	//Házba menő kék
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = KEK;

	ctx.moveTo(canvas.width - 459 - 8.5 * 3 + 3, canvas.height - 150 * 2 + 143.45);
	ctx.lineTo(canvas.width - 459 - 8.5 * 3 + 3, canvas.height - 150 * 2 + 147+3*3);
	ctx.lineTo(canvas.width - 400 - 8.5 * 3 + 3+ (8.5 * 3), canvas.height - 150 * 2 + 147+3*3);

	ctx.stroke();
	ctx.closePath();

	//Házba menő föld
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = ZS;

	ctx.moveTo(canvas.width - 459 - 8.5 * 4 + 3, canvas.height - 150 * 2 + 143.45);
	ctx.lineTo(canvas.width - 459 - 8.5 * 4 + 3, canvas.height - 150 * 2 + 147+3*4);
	ctx.lineTo(canvas.width - 400 - 8.5 * 4 + 3 + (8.5 * 4), canvas.height - 150 * 2 + 147+3*4);

	ctx.stroke();
	ctx.closePath();

	//Lakáselosztó
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = SOTET;
	ctx.fillStyle = SOTET;

	ctx.rect(canvas.width - 400 - 8.5 * 4 + 3 + (8.5 * 4), canvas.height - 150 * 2 + 147+3*4 - 20, 80, 30);

	ctx.stroke();
	ctx.closePath();


	//Mérőóra
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = SOTET;


	ctx.rect(canvas.width - 483, canvas.height - 335, 40, 40);

	ctx.stroke();
	ctx.closePath();


	ctx.beginPath();
	
	ctx.arc(canvas.width - 449, canvas.height - 298, 0.8, 0, 2 * Math.PI);
	ctx.arc(canvas.width - 446, canvas.height - 298, 0.8, 0, 2 * Math.PI);
	
	ctx.arc(canvas.width - 449 - (10 * 1), canvas.height - 298, 0.8, 0, 2 * Math.PI);
	ctx.arc(canvas.width - 446 - (10 * 1), canvas.height - 298, 0.8, 0, 2 * Math.PI);

	ctx.arc(canvas.width - 450 - (10 * 2), canvas.height - 298, 0.8, 0, 2 * Math.PI);
	ctx.arc(canvas.width - 447 - (10 * 2), canvas.height - 298, 0.8, 0, 2 * Math.PI);

	ctx.arc(canvas.width - 450 - (10 * 3), canvas.height - 298, 0.8, 0, 2 * Math.PI);
	ctx.arc(canvas.width - 447 - (10 * 3), canvas.height - 298, 0.8, 0, 2 * Math.PI);

	ctx.fill();
	ctx.closePath();

	//3db kismegszakító a mérő előtt
	drawKm(canvas.width - 483 + 40, canvas.height - 335 + 75);
	drawKm(canvas.width - 483 + 40 - 6.5 * 1, canvas.height - 335 + 75);
	drawKm(canvas.width - 483 + 40 - 6.5 * 2, canvas.height - 335 + 75);


	//Kék méretlen vezeték
	ctx.beginPath();

	ctx.strokeStyle = KEK;
	ctx.moveTo(canvas.width - 400, canvas.height - 240 - 3);
	ctx.lineTo(canvas.width - 440, canvas.height - 240 - 3);
	ctx.lineTo(canvas.width - 440, canvas.height - 280 - 3);
	ctx.lineTo(canvas.width - 440 - 9, canvas.height - 280 - 3);
	ctx.lineTo(canvas.width - 440 - 9, canvas.height - 280 - 3 - 11.5);

	ctx.stroke();
	ctx.closePath();

	//Szürke méretlen vezeték KM előtt
	ctx.beginPath();

	ctx.strokeStyle = SZURKE;
	ctx.moveTo(canvas.width - 445.5, canvas.height - 244.5);
	ctx.lineTo(canvas.width - 445.5, canvas.height - 240);
	ctx.lineTo(canvas.width - 400, canvas.height - 240);

	ctx.stroke();
	ctx.closePath();

	//Szürke méretlen vezeték KM után
	ctx.beginPath();

	ctx.strokeStyle = SZURKE;
	ctx.moveTo(canvas.width - 483 + 37.5, canvas.height - 335 + 74.5);
	ctx.lineTo(canvas.width - 483 + 37.5, canvas.height - 280);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5, canvas.height - 280);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5, canvas.height - 294.5);

	ctx.stroke();
	ctx.closePath();

	//Barna méretlen vezeték KM előtt
	ctx.beginPath();

	ctx.strokeStyle = BARNA;
	ctx.moveTo(canvas.width - 452, canvas.height - 244.5);
	ctx.lineTo(canvas.width - 452, canvas.height - 240 + (3 * 1));
	ctx.lineTo(canvas.width - 400, canvas.height - 240 + (3 * 1));

	ctx.stroke();
	ctx.closePath();


	//Barna méretlen vezeték KM után
	ctx.beginPath();

	ctx.strokeStyle = BARNA;
	ctx.moveTo(canvas.width - 483 + 37.5 - 6.5, canvas.height - 335 + 74.5);
	ctx.lineTo(canvas.width - 483 + 37.5 - 6.5, canvas.height - 275);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 11, canvas.height - 275);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 11, canvas.height - 294.5);

	ctx.stroke();
	ctx.closePath();


	//SOTET méretlen vezeték KM előt
	ctx.beginPath();

	ctx.strokeStyle = SOTET;
	ctx.moveTo(canvas.width - 458.5, canvas.height - 244.5);
	ctx.lineTo(canvas.width - 458.5, canvas.height - 240 + (3 * 2));
	ctx.lineTo(canvas.width - 400, canvas.height - 240 + (3 * 2));

	ctx.stroke();
	ctx.closePath();


	//SOTET méretlen vezeték KM után
	ctx.beginPath();

	ctx.strokeStyle = SOTET;
	ctx.moveTo(canvas.width - 483 + 37.5 - 6.5 * 2, canvas.height - 335 + 74.5);
	ctx.lineTo(canvas.width - 483 + 37.5 - 6.5 * 2, canvas.height - 270);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 21, canvas.height - 270);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 21, canvas.height - 294.5);

	ctx.stroke();
	ctx.closePath();

	//SOTET mért vezeték
	ctx.beginPath();

	ctx.strokeStyle = SOTET;
	ctx.moveTo(canvas.width - 483 + 37.5 - 13.5 - 18, canvas.height - 294.5);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 18, canvas.height - 190);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 14, canvas.height - 190);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 14, canvas.height - 170);

	ctx.stroke();
	ctx.closePath();

	//Barna mért vezeték
	ctx.beginPath();

	ctx.strokeStyle = BARNA;
	ctx.moveTo(canvas.width - 483 + 37.5 - 13.5 - 8, canvas.height - 294.5);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 8, canvas.height - 290);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 15, canvas.height - 290);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 15, canvas.height - 192);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 5.5, canvas.height - 192);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 5.5, canvas.height - 170);

	ctx.stroke();
	ctx.closePath();

	//Szürke mért vezeték
	ctx.beginPath();

	ctx.strokeStyle = SZURKE;
	ctx.moveTo(canvas.width - 483 + 37.5 - 10.5, canvas.height - 294.5);
	ctx.lineTo(canvas.width - 483 + 37.5 - 10.5, canvas.height - 288);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 7, canvas.height - 288);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 7, canvas.height - 194);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 + 3, canvas.height - 194);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 + 3, canvas.height - 170);

	ctx.stroke();
	ctx.closePath();

	//Kék mért vezeték
	ctx.beginPath();

	ctx.strokeStyle = KEK;
	ctx.moveTo(canvas.width - 483 + 38, canvas.height - 294.5);
	ctx.lineTo(canvas.width - 483 + 38, canvas.height - 285);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 7 - 16.5, canvas.height - 285);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 7 - 16.5, canvas.height - 180);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 7 - 16.5 + 1, canvas.height - 180);
	ctx.lineTo(canvas.width - 483 + 37.5 - 13.5 - 7 - 16.5 + 1, canvas.height - 170);

	ctx.stroke();
	ctx.closePath();











	//Szövegezés
	ctx.beginPath();
	
	ctx.fillText("Lakáselosztó", canvas.width - 400 - 8.5 * 4 + 3 + (8.5 * 4), canvas.height - 150 * 2 + 147+3*4 - 23);
	ctx.fillText("Min. 10mm2 mkh vezeték", canvas.width - 400 - 8.5 * 4 + 3 + (8.5 * 4) - 95, canvas.height - 150 * 2 + 147+3*4 - 40);
	
	ctx.fillText("PEN", canvas.width - 454, canvas.height - 300);
	ctx.fillText("L3", canvas.width - 460, canvas.height - 300);
	ctx.fillText("L2", canvas.width - 471, canvas.height - 300);
	ctx.fillText("L1", canvas.width - 481, canvas.height - 300);
	ctx.fillText("Földelőszonda min 2m.", canvas.width - 580, canvas.height - 60);
	ctx.fillText("Villanyóraszekrény", canvas.width - 250 * 2 - 3, canvas.height - 180 * 2 - 5);
	ctx.fillText("Üres tokozat", canvas.width - 250 * 2 - 3, canvas.height - 145 - 60);
	
	ctx.fillText("16mm2 z/s mkh", canvas.width - 560, canvas.height - 120);

	ctx.stroke();
	ctx.closePath();


}

let drawKm = (x, y) => {
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = SOTET;
	ctx.fillStyle = SOTET;

	ctx.moveTo(x, y);
	ctx.lineTo(x - 5, y);
	ctx.lineTo(x - 5, y + 15);
	ctx.lineTo(x, y + 15);
	ctx.lineTo(x, y);

	ctx.fillRect(x - 3.5, y + 6.5, 2, 2);

	ctx.stroke();
	ctx.closePath();


	ctx.beginPath();

	//bal oldali csavarok

	ctx.strokeStyle = SOTET;
	ctx.fillStyle = SOTET;
	ctx.arc(x - 2.5, y + 2, 0.8, 0, 2 * Math.PI);

	ctx.arc(x - 2.5, y + 2 + 11, 0.8, 0, 2 * Math.PI);

	ctx.fill();
	ctx.closePath();

}

let drawSorkapocs = (x, y, color) => {
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;

	ctx.moveTo(x, y);
	ctx.lineTo(x - 7, y);
	ctx.lineTo(x - 7, y + 13);
	ctx.lineTo(x, y + 13);
	ctx.lineTo(x, y);

	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();

	//bal oldali csavarok
	ctx.arc(x - 5, y + 2, 0.8, 0, 2 * Math.PI);
	ctx.arc(x - 5, y + 5, 0.8, 0, 2 * Math.PI);

	ctx.arc(x - 5, y + 2 + 6, 0.8, 0, 2 * Math.PI);
	ctx.arc(x - 5, y + 5 + 6, 0.8, 0, 2 * Math.PI);

	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	//jobb oldali csavarok
	ctx.arc(x - 2, y + 2, 0.8, 0, 2 * Math.PI);
	ctx.arc(x - 2, y + 5, 0.8, 0, 2 * Math.PI);

	ctx.arc(x - 2, y + 2 + 6, 0.8, 0, 2 * Math.PI);
	ctx.arc(x - 2, y + 5 + 6, 0.8, 0, 2 * Math.PI);

	ctx.fill();
	ctx.closePath();
}

canvas.addEventListener('mousedown', (evt) => {
	if (evt.which != 1) {
		return;
	}
	console.log(evt.pageX, evt.pageY);

	document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
	lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
	lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
	dragStart = ctx.transformedPoint(lastX,lastY);
	dragged = false;
}, false);

canvas.addEventListener('mousemove', (evt) => {
	if (evt.which != 1) {
		return;
	}

	console.log('move');

	lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
	lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
	dragged = true;

	if (dragStart){
		let pt = ctx.transformedPoint(lastX,lastY);
		ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
	}
}, false);

canvas.addEventListener('mouseup', (evt) => {
	if (evt.which != 1) {
		return;
	}

	dragStart = null;
	if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
}, false);

let scaleFactor = 1.1;
let zoom = (clicks) => {
	let pt = ctx.transformedPoint(lastX,lastY);
	ctx.translate(pt.x,pt.y);
	
	let factor = Math.pow(scaleFactor,clicks);
	ctx.scale(factor,factor);
	ctx.translate(-pt.x,-pt.y);
}

let handleScroll = function(evt) {
	let delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;

	if (delta) zoom(delta);
		return evt.preventDefault() && false;
}

canvas.addEventListener('DOMMouseScroll',handleScroll,false);
canvas.addEventListener('mousewheel',handleScroll,false);

let engineLoop = () => {
	const now = Date.now();
	const delta = now - lastLoopTime;
	lastLoopTime = now;

	update(delta);
	render();

	window.requestAnimationFrame(engineLoop);
}

engineLoop();