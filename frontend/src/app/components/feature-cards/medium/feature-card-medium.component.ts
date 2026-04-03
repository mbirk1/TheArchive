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
  selector: 'app-feature-card-medium',
  templateUrl: './feature-card-medium.component.html',
  standalone: true,
  host: {
    class:
      'md:col-span-2 relative group overflow-hidden rounded-xl bg-surface-container border border-outline-variant/10 p-8 flex flex-col md:flex-row gap-8 items-center',
  },
})
export class FeatureCardMediumComponent {
  symbol: InputSignal<string> = input.required<string>();
  symbolColor: InputSignal<string> = input.required<string>();
  title: InputSignal<string> = input.required<string>();
  subText: InputSignal<string> = input.required<string>();
  @Input() template?: TemplateRef<any>;
}
