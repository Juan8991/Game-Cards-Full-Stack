package org.example.cardgame.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.Juego;
import org.example.cardgame.domain.Jugador;
import org.example.cardgame.domain.command.CrearRondaCommand;
import org.example.cardgame.domain.values.JuegoId;
import org.example.cardgame.domain.values.JugadorId;
import org.example.cardgame.domain.values.Ronda;
import org.example.cardgame.gateway.JuegoDomainEventRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

public class CrearRondaUseCase extends UseCaseForCommand<CrearRondaCommand> {

    private final JuegoDomainEventRepository repository;

    public CrearRondaUseCase(JuegoDomainEventRepository repository) {
        this.repository = repository;
    }

    @Override
    public Flux<DomainEvent> apply(Mono<CrearRondaCommand> iniciarJuegoCommand) {
        return iniciarJuegoCommand.flatMapMany((command) -> repository
                .obtenerEventosPor(command.getJuegoId())
                .collectList()
                .flatMapIterable(events -> {
                    var juego = Juego.from(JuegoId.of(command.getJuegoId()), events);
                    var jugadores = command.getJugadores().stream()
                            .map(JugadorId::of)
                            .collect(Collectors.toSet());

                    var idJugadorElegido=elegirAleatorio(jugadores);
                    Optional.ofNullable(juego.ronda())
                            .ifPresentOrElse(
                                    ronda -> juego.crearRonda(
                                            ronda.incrementarRonda(jugadores), command.getTiempo(),idJugadorElegido
                                    ), () -> juego.crearRonda(
                                            new Ronda(1, jugadores), command.getTiempo(),idJugadorElegido)
                            );
                    return juego.getUncommittedChanges();
                }));
    }
    /*public Integer IntegerAleatorio(Integer min, Integer max){
        int numero = ThreadLocalRandom.current().nextInt(min, max + 1);
        return numero;
    }*/
    private String elegirAleatorio(Set<JugadorId> jugadores){
        Collections.shuffle( Arrays.asList(jugadores.toArray()));
        var jugadorId = jugadores.stream().findFirst().get().value();
        return jugadorId;

    }
}
