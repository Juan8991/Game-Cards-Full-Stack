package org.example.cardgame.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.values.JugadorId;

public class JuegoCreado extends DomainEvent {
    private final JugadorId jugadorPrincipal;
    public JuegoCreado(JugadorId jugadorPrincipal) {
        super("cardgame.juegocreado");
        this.jugadorPrincipal = jugadorPrincipal;
    }

    public JugadorId getJugadorPrincipal() {
        return jugadorPrincipal;
    }
}
