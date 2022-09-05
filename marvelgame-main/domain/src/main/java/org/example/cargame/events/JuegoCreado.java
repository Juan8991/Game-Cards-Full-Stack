package org.example.cargame.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cargame.values.JugadorId;

public class JuegoCreado extends DomainEvent {
    private final JugadorId jugadorPrincipal;
    public JuegoCreado(JugadorId jugadorPrincipal) {
        super("cargame.juegocreado");
        this.jugadorPrincipal = jugadorPrincipal;
    }

    public JugadorId getJugadorPrincipal() {
        return jugadorPrincipal;
    }
}
