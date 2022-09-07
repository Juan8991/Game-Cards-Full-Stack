package org.example.cardgame.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.values.Carta;
import org.example.cardgame.values.JugadorId;

import java.util.Set;

public class CartasAsignadasAJugador extends DomainEvent {
    private final JugadorId ganadorId;
    private final Integer puntos;
    private final Set<Carta> cartasApuesta;

    public CartasAsignadasAJugador(JugadorId ganadorId, Integer puntos, Set<Carta> cartasApuesta) {
        super("cardgame.cartasasignadasajugador");
        this.ganadorId = ganadorId;
        this.puntos = puntos;
        this.cartasApuesta = cartasApuesta;
    }

    public Integer getPuntos() {
        return puntos;
    }

    public JugadorId getGanadorId() {
        return ganadorId;
    }

    public Set<Carta> getCartasApuesta() {
        return cartasApuesta;
    }
}
