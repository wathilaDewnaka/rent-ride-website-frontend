import { CommonAppModule  } from './commonappmodule/commonappmodule.module';
import { StorageService } from './auth/services/storage/storage.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonAppModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'RentRide';

  constructor(private storage: StorageService, private router: Router){}

  isCustomerLoggedIn: boolean = StorageService.isCustomerLoggedIn()
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn()

  ngOnInit(){
    this.router.events.subscribe(event => {
      if(event.constructor.name == "NavigationEnd"){
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn()
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn()
      }
    })
  }

  logout(): void{
    StorageService.logout()
    this.router.navigateByUrl("/login")
  }
}
