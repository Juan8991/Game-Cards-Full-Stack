package org.example.cargame.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cargame.values.Carta;
import org.example.cargame.values.JugadorId;
import org.example.cargame.values.TableroId;

public class CartaQuitadaDelTablero extends DomainEvent {
    private final TableroId tableroId;
    private final JugadorId jugadorId;
    private final Carta carta;

    public CartaQuitadaDelTablero(TableroId tableroId, JugadorId jugadorId, Carta carta) {
        super("cargame.cartaquitadadeltablero");
        this.tableroId = tableroId;
        this.jugadorId = jugadorId;
        this.carta = carta;
    }

    public Carta getCarta() {
        return carta;
    }

    public JugadorId getJugadorId() {
        return jugadorId;
    }

    public TableroId getTableroId() {
        return tableroId;
    }
}
