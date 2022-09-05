package org.example.cargame.command;

import co.com.sofka.domain.generic.Command;
import org.example.cargame.values.Carta;
import org.example.cargame.values.JuegoId;
import org.example.cargame.values.JugadorId;
import org.example.cargame.values.TableroId;

public class PonerCartaEnTablero extends Command {
    private String jugadorId;
    private String cartaId;
    private String juegoId;

    public String getJugadorId() {
        return jugadorId;
    }

    public void setJugadorId(String jugadorId) {
        this.jugadorId = jugadorId;
    }

    public String getCartaId() {
        return cartaId;
    }

    public void setCartaId(String cartaId) {
        this.cartaId = cartaId;
    }

    public String getJuegoId() {
        return juegoId;
    }

    public void setJuegoId(String juegoId) {
        this.juegoId = juegoId;
    }
}
