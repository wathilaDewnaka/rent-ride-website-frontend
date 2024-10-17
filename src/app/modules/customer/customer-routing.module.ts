import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BookCarComponent } from './components/book-car/book-car.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: "cars", component: CustomerDashboardComponent },
  { path: "cars/book/:id", component: BookCarComponent },
  { path: "my-bookings", component: MyBookingsComponent },
  { path: "home", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
