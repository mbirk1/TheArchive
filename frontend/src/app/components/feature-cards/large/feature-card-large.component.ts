import {
  Component,
  Input,
  input,
  InputSignal,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  imports: [NgTemplateOutlet],
  selector: 'app-feature-card-large',
  templateUrl: './feature-card-large.component.html',
  standalone: true,
  host: {
    class:
      'md:col-span-2 relative group overflow-hidden rounded-xl bg-surface-container border border-outline-variant/10 p-8 flex flex-col justify-between min-h-[400px]',
  },
})
export class FeatureCardLargeComponent {
  symbol: InputSignal<string> = input.required<string>();
  symbolColor: InputSignal<string> = input.required<string>();
  title: InputSignal<string> = input.required<string>();
  subText: InputSignal<string> = input.required<string>();
  @Input({ required: true }) template?: TemplateRef<any>;
}
