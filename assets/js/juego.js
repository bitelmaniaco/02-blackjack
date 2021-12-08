/**
 * 
 * 2C = 2 de treboles
 * 2D = diamantes
 * 2H = corazones
 * 2S = picas
 * 
 */
/**
  mediante el modulo - patron modulo
  se "protege" el codigo
  
  (() => {
      //programa
  })();
 
 */

const miModulo = (() => {
    // utiliza una forma estricta de 
    // llamar variable y
    // otras metodologías
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    
    let puntosJugador = 0,
        puntosCPU = 0;
    
   let puntosJugadores = [];

    // Referencias HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnNuevo   = document.querySelector('#btnNuevo'),
          btnDetener = document.querySelector('#btnDetener');

    const puntosHTML = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');


    //tamaño array
    const tamPosArray = ( array ) => array.length - 1;
    

    // lo obvio
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();
        console.log({ deck });
        // puntosJugadores
        puntosJugadores = [];
        for(let i = 0; i < numJugadores; i++){
            // se añade jugador con cero (0) puntos
            puntosJugadores.push(0);
        }
        // inicializar
        puntosHTML.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerText = '' );
        
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    };


    // creacion de baraja
    const crearDeck = () => {
        deck = [];
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
        //console.log(deck);
        return _.shuffle( deck );
    }


    //tomar una carta
    const pedirCarta = () => {
        // se remueve
        if ( deck.length === 0 ){
            throw 'No quedan más cartas';
        }        
        return deck.pop();
    }

    // pedirCarta();

    const valorCarta = ( carta ) => {
        console.log(typeof carta);
        const valor = carta.substring(0, carta.length - 1);
        //isNaN: is Not a Number
        return ( isNaN( valor ) ) ?
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
    }

    //turno: 0 = primer jugador, ultimo CPU
    const acumularPuntos = ( turno, carta ) => {
        console.warn('acumularPuntos');
        console.log({ carta });
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( turno, carta ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
    }

    const determinarGanador = () => {

        const [ puntosM, puntosCPU ] = puntosJugadores;

        console.warn({ puntosM, puntosCPU });

        setTimeout(() => {
            if( puntosCPU === puntosM ){
                alert('nadie gana');
            // }else if( puntosM > puntosCPU && (puntosM <= 21)){
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

    //turno CPU
    const turnoCPU = ( puntosM ) => {
        // divCartasCPU
        let puntosCPU = 0;
        console.warn('turnoCPU');
        console.log({ puntosM });
        do{
            const carta = pedirCarta();
            
            console.log({ carta });
            // se le manda la última posicion
            puntosCPU = acumularPuntos( tamPosArray(puntosJugadores), carta );//puntosJugadores.length - 1, carta);
            console.log({ puntosCPU });
            crearCarta( tamPosArray(puntosJugadores), carta );//carta, puntosJugadores.length - 1 );
            if(puntosM > 21){ break; }
        }while( (puntosCPU < puntosM) && ( puntosM <= 21 ));
        // console.warn('turnoCPU');
        // console.log({ puntosCPU, puntosM });
        determinarGanador();
    }




    // Eventos
    //callback
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        console.warn('btnPedir');
        console.log({ carta });

        const puntosJugador = acumularPuntos( 0, carta );

        crearCarta( 0, carta); //, 0);//carta );
        
        if( puntosJugador > 21 ) {
            console.log('perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = false;
            turnoCPU( puntosJugador );
        } else if( puntosJugador === 21 ){
            console.log('ganaste huevudo');
            btnPedir.disabled = true;
        }
    });

    
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoCPU( puntosJugadores[0] );

    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    //al finalizar el modulo
    //se "publica" lo que queremos visible
    return {
        nuevoJuego: inicializarJuego
    };
})();





