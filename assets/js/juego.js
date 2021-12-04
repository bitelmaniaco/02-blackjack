/**
 * 
 * 2C = 2 de treboles
 * 2D = diamantes
 * 2H = corazones
 * 2S = picas
 * 
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosCPU = 0;


// Referencias HTML
const btnPedir   = document.querySelector('#btnPedir');
const btnNuevo   = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');

const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasCPU = document.querySelector('#maquina-cartas');



// creacion de baraja
const crearDeck = () => {
    for(let i = 2; i <= 10; i++){
        //deck.push( i + 'C');
        for(let tipo of tipos){
            deck.push( i + tipo );
        }
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push( esp + tipo );
        }
    }
    deck = _.shuffle( deck );
    //console.log(deck);
    return deck;
}

crearDeck();

//tomar una carta
const pedirCarta = () => {
    // se remueve
    if ( deck.length === 0 ){
      throw 'No quedan más cartas';
    }
    let carta = deck.pop();
    return carta;
}

// pedirCarta();

const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1);    
    //isNaN: is Not a Number
    return ( isNaN( valor ) ) ?
                ( valor === 'A' ) ? 11 : 10
            : valor * 1;
}

//turno CPU
const turnoCPU = ( puntosM ) => {
    // divCartasCPU
    do{
        const carta = pedirCarta();
        puntosCPU = puntosCPU + valorCarta( carta );
        puntosHTML[1].innerText = puntosCPU;
        //<img class="carta" src="assets/cartas/10D.png">
        const imgCarta = document.createElement('img');
        //añade la carta
        imgCarta.src = `assets/cartas/${ carta }.png`;
        // añade la clase
        imgCarta.classList.add('carta');
        divCartasCPU.append( imgCarta );

    }while( puntosCPU < puntosJugador && puntosM <= 21);



}




// Eventos
//callback
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;
    //<img class="carta" src="assets/cartas/10D.png">
    const imgCarta = document.createElement('img');
    //añade la carta
    imgCarta.src = `assets/cartas/${ carta }.png`;
    // añade la clase
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if( puntosJugador > 21 ) {
        console.log('perdiste');
        btnPedir.disabled = true;
    } else if( puntosJugador === 21 ){
        console.log('ganaste huevudo');
        btnPedir.disabled = true;
    }
});

 



