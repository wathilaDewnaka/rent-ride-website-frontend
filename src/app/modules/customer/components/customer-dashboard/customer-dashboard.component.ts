import { Component, ElementRef, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [NzSpinModule, CommonModule, RouterLink, RouterLinkActive, RouterOutlet, NzModalModule, NzCardModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {
  constructor(private customerService: CustomerService) {}
  cars: any = []
  fromSearch: boolean = false;
  isSpinning: boolean = true;
  searchNotFound: boolean = false;
  

  ngOnInit(){
    if (this.customerService.getSearchedCars() != undefined){
      this.cars = this.customerService.getSearchedCars().carDtoList

      if (this.cars.length == 0){
        this.searchNotFound = true
        this.getAllCarts()
      } else{ 
        this.fromSearch = true;

      }

    } else{
      this.getAllCarts()
    }
  }

  getAllCarts(){
    this.customerService.getAllCarts().subscribe((res) => {
      console.log(res)
      if(res){
        res.forEach((element: any) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
          this.cars.push(element)
          this.isSpinning = false;
        });
      }
    })
  }

  selectedCar: any = null;

  prompt: string = "";
  messages: { text: string, sender: string }[] = [];
  loading: boolean = false;
  chatBx: boolean = false;

  @ViewChild('chatbox') chatbox!: ElementRef;
  

  openChat(){
    console.log(this.chatBx)
    if(this.chatBx == false){
      this.chatBx = true
      return

    }
    this.chatBx = false
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onSubmit() {
    this.loading = true
    if (this.prompt.trim()) {
      // Add user's message to the messages array
      this.messages.push({ text: this.prompt, sender: 'user' });

      // Call the chatBot API to get the bot's response
      this.customerService.chatBot(this.prompt).subscribe((res: any) => {
        // Assuming res contains the bot's reply
        this.loading = false;
        this.messages.push({ text: res.response, sender: 'bot' });
      });
      
      
      // Clear the input field after submitting
      this.prompt = '';
    }
  }

  // Scroll to the bottom of the chatbox
  scrollToBottom(): void {
    try {
      this.chatbox?.nativeElement.scrollTo({
        top: this.chatbox?.nativeElement.scrollHeight,
        behavior: 'smooth'
      });
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }
}
