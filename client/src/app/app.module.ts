import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PizzaMenuComponent} from './pizza-menu.component';
import { OrderSummaryComponent } from './order-summary.component';
import { CurrentOrderComponent } from './current-order.component';
import { OrderingComponent } from './ordering.component';
import { QueryingComponent } from './querying.component';
import { OrderResultComponent } from './order-result.component';

const routes: Routes = [
	{ path: '', redirectTo: '/', pathMatch: 'full'},
	{ path: 'order', component: OrderingComponent },
	{ path: 'query', component: QueryingComponent },
  { path: 'finish/:receiptID', component: OrderResultComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    PizzaMenuComponent,
    OrderSummaryComponent,
    CurrentOrderComponent,
    OrderingComponent,
    QueryingComponent,
    OrderResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
		JsonpModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
