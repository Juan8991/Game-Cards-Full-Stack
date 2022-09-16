package org.example.cardgame.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.Juego;
import org.example.cardgame.domain.command.QuitarCartaEnTableroCommand;
import org.example.cardgame.domain.values.Carta;
import org.example.cardgame.domain.values.JuegoId;
import org.example.cardgame.domain.values.JugadorId;
import org.example.cardgame.gateway.JuegoDomainEventRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashSet;
import java.util.Set;

public class QuitarCartaEnTableroUseCase extends UseCaseForCommand<QuitarCartaEnTableroCommand>{
    private final JuegoDomainEventRepository repository;

    public QuitarCartaEnTableroUseCase(JuegoDomainEventRepository repository) {
        this.repository = repository;
    }

    @Override
    public Flux<DomainEvent> apply(Mono<QuitarCartaEnTableroCommand> quitarCartaEnTablero) {
        return quitarCartaEnTablero.flatMapMany((command) -> repository
                .obtenerEventosPor(command.getJuegoId())
                .collectList()
                .flatMapIterable(events -> {
                    var juego = Juego.from(JuegoId.of(command.getJuegoId()), events);
                    var tableroId = juego.tablero().identity();
                    var jugadorId = JugadorId.of(command.getJugadorId());
                    Set<Carta> cartasEnTablero = new HashSet<>();
                    juego.tablero().partida().forEach((jugador, cartas) -> {
                        cartas.stream().forEach(carta -> cartasEnTablero.add(carta));
                    });
                    var cartaSeleccionada = seleccionarCarta(command.getCartaId(), cartasEnTablero);
                    validarCantidadDelJugador(juego, jugadorId);
                    juego.tablero().quitarCarta(jugadorId,cartaSeleccionada);
                    juego.quitarCartaEnTablero(tableroId,jugadorId, cartaSeleccionada);

                    return juego.getUncommittedChanges();
                }));
    }

    private void validarCantidadDelJugador(Juego juego, JugadorId jugadorId) {
        var cantidad = (long) juego.tablero().partida()
                .get(jugadorId).size();
        if (cantidad >= 1) {
            throw new IllegalArgumentException("No puede elegir mas de 2 cartas en el tablero");
        }
    }

    private Carta seleccionarCarta(String cartaId, java.util.Set<Carta> cartasDelTablero) {
        return cartasDelTablero
                .stream()
                .filter(c -> c.value().cartaId().value().equals(cartaId))
                .findFirst()
                .orElseThrow();
    }
}
