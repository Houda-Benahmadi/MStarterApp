import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MCardComponent } from '../../m-framework/m-card/m-card.component';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { Router,  Navigation} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feature3',
  standalone: true,
  imports: [FormsModule, CommonModule, MCardComponent, MContainerComponent],
  templateUrl: './feature3.component.html',
  styleUrl: './feature3.component.css'
})
export class Feature3Component implements OnInit {

  hospitalName: string;
  doctors: any[];  // Your list of doctors or cards
  filteredDoctors: any[];
  showMore: boolean[]; 
  feedbackText: string[];

  constructor(private route: ActivatedRoute, private router:Router) {
    const navigation = this.router.getCurrentNavigation();
    this.hospitalName = navigation?.extras.state?.['hospital'] || '';
    // Initialize the list of doctors or cards with their respective properties
    this.doctors = [
      {
        header: 'Dr. Abdullah Khalid',
        subheader: 'Ahalia Eye Care',
        imageurl: 'https://www.felixhospital.com/sites/default/files/2022-11/dr-rahul-arora.jpg',
        availability: 'Available Timings: 9:00 AM - 5:00 PM',
        description: 'Dr. Abdullah Khalid is a renowned cardiologist with over 15 years of experience in treating heart diseases.',
        feedback: [
          'Patient 1: Good experience',
          'Patient 2: Very good doctor and he is so helpfull'
        ],
         distance: '1.13 km'
      },
      {
        header: 'Dr. Farah Ahmad',
        subheader: 'Burjeel Hospital',
        imageurl: 'https://www.felixhospital.com/sites/default/files/2022-11/dt-pooja-yadav.jpg',
        availability: 'Available Timings: 10:00 AM - 6:00 PM',
        description: 'Dr. Farah Ahmad is a skilled pediatrician known for her compassionate care and expertise in child health.',
        feedback: [
          'Patient 1: Excellent care',
          'Patient 2: Very professional and attentive'
        ],
         distance: '2.86 km'
      },
      {
        header: 'Dr. Salma Mohammed',
        subheader: 'Derma Medical Center',
        imageurl: 'https://ichef.bbci.co.uk/images/ic/1200x675/p0fjygqq.jpg',
        availability: 'Available Timings: 8:00 AM - 4:00 PM',
        description: 'Dr. Salma Mohammed is an experienced dermatologist specializing in skin care and cosmetic treatments.',
        feedback: [
          'Patient 1: Great dermatologist',
          'Patient 2: Helped with my skin issues'
        ],
         distance: '0.58 km'
      },
      {
        header: 'Dr. Ali Fahed',
        subheader: 'Sheikh Khalifa Medical City',
        imageurl: 'https://www.felixhospital.com/sites/default/files/2022-11/dr-dk-gupta.jpg',
        availability: 'Available Timings: 11:00 AM - 7:00 PM',
        description: 'Dr. Ali Fahed is a leading orthopedic surgeon with a focus on minimally invasive surgical techniques.',
        feedback: [
          'Patient 1: Very skilled surgeon',
          'Patient 2: Excellent recovery guidance'
        ],
         distance: '1.92 km'
      },
      {
        header: 'Dr. Amr El Far ',
        subheader: 'Advanced Cure Diagnostic Center (Main)',
        imageurl: 'https://cure.ae/uploads/image/doctors/amr.jpeg',
        availability: 'Available Timings: 2:00 PM - 5:00 PM',
        description: 'Dr. Amr El Far is a Consultant Medical Imaging Director who excels in ensuring top-quality diagnostic imaging and integrating it with patient care for optimal clinical outcomes.',
        feedback: [
          'Patient 1: Excellent diagnostic services',
          'Patient 2: Very detailed imaging'
        ],
         distance: '2.90 km'
      },
      {
        header: 'Dr. Steven John Marsland ',
        subheader: 'Canadian Medical Center CMC',
        imageurl: 'https://www.canadiancmc.com/wp-content/uploads/2024/05/Dr.STEVEN-MARSLAND-Chiropractic-practitioner.webp',
        availability: 'Available Timings: 9:00 AM - 9:00 PM',
        description: 'Dr. Steven John Marsland is a skilled Chiropractic Practitioner specializing in diagnosing and treating musculoskeletal issues, using spinal adjustments and manual techniques to relieve pain and enhance overall function.',
        feedback: [
          'Patient 1: Very effective treatments',
          'Patient 2: Great for back pain relief'
        ],
         distance: '0.91 km'
      },
      {
        header: 'Dr. Chandni Saleem Raja ',
        subheader: 'Medeor 24x7 Hospital',
        imageurl: 'https://medeor.ae/wp-content/uploads/sites/4/2023/08/Dr.-chandani.png',
        availability: 'Available Timings: 9:00 AM - 5:00 PM',
        description: 'Dr. Chandni Saleem Raja is a General Dentist specializing in comprehensive dental care, including exams, cleanings, and treatments to maintain and improve oral health.',
        feedback: [
          'Patient 1: Excellent dental care',
          'Patient 2: Very gentle and thorough'
        ],
         distance: '3.03 km'
      }
    ];

    // Initialize the filtered doctors array
    this.filteredDoctors = [];
    this.showMore = [];
    this.feedbackText = []; 
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.hospitalName = navigation.extras.state['hospital'] || '';
    }
    console.log('Hospital Name:', this.hospitalName); // Debugging line

    if (this.hospitalName) {
      this.filteredDoctors = this.doctors.filter(doctor => doctor.subheader === this.hospitalName);
      this.showMore = this.filteredDoctors.map(() => false);  // Initialize showMore for each doctor
      this.feedbackText = this.filteredDoctors.map(() => '');
      console.log('Filtered Doctors:', this.filteredDoctors); // Debugging line
    }
  }

  toggleDetails(index: number) {
    this.showMore[index] = !this.showMore[index];
  }

  addFeedback(index: number) {
    if (this.feedbackText[index].trim()) {
      this.filteredDoctors[index].feedback.push(this.feedbackText[index].trim());
      this.feedbackText[index] = '';  // Clear the feedback text input after submission
    }
  }

}
