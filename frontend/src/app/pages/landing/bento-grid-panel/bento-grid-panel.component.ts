import { Component } from '@angular/core';
import { FeatureCardLargeComponent } from '../../../components/feature-cards/large/feature-card-large.component';
import { FeatureCardMediumComponent } from '../../../components/feature-cards/medium/feature-card-medium.component';
import { FeatureCardSmallComponent } from '../../../components/feature-cards/small/feature-card-small.component';

@Component({
  imports: [
    FeatureCardLargeComponent,
    FeatureCardMediumComponent,
    FeatureCardSmallComponent,
  ],
  selector: 'app-bento-grid-panel',
  templateUrl: './bento-grid-panel.component.html',
  standalone: true,
})
export class BentoGridPanelComponent {}
