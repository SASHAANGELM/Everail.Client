import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items/items.service';

enum BrokerFeeEnum {
  Perimeter = 0.01,
  Jita = 0.03797833
}
enum SellTypeEnum {
  Instant = 'Instant',
  Order = 'Order'
}

@Component({
  selector: 'app-trade.page',
  templateUrl: './trade.page.component.html',
  styleUrls: ['./trade.page.component.scss']
})
export class TradePageComponent implements OnInit {

  public buyString: string;
  public sellString: string;

  public buyPrice: number = 0;
  public sellPrice: number = 0;

  public brokerFeePercent: number = BrokerFeeEnum.Perimeter;
  public sellFeePercent: number = 0.028;

  public sellType: SellTypeEnum = SellTypeEnum.Instant;

  public BrokerFeeEnum = BrokerFeeEnum
  public SellTypeEnum = SellTypeEnum

  public get buyBrokerFeePrice(): number {
    return this.buyPrice * this.brokerFeePercent;
  }

  public get buyPriceFinal(): number {
    return this.buyPrice + this.buyBrokerFeePrice;
  }

  public get sellBrokerFeePrice(): number {
    if (this.sellType === SellTypeEnum.Instant) return 0;
    return this.sellPrice * BrokerFeeEnum.Jita;
  }
  public get sellFeePrice() {
    return this.sellPrice * this.sellFeePercent;
  }
  public get sellPriceFinal(): number {
    return this.sellPrice - this.sellBrokerFeePrice  - this.sellFeePrice;
  }
  public get result(): number {
    if (this.buyPriceFinal > 0 && this.sellPriceFinal > 0) {
      return this.sellPriceFinal - this.buyPriceFinal;
    }
    return 0;
  }
  public get resultPercent(): number {
    if (this.buyPriceFinal > 0 && this.sellPriceFinal > 0) {
      return this.result / this.buyPriceFinal;
    }
    return 0;
  }

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnInit(): void {
  }

  public parseBuyTextarea(event: ClipboardEvent): void {
    const string = event.clipboardData.getData('text');
    const parsed = this.itemsService.parseItemsFromTradeTable(string)
    this.buyPrice = parsed.price;
  }

  public parseSellTextarea(event: ClipboardEvent): void {
    const string = event.clipboardData.getData('text');
    const parsed = this.itemsService.parseItemsFromTradeTable(string)
    this.sellPrice = parsed.price;
  }

}
