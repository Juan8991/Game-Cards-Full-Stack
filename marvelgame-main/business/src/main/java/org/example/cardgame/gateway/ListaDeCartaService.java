package org.example.cardgame.gateway;


import org.example.cardgame.gateway.model.CartaMaestra;
import reactor.core.publisher.Flux;


public interface ListaDeCartaService {
    Flux<CartaMaestra> obtenerCartasDeMarvel();
}
