import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config/config.service';

@Component({
  imports: [],
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
})
export class FooterComponent {
  protected configService: ConfigService = inject(ConfigService);
}
