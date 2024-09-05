import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ComputePrompt } from '../models/compute-prompt';
import StatForm, { statsCallback } from '../models/stats-callback';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComputationService {
  /** instances de service */
  private _httpClient = inject(HttpClient);
  /** retour de statistique */
  callbackSig: WritableSignal<StatForm | null> = signal(null);
  /** retour d'erreur */
  errorSig: WritableSignal<string | null> = signal(null);

  /** requete de calcul de statistiques */
  compute(inputs: ComputePrompt) {
    this.errorSig.set(null);
    this.callbackSig.set(null);
    this._httpClient
      .post<statsCallback>('http://localhost:3000/', inputs.formatToBack())
      .pipe(map((v) => new StatForm(v)))
      .subscribe({
        next: (v: StatForm) => {
          this.callbackSig.set(v);
        },
        error: (err) => {
          this.errorSig.set(err);
        },
      });
  }
}
