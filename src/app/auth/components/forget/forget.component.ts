import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, NzLayoutModule, NzButtonModule, NzFormModule, NzSpinModule, NzInputModule],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css'
})
export class ForgetComponent {
  isSpinning: boolean = false;
  stepOne: boolean = true;
  stepTwo: boolean = false;

  forgetForm!: FormGroup;
  showPassword: boolean = false;

  togglePasswordVisibility(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.showPassword = checkbox.checked;

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      (checkbox as HTMLInputElement).checked = this.showPassword;
    });
  }

  constructor(private fb: FormBuilder, private authService: AuthService,private storageService: StorageService, private router: Router, private message: NzMessageService) { 
    if(StorageService.isAdminLoggedIn()){
      this.router.navigateByUrl("/admin/dashboard")
    } else if(StorageService.isCustomerLoggedIn()){
      this.router.navigateByUrl("/customer/home")
    }
  }

  ngOnInit() {
    this.forgetForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValue.bind(this)]],
      otp: [null]
    });
  }

  confirmationValue(control: FormControl): {[s: string]: boolean} | null {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.forgetForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return null;
  }
  
  forget(){
    this.isSpinning = true;
    this.authService.forget(this.forgetForm.value).subscribe((res) => {
      this.stepTwo = true;
      this.stepOne = false;
      this.isSpinning = false;
    }, error => {
      this.message.error("Something went wrong !", {nzDuration : 5000})
      this.isSpinning = false;
    })
  }

  forget2(){
    this.isSpinning = true;
    this.authService.forget2(this.forgetForm.value).subscribe((res) => {
      this.router.navigateByUrl("/login")
      this.isSpinning = false;
    }, error => {
      this.message.error("Something went wrong !", {nzDuration : 5000})
      this.isSpinning = false;
    })
  }
}
