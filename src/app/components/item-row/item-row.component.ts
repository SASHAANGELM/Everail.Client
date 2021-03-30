import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../services/items/items.service';

@Component({
  selector: 'app-item-row',
  templateUrl: './item-row.component.html',
  styleUrls: ['./item-row.component.scss']
})
export class ItemRowComponent implements OnInit {
  @Input() item: Item;

  public get hasPrice(): boolean {
    return this.item.price != null && typeof this.item.price === 'number';
  }

  public get sum(): number {
    if (this.hasPrice) {
      return this.item.price * this.item.count;
    }
    return 0;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
