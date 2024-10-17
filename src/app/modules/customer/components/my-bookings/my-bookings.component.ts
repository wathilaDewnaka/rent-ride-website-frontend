import { Component, ElementRef, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    NgStyle, 
    NzTableModule,
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
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'] // Corrected to styleUrls
})
export class MyBookingsComponent {
  @ViewChild('chatbox') chatbox!: ElementRef;
  isSpinning: boolean = false;
  bookedCars: any; // Changed from bookings to bookedCars

  prompt: string = "";
  messages: { text: string, sender: string }[] = [];
  loading: boolean = false;
  chatBx: boolean = false;

  constructor(private customer: CustomerService) {} 

  ngOnInit(){
    this.getBookings();
  }

  getBookings(){
    this.isSpinning = true;
    this.customer.getBookingsByUserId().subscribe((res) => {
      console.log(res);
      this.bookedCars = res;
      this.isSpinning = false;
    }, (err) => {
      this.isSpinning = false;
      if (err.error == "Invalid JWT Token"){
        console.log("object")
      }
      console.error('Error fetching bookings:', err);
    });
  }

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
      this.customer.chatBot(this.prompt).subscribe((res: any) => {
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
