import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgxStarRatingModule } from 'ngx-star-rating';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [NgxStarRatingModule, ReactiveFormsModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent implements OnInit {
  public form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      rating: new FormControl(4),
    });
  }
}
