package org.example.cargame.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cargame.values.JugadorId;

public class JuegoFinalizado extends DomainEvent {
    private final JugadorId jugadorId;
    private final String alias;

    public JuegoFinalizado(JugadorId jugadorId, String alias) {
        super("cargame.juegofinalizado");
        this.jugadorId = jugadorId;
        this.alias = alias;
    }

    public JugadorId getJugadorId() {
        return jugadorId;
    }

    public String getAlias() {
        return alias;
    }
}
