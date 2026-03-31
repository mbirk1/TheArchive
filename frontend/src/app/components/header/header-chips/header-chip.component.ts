import { Component, input, InputSignal, Signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header-chip',
  templateUrl: './header-chip.component.html',
  standalone: true,
})
export class HeaderChipComponent {
  text: InputSignal<string> = input.required();

}