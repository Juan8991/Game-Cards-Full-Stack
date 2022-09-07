package org.example.cardgame.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.values.Carta;
import org.example.cardgame.values.JugadorId;

public class CartaQuitadaDelMazo extends DomainEvent {
    private final JugadorId jugadorId;
    private final Carta carta;

    public CartaQuitadaDelMazo(JugadorId jugadorId, Carta carta) {
        super("cardgame.cartaquitadadelmazo");
        this.jugadorId = jugadorId;
        this.carta = carta;
    }

    public JugadorId getJugadorId() {
        return jugadorId;
    }

    public Carta getCarta() {
        return carta;
    }
}
