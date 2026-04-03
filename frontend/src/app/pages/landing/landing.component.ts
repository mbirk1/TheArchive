import { Component } from '@angular/core';
import { DataPanelComponent } from './data-panel/data-panel.component';
import { CtaPanelComponent } from './cta-panel/cta-panel.component';
import { HeroPanelComponent } from './hero-panel/hero-panel.component';
import { BentoGridPanelComponent } from './bento-grid-panel/bento-grid-panel.component';

@Component({
  imports: [
    DataPanelComponent,
    CtaPanelComponent,
    HeroPanelComponent,
    BentoGridPanelComponent,
  ],
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  standalone: true,
})
export class LandingComponent {}
