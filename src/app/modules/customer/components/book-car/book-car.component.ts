import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';



@Component({
  selector: 'app-book-car',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, NzSelectModule, NzLayoutModule, NzButtonModule, NzFormModule, NzSpinModule, NzInputModule, ReactiveFormsModule, NzDatePickerModule ],
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.css'
})
export class BookCarComponent {
  carId: number = this.acitvated.snapshot.params["id"];
  car: any
  processedImage: any;
  validateForm!: FormGroup
  isSpinning: boolean = false;
  
  constructor(private cusomerS: CustomerService, private acitvated: ActivatedRoute, private fb: FormBuilder, private storage: StorageService, private message: NzMessageService, private router: Router){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      toDate: [null, Validators.required],
      fromDate: [null, Validators.required],
      name: [null, Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required]

    })
    this.getCarById()
  }

  getCarById(){
    this.cusomerS.getCarById(this.carId).subscribe((res) => {
      this.processedImage = "data:image/jpeg;base64," + res.returnedImage
      this.car = res 
    })
  }

  bookACar() {
    let bookACarDto = {
      toDate: this.validateForm.value.toDate,
      fromDate: this.validateForm.value.fromDate,
      name: this.validateForm.value.name,
      address: this.validateForm.value.address,
      phone: this.validateForm.value.phone,
      userId: StorageService.getUserId(),
      carId: this.carId
    }


    this.cusomerS.bookACar(bookACarDto).subscribe((res) => {
      this.message.success("Vehicle booked successfully", { nzDuration : 5000 })
      this.router.navigateByUrl("/customer/my-bookings")
    }, error => {
      this.message.error("Something went wrong", { nzDuration : 5000 })
    })
  }

  disablePastDates = (current: Date): boolean => {
    // Disable past dates
    return current < new Date();
  }

}
