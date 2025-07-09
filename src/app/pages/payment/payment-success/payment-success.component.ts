import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
//

//
import { CardContent, TestName } from '../../../shared/models/common-tests';
import { fadeInAnimation } from '../../test-questions/fadeIn-animation';
import { TEST_CARDS } from '../../../core/content/TEST_CARDS';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss',
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentSuccessComponent implements OnInit {
  //
  private activeRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  // private router = inject(Router);

  testName!: TestName;
  urlResults!: string;
  testsCards = TEST_CARDS;
  currentCardInfo!: CardContent | null;
  priceTests: null | string = null;
  testResults!: string;
  //

  ngOnInit(): void {
    this.activeRoute.data
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((response) => {
          const { data } = response;
          console.log(data);

          this.testName = data['testName'];
          this.urlResults = data['urlResults'];
          this.priceTests = data['price'];
          7;
          this.testResults = data['testResults'];
          const foundCard = this.testsCards.find((card) =>
            card.imageUrl.endsWith(this.testName + '/')
          );

          this.currentCardInfo = foundCard ?? null;
        })
      )
      .subscribe();
  }
  navigateByClick() {
    if (this.testName && this.testResults) {
      const url = `/tests/${this.testName}/details/${this.testResults}`;
      window.location.href = url;
    } else {
      alert('problem with navigation data.');
    }
    // this.router.navigate(['tests', this.testName, 'details', this.testResults]);
  }
}
