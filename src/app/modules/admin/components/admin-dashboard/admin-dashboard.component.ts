import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service'
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouterLink } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NzSpinModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  constructor (private adminService: AdminService, private message: NzMessageService){ }
  cars: any = []
  isSpinning: boolean = false

  ngOnInit(){
    this.getAllCarts()

  }

  deleteCar(id: number){
    this.isSpinning = true
    this.adminService.deleteCar(id).subscribe((res) => {
      this.message.success("Car deleted successfully ")
      this.getAllCarts()
      this.isSpinning = false

    })
  }

  getAllCarts(){
    this.isSpinning = true
    this.cars = [];
    
    this.adminService.getAllCarts().subscribe((res) => {
      
      if(res){
        res.forEach((element: any) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
          this.cars.push(element)
          this.isSpinning = false
        });
      }
    })
  }

}
