import { enableProdMode, importProvidersFrom } from '@angular/core';

// import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(HttpClientModule), provideAnimationsAsync()],
});

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
