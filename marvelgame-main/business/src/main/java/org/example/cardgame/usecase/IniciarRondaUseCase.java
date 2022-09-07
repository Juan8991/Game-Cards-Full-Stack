package org.example.cardgame.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.Juego;
import org.example.cardgame.command.CrearRondaCommand;
import org.example.cardgame.command.IniciarRondaCommand;
import org.example.cardgame.gateway.JuegoDomainEventRepository;
import org.example.cardgame.values.JuegoId;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public class IniciarRondaUseCase extends UseCaseForCommand<IniciarRondaCommand>{
    JuegoDomainEventRepository repository;
    public IniciarRondaUseCase(JuegoDomainEventRepository repository) {
        this.repository = repository;
    }

    @Override
    public Flux<DomainEvent> apply(Mono<IniciarRondaCommand> iniciarRondaCommandMono) {
        return iniciarRondaCommandMono.flatMapMany(command->
                repository.obtenerEventosPor(command.getJuegoId())
                        .collectList()
                        .flatMapIterable(events->{
                            var juego = Juego.from(JuegoId.of(command.getJuegoId()),events);
                            juego.iniciarRonda();
                            return juego.getUncommittedChanges();
                        }));
    }
}
