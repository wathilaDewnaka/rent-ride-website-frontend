import { Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ForgetComponent } from './auth/components/forget/forget.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "register", component: SignupComponent },
    { path: "login/forget", component: ForgetComponent },
    { path: "admin", loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule) },
    { path: "customer", loadChildren: () => import("./modules/customer/customer.module").then(m => m.CustomerModule) },
    { path: "**", redirectTo: "login", pathMatch: "full" }
];
