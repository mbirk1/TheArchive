import { Component } from '@angular/core';
import { HeroProfileHeaderComponent } from '../../../components/hero-profile-header/hero-profile-header.component';

@Component({
  imports: [HeroProfileHeaderComponent],
  selector: 'app-personal-collection',
  templateUrl: './personal-collection.component.html',
  standalone: true,
})
export class PersonalCollectionComponent {}
