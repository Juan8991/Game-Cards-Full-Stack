package org.example.cargame.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cargame.values.JugadorId;
import org.example.cargame.values.TableroId;

import java.util.Set;

public class TableroCreado extends DomainEvent {
    private final TableroId tableroId;
    private final Set<JugadorId> jugadorIds;



    public TableroCreado(TableroId tableroId, Set<JugadorId> jugadorIds) {
        super("cargame.tablerocreado");
        this.tableroId = tableroId;
        this.jugadorIds = jugadorIds;
    }

    public Set<JugadorId> getJugadorIds() {
        return jugadorIds;
    }

    public TableroId getTableroId() {
        return tableroId;
    }
}
