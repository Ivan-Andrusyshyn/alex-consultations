import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

//
import { TestsUserDataService } from '../../core/services/tests-user-data/tests-user-data.service';
import { TestsUserData } from '../../shared/models/tests-user-data';

@Component({
  selector: 'app-tests-user-data',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './tests-user-data.component.html',
  styleUrl: './tests-user-data.component.scss',
})
export class TestsUserDataComponent implements OnInit {
  private testsUserDataService = inject(TestsUserDataService);

  testsUserData$!: Observable<TestsUserData[]>;
  ngOnInit(): void {
    this.testsUserData$ = this.testsUserDataService.getAllTestsUsersData().pipe(
      map((response) => {
        console.log(response);

        return response;
      })
    );
  }

  scrollToBottomByClick() {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }
}
