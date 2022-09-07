package org.example.cardgame;

import org.example.cardgame.values.JugadorId;
import org.example.cardgame.values.Mazo;

import java.util.HashSet;
import java.util.Set;

public class JugadorFactory {
    private final Set<Jugador> jugadores;
    public JugadorFactory(){
        jugadores = new HashSet<>();
    }
    public void agregarJugador(JugadorId jugadorId, String alias, Mazo mazo){
        jugadores.add(new Jugador(jugadorId, alias,  mazo));
    }

    protected Set<Jugador> getJugadores() {
        return jugadores;
    }
}
