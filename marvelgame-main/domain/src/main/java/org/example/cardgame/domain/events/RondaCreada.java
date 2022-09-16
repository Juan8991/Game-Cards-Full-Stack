package org.example.cardgame.domain.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.values.Ronda;

public class RondaCreada extends DomainEvent {
    private final Ronda ronda;
    private final Integer tiempo;
    private final String idJugadorElegido;



    public RondaCreada(Ronda ronda, Integer tiempo,String idJugadorElegido) {
        super("cardgame.rondacreada");
        this.ronda = ronda;
        this.tiempo = tiempo;
        this.idJugadorElegido = idJugadorElegido;

    }

    public String getIdJugadorElegido() {
        return idJugadorElegido;
    }

    public Ronda getRonda() {
        return ronda;
    }

    public Integer getTiempo() {
        return tiempo;
    }
}
