import { Injectable } from '@angular/core';

import { AbyssTypeEnum } from '../../common/enums';
import { ItemsService } from '../items/items.service';

@Injectable({
  providedIn: 'root'
})
export class AbyssService {

  public enter = [
    {
      id: 56133,
      type: AbyssTypeEnum.Exotic,
      level: 0,
      price: 0
    },
    {
      id: 47761,
      type: AbyssTypeEnum.Exotic,
      level: 1,
      price: 0
    },
    {
      id: 47888,
      type: AbyssTypeEnum.Exotic,
      level: 2,
      price: 0
    },
    {
      id: 47889,
      type: AbyssTypeEnum.Exotic,
      level: 3,
      price: 0
    },
    {
      id: 47890,
      type: AbyssTypeEnum.Exotic,
      level: 4,
      price: 0
    },
    {
      id: 47891,
      type: AbyssTypeEnum.Exotic,
      level: 5,
      price: 0
    },
    {
      id: 56141,
      type: AbyssTypeEnum.Exotic,
      level: 6,
      price: 0
    },
    {
      id: 56132,
      type: AbyssTypeEnum.Dark,
      level: 0,
      price: 0
    },
    {
      id: 47762,
      type: AbyssTypeEnum.Dark,
      level: 1,
      price: 0
    },
    {
      id: 47892,
      type: AbyssTypeEnum.Dark,
      level: 2,
      price: 0
    },
    {
      id: 47893,
      type: AbyssTypeEnum.Dark,
      level: 3,
      price: 0
    },
    {
      id: 47894,
      type: AbyssTypeEnum.Dark,
      level: 4,
      price: 0
    },
    {
      id: 47895,
      type: AbyssTypeEnum.Dark,
      level: 5,
      price: 0
    },
    {
      id: 56140,
      type: AbyssTypeEnum.Dark,
      level: 6,
      price: 0
    },

    {
      id: 56134,
      type: AbyssTypeEnum.Plasma,
      level: 0,
      price: 0
    },
    {
      id: 47763,
      type: AbyssTypeEnum.Plasma,
      level: 1,
      price: 0
    },
    {
      id: 47896,
      type: AbyssTypeEnum.Plasma,
      level: 2,
      price: 0
    },
    {
      id: 47897,
      type: AbyssTypeEnum.Plasma,
      level: 3,
      price: 0
    },
    {
      id: 47898,
      type: AbyssTypeEnum.Plasma,
      level: 4,
      price: 0
    },
    {
      id: 47899,
      type: AbyssTypeEnum.Plasma,
      level: 5,
      price: 0
    },
    {
      id: 56142,
      type: AbyssTypeEnum.Plasma,
      level: 6,
      price: 0
    },

    {
      id: 56131,
      type: AbyssTypeEnum.Electrical,
      level: 0,
      price: 0
    },
    {
      id: 47765,
      type: AbyssTypeEnum.Electrical,
      level: 1,
      price: 0
    },
    {
      id: 47904,
      type: AbyssTypeEnum.Electrical,
      level: 2,
      price: 0
    },
    {
      id: 47905,
      type: AbyssTypeEnum.Electrical,
      level: 3,
      price: 0
    },
    {
      id: 47906,
      type: AbyssTypeEnum.Electrical,
      level: 4,
      price: 0
    },
    {
      id: 47907,
      type: AbyssTypeEnum.Electrical,
      level: 5,
      price: 0
    },
    {
      id: 56139,
      type: AbyssTypeEnum.Electrical,
      level: 6,
      price: 0
    },

    {
      id: 56136,
      type: AbyssTypeEnum.Gamma,
      level: 0,
      price: 0
    },
    {
      id: 47764,
      type: AbyssTypeEnum.Gamma,
      level: 1,
      price: 0
    },
    {
      id: 47900,
      type: AbyssTypeEnum.Gamma,
      level: 2,
      price: 0
    },
    {
      id: 47901,
      type: AbyssTypeEnum.Gamma,
      level: 3,
      price: 0
    },
    {
      id: 47902,
      type: AbyssTypeEnum.Gamma,
      level: 4,
      price: 0
    },
    {
      id: 47903,
      type: AbyssTypeEnum.Gamma,
      level: 5,
      price: 0
    },
    {
      id: 56143,
      type: AbyssTypeEnum.Gamma,
      level: 6,
      price: 0
    }
  ]

  constructor(
    private itemsService: ItemsService
  ) {
    this.getEnterPrices();
  }

  
  public getEnterPrices(): void {
    const ids = this.enter.map(e => e.id)
    this.itemsService.getPricesByIds(ids).subscribe({
      next: (response: any) => {
        response.forEach(item => {
          const id = item.sell.forQuery.types[0];
          const price = item.sell.min;
          const enter = this.enter.find(e => e.id === id);
          enter.price = price;
        });
      }
    })
  }

  public getIdByTypeAndLevel(type: AbyssTypeEnum, level: number) {
    return this.enter.find(e => {
      return e.type === type && e.level === level;
    }).id;
  }

  public getPricePerEnter(type: AbyssTypeEnum, level: number): number {
    return this.enter.find(e => {
      return e.type === type && e.level === level;
    }).price;
  }
}
