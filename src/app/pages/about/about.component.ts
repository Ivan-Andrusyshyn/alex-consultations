import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCardComponent } from '../../components/title-card/title-card.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, TitleCardComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  imgUrl = 'assets/imgs/avatar-about.jpg';
  subtitleText =
    'Коли я почав працювати з підлітками, мені здавалося, що проблема в тому, як вчителі подають матеріал — нудно, без натхнення. Але швидко стало ясно: основна причина не у викладанні. Підлітки просто не розуміли, навіщо їм цепотрібно.';
  titleText = 'Моя історія';
}
