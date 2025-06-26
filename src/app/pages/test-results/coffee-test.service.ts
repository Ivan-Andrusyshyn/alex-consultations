import { Injectable } from '@angular/core';

@Injectable()
export class CoffeeTestService {
  getSubCategoryName(type: string): number {
    if (type === 'Слабо заварена') {
      return 83;
    }
    if (type === 'Смак починає звучати') {
      return 69;
    }
    if (type === 'Розкритий аромат') {
      return 47;
    }
    if (type === 'Фірмова подача') {
      return 18;
    } else {
      return 18;
    }
  }
}
