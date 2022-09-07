package org.example.cardgame.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.values.Mazo;
import org.example.cardgame.values.JugadorId;

public class JugadorAgregado extends DomainEvent {
    private final JugadorId identity;
    private final String alias;
    private final Mazo mazo;

    public JugadorAgregado(JugadorId identity, String alias, Mazo mazo) {
        super("cardgame.jugadoragregado");
        this.identity = identity;
        this.alias = alias;
        this.mazo = mazo;
    }

    public JugadorId getJugadorId() {
        return identity;
    }

    public String getAlias() {
        return alias;
    }

    public Mazo getMazo() {
        return mazo;
    }
}
