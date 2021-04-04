import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const JitaSystem = '30000142';

export interface EveMarketerPrice {
  volume: number;
  wavg: number;
  avg: number;
  variance: number;
  stdDev: number;
  median: number;
  fivePercent: number;
  max: number;
  min: number;
  highToLow: boolean;
  generated: number;
  forQuery: {
    bid: boolean;
    hours: number;
    minq: number;
    types: number[];
    regions: number[];
    systems: number[];
  }
}

export interface EveMarketerPriceResponse {
  buy: EveMarketerPrice;
  sell: EveMarketerPrice;
}


interface TypeIds {
  id: number;
  name: string;
}

export interface Item {
  id: number;
  name: string;
  count: number;
  price?: number;
}

// export interface ItemWithPrice extends Item {
//   price: number;
// }

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  public typeids: TypeIds[] = [];

  constructor(private http: HttpClient) {
    this.http.get('/assets/typeids.json').subscribe({
      next: (response) => {
        this.typeids = response as TypeIds[];
      }
    })
  }

  public getIdByName(name: string): number {
    return this.typeids.find(item => {
      if ('name' in item && typeof item.name === 'string') {
        return item.name.includes(name);
      }
      return false;
    })?.id;
  }

  public getNameById(id: number): string {
    return this.typeids.find(item => {
      return item.id === id;
    })?.name;
  }

  public parseItemsFromInventory(string: string): Item[] {
    const rows = string.split('\n');
    const items: Item[] = [];
    rows.forEach(row => {
      console.log('row', row.split('\t'));
      const [a, b] = row.split('\t');
      const name = a.replace('*', '');
      const count = b === '' ? 1 : Number(b.replace(/[  ]*/g, ''));

      const id = this.getIdByName(name);
      if (id >= 0) {
        const item = items.find(item => item.id === id);
        if (item != null) {
          item.count += count;
        } else {
          items.push({
            id,
            name,
            count
          });
        }
      }
    });
    return items;
  }

  public parseItemsFromTradeTable(string: string): { count: number, price: number } {
    let [a, b, c] = string.split('\t');
    const count = Number(b.replace(/[  ]*/g, ''));
    const price = parseFloat(c.replace(/[  ]*/g, ''));
    return {
      count,
      price
    };
  }

  public getIdsFromItems(items: Item[]): number[] {
    return items.map(item => item.id);
  }

  private getPrices(ids: number[]): Observable<EveMarketerPriceResponse[]> {
    const stringIds: string = ids.join(',');
    const url = `https://api.evemarketer.com/ec/marketstat/json?typeid=${stringIds}&usesystem=${JitaSystem}`;
    return this.http.get(url) as Observable<EveMarketerPriceResponse[]>;
  }

  public getPricesByItems(items: Item[]): Observable<EveMarketerPriceResponse[]> {
    const ids = this.getIdsFromItems(items);
    return this.getPrices(ids);
  }
  public getPricesByIds(ids: number[]): Observable<EveMarketerPriceResponse[]> {
    return this.getPrices(ids);
  }
}
