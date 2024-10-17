import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NzLayoutModule, NzButtonModule, NzFormModule, NzSpinModule, NzInputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSpinning: boolean = false;
  loginForm!: FormGroup;
  showPassword: boolean = false;

  togglePasswordVisibility(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.showPassword = checkbox.checked;
  }
  constructor(private fb: FormBuilder, private authService: AuthService,private storageService: StorageService, private router: Router, private message: NzMessageService) {
    if(StorageService.isAdminLoggedIn()){
      this.router.navigateByUrl("/admin/dashboard")
    } else if(StorageService.isCustomerLoggedIn()){
      this.router.navigateByUrl("/customer/home")
    }
  }

  
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  

  login(){
    this.isSpinning = true;
    this.authService.login(this.loginForm.value).subscribe((res) => {
      if(res.userId != null){
        const user = {
          id: res.userId,
          role: res.userRole
        }

        StorageService.saveUser(user)
        StorageService.saveToken(res.jwt)

        if(StorageService.isAdminLoggedIn()){
          this.router.navigateByUrl("/admin/dashboard")
        } else if(StorageService.isCustomerLoggedIn()){
          this.router.navigateByUrl("/customer/home")
        } else{
          this.message.error("Bad credentials", { nzDuration: 5000 })
        }
      }
      this.isSpinning = false;
    }, error => {
      this.message.error("Bad credentials", { nzDuration: 5000 })
      this.isSpinning = false;
    })
  }
}
