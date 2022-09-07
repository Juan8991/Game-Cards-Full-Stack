package org.example.cardgame.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.Juego;
import org.example.cardgame.command.CrearRondaCommand;
import org.example.cardgame.gateway.JuegoDomainEventRepository;
import org.example.cardgame.values.JuegoId;
import org.example.cardgame.values.JugadorId;
import org.example.cardgame.values.Ronda;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

public class CrearRondaUseCase extends UseCaseForCommand<CrearRondaCommand>{

    JuegoDomainEventRepository repository;

    public CrearRondaUseCase(JuegoDomainEventRepository repository) {
        this.repository = repository;
    }

    @Override
    public Flux<DomainEvent> apply(Mono<CrearRondaCommand> crearRondaCommandMono) {
        return crearRondaCommandMono.flatMapMany(command -> repository
                .obtenerEventosPor(command.getJuegoId())
                .collectList()
                .flatMapIterable(events ->{
                    var juego = Juego.from(JuegoId.of(command.getJuegoId()), events);
                    var jugadores = command.getJugadores()
                            .stream()
                            .map(JugadorId::of)
                            .collect(Collectors.toSet());
                    Optional.ofNullable(juego.ronda())
                            .ifPresentOrElse(
                                    ronda -> juego.crearRonda(
                                            ronda.incrementarRonda(jugadores), command.getTiempo()
                                    ), () -> juego.crearRonda(
                                            new Ronda(1, jugadores), command.getTiempo())
                            );
                    return juego.getUncommittedChanges();

                }));
    }

}
