import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [ NzDatePickerComponent, FormsModule, CommonModule, NzSelectModule,NzLayoutModule, NzButtonModule, NzFormModule, NzSpinModule, NzInputModule, ReactiveFormsModule],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.css'
})
export class UpdateCarComponent {
  constructor(private fb: FormBuilder, private admin: AdminService, private activatRoute: ActivatedRoute, private message: NzMessageService, private router: Router){}

  updateForm!: FormGroup;
  carId: number = this.activatRoute.snapshot.params['id'];
  existingImage: string | null = null;
  
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

  isSpinning: boolean = true;
  selectedFile: any;
  imagePreview: any | null| ArrayBuffer;
  imageChanged: boolean = false;


  ngOnInit(){
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]
    });

    this.getCarById()

    this.isSpinning = false

  }

  updateCar(){
    const formData = new FormData();

    if (this.imageChanged && this.selectedFile){
      formData.append('image', this.selectedFile);

    }
  
    // Append form values to FormData
    Object.keys(this.updateForm.controls).forEach(key => {
      const value = this.updateForm.get(key)?.value;
      console.log(`Appending ${key}: ${value}`);
      formData.append(key, value);
    });


    this.admin.updateCar(this.carId, formData).subscribe((res) => {
      this.isSpinning = true
      this.message.success("Car updated successfully", { nzDuration: 5000 });
      this.router.navigateByUrl("/admin/dashboard");
      console.log(res);
      this.isSpinning = false
    }, error => {
      this.isSpinning = false;
      this.message.error("Something went wrong", { nzDuration: 5000 });
    });

  }

  getCarById(){
    this.isSpinning = true
    this.admin.getCarById(this.carId).subscribe((res) => {
      const carDto = res
      this.existingImage = "data:image/jpeg;base64," + res.returnedImage
      this.updateForm.patchValue(carDto)
      this.isSpinning = false
    })
  }

  
  onFileSelected(event: any){
    this.selectedFile = event.target.files[0]
    this.imageChanged = true;
    this.existingImage = null;
    this.previewImage()
  }

  previewImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
