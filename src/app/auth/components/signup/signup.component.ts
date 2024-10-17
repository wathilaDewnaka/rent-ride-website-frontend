import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, NzLayoutModule, NzButtonModule, NzFormModule, NzSpinModule, NzInputModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isSpinning: boolean = false;
  stepOne: boolean = true;
  stepTwo: boolean = false;
  signupForm!: FormGroup;
  otpError: boolean = false;

  showPassword: boolean = false;

  togglePasswordVisibility(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.showPassword = checkbox.checked;

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      (checkbox as HTMLInputElement).checked = this.showPassword;
    });
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private message: NzMessageService, private router: Router, private storageService: StorageService) {
    if(StorageService.isAdminLoggedIn()){
      this.router.navigateByUrl("/admin/dashboard")
    } else if(StorageService.isCustomerLoggedIn()){
      this.router.navigateByUrl("/customer/home")
    }
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValue.bind(this)]],
      otp: [null]
    });
  }

  confirmationValue(control: FormControl): {[s: string]: boolean} | null {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return null;
  }

  register() {
    this.isSpinning = true;
    this.authService.register(this.signupForm.value).subscribe((res) => {
      this.stepOne = false;
      this.stepTwo = true;
      this.isSpinning = false;
    }, error => {
      this.message.error("Something went wrong !", { nzDuration : 5000 } )
      this.isSpinning = false;
    })
  }

  register2(){
    // if(this.signupForm.value.otp == null || this.signupForm.value.otp.length != 6){
    //   this.otpError = true;
    //   return
    // }

    this.authService.register2(this.signupForm.value).subscribe((res) => {
      this.isSpinning = true;
      if(res.id !== null){
        this.message.success("Signup successfull !", {nzDuration: 5000})
        this.stepOne = true;
        this.stepTwo = false;
        this.router.navigateByUrl("/login")
        this.isSpinning = false;
      } else{
        this.message.error("Something went wrong !", {nzDuration: 5000})
        this.stepOne = true;
        this.stepTwo = false;
        this.isSpinning = false;
      }
    }, error => {
      console.log(error)
      this.message.error("Something went wrong !", {nzDuration: 5000})
      this.stepOne = true;
      this.stepTwo = false;
      this.isSpinning = false;
    })
  }
}
