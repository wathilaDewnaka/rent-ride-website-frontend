import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-account',
  standalone: true,
  imports: [
    NzSelectModule,
    NzLayoutModule,
    NzButtonModule,
    CommonModule,
    NzFormModule,
    NzSpinModule,
    NzInputModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  templateUrl: './admin-account.component.html',
  styleUrl: './admin-account.component.css'
})
export class AdminAccountComponent {
  AdminPost!: FormGroup;
  AdminDelete!: FormGroup;
  isSpinning: boolean = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.AdminPost = this.fb.group({
      email: [null, Validators.required]
    });

    this.AdminDelete = this.fb.group({
      email: [null, Validators.required]
    })
  }

  adminDelete(){
    this.isSpinning = true;
    this.adminService.deleteAdmin(this.AdminDelete.value.email).subscribe((res) => {
      this.message.success("Admin deleted !")
      this.isSpinning = false;
    }, error => {
      this.message.error("Unable to delete admin !")
      this.isSpinning = false;
    })

  }

  adminPost(){
    this.isSpinning = true;
    this.adminService.postAdmin(this.AdminPost.value).subscribe((res) => {
      this.message.success("Admin posted !")
      this.isSpinning = false;
    }, error => {
      this.message.error("Admin removed !")
      this.isSpinning = false;
    })
  }
}
