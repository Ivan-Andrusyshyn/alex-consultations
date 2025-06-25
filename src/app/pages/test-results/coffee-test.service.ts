import { Injectable } from '@angular/core';

@Injectable()
export class CoffeeTestService {
  getSubCategoryName(type: string): number {
    if (type === 'Слабо заварена') {
      return 81;
    }
    if (type === 'Смак починає звучати') {
      return 66;
    }
    if (type === 'Розкритий аромат') {
      return 45;
    }
    if (type === 'Фірмова подача') {
      return 15;
    } else {
      return 15;
    }
  }
}
