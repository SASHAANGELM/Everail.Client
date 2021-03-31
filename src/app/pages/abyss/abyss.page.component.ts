import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { ItemsService } from 'src/app/services/items/items.service';

// import typeids from './typeids.json';

// console.log('typeids', typeids);

// import { db } from '../../db/db';

import { AbyssTypeEnum } from '../../common/enums';
import { AbyssService } from 'src/app/services/abyss/abyss.service';
import { GraphqlService } from 'src/app/services/graphql/graphql.service';


interface AbyssRecord {
  _id: string;
  _updated: number;
  type: AbyssTypeEnum;
  level: number;
  looted: number;
  time: number;
  spend: Item[];
  earn: Item[];
  spendSum?: number;
  earnSum?: number;
}

interface Item {
  id: number,
  name: string;
  count: number;
  price?: number;
}

interface AbyssRecordData extends AbyssRecord {
  opened: boolean;
}

interface RecordsByDay {
  time: moment.Moment;
  opened: boolean;
  records: Array<AbyssRecordData | RecordsByDay>;
  spendSum?: number;
  earnSum?: number;
}

@Component({
  selector: 'app-abyss.page',
  templateUrl: './abyss.page.component.html',
  styleUrls: ['./abyss.page.component.scss']
})
export class AbyssPageComponent implements OnInit {

  public itemsPrice = {};

  public records: AbyssRecordData[] = [];
  public recordsByDay: RecordsByDay[] = [];
  public recordsByMonth: RecordsByDay[] = [];

  public get itemsList(): number[] {
    const itemsList = [];
    this.recordsByDay.forEach(day => {
      day.records.forEach((record: AbyssRecordData ) => {
        [...record.spend, ...record.earn].forEach(item => {
          if (!itemsList.includes(item.id)) {
            itemsList.push(item.id);
          }
        });
      });
    });
    return itemsList;
  }

  constructor(
    private itemsService: ItemsService,
    private abyssService: AbyssService,
    private graphqlService: GraphqlService
  ) { }

  ngOnInit(): void {
    this.getAbysses();
  }

  public getAbysses(): void {
    this.graphqlService.query('{ abysses { _id, type, level, looted, time, earn { id, name, count }, spend { id, name, count } } }').subscribe({
      next: (response) => {
        console.log('query', response.abysses);
        this.records = response.abysses.map(record => {
          return {
            ...record,
            spendSum: 0,
            earnSum: 0,
          };
        });
        this.groupAbysses();
        this.getItemsPrice(this.itemsList);
      }
    });
  }

  public groupAbysses() {
    this.recordsByDay = [];
    this.recordsByMonth = [];
    const records = [...this.records];
    records.reverse().forEach(record => {
      const recordData = {
        ...record,
        opened: false
      } as AbyssRecordData;

      const time = moment(record.time).set('hours', 0).set('minutes', 0).set('seconds', 0).set('milliseconds', 0);

      const day = this.recordsByDay.find(day => day.time.isSame(time));

      if (day != null) {
        day.records.push(recordData);
      } else {
        this.recordsByDay.push({
          time,
          opened: true,
          spendSum: 0,
          earnSum: 0,
          records: [recordData]
        });
      }
    });
    // Calculate earn and spend sum per day
    this.recordsByDay.forEach(recordsByDay => {
      recordsByDay.records.forEach(record => {
        const spend = record.spendSum ?? 0;
        const earn = record.earnSum ?? 0;
        recordsByDay.spendSum += spend;
        recordsByDay.earnSum += earn;
      });
    });

    // Group by month
    this.recordsByDay.forEach(recordsByDay => {
      const time = moment(recordsByDay.time).set('date', 1);

      const month = this.recordsByMonth.find(month => month.time.isSame(time));
      if (month != null) {
        month.records.push(recordsByDay);
      } else {
        this.recordsByMonth.push({
          time,
          opened: true,
          spendSum: 0,
          earnSum: 0,
          records: [recordsByDay]
        });
      }
    });

    // Calculate earn and spend sum per month
    this.recordsByMonth.forEach(recordsByMonth => {
      recordsByMonth.records.forEach(recordsByDay => {
        const spend = recordsByDay.spendSum ?? 0;
        const earn = recordsByDay.earnSum ?? 0;
        recordsByMonth.spendSum += spend;
        recordsByMonth.earnSum += earn;
      });
    });
  }

  public getItemsPrice(ids) {
    this.itemsService.getPricesByIds(ids).subscribe({
      next: (response: any[]) => {
        for (let i = 0; i < response.length; i++) {
          const price = response[i];
          this.itemsPrice[ids[i]] = {
            buy: price.buy.max,
            sell: price.sell.min
          };
        }

        this.records.forEach(record => {
          let sum = 0;
          record.spend.forEach(item => {
            item.price = this.itemsPrice[item.id].sell;
            sum += item.price * item.count;
          });
          record.spendSum = sum;

          sum = 0;
          record.earn.forEach(item => {
            item.price = this.itemsPrice[item.id].buy;
            sum += item.price * item.count;
          });
          record.earnSum = sum;
        });
        this.groupAbysses();
        // console.log('this.records', this.records)
      }
    });
  }

  public getPriceOfItem(id) {
    return this.itemsPrice[id] ?? { buy: 0, sell: 0 };
  }

  public getPrice(item) {
    return this.getPriceOfItem(item.id) * item.count;
  }

  public earnSum(record: AbyssRecordData): number {
    return record.earn.reduce((accumulator, currentValue) => accumulator += this.getPriceOfItem(currentValue.id).buy * currentValue.count, 0);
  }
  public spendSum(record): number {
    return record.spend.reduce((accumulator, currentValue) => accumulator += this.getPriceOfItem(currentValue.id).sell * currentValue.count, 0);
  }

  public sumOfRecord(record) {
    let sum = 0;
    record.items.forEach(item => {
      sum += this.getPrice(item);
    });
    return sum;
  }
  public getAbyssTypeImage(type: AbyssTypeEnum): string {
    let id = '';
    switch (type) {
      case AbyssTypeEnum.Exotic: {
        id = '47862';
        break;
      }
      case AbyssTypeEnum.Dark: {
        id = '47863';
        break;
      }
      case AbyssTypeEnum.Plasma: {
        id = '47864';
        break;
      }
      case AbyssTypeEnum.Electrical: {
        id = '47865';
        break;
      }
      case AbyssTypeEnum.Gamma: {
        id = '47866';
        break;
      }
    }
    return `https://imageserver.eveonline.com/Type/${id}_32.png`;
  }

  public getAbyssLevelImage(level: number): string {
    let id = '';
    switch (level) {
      case 0: {
        id = '56133';
        break;
      }
      case 1: {
        id = '47761';
        break;
      }
      case 2: {
        id = '47888';
        break;
      }
      case 3: {
        id = '47889';
        break;
      }
      case 4: {
        id = '47890';
        break;
      }
      case 5: {
        id = '47891';
        break;
      }
      case 6: {
        id = '56141';
        break;
      }
    }
    return `https://imageserver.eveonline.com/Type/${id}_32.png`;
  }

  public pricePerEnter(record: AbyssRecord): number {
    return this.abyssService.getPricePerEnter(record.type, record.level);
  }

  public deleteRecord(record): void {
    this.graphqlService.mutation('deleteAbyss', `id: "${record._id}"`, '{ _id }').subscribe({
      next: () => {
        this.getAbysses();
      }
    });
    // db.collection('abyss').delete(record._id);
  }
}
