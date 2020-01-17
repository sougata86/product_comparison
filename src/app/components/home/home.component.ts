import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ElasticsearchService } from '../../services';
import { environment } from '../../../environments/environment';
import * as _ from 'underscore';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalProductCount: number;
  currentPage: number;

  top_3_products: Array<any>;
  all_products: Array<any>;
  all_filtered_products: Array<any>;

  all_brands: Array<any>;
  showing_brands: Array<any>;
  isMoreBrandShow: boolean;

  all_capacity: Array<any>;
  showing_capacity: Array<any>;
  isMoreCapacityShow: boolean;

  all_energyClass: Array<any>;
  showing_energyClass: Array<any>;
  isMoreEnergyClassShow: boolean;

  fliterParam = [];
  fiteredListShow: boolean = false;

  range_slider_minValue: number = 0;
  range_slider_maxValue: number = 800;
  range_slider_options: Options = {
    floor: 0,
    ceil: 800,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  constructor(private es: ElasticsearchService,
    private cd: ChangeDetectorRef,
    @Inject(DOCUMENT) public document: any) {
    this.all_brands = [];
    this.showing_brands = [];
    this.isMoreBrandShow = true;

    this.all_capacity = [];
    this.showing_capacity = [];
    this.isMoreCapacityShow = true;

    this.all_energyClass = [];
    this.showing_energyClass = [];
    this.isMoreEnergyClassShow = true;

    this.totalProductCount = 0;
    this.currentPage = 0;
    this.all_products = [];
    this.top_3_products = [];
    this.all_filtered_products = [];
  }

  ngOnInit() {
    this.getBrands();
    this.getCapacity();
    this.getEnergyClass();

    this.getProducts();
    this.top3ReviewedProducts();
  }


  getProducts() {
    const fetchedIndex = (environment.noOfRecoreds * this.currentPage) + this.currentPage;
    this.es.getAllDocuments(fetchedIndex, this.fliterParam).then((res) => {
      // console.log(res)
      this.totalProductCount = res.hits.total - ((this.currentPage + 1) * environment.noOfRecoreds);
      this.currentPage += 1;

      if (res.hits.total > 0) {
        res.hits.hits.map(item => {
          const retailers = item._source.retailers.filter(retailer => retailer.Price !== null);
          const minPrice = Math.min(...retailers.map(({ Price }) => Price));
          item.minPrice = _.isNaN(minPrice) ? 0.00 : _.isFinite(minPrice) ? minPrice : 0.00;

          // const avgRating = Number((retailers.reduce((total, next) => total + next.Rating, 0) / retailers.length).toFixed(1));
          // item.avgRating = _.isNaN(avgRating) ? 0 : avgRating;
        });
      } else {
        res.hits.hits = [];
      }

      if (this.all_products.length > 0) {
        // this part for load more
        this.all_products = this.all_products.concat(res.hits.hits);
      } else {
        // this part for default page load
        this.all_products = res.hits.hits;
      }

    }, error => {
      console.error('Server is down', error);
    }).then(() => {
      this.cd.detectChanges();
    });
  }


  getFilteredProducts() {
    const fetchedIndex = (environment.noOfRecoreds * this.currentPage) + this.currentPage;
    this.es.getAllDocuments(fetchedIndex, this.fliterParam).then((res) => {
      // console.log(res)
      this.totalProductCount = res.hits.total - ((this.currentPage + 1) * environment.noOfRecoreds);
      this.currentPage += 1;

      if (res.hits.total > 0) {
        res.hits.hits.map(item => {
          const retailers = item._source.retailers.filter(retailer => retailer.Price !== null);
          const minPrice = Math.min(...retailers.map(({ Price }) => Price));
          item.minPrice = _.isNaN(minPrice) ? 0.00 : _.isFinite(minPrice) ? minPrice : 0.00;

          const avgRating = Number((retailers.reduce((total, next) => total + next.Rating, 0) / retailers.length).toFixed(1));
          item.avgRating = _.isNaN(avgRating) ? 0 : avgRating;
        });
      } else {
        res.hits.hits = [];
      }

      if (this.all_filtered_products.length > 0) {
        // this part for load more
        this.all_filtered_products = this.all_filtered_products.concat(res.hits.hits);
      } else {
        // this part for default page load
        this.all_filtered_products = res.hits.hits;
      }

    }, error => {
      console.error('Server is down', error);
    }).then(() => {
      this.cd.detectChanges();
    });
  }

  top3ReviewedProducts() {
    this.es.top3Reviewedproducts().then((res) => {
      this.top_3_products = res.hits.hits;
      this.top_3_products.map(item => {
        const retailers = item._source.retailers.filter(retailer => retailer.Price !== null)
        item.minPrice = Math.min(...retailers.map(({ Price }) => Price));
        item.avgRating = Number((retailers.reduce((total, next) => total + next.Rating, 0) / retailers.length).toFixed(1));
      });
    }, error => {
      console.error('Server is down', error);
    }).then(() => {
      this.cd.detectChanges();
    });
  }

  // Brand Filter Section Start

  getBrands() {
    this.es.getUniqueBrands().then((res) => {
      this.all_brands = res.aggregations.distinct_brands.buckets;
      this.showing_brands = this.all_brands.slice(0, 3);
    }, error => {
      console.error('Server is down', error);
    }).then(() => {
      this.cd.detectChanges();
    });
  }

  moreBrands() {
    this.showing_brands = this.all_brands;
    this.isMoreBrandShow = false;
  }

  lessBrands() {
    this.showing_brands = this.all_brands.slice(0, 3);
    this.isMoreBrandShow = true;
  }

  // Brand Filter Section End


  // Capacity Filter Section Start

  getCapacity() {
    this.es.getUniqueCapacity().then((res) => {
      this.all_capacity = res.aggregations.distinct_capacity.buckets;
      this.showing_capacity = this.all_capacity.slice(0, 3);
    }, error => {
      console.error('Server is down', error);
    }).then(() => {
      this.cd.detectChanges();
    });
  }

  moreCapacity() {
    this.showing_capacity = this.all_capacity;
    this.isMoreCapacityShow = false;
  }

  lessCapacity() {
    this.showing_capacity = this.all_capacity.slice(0, 3);
    this.isMoreCapacityShow = true;
  }

  // Capacity Filter Section End

  // EnergyClass Filter Section Start

  getEnergyClass() {
    this.es.getUniqueEnergyClass().then((res) => {
      this.all_energyClass = res.aggregations.distinct_energyclass.buckets;
      this.showing_energyClass = this.all_energyClass.slice(0, 3);
      // console.log(this.all_energyClass)
    }, error => {
      console.error('Server is down', error);
    }).then(() => {
      this.cd.detectChanges();
    });
  }

  moreEnergyClass() {
    this.showing_energyClass = this.all_energyClass;
    this.isMoreEnergyClassShow = false;
  }

  lessEnergyClass() {
    this.showing_energyClass = this.all_energyClass.slice(0, 3);
    this.isMoreEnergyClassShow = true;
  }

  // EnergyClass Filter Section End

  filter(ev, filterType) {
    // console.log(ev.target.value)
    this.totalProductCount = 0;
    this.currentPage = 0;
    this.all_filtered_products = [];
    const index = this.fliterParam.findIndex(item =>
      _.has(item, 'match') && item.match[filterType + '.keyword'] == ev.target.value
    );
    if (index > -1) {
      this.fliterParam.splice(index, 1);
    }
    if (ev.target.checked) {
      this.fliterParam.push({
        match: {
          [filterType + '.keyword']: ev.target.value
        }
      });
    }

    if (this.fliterParam.length > 0) {
      this.fiteredListShow = true;
    } else {
      this.fiteredListShow = false;
    }
    // console.log(this.fliterParam);
    this.getFilteredProducts();
  }

  onUserChange(ev) {
    this.totalProductCount = 0;
    this.currentPage = 0;
    this.all_filtered_products = [];

    const index = this.fliterParam.findIndex(item => _.has(item, 'range') && item.range);
    if (index > -1) {
      this.fliterParam.splice(index, 1);
    }
    this.fliterParam.push({
      range: {
        'retailers.Price': {
          gte: ev.value,
          lte: ev.highValue
        }
      }
    });

    if (this.fliterParam.length > 0) {
      this.fiteredListShow = true;
    } else {
      this.fiteredListShow = false;
    }

    // console.log(this.fliterParam);
    this.getFilteredProducts();
  }

}
