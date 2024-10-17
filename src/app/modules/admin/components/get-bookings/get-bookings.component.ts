import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgStyle } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-bookings',
  standalone: true,
  imports: [NzSpinModule, NzTableModule, NgStyle, CommonModule],
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.css'
})
export class GetBookingsComponent {
  bookings: any;
  isSpinning: boolean = false;

  constructor(private admin: AdminService){ 
    this.getBookings()
  }

  changeBookingStatus(bookingId: number, status: string){
    this.admin.changeStatus(bookingId, status).subscribe((res) => {
      this.getBookings()
    })
  }

  getBookings(){
    this.admin.getAllBookings().subscribe((res) => {
      this.bookings = res
      
    })
  }
}
