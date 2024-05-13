import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'pokerstatsAngular';

    constructor(){
      const a = [1].at(0)
    }
}
