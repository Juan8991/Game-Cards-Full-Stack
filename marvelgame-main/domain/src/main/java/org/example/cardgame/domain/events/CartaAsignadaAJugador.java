package org.example.cardgame.domain.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.values.Carta;
import org.example.cardgame.domain.values.JugadorId;

import java.util.Set;

public class CartaAsignadaAJugador extends DomainEvent {
    private final JugadorId jugadorId;

    private final Carta cartasApuesta;

    public CartaAsignadaAJugador(JugadorId ganadorId, Carta cartasApuesta) {
        super("cardgame.cartaasignadaajugador");
        this.jugadorId = ganadorId;

        this.cartasApuesta = cartasApuesta;
    }



    public JugadorId getJugadorId() {
        return jugadorId;
    }

    public Carta getCartasApuesta() {
        return cartasApuesta;
    }
}
