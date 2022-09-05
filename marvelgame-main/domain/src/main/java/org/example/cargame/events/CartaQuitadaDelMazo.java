package org.example.cargame.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cargame.values.Carta;
import org.example.cargame.values.JugadorId;

public class CartaQuitadaDelMazo extends DomainEvent {
    private final JugadorId jugadorId;
    private final Carta carta;

    public CartaQuitadaDelMazo(JugadorId jugadorId, Carta carta) {
        super("cargame.cartaquitadadelmazo");
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
