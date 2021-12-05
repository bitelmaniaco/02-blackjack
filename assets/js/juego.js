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
        if(puntosM > 21){ break; }

    }while( puntosCPU < puntosJugador && puntosM <= 21);

    setTimeout(() => {
        if( puntosCPU === puntosM ){
            alert('nadie gana');
        }else if( puntosM > 21 ){
            alert('CPU gana');
        }else if( puntosCPU > 21 ){
            alert('Jugador gana');
        }else if( puntosCPU === 21 ){
            alert('CPU gana');
        }else if( puntosCPU > puntosM && ( puntosCPU <= 21 ) ) //|| puntosCPU   )
            alert('CPU gana');
    }, 10 );

    

}




// Eventos
//callback
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    btnDetener.disabled = false;

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
        turnoCPU( puntosJugador );
    } else if( puntosJugador === 21 ){
        console.log('ganaste huevudo');
        btnPedir.disabled = true;
    }
});

 
btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoCPU( puntosJugador );

});

btnNuevo.addEventListener('click', () => {

    //limpiar deck
    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosCPU     = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasJugador.innerHTML = '';
    divCartasCPU.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

});

