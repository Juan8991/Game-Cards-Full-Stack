package org.example.cargame.events;

import co.com.sofka.domain.generic.DomainEvent;

public class RondaIniciada extends DomainEvent {
    public RondaIniciada() {
        super("cargame.rondainiciada");
    }
}
