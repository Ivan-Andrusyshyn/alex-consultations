import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NgFor } from '@angular/common';
//

import { LottieComponent } from 'ngx-lottie';
//
import { fadeInAnimation } from '../../../../../core/animations/fadeIn-animation';
import { PrimaryBtnComponent } from '../../../primary-btn/primary-btn.component';
import { TestName } from '../../../../models/tests/common-tests';

@Component({
  selector: 'app-questions-board',
  standalone: true,
  imports: [PrimaryBtnComponent, LottieComponent, NgFor],
  templateUrl: './questions-board.component.html',
  styleUrl: './questions-board.component.scss',
  animations: [fadeInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsBoardComponent implements OnInit {
  @Input() testsInstruction: any;
  @Input() testName!: TestName;
  @Output() hideTextBoard = new EventEmitter<void>();
  //

  options = {
    path: '',
    loop: true,
    autoplay: true,
  };
  readonly baseAssetUrl = 'assets/new/core/animations/tests/';
  //
  ngOnInit(): void {
    //
    this.options.path = `${this.baseAssetUrl}${this.testName}-1.json`;
  }
  //
  hideTextBoardOnClick() {
    this.hideTextBoard.emit();
  }
}
