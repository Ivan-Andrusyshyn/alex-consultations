import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss',
})
export class TestsComponent {}
