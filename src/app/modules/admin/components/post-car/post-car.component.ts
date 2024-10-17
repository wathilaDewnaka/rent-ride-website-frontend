import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxImageCompressService } from 'ngx-image-compress';  // This should not be in imports
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-car',
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
    FormsModule,
    NzDatePickerModule
  ],
  providers: [NgxImageCompressService],  // Correct placement for the service
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.css']
})
export class PostCarComponent {
  PostCarForm!: FormGroup;
  isSpinning: boolean = false;
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

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  readonly MAX_SIZE = 50 * 1024; // 50KB
  compressedFile: string = ''; // Store compressed image as base64

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router,
    private imageCompress: NgxImageCompressService  // Inject the service here
  ) {}

  ngOnInit() {
    this.PostCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]
    });
  }

  postCar() {
    
    if (this.PostCarForm.invalid) {
      this.message.error("Please fill all required fields.", { nzDuration: 5000 });
      return;
    }

    if (!this.selectedFile) {
      this.message.error("Please select an image file.", { nzDuration: 5000 });
      return;
    }

    this.isSpinning = true;

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    // Append form values to FormData
    Object.keys(this.PostCarForm.controls).forEach(key => {
      const value = this.PostCarForm.get(key)?.value;
      formData.append(key, value);
    });

    this.adminService.postCar(formData).subscribe(
      (res) => {
        this.isSpinning = false;
        this.message.success("Car posted successfully", { nzDuration: 5000 });
        this.router.navigateByUrl("/admin/dashboard");
      },
      (error) => {
        this.isSpinning = false;
        this.message.error("Something went wrong", { nzDuration: 5000 });
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      this.compressImage(imageUrl, 50, 50); // Start compression with 50% quality

      console.log("done")
    }
  }

  compressImage(imageUrl: string, quality: number, size: number) {
    this.imageCompress.compressFile(imageUrl, -1, quality, size).then((compressedImage) => {
      const imageSize = this.calculateImageSize(compressedImage);
      if (imageSize <= this.MAX_SIZE) {
        this.compressedFile = compressedImage;
        this.imagePreview = compressedImage; // Show preview
        this.selectedFile = this.dataURItoFile(compressedImage, 'compressed-image.jpg')
        console.log("Comp + " + compressedImage)
      } else {
        // If the compressed image is still too large, reduce the quality and size
        if (quality > 10) {
          this.compressImage(imageUrl, quality - 10, size - 10); // Reduce quality and size
        } else {
          this.compressedFile = compressedImage;
          this.selectedFile = this.dataURItoFile(compressedImage, 'compressed-image.jpg')
          this.imagePreview = compressedImage; // Show preview
        }
      }
    });
  }

  calculateImageSize(base64String: string): number {
    const stringLength = base64String.length - 'data:image/jpeg;base64,'.length;
    return (stringLength * 3) / 4; // Convert base64 length to byte size
  }

  dataURItoFile(dataURI: string, fileName: string): File {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return new File([blob], fileName, { type: mimeString }); // Create a File object
  }
}
