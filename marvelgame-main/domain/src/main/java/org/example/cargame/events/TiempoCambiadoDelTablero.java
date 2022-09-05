package org.example.cargame.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cargame.values.TableroId;

public class TiempoCambiadoDelTablero extends DomainEvent {
    private final TableroId tableroId;
    private final Integer tiempo;

    public TiempoCambiadoDelTablero(TableroId tableroId, Integer tiempo) {
        super("cargame.tiempocambiadodeltablero");
        this.tableroId = tableroId;
        this.tiempo = tiempo;
    }

    public Integer getTiempo() {
        return tiempo;
    }

    public TableroId getTableroId() {
        return tableroId;
    }
}
