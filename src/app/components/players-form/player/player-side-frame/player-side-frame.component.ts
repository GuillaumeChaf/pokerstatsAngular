import {
  Component,
  HostListener,
  Input,
  ModelSignal,
  OnDestroy,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  inject,
  model,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { condition, conditions } from 'src/app/models/conditions';
import { AsyncPipe, KeyValue, KeyValuePipe, NgClass, NgStyle } from '@angular/common';
import { mainGrey } from 'src/assets/graphic-chart';
import { PlayerConfiguration } from 'src/app/models/player-configurations';
import { ComputationService } from 'src/app/services/computation.service';
import StatForm, { statsCallback } from 'src/app/models/stats-callback';
import { Subject, Subscription } from 'rxjs';
import { Combination, combinationDP, combinationDPConfig } from 'src/app/models/combinations';
import { PlayerOutsFrameComponent } from '../player-outs-frame/player-outs-frame.component';
import { Card } from 'src/app/models/card';
import { DisplayService } from 'src/app/services/display.service';

@Component({
  selector: 'app-player-side-frame',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    PlayerOutsFrameComponent,
    NgClass,
    NgStyle,
    AsyncPipe,
    KeyValuePipe,
  ],
  templateUrl: './player-side-frame.component.html',
  styleUrls: ['../player.component.scss', './player-side-frame.component.scss'],
})
export class PlayerSideFrameComponent implements OnInit {
  /** formulaire dans lequel sont inclut les champs */
  @Input({ required: true }) playerForm!: FormGroup;
  /** information sur le joueur */
  @Input({ required: true }) conf!: PlayerConfiguration;
  /** ngModel qui va gérer l'activation du composant */
  activState: ModelSignal<boolean | undefined> = model<boolean>();
  /** chemin du svg du bouton d'activation */
  activBtnSvgSig: Signal<string> = computed(() => `assets/svg/activation-states/${this.activState() ? 'square-minus' : 'square-plus'}.svg#body`);
  //#region variables liées au retour de résultat
  /** service dédié à l'envoie de calcul vers l'api */
  computationS = inject(ComputationService);
  displayS = inject(DisplayService);
  /** observable qui va écouter le retour de calcul */
  computationCallbackSig!: WritableSignal<StatForm | null>;
  /** variable enregistrant la statistique à afficher */
  statsStrSig: Signal<string> = computed(() => this.computationCallbackSig()?.players?.[this.conf.id]?.statPerc ?? '');
  /** outs */
  outsSig: Signal<Card[]> = computed(() => this.computationCallbackSig()?.players?.[this.conf.id]?.outs ?? []);
  //#endregion
  /** valeur séléctionné en suit visuellement */
  selectedOption!: combinationDPConfig;
  /** valeur du formulaire condition pour certains style */
  activeSig: WritableSignal<condition | undefined> = signal(undefined);
  dropdownOpenSig: WritableSignal<boolean> = signal(false);
  //#region constantes
  /**  liste de combinaisons */
  combinationDP = combinationDP;
  /** liste des conditions de fin */
  conditionsList = conditions;
  mainGrey = mainGrey;
  //#endregion

  get suit(): FormControl<Combination> {
    return this.playerForm.controls['suit'] as FormControl;
  }
  get condition(): FormControl<condition> {
    return this.playerForm.controls['condition'] as FormControl;
  }

  ngOnInit() {
    this.computationCallbackSig = this.computationS.callbackSig;
    this.selectedOption = combinationDP[this.suit.value];
    this.condition.valueChanges.subscribe((v: condition) => {
      this.activeSig.set(v);
    });
  }

  orderFnc: (a: KeyValue<string, any>, b: KeyValue<string, any>) => number = (a, b) => {
    return a.value.order - b.value.order;
  };

  /** Event emitter sélection d'une carte */
  select(e: combinationDPConfig) {
    this.selectedOption = e;
    this.suit.patchValue(e.value);
  }

  /** Event emitter ouverture/fermeture de la popUp */
  openClose(e: any) {
    if (!this.playerForm.disabled) this.dropdownOpenSig.set(!this.dropdownOpenSig());
    e.stopPropagation();
  }

  @HostListener('document:click')
  clickOut() {
    this.dropdownOpenSig.set(false);
  }
}
