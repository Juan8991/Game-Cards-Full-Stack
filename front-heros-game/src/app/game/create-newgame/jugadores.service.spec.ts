/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JugadoresService } from './jugadores.service';

describe('Service: Jugadores', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JugadoresService]
    });
  });

  it('should ...', inject([JugadoresService], (service: JugadoresService) => {
    expect(service).toBeTruthy();
  }));
});
