import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    NzButtonModule,
    NzLayoutModule,
    NzSpinModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('chatbox') chatbox!: ElementRef;

  searchCarForm!: FormGroup;
  isSpinning: boolean = false;
  cars: any;
  listOfOption: Array<{ label: string; value: string }> = [];
  
  listOfBrands: string[] = ['BMW', 'Audi', 'Mercedes', 'Tesla', 'Toyota', 'Ford', 'Honda', 
    'Chevrolet', 'Nissan', 'Lexus', 'Jaguar', 'Porsche', 'Volkswagen', 
    'Ferrari', 'Lamborghini', 'Maserati', 'Bentley', 'Aston Martin', 
    'Bugatti', 'Rolls-Royce', 'Subaru', 'Mazda', 'Kia', 'Hyundai', 
    'Jeep', 'Dodge', 'Chrysler', 'Land Rover', 'Range Rover', 
    'Volvo', 'Alfa Romeo', 'McLaren', 'Peugeot', 'Renault', 
    'Citroen', 'Fiat', 'Mini', 'Cadillac', 'Buick', 'Lincoln', 
    'GMC', 'Suzuki', 'Mitsubishi', 'Infiniti', 'Genesis', 'Acura',
    'Saab', 'Seat', 'Skoda', 'Pagani', 'Koenigsegg', 'Lotus', 
    'Smart', 'Rivian', 'Lucid', 'Hummer'];
  listOfColor: string[] = ['Red', 'Blue', 'Black', 'White', 'Silver', 'Grey', 'Green', 
    'Yellow', 'Orange', 'Purple', 'Brown', 'Beige', 'Gold', 'Pink', 
    'Teal', 'Maroon', 'Turquoise', 'Ivory', 'Navy Blue', 'Olive', 
    'Magenta', 'Lavender', 'Bronze', 'Copper', 'Champagne', 'Pearl', 
    'Burgundy', 'Mint', 'Charcoal', 'Sandstone', 'Rust', 'Emerald'];
  listOfTransmission: string[] = ['Automatic', 'Manual', 'CVT', 'Semi-Automatic', 'Dual-Clutch', 
    'Tiptronic', 'Electric', 'Hydraulic', 'Direct Shift', 'Torque Converter', 
    'AMT (Automated Manual Transmission)', 'iMT (Intelligent Manual Transmission)', 
    'eCVT (Electronic Continuously Variable Transmission)', 'Hybrid Transmission'];
  listOfType: string[] = ['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Convertible', 'Truck', 
    'Van', 'Minivan', 'Wagon', 'Crossover', 'Sportscar', 'Luxury', 
    'Pickup', 'Roadster', 'Supercar', 'Hypercar', 'Compact', 
    'Mid-Size', 'Full-Size', 'Off-Road', 'Electric', 'Hybrid', 
    'Diesel', 'Plug-in Hybrid', 'Muscle Car', 'Limousine', 
    'Microcar', 'Cabriolet', 'Touring', 'Sport Utility Truck (SUT)', 
    'City Car', 'Estate Car'];


  prompt: string = "";
  messages: { text: string, sender: string }[] = [];
  loading: boolean = false;
  chatBx: boolean = false;

  constructor(private fb: FormBuilder, private customerS: CustomerService, private router: Router) {
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      color: [null],
      transmission: [null]
    });
  }

  searchCar(){
    this.isSpinning = true;
    this.customerS.searchACar(this.searchCarForm.value).subscribe((res) => {
      this.customerS.setSearchedCars(res)
      this.isSpinning = false;
      this.router.navigateByUrl("/customer/cars")
    })
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
      this.customerS.chatBot(this.prompt).subscribe((res: any) => {
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
