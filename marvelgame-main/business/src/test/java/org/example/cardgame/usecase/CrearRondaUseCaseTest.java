package org.example.cardgame.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.command.CrearRondaCommand;
import org.example.cardgame.domain.events.JuegoCreado;
import org.example.cardgame.domain.events.RondaCreada;
import org.example.cardgame.domain.events.TableroCreado;
import org.example.cardgame.domain.values.JugadorId;
import org.example.cardgame.domain.values.TableroId;
import org.example.cardgame.gateway.JuegoDomainEventRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.Set;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CrearRondaUseCaseTest {

    @Mock
    private JuegoDomainEventRepository repository;
    @InjectMocks
    private CrearRondaUseCase useCase;
    @Test
    void crearRonda(){
        var command = new CrearRondaCommand();
        command.setJuegoId("ju01");
        command.setTiempo(50);
        command.setJugadores(Set.of("juga1", "juga2", "juga3"));
        when(repository.obtenerEventosPor("ju01"))
                .thenReturn(juegoCreado());
        StepVerifier
                .create(useCase.apply(Mono.just(command)))
                .expectNextMatches(domainEvent -> {
                    var event = (RondaCreada) domainEvent;
                    return event.aggregateRootId().equals("ju01")
                            && event.getTiempo().equals(50)
                            && event.getRonda().value().jugadores()
                            .equals(Set.of(JugadorId.of("juga1"), JugadorId.of("juga2"), JugadorId.of("juga3")));
                })
                .expectComplete()
                .verify();

    }

    private Flux<DomainEvent> juegoCreado() {
        var event = new JuegoCreado(JugadorId.of("X001"));
        event.setAggregateRootId("X001");
        var event2 = new TableroCreado(TableroId.of("X002"), Set.of(JugadorId.of("JU01"), JugadorId.of("JU02"), JugadorId.of("JU03")));
        event2.setAggregateRootId("X002");
        return Flux.just(event, event2);
    }
}