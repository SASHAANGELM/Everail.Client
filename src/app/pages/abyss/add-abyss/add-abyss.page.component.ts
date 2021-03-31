import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AbyssTypeEnum } from '../../../common/enums';
import { Item, ItemsService } from '../../../services/items/items.service';

import { AbyssService } from 'src/app/services/abyss/abyss.service';
import { GraphqlService } from 'src/app/services/graphql/graphql.service';

@Component({
  selector: 'app-add-abyss.page',
  templateUrl: './add-abyss.page.component.html',
  styleUrls: ['./add-abyss.page.component.scss']
})
export class AddAbyssPageComponent implements OnInit {

  public abyssTypeEnum = AbyssTypeEnum;
  public type: AbyssTypeEnum = AbyssTypeEnum.Exotic;
  public level = 0;
  public loot = {
    first: 1,
    second: 1,
    third: 1
  };


  public itemsBeforeString = '';
  public itemsBefore: Item[] = [];

  public itemsString = '';
  public items: Item[] = [];

  public spend: Item[] = [];
  public earn: Item[] = [];

  public get pricePerEnter(): number {
    return this.abyssService.getPricePerEnter(this.type, this.level);
  }

  public get sum(): number {
    return this.items.reduce((accumulator, currentValue) => accumulator += (currentValue.count * currentValue.price), 0);
  }

  public get spendSum(): number {
    return this.spend.reduce((accumulator, currentValue) => accumulator += (currentValue.count * currentValue.price), 0);
  }
  public get earnSum(): number {
    return this.earn.reduce((accumulator, currentValue) => accumulator += (currentValue.count * currentValue.price), 0);
  }

  public get result(): number {
    return this.earnSum - this.spendSum;
  }

  constructor(
    private router: Router,
    private graphqlService: GraphqlService,
    private itemsService: ItemsService,
    private abyssService: AbyssService
  ) { }

  ngOnInit(): void {
    // db.collection('abyss').get({ source: SourceEnum.LOCAL }).then((records) => {
    //   const { type, level } = records[records.length - 1]
    //   this.type = type;
    //   this.level = level;
    // })
  }

  public parseBeforeTextarea(event) {
    const string = event.clipboardData.getData('text');
    this.itemsBefore = this.itemsService.parseItemsFromString(string);
    this.calculateDifferense();
  }
  public parseTextarea(event) {
    const string = event.clipboardData.getData('text');
    this.items = this.itemsService.parseItemsFromString(string);
    this.calculateDifferense();
  }

  public calculateDifferense() {
    this.spend = [];
    this.earn = [];
    if (this.itemsBefore.length > 0 && this.items.length > 0) {

      // Iterate Items Before
      this.itemsBefore.forEach(itemBefore => {
        const item = this.items.find(item => item.id === itemBefore.id);
        if (item != null) {
          if (itemBefore.count > item.count) {
            this.spend.push({
              ...itemBefore,
              count: itemBefore.count - item.count
            });
          } else if (itemBefore.count < item.count) {
            this.earn.push({
              ...itemBefore,
              count: item.count - itemBefore.count
            });
          }
        } else {
          this.spend.push({
            ...itemBefore
          });
        }
      });

      // Iterate Items After
      this.items.forEach(item => {
        const itemBefore = this.itemsBefore.find(itemBefore => itemBefore.id === item.id);
        if (itemBefore == null) {
          this.earn.push({
            ...item
          });
        }
      });

      this.itemsService.getPricesByItems([...this.spend, ...this.earn]).subscribe({
        next: (response) => {
          response.forEach(item => {
            const id = item.buy.forQuery.types[0];
            const spendItem = this.spend.find(item => item.id === id);
            if (spendItem != null) {
              spendItem.price = item.sell.min;
            } else {
              const earnItem = this.earn.find(item => item.id === id);
              if (earnItem != null) {
                earnItem.price = item.buy.max;
              }
            }
          });
        }
      });
    }
  }

  public clearBefore() {
    this.itemsBefore = [];
    this.calculateDifferense();
  }
  public clear() {
    this.items = [];
    this.calculateDifferense();
  }

  public addAbyss() {
    

    const earn = this.earn.map(item => {
      return `{ id: ${item.id}, name: "${item.name}", count: ${item.count} }`;
    });
    const spend = this.spend.map(item => {
      return `{ id: ${item.id}, name: "${item.name}", count: ${item.count} }`;
    });

    const earnString = earn.join(', ');
    const spendString = spend.join(', ');

    console.log('earnString', earnString)
    console.log('spendString', spendString)

    this.graphqlService.mutation(
      'createAbyss', 
      `input: {
        type: "${ this.type }"
        level: ${ this.level }
        time: ${ Date.now() }
        loot: { first: ${ this.loot.first }, second: ${ this.loot.second }, third: ${ this.loot.third } },
        earn: [${ earnString }]
        spend: [${ spendString }]
      }`,
      '{ _id }'
    ).subscribe({
      next: (response) => {
        console.log('createAbyss', response);
        this.router.navigate(['/abyss']);
      }
    });
  }
}
