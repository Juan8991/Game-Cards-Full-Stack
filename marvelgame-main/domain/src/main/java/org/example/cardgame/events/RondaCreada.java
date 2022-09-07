package org.example.cardgame.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.values.Ronda;

public class RondaCreada extends DomainEvent {
    private final Ronda ronda;
    private final Integer tiempo;

    public RondaCreada(Ronda ronda, Integer tiempo) {
        super("cardgame.rondacreada");
        this.ronda = ronda;
        this.tiempo = tiempo;
    }

    public Ronda getRonda() {
        return ronda;
    }

    public Integer getTiempo() {
        return tiempo;
    }
}
