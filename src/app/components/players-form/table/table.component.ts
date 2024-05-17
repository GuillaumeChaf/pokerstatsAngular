import { ChangeDetectorRef, Component, ElementRef, Signal, ViewChild, WritableSignal, computed, inject, signal } from '@angular/core';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../player/card/card.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ReactiveFormsModule, CardComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  //#region récupération du formulaire parent
  parentContainer = inject(ControlContainer);
  get parentFormGroup() {
    return (this.parentContainer.control as FormGroup).controls['table'] as FormGroup;
  }
  //#endregion
  /** ratio de l'image par rapport à ses proportions */
  pictureRatio: number = 746 / 600;
  /** hauteur de l'image */
  pictureheightSig: WritableSignal<number> = signal(800);
  /** largeur calculé par rapport au ratio */
  widthSig: Signal<number> = computed(() => this.pictureheightSig() * this.pictureRatio);
  /** élément de l'image */
  @ViewChild('picture') picture?: ElementRef<HTMLPictureElement>;

  ngAfterViewInit() {
    this.pictureheightSig.set(this.picture?.nativeElement?.clientHeight as any as number);
  }

  ngOnInit() {
    // this.parentFormGroup.addControl('card1', new FormControl());
    // this.parentFormGroup.addControl('card2', new FormControl());
    // this.parentFormGroup.addControl('card3', new FormControl());
    // this.parentFormGroup.addControl('card4', new FormControl());
    // this.parentFormGroup.addControl('card5', new FormControl());
  }
}
