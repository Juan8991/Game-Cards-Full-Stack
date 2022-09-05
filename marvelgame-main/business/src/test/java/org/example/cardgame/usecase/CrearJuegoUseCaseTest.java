package org.example.cardgame.usecase;


import org.example.cargame.command.CrearJuegoCommand;
import org.example.cargame.events.JuegoCreado;
import org.example.cargame.events.JugadorAgregado;
import org.example.cargame.gateway.ListaDeCartaService;
import org.example.cargame.gateway.model.CartaMaestra;
import org.example.cargame.usecase.CrearJuegoUseCase;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.HashMap;

import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class CrearJuegoUseCaseTest {
    @Mock
    private ListaDeCartaService service;
    @InjectMocks
    private CrearJuegoUseCase useCase;
    @Test
    void crearJuego() {
            var command = new CrearJuegoCommand();
            command.setJuegoId("j001");
            command.setJugadores(new HashMap<>());
            command.getJugadores().put("pri01", "Paco");
            command.getJugadores().put("ju02", "Sonia");
            command.getJugadores().put("ju03", "Fico");
            command.setJugadorPrincipalId("pri01");

            when(service.obtenerCartasDeMarvel()).thenReturn(CartasSet());

            StepVerifier.create(useCase.apply(Mono.just(command)))
                    .expectNextMatches(domainEvent -> {
                        var event = (JuegoCreado) domainEvent;
                        return event.getJugadorPrincipal().value().equals("pri01") && event.aggregateRootId().equals("j001");
                    })
                    .expectNextMatches(domainEvent -> {
                        var event = (JugadorAgregado) domainEvent;
                        assert event.getMazo().value().cantidad().equals(5);
                        return event.getJugadorId().value().equals("pri01") && event.getAlias().equals("Paco");
                    })
                    .expectNextMatches(domainEvent -> {
                        var event = (JugadorAgregado) domainEvent;
                        assert event.getMazo().value().cantidad().equals(5);
                        return event.getJugadorId().value().equals("ju02") && event.getAlias().equals("Sonia");
                    })
                    .expectNextMatches(domainEvent -> {
                        var event = (JugadorAgregado) domainEvent;
                        assert event.getMazo().value().cantidad().equals(5);
                        return event.getJugadorId().value().equals("ju03") && event.getAlias().equals("Fico");
                    })
                    .expectComplete()
                    .verify();
        }
        private Flux<CartaMaestra> CartasSet(){
            return Flux.just(
                    new CartaMaestra("C01", "Heroe1"),
                    new CartaMaestra("C02", "Heroe2"),
                    new CartaMaestra("C03", "Heroe3"),
                    new CartaMaestra("C04", "Heroe4"),
                    new CartaMaestra("C05", "Heroe5"),
                    new CartaMaestra("C06", "Heroe6"),
                    new CartaMaestra("C07", "Heroe7"),
                    new CartaMaestra("C08", "Heroe8"),
                    new CartaMaestra("C09", "Heroe9"),
                    new CartaMaestra("C10", "Heroe10"),
                    new CartaMaestra("C11", "Heroe11"),
                    new CartaMaestra("C12", "Heroe12"),
                    new CartaMaestra("C13", "Heroe13"),
                    new CartaMaestra("C14", "Heroe14"),
                    new CartaMaestra("C15", "Heroe15")

            );
        }

    }