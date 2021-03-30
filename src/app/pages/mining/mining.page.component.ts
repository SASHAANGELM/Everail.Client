import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

interface OreGroup {
  name: string;
  volume: number;
  image: string;
  maxPrice?: number;
  variety: Ore[];
}

interface Ore {
  id: number,
  name: string,
  price: number,
}

@Component({
  selector: 'app-mining',
  templateUrl: './mining.page.component.html',
  styleUrls: ['./mining.page.component.scss']
})
export class MiningPageComponent implements OnInit {

  minersCount: number = 2;
  orePerSecond: number = 2.9;
  size: number = 5000;

  public oreGroups: OreGroup[] = [
    {
      name: 'Veldspar',
      volume: 0.1,
      image: '1230',
      variety: [
        {
          id: 1230,
          name: 'Veldspar',
          price: 0,
        },
        {
          id: 17470,
          name: 'Concentrated Veldspar',
          price: 0,
        },
        {
          id: 17471,
          name: 'Dense Veldspar',
          price: 0,
        },
      ]
    },
    {
      name: 'Scordit',
      volume: 0.15,
      image: '1228',
      variety: [
        {
          id: 1228,
          name: 'Scordit',
          price: 0,
        },
        {
          id: 17463,
          name: 'Condensed Scordite',
          price: 0,
        },
        {
          id: 17464,
          name: 'Massive Scordite',
          price: 0,
        },
      ]
    },
    {
      name: 'Pyroxeres',
      volume: 0.3,
      image: '1224',
      variety: [
        {
          id: 1224,
          name: 'Pyroxeres',
          price: 0,
        },
        {
          id: 17459,
          name: 'Solid Pyroxeres',
          price: 0,
        },
        {
          id: 17460,
          name: 'Viscous Pyroxeres',
          price: 0,
        },
      ]
    },
    {
      name: 'Plagioclase',
      volume: 0.35,
      image: '18',
      variety: [
        {
          id: 18,
          name: 'Plagioclase',
          price: 0,
        },
        {
          id: 17455,
          name: 'Azure Plagioclase',
          price: 0,
        },
        {
          id: 17456,
          name: 'Rich Plagioclase',
          price: 0,
        },
      ]
    },
    {
      name: 'Omber',
      volume: 0.6,
      image: '1227',
      variety: [
        {
          id: 1227,
          name: 'Omber',
          price: 0,
        },
        {
          id: 17867,
          name: 'Silvery Omber',
          price: 0,
        },
        {
          id: 17868,
          name: 'Golden Omber',
          price: 0,
        },
      ]
    },
    {
      name: 'Kernite',
      volume: 1.2,
      image: '20',
      variety: [
        {
          id: 20,
          name: 'Kernite',
          price: 0,
        },
        {
          id: 17452,
          name: 'Luminous Kernite',
          price: 0,
        },
        {
          id: 17453,
          name: 'Fiery Kernite',
          price: 0,
        },
      ]
    },
    {
      name: 'Jaspet',
      volume: 2,
      image: '1226',
      variety: [
        {
          id: 1226,
          name: 'Jaspet',
          price: 0,
        },
        {
          id: 17448,
          name: 'Pure Jaspet',
          price: 0,
        },
        {
          id: 17449,
          name: 'Pristine Jaspet',
          price: 0,
        },
      ]
    },
    {
      name: 'Hemorphite',
      volume: 3,
      image: '1231',
      variety: [
        {
          id: 1231,
          name: 'Hemorphite',
          price: 0,
        },
        {
          id: 17444,
          name: 'Vivid Hemorphite',
          price: 0,
        },
        {
          id: 17445,
          name: 'Radiant Hemorphite',
          price: 0,
        },
      ]
    },
    {
      name: 'Hedbergite',
      volume: 3,
      image: '21',
      variety: [
        {
          id: 21,
          name: 'Hedbergite',
          price: 0,
        },
        {
          id: 17440,
          name: 'Vitric Hedbergite',
          price: 0,
        },
        {
          id: 17441,
          name: 'Glazed Hedbergite',
          price: 0,
        },
      ]
    },
    {
      name: 'Gneiss',
      volume: 5,
      image: '1229',
      variety: [
        {
          id: 1229,
          name: 'Gneiss',
          price: 0,
        },
        {
          id: 17865,
          name: 'Iridescent Gneiss',
          price: 0,
        },
        {
          id: 17866,
          name: 'Prismatic Gneiss',
          price: 0,
        },
      ]
    },
    {
      name: 'Ochre',
      volume: 8,
      image: '1232',
      variety: [
        {
          id: 1232,
          name: 'Dark Ochre',
          price: 0,
        },
        {
          id: 17436,
          name: 'Onyx Ochre',
          price: 0,
        },
        {
          id: 17437,
          name: 'Obsidian Ochre',
          price: 0,
        },
      ]
    },
    {
      name: 'Spodumain',
      volume: 16,
      image: '19',
      variety: [
        {
          id: 19,
          name: 'Spodumain',
          price: 0,
        },
        {
          id: 17466,
          name: 'Bright Spodumain',
          price: 0,
        },
        {
          id: 17467,
          name: 'Gleaming Spodumain',
          price: 0,
        },
      ]
    },
    {
      name: 'Crokite',
      volume: 16,
      image: '1225',
      variety: [
        {
          id: 1225,
          name: 'Crokite',
          price: 0,
        },
        {
          id: 17432,
          name: 'Sharp Crokite',
          price: 0,
        },
        {
          id: 17433,
          name: 'Crystalline Crokite',
          price: 0,
        },
      ]
    },
    {
      name: 'Bistot',
      volume: 16,
      image: '1223',
      variety: [
        {
          id: 1223,
          name: 'Bistot',
          price: 0,
        },
        {
          id: 17428,
          name: 'Triclinic Bistot',
          price: 0,
        },
        {
          id: 17429,
          name: 'Monoclinic Bistot',
          price: 0,
        },
      ]
    },
    {
      name: 'Arkonor',
      volume: 16,
      image: '22',
      variety: [
        {
          id: 22,
          name: 'Arkonor',
          price: 0,
        },
        {
          id: 17425,
          name: 'Crimson Arkonor',
          price: 0,
        },
        {
          id: 17426,
          name: 'Prime Arkonor',
          price: 0,
        },
      ]
    },
    {
      name: 'Mercoxit',
      volume: 40,
      image: '11396',
      variety: [
        {
          id: 11396,
          name: 'Mercoxit',
          price: 0,
        },
        {
          id: 17869,
          name: 'Magma Mercoxit',
          price: 0,
        },
        {
          id: 17870,
          name: 'Vitreous Mercoxit',
          price: 0,
        }
      ]
    },
  ]

  // ore = [
  //   {
  //     id: 1230,
  //     name: 'Veldspar',
  //     volume: 0.1,
  //     price: 0,
  //   },
  //   {
  //     id: 17470,
  //     name: 'Concentrated Veldspar',
  //     volume: 0.1,
  //     price: 0,
  //   },
  //   {
  //     id: 17471,
  //     name: 'Dense Veldspar',
  //     volume: 0.1,
  //     price: 0,
  //   },
  //   {
  //     id: 1228,
  //     name: 'Scordit',
  //     volume: 0.15,
  //     price: 0,
  //   },
  //   {
  //     id: 17463,
  //     name: 'Condensed Scordite',
  //     volume: 0.15,
  //     price: 0,
  //   },
  //   {
  //     id: 17464,
  //     name: 'Massive Scordite',
  //     volume: 0.15,
  //     price: 0,
  //   },
  //   {
  //     id: 1224,
  //     name: 'Pyroxeres',
  //     volume: 0.3,
  //     price: 0,
  //   },
  //   {
  //     id: 17459,
  //     name: 'Solid Pyroxeres',
  //     volume: 0.3,
  //     price: 0,
  //   },
  //   {
  //     id: 17460,
  //     name: 'Viscous Pyroxeres',
  //     volume: 0.3,
  //     price: 0,
  //   },
  //   {
  //     id: 18,
  //     name: 'Plagioclase',
  //     volume: 0.35,
  //     price: 0,
  //   },
  //   {
  //     id: 17455,
  //     name: 'Azure Plagioclase',
  //     volume: 0.35,
  //     price: 0,
  //   },
  //   {
  //     id: 17456,
  //     name: 'Rich Plagioclase',
  //     volume: 0.35,
  //     price: 0,
  //   },
  //   {
  //     id: 1227,
  //     name: 'Omber',
  //     volume: 0.6,
  //     price: 0,
  //   },
  //   {
  //     id: 17867,
  //     name: 'Silvery Omber',
  //     volume: 0.6,
  //     price: 0,
  //   },
  //   {
  //     id: 17868,
  //     name: 'Golden Omber',
  //     volume: 0.6,
  //     price: 0,
  //   },
  //   {
  //     id: 20,
  //     name: 'Kernite',
  //     volume: 1.2,
  //     price: 0,
  //   },
  //   {
  //     id: 17452,
  //     name: 'Luminous Kernite',
  //     volume: 1.2,
  //     price: 0,
  //   },
  //   {
  //     id: 17453,
  //     name: 'Fiery Kernite',
  //     volume: 1.2,
  //     price: 0,
  //   },
  //   {
  //     id: 1226,
  //     name: 'Jaspet',
  //     volume: 2,
  //     price: 0,
  //   },
  //   {
  //     id: 17448,
  //     name: 'Pure Jaspet',
  //     volume: 2,
  //     price: 0,
  //   },
  //   {
  //     id: 17449,
  //     name: 'Pristine Jaspet',
  //     volume: 2,
  //     price: 0,
  //   },
  //   {
  //     id: 1231,
  //     name: 'Hemorphite',
  //     volume: 3,
  //     price: 0,
  //   },
  //   {
  //     id: 17444,
  //     name: 'Vivid Hemorphite',
  //     volume: 3,
  //     price: 0,
  //   },
  //   {
  //     id: 17445,
  //     name: 'Radiant Hemorphite',
  //     volume: 3,
  //     price: 0,
  //   },
  //   {
  //     id: 21,
  //     name: 'Hedbergite',
  //     volume: 3,
  //     price: 0,
  //   },
  //   {
  //     id: 17440,
  //     name: 'Vitric Hedbergite',
  //     volume: 3,
  //     price: 0,
  //   },
  //   {
  //     id: 17441,
  //     name: 'Glazed Hedbergite',
  //     volume: 3,
  //     price: 0,
  //   },
  //   {
  //     id: 1229,
  //     name: 'Gneiss',
  //     volume: 5,
  //     price: 0,
  //   },
  //   {
  //     id: 17865,
  //     name: 'Iridescent Gneiss',
  //     volume: 5,
  //     price: 0,
  //   },
  //   {
  //     id: 17866,
  //     name: 'Prismatic Gneiss',
  //     volume: 5,
  //     price: 0,
  //   },
  //   {
  //     id: 1232,
  //     name: 'Dark Ochre',
  //     volume: 8,
  //     price: 0,
  //   },
  //   {
  //     id: 17436,
  //     name: 'Onyx Ochre',
  //     volume: 8,
  //     price: 0,
  //   },
  //   {
  //     id: 17437,
  //     name: 'Obsidian Ochre',
  //     volume: 8,
  //     price: 0,
  //   },
  //   {
  //     id: 19,
  //     name: 'Spodumain',
  //     volume: 16,
  //     price: 0,
  //   },
  //   {
  //     id: 17466,
  //     name: 'Bright Spodumain',
  //     volume: 16,
  //     price: 0,
  //   },
  //   {
  //     id: 17467,
  //     name: 'Gleaming Spodumain',
  //     volume: 16,
  //     price: 0,
  //   },
  //   {
  //     id: 1225,
  //     name: 'Crokite',
  //     volume: 16,
  //     price: 0,
  //   },
  //   {
  //     id: 17432,
  //     name: 'Sharp Crokite',
  //     volume: 16,
  //     price: 0,
  //   },
  //   {
  //     id: 17433,
  //     name: 'Crystalline Crokite',
  //     volume: 16,
  //     price: 0,
  //   },
  //   {
  //     id: 1223,
  //     name: 'Bistot',
  //     volume: 16,
  //     price: 0,
  //   },
  //   {
  //     id: 17428,
  //     name: 'Triclinic Bistot',
  //     volume: 16,
  //     price: 0,
  //   },
  //   {
  //     id: 17429,
  //     name: 'Monoclinic Bistot',
  //     volume: 16,
  //     price: 0,
  //   },
  //   {
  //     id: 22,
  //     name: 'Arkonor',
  //     volume: 16,
  //     price: 0,
  //   },
  //   {
  //     id: 17425,
  //     name: 'Crimson Arkonor',
  //     volume: 16,
  //     price: 0,
  //   },
  //   {
  //     id: 17426,
  //     name: 'Prime Arkonor',
  //     volume: 16,
  //     price: 0,
  //   },
  //   {
  //     id: 11396,
  //     name: 'Mercoxit',
  //     volume: 40,
  //     price: 0,
  //   },
  //   {
  //     id: 17869,
  //     name: 'Magma Mercoxit',
  //     volume: 40,
  //     price: 0,
  //   },
  //   {
  //     id: 17870,
  //     name: 'Vitreous Mercoxit',
  //     volume: 40,
  //     price: 0,
  //   }
  // ];

  public timeToFitFullSize() {
    return this.size / (this.minersCount * this.orePerSecond);
  }

  private get oreTypesString(): string {
    return this.oreGroups.map(ore => {
      return ore.variety.map(ore => ore.id).join(',');
    }).join(',');
  }

  // public get oreArray() {
  //   const arr = this.ore.map(ore => {
  //     return {
  //       ...ore,
  //       pricePerOneSize: this.pricePerOneSize(ore),
  //       pricePerFillSize: this.pricePerFillSize(ore)
  //     }
  //   });
  //   return _.sortBy(arr, 'pricePerFillSize').reverse();
  // }

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getOrePrices();
  }

  private getOrePrices() {
    const url = `https://api.evemarketer.com/ec/marketstat/json?typeid=${this.oreTypesString}&usesystem=30000142`;
    // const url = `https://api.evemarketer.com/ec/marketstat/json?typeid=${this.oreTypesString}&regionlimit=10000033`;
    this.http.get(url).subscribe({
      next: (response: any[]) => {
        response.forEach((item) => {
          const id = item.buy.forQuery.types[0];
          const price = item.buy.max;
          for (let i = 0; i < this.oreGroups.length; i++) {
            const oreGroup = this.oreGroups[i];
            for (let j = 0; j < oreGroup.variety.length; j++) {
              const ore = oreGroup.variety[j];
              if (ore.id === id) {
                ore.price = price;
                const maxPrice = this.pricePerOneSize(oreGroup, ore);
                if (oreGroup.maxPrice == null || maxPrice > oreGroup.maxPrice) {
                  oreGroup.maxPrice = maxPrice;
                }
                break;
              }
            }
          }
        });

        this.oreGroups.forEach(oreGroup => {
          oreGroup.variety = _.sortBy(oreGroup.variety, 'price').reverse();
        });

        this.oreGroups = _.sortBy(this.oreGroups, 'maxPrice').reverse();
        // this.ore = _.sortBy(this.ore, 'price').reverse();
      }
    });
  }

  public pricePerOneSize(oregroup, oreItem) {
    return 1 / oregroup.volume * oreItem.price;
  }

  public pricePerFullSize(oreGroup, ore) {
    return this.pricePerOneSize(oreGroup, ore) * this.size;
  }

}
