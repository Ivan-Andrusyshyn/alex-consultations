import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

import { TestsUserDataService } from '../../core/services/tests-user-data/tests-user-data.service';
import { TestsUserData } from '../../shared/models/tests-user-data';

interface TestsUserDataGroup {
  date: string; // YYYY-MM-DD
  count: number;
  records: TestsUserData[];
}

@Component({
  selector: 'app-tests-user-data',
  standalone: true,
  imports: [DatePipe, AsyncPipe],
  templateUrl: './tests-user-data.component.html',
  styleUrl: './tests-user-data.component.scss',
})
export class TestsUserDataComponent implements OnInit {
  private testsUserDataService = inject(TestsUserDataService);

  testsUserData$!: Observable<TestsUserDataGroup[]>;

  openDates = new Set<string>();

  ngOnInit(): void {
    this.testsUserData$ = this.testsUserDataService.getAllTestsUsersData().pipe(
      map((items) =>
        [...items].sort((a, b) => {
          const ta = new Date(a.timestamp ?? a.createdAt ?? '').getTime();
          const tb = new Date(b.timestamp ?? b.createdAt ?? '').getTime();
          return tb - ta;
        })
      ),
      map((items) => {
        const groups: { [date: string]: TestsUserData[] } = {};
        items.forEach((item) => {
          const ts =
            item.timestamp ?? item.createdAt ?? new Date().toISOString();
          const dateKey = ts.split('T')[0].split(' ')[0]; // YYYY-MM-DD
          if (!groups[dateKey]) groups[dateKey] = [];
          groups[dateKey].push(item);
        });

        return Object.entries(groups)
          .map(([date, records]) => ({
            date,
            count: records.length,
            records,
          }))
          .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
      })
    );
  }

  toggleGroup(date: string) {
    if (this.openDates.has(date)) this.openDates.delete(date);
    else this.openDates.add(date);
  }

  isOpen(date: string) {
    return this.openDates.has(date);
  }

  scrollToBottomByClick() {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  trackByDate(index: number, g: TestsUserDataGroup) {
    return g.date;
  }
}
