package org.example.cardgame.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.command.FinalizarRondaCommand;
import org.example.cardgame.domain.events.CartaPuestaEnTablero;
import org.example.cardgame.domain.events.CartaQuitadaDelMazo;
import org.example.cardgame.domain.events.JuegoCreado;
import org.example.cardgame.domain.events.JugadorAgregado;
import org.example.cardgame.domain.events.RondaCreada;
import org.example.cardgame.domain.events.RondaIniciada;
import org.example.cardgame.domain.events.TableroCreado;
import org.example.cardgame.domain.events.TiempoCambiadoDelTablero;
import org.example.cardgame.domain.values.Carta;
import org.example.cardgame.domain.values.CartaMaestraId;
import org.example.cardgame.domain.values.JugadorId;
import org.example.cardgame.domain.values.Mazo;
import org.example.cardgame.domain.values.Ronda;
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

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class IniciarCuentaRegresivaUseCaseTest {
    @InjectMocks
    private IniciarCuentaRegresivaUseCase useCase;

    @Mock
    private JuegoDomainEventRepository repository;

    @Mock
    private FinalizarRondaUseCase useCase2;

    @Test
    void iniciarCuentaRegresiva(){
        //ARRANGE
        //INICIAR RONDA
        var event = new RondaIniciada();
        event.setAggregateRootId("XXXX");

        //ACT & ASSERT
        when(repository.obtenerEventosPor("XXXX"))
                .thenReturn(historico());

        var command = new FinalizarRondaCommand();
        command.setJuegoId("XXXX");

        //esto es lo bueno
        when(useCase2.apply(any())).thenReturn(historico2());

        StepVerifier
                .create(useCase.apply(Mono.just(event)))
                .expectNextMatches(domainEvent -> {
                    var event2 = (TiempoCambiadoDelTablero) domainEvent;
                    return event2.getTableroId().equals(TableroId.of("LLLL"));
                })
                .expectNextMatches(domainEvent -> {
                    var event2 = (TiempoCambiadoDelTablero) domainEvent;
                    return event2.getTableroId().equals(TableroId.of("LLLL"));
                })
                .expectNextMatches(domainEvent -> {
                    var event2 = (JuegoCreado) domainEvent;
                    return event2.aggregateRootId().equals("XXXX");
                })
                .expectNextMatches(domainEvent -> {
                    var event3 = (JugadorAgregado) domainEvent;
                    return  event3.getJugadorId().value().equals("AAAA");
                })
                .expectNextMatches(domainEvent -> {
                    var event3 = (JugadorAgregado) domainEvent;
                    return  event3.getJugadorId().value().equals("BBBB");
                })
                .expectNextMatches(domainEvent -> {
                    var event3 = (TableroCreado) domainEvent;
                    return  event3.getTableroId().value().equals("LLLL");
                })
                .expectNextMatches(domainEvent -> {
                    var event3 = (RondaCreada) domainEvent;
                    return  event3.aggregateRootId().equals("XXXX");
                })
                .expectNextMatches(domainEvent -> {
                    var event3 = (RondaIniciada) domainEvent;
                    return  event3.aggregateRootId().equals("XXXX");
                })
                .expectNextMatches(domainEvent -> {
                    var event3 = (CartaPuestaEnTablero) domainEvent;
                    return  event3.aggregateRootId().equals("XXXX");
                })
                .expectNextMatches(domainEvent -> {
                    var event3 = (CartaQuitadaDelMazo) domainEvent;
                    return  event3.aggregateRootId().equals("XXXX");
                })
                .expectNextMatches(domainEvent -> {
                    var event3 = (CartaPuestaEnTablero) domainEvent;
                    return  event3.aggregateRootId().equals("XXXX");
                })
                .expectNextMatches(domainEvent -> {
                    var event3 = (CartaQuitadaDelMazo) domainEvent;
                    return  event3.aggregateRootId().equals("XXXX");
                })
                .expectNextMatches(domainEvent -> {
                    var event2 = (TiempoCambiadoDelTablero) domainEvent;
                    return event2.getTableroId().equals(TableroId.of("LLLL"));
                })
                .expectComplete()
                .verify();

    }

    private Flux<DomainEvent> historico2() {
        var event = new JuegoCreado(JugadorId.of("AAAA"));
        event.setAggregateRootId("XXXX");

        var event2 = new JugadorAgregado(
                JugadorId.of("AAAA"), "Raul",
                new Mazo(Set.of(
                        new Carta(CartaMaestraId.of("Wanda"), 1000, true, true, "www"),
                        new Carta(CartaMaestraId.of("bbb"), 102, true, true, "www"),
                        new Carta(CartaMaestraId.of("ccc"), 101, true, true,"www" ),
                        new Carta(CartaMaestraId.of("ddd"), 104, true, true, "www"),
                        new Carta(CartaMaestraId.of("ggg"), 160, true, true, "www")
                )));
        event2.setAggregateRootId("XXXX");

        var event3 = new JugadorAgregado(
                JugadorId.of("BBBB"), "MATI",
                new Mazo(Set.of(
                        new Carta(CartaMaestraId.of("capitanAmerica"), 999, true, true, "www"),
                        new Carta(CartaMaestraId.of("bbba"), 102, true, true, "www"),
                        new Carta(CartaMaestraId.of("ccca"), 101, true, true, "www"),
                        new Carta(CartaMaestraId.of("ddda"), 104, true, true, "www"),
                        new Carta(CartaMaestraId.of("ggga"), 160, true, true, "www")
                )));
        event3.setAggregateRootId("XXXX");

        var event4 = new TableroCreado(TableroId.of("LLLL"),
                Set.of(
                        JugadorId.of("AAAA"),
                        JugadorId.of("BBBB")
                )
        );
        event4.setAggregateRootId("XXXX");

        var event5 = new RondaCreada(
                new Ronda(1,
                        Set.of(JugadorId.of("AAAA"),
                                JugadorId.of("BBBB")
                        )
                ), 3, "AAA");
        event5.setAggregateRootId("XXXX");

        var event6 = new RondaIniciada();
        event6.setAggregateRootId("XXXX");

        //JUGADOR 1//
        var event7 = new CartaPuestaEnTablero(event4.getTableroId(), event2.getJugadorId(), new Carta(CartaMaestraId.of("Wanda"), 1000, true, true, "www"));
        event7.setAggregateRootId("XXXX");

        var event8 = new CartaQuitadaDelMazo(event2.getJugadorId(), new Carta(CartaMaestraId.of("Wanda"), 1000, true, true, "www"));
        event8.setAggregateRootId("XXXX");

        //JUGADOR 2//
        var event9 = new CartaPuestaEnTablero(event4.getTableroId(), event3.getJugadorId(), new Carta(CartaMaestraId.of("capitanAmerica"), 999, true, true, "www"));
        event9.setAggregateRootId("XXXX");

        var event10 = new CartaQuitadaDelMazo(event3.getJugadorId(), new Carta(CartaMaestraId.of("capitanAmerica"), 999, true, true, "www"));
        event10.setAggregateRootId("XXXX");

        return Flux.just(event, event2, event3, event4, event5, event6, event7, event8, event9, event10);
    }

    private Flux<DomainEvent> historico(){
        //CREAR JUEGO
        var event = new JuegoCreado(JugadorId.of("AAAA"));
        event.setAggregateRootId("XXXX");

        //CREAR TABLERO
        var event2 = new TableroCreado(TableroId.of("LLLL"),
                Set.of(
                        JugadorId.of("AAAA")
                )
        );
        event2.setAggregateRootId("XXXX");

        //CREAR RONDA
        var event3 = new RondaCreada(
                new Ronda(1,
                        Set.of(JugadorId.of("AAAA"),
                                JugadorId.of("BBBB")
                        )
                ), 3, "AAA");
        event3.setAggregateRootId("XXXX");

        return Flux.just(event, event2, event3);
    }


}