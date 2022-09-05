package org.example.cargame.gateway;


import org.example.cargame.gateway.model.CartaMaestra;
import reactor.core.publisher.Flux;


public interface ListaDeCartaService {
    Flux<CartaMaestra> obtenerCartasDeMarvel();
}
