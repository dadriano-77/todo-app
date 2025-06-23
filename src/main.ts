import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { UpgradeModule } from '@angular/upgrade/static';

declare var angular: any;
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  // .then((platformRef) => {
  //   const upgrade = platformRef.injector.get(UpgradeModule);
  //   upgrade.bootstrap(document.body, ['todoApp'], { strictDi: true });
  // })
  .catch((err) => console.error(err));
