import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ComputePrompt } from '../models/compute-prompt';
import StatForm, { statsCallback } from '../models/stats-callback';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComputationService {
  /** instances de service */
  httpClient = inject(HttpClient);
  /** retour de statistique */
  callback$ = new Subject<StatForm | null>();
  /** retour d'erreur */
  error$ = new Subject<string | null>();

  /** requete de calcul de statistiques */
  compute(inputs: ComputePrompt) {
    this.error$.next(null);
    this.callback$.next(null);
    this.httpClient
      .post<statsCallback>('http://localhost:3000/', inputs.formatToBack())
      .pipe(map((v) => new StatForm(v)))
      .subscribe({
        next: (v: StatForm) => {
          this.callback$.next(v);
        },
        error: (err) => {
          this.error$.next(err);
        },
      });
  }
}
