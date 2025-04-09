import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ComputePrompt } from '../models/compute-prompt';
import StatForm, { statsCallback } from '../models/stats-callback';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComputationService {
  /** instances de service */
  private _httpClient = inject(HttpClient);
  /** retour de statistique */
  callbackSig: WritableSignal<StatForm | null> = signal({} as StatForm);
  /** retour d'erreur */
  errorSig: WritableSignal<string | null> = signal(null);

  /** requete de calcul de statistiques */
  //comme
  compute(inputs: ComputePrompt) {
    this.errorSig.set(null);
    this.callbackSig.set(null);
    this._httpClient
      .post<statsCallback>(environment.domain, inputs.formatToBack())
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
