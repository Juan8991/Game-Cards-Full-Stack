package org.example.cardgame.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.command.IniciarJuegoCommand;
import org.example.cardgame.events.JuegoCreado;
import org.example.cardgame.events.TableroCreado;
import org.example.cardgame.gateway.JuegoDomainEventRepository;
import org.example.cardgame.values.JugadorId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.mockito.Mockito.when;



@ExtendWith(MockitoExtension.class)
class IniciarJuegoUseCaseTest {
    @InjectMocks
    private IniciarJuegoUseCase useCase;

    @Mock
    private JuegoDomainEventRepository repository;

    @Test
    void iniciarJuego(){
        //ASSERT
        var command = new IniciarJuegoCommand();
        command.setJuegoId("Juego01");

        when(repository.obtenerEventosPor("Juego01"))
                .thenReturn(juegoCreado());

        StepVerifier
                .create(useCase.apply(Mono.just(command)))
                .expectNextMatches(domainEvent -> {
                    var event = (TableroCreado) domainEvent;
                    return event.aggregateRootId().equals("Juego01");
                })
                .expectComplete()
                .verify();
    }

    private Flux<DomainEvent> juegoCreado() {
        var event = new JuegoCreado(JugadorId.of("jugador"));
        event.setAggregateRootId("0000");
        return Flux.just(event);
    }
}