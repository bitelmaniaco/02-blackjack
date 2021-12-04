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
    console.log(deck);
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

valorCarta('10D');