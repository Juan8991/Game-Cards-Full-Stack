package org.example.cardgame.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.command.IniciarRondaCommand;
import org.example.cardgame.events.JuegoCreado;
import org.example.cardgame.events.RondaCreada;
import org.example.cardgame.events.RondaIniciada;
import org.example.cardgame.events.TableroCreado;
import org.example.cardgame.gateway.JuegoDomainEventRepository;
import org.example.cardgame.values.JugadorId;
import org.example.cardgame.values.Ronda;
import org.example.cardgame.values.TableroId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class IniciarRondaUseCaseTest {

    @Mock
    private JuegoDomainEventRepository repository;

    @InjectMocks
    private IniciarRondaUseCase useCase;

    @Test
    void iniciarRonda(){
        var command = new IniciarRondaCommand();
        command.setJuegoId("XXX");
        when(repository.obtenerEventosPor("XXX"))
                .thenReturn(juegoCreado());

        StepVerifier
                .create(useCase.apply(Mono.just(command)))
                .expectNextMatches(domainEvent -> {
                    var event = (RondaIniciada) domainEvent;
                    return event.aggregateRootId().equals("XXX");
                })
                .expectComplete()
                .verify();
    }

    private Flux<DomainEvent> juegoCreado(){
        var event = new JuegoCreado(JugadorId.of("DDDD"));
        event.setAggregateRootId("FFF");

        var event2 = new TableroCreado(TableroId.of("LLLL"), Set.of(JugadorId.of("FFFF"), JugadorId.of("GGGG"), JugadorId.of("HHHH")));
        event2.setAggregateRootId("FFF");

        var event3 = new RondaCreada(new Ronda( 1, event2.getJugadorIds()), 2);
        event3.setAggregateRootId("FFF");

        return Flux.just(event, event2, event3);
    }
}