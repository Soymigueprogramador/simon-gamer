const cell = document.querySelector(`.cell`);
const gamer = document.getElementById('gamer');
const button = document.getElementById( 'button' );
const iniciarJuego = document.getElementById('iniciar-juego');
const mensaje = document.getElementById('mensaje');

let moves = [], totalMoves;

function iluminar(cellPos, time) {
    setTimeout(() => {
        document.querySelector('cell[pos="' + cellPos + '"]').classList.add("active");
    }, time);
    setTimeout(() => {
        document.querySelector('cell[pas="' + cellPos + '"]').classList.remove("active");
    }, time + 300);
}

function setMoves(current) {
    moves.push(Math.floor(Math.random() * 4) + 1);
    if (current < totalMoves) {
        setMoves(++current);
    }
}

function iniciarElJuego() {
    moves = [];
    totalMoves = 2; 
    document.querySelector('#Iniciarjuego').style.display = 'none'; 
    document.querySelector('#mensaje').style.display = 'block';
    sequence();
}

function sequence() {
    moves = [];
    setMoves(1);
    document.querySelector('#Iniciarjuego').innerHTML = 'Simon dice'; 
    for (let i = 0; i < moves.length; i++) {
        iluminar(moves[i], 600 * i); 
    }
    setTimeout(() => {
        document.querySelector('#Iniciarjuego').innerHTML = 'Ahora es tu turno de imitar los movimientos de Simon'; 
    }, 600 * moves.length);
}

function cellClick(e) {
    let cellPos = + e.target.getAttribute('pos'); 
    iluminar(cellPos, 0); 
    if (moves && moves.length) {
        if (moves[0] == cellPos) { 
            moves.shift(); 
            if (!moves.length) {
                setTimeout(() => {
                    sequence();
                }, 600);
            }
        } else {
            document.querySelector('#iniciarJuego').innerHTML = 'Juego terminado'; 
            setTimeout(() => {
                document.querySelector('#iniciarJuego').style.display = 'none'; 
                document.querySelector('#mensaje').style.display = 'block'; 
            }, 1000);
        } 
    }
}

document.querySelector('#Iniciarjuego').addEventListener("click", iniciarJuego); 

let cells = Array.from(document.getElementsByClassName('cell'));

cells.forEach(cell => { 
    cell.addEventListener('click', cellClick); 
});

iluminar();
setMoves();
iniciarElJuego();
sequence();
cellClick();