import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from '@angular/forms';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
  declarations: [AppComponent, TodoComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, UpgradeModule],
  providers: [],
  bootstrap: [],
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}

  ngDoBootstrap(appRef: ApplicationRef): void {
    this.upgrade.bootstrap(document.body, ['todoApp'], { strictDi: true });
    console.log('✅ AngularJS has been bootstrapped.');

    appRef.bootstrap(AppComponent);
  }
}
