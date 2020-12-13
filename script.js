const BARNA = "#7b4f2c",
	  SZURKE = "#868b8f",
	  SOTET = "black",
	  KEK = "blue",
	  ZS = "green";


let lastLoopTime = Date.now();
let steps = [];

let update = (delta) => {
	
}

let render = () => {
	let p1 = ctx.transformedPoint(0,0);
	let p2 = ctx.transformedPoint(canvas.width,canvas.height);
	ctx.clearRect(p1.x, p1.y, p2.x-p1.x ,p2.y-p1.y);

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




	if (steps.includes("villanyoraszekreny")) {
		//Villanyóraszekrény
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.strokeStyle = "red";
		ctx.fillStyle = SOTET;

		ctx.rect(canvas.width - 250 * 2, canvas.height - 180 * 2, 75, 140);

		ctx.rect(canvas.width - 250 * 2, canvas.height - 180 * 2 + 160, 75, 75);

		ctx.stroke();
		ctx.closePath();	
	}

	if (steps.includes("foldeloszonda")) {
		//Földelőszonda
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.strokeStyle = ZS;
		ctx.fillStyle = SOTET;

		ctx.moveTo(canvas.width - 260 * 2, canvas.height - 150 * 2 + 200);
		ctx.lineTo(canvas.width - 260 * 2, canvas.height);



		ctx.stroke();
		ctx.closePath();
	}




/*

	//Fővezetéki sorkapocs mérőórába
	drawSorkapocs(canvas.width - 250 * 2 + 12, canvas.height - 150 * 2 + 50, KEK);
	drawSorkapocs(canvas.width - 250 * 2 + 12 + (8.5 * 1), canvas.height - 150 * 2 + 50, SOTET);
	drawSorkapocs(canvas.width - 250 * 2 + 12 + (8.5 * 2), canvas.height - 150 * 2 + 50, BARNA);
	drawSorkapocs(canvas.width - 250 * 2 + 12 + (8.5 * 3), canvas.height - 150 * 2 + 50, SZURKE);
*/


	if (steps.includes("sorkapocselhelyezese")) {
		//Fővezetéki sorkapocs tokozatban
		drawSorkapocs(canvas.width - 250 * 2 + 12, canvas.height - 150 * 2 + 130, ZS);
		drawSorkapocs(canvas.width - 250 * 2 + 12 + 8.5, canvas.height - 150 * 2 + 130, KEK);

		drawSorkapocs(canvas.width - 250 * 2 + 12 + (8.5 * 2), canvas.height - 150 * 2 + 130, SOTET);
		drawSorkapocs(canvas.width - 250 * 2 + 12 + (8.5 * 3), canvas.height - 150 * 2 + 130, BARNA);
		drawSorkapocs(canvas.width - 250 * 2 + 12 + (8.5 * 4), canvas.height - 150 * 2 + 130, SZURKE);
	}


	if (steps.includes("nullazas")) {
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
	}


	if (steps.includes("szondabekotes")) {
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
	}


	if (steps.includes("beallas")) {
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
	}


	if (steps.includes("emasz_meroora")) {
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
	}


	if (steps.includes("emasz_km")) {
		//3db kismegszakító a mérő előtt
		drawKm(canvas.width - 483 + 40, canvas.height - 335 + 75);
		drawKm(canvas.width - 483 + 40 - 6.5 * 1, canvas.height - 335 + 75);
		drawKm(canvas.width - 483 + 40 - 6.5 * 2, canvas.height - 335 + 75);
	}



	if (steps.includes("emasz_km")) {
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
	}




	if (steps.includes("emasz_km")) {
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
	ctx.lineTo(x, y - 0.5);

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
	ctx.lineTo(x, y - 0.5);

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

let engineLoop = () => {
	const now = Date.now();
	const delta = now - lastLoopTime;
	lastLoopTime = now;

	update(delta);
	render();

	window.requestAnimationFrame(engineLoop);
}

engineLoop();