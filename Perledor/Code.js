var board = [];
var rows = 9;
var columns = 9;
var level = 1;

var moves = 4;
var shellCounts = 9;
var extrashell = 0
var shellLocation = [];
var pearlLocation = [];

var pearlFound = 0;
var goldfont;

var gameOver = 0;

window.onload = function() {
	startGame();
}

function setShells() {
	//shellLocation.push("0-4")
	//shellLocation.push("1-0")
	//shellLocation.push("3-1")
	//shellLocation.push("3-2")
	//shellLocation.push("4-1")
	//shellLocation.push("4-7")
	//shellLocation.push("5-4")
	//shellLocation.push("5-7")
	//shellLocation.push("6-2")
	//shellLocation.push("8-1")
	let shellLeft = shellCounts;
	 while (shellLeft > 0) { 
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!shellLocation.includes(id)) {
            shellLocation.push(id);
            shellLeft -= 1;
        }
    }
}


function startGame() {
	let lev = document.getElementById("nextlevel");
  	lev.disabled = true;
	board = []
	shellCounts = 9 + extrashell
	shellLocation = []
	pearlLocation = []
	pearlFound = 0
	moves = 4
	document.getElementById("try").innerText = moves;
	setShells();

	//Populer le tableau
	for (let r = 0; r < rows; r++) {
		let row = [];
		for (let c = 0; c < columns; c++) {
			//<div id="0-0"></div>
			let tile = document.createElement("div");
			tile.id = r.toString() + "-" + c.toString();
			tile.addEventListener("click",clickTile);
			document.getElementById("board").append(tile);
			row.push(tile);
		}
		board.push(row);
	}

	console.log(board);
	setupShells()
}

function setupShells(){
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			let tile = board[r][c];
			if (shellLocation.includes(tile.id)){
				tile.innerText = "🦪";
			}
		}
	}
	pearlLocation = shellLocation[Math.floor(Math.random() * shellLocation.length)]
	console.log(pearlLocation);
}


function clickTile() {
	if (pearlFound == 1){
		return
	}
	if (gameOver == 1){
		return
	}
	let tile = this;
	if (shellLocation.includes(tile.id)){
		if (tile.id == pearlLocation){
			tile.innerText = "🟡"
			moves = "Bravo!"
			document.getElementById("try").innerText = moves
			if (level >= 50){
				alert("Félicitations! Vous avez terminé les 50 niveaux du jeu de la perle dorée! J'espère que vous avez aimé jouer à ce petit jeu fait en Java Script! Merci beaucoup d'avoir y joué! ;)")
				gameOver = 1
			}
			else{
				pearlFound = 1
				let lev = document.getElementById("nextlevel");
  				lev.disabled = false;
			}

		}
		else{
			let coords = tile.id.split("-"); // "0-0" -> ["0", "0"]
 			let r = parseInt(coords[0]);
		    let c = parseInt(coords[1]);
		    tile.innerText = calculatedistance(r, c);
		    moves -= 1;
		    document.getElementById("try").innerText = moves;
		    if (moves <= 0){
				alert("Game over, les coups sont épuisés, c'était une bonne partie!")
				gameOver = 1
			}
			//alert(tile.id)
		}
		
	}

}

function calculatedistance(r, c) {
	let pearl = pearlLocation.split("-")
	let distr = Math.abs(r - parseInt(pearl[0]))
	let distc = Math.abs(c - parseInt(pearl[1]))
	return Math.max(distr,distc)
}

function restart(){
	level = 1
	gameOver = 0
	document.getElementById("level").innerText = level;
	document.getElementById("board").innerHTML = "";
	startGame()
}

function help(){
	alert("Voici le Jeu de la perle dorée \n \n Dans ce jeu, vous devez trouver dans chaque niveau la perle dorée en un nombre de coups limités, si vous n'avez plus de coups alors que vous n'avez pas trouvé la perle dorée, c'est fini! \n \n Si vous cliquez sur un coquillage, soit il contient la perle dorée (et vous gagnez le niveau), soit il contiendra un chiffre qui montre la distance de case entre le chiffre et la perle dorée (que ce soit horizontalement, verticallement ou diagonalement). Si vous ne comprenez pas, pas d'inquétude! Les trois premiers niveaux sont des tutoriels qui montreront comment fonctionne le jeu \n \n Basé sur le jeu : ''Shinju'' par Ninjakiwi, Un jeu jouable sur ''Ninja Kiwi Archive''")
}

function nextlevel(){
	level += 1
	if (level >= 4){
		extrashell = level - 3
	}
	document.getElementById("level").innerText = level;
	document.getElementById("board").innerHTML = "";
	startGame()
}