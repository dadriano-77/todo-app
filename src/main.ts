import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { downgradeInjectable, UpgradeModule } from '@angular/upgrade/static';
import { TodoService } from './app/services/todo.service';
import { NotificationService } from './app/services/notification.service';
import { StorageService } from './app/services/storage.service';

declare var angular: any;
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((platformRef) => {
    const upgrade = platformRef.injector.get(UpgradeModule);
    angular
      .module('todoApp')
      .factory('NotificationService', downgradeInjectable(NotificationService))
      .factory('StorageService', downgradeInjectable(StorageService))
      .factory('TodoService', downgradeInjectable(TodoService));
    upgrade.bootstrap(document.body, ['todoApp']);
  })
  .catch((err) => console.error(err));
