import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCardComponent } from '../../components/title-card/title-card.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
