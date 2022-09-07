package org.example.cardgame.command;

import co.com.sofka.domain.generic.Command;

public class FinalizarRondaCommand extends Command {
    private String juegoId;

    public String getJuegoId() {
        return juegoId;
    }

    public void setJuegoId(String juegoId) {
        this.juegoId = juegoId;
    }
}
