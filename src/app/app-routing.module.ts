import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentGatewayComponent } from './core/payment-gateway/payment-gateway.component';
import { PaymentComponent } from './core/payment/payment.component';


const routes: Routes = [
  {
    path: 'google-payment',component:PaymentGatewayComponent
  },
  {
    path: 'card-payment',component:PaymentComponent
  },
  {
    path: '',component:PaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
