import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ElasticsearchService } from '../../services';
import * as _ from 'underscore';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productDetails: any;
  bestDeal: any;
  otherDeal: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private es: ElasticsearchService,
    private cd: ChangeDetectorRef,
    @Inject(DOCUMENT) public document: any
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.getDetails(param.id);
    });
  }

  getDetails(id) {
    this.es.getDocumentByID(id).then((res) => {
      this.productDetails = res.hits.hits[0];
      // console.log(res.hits.hits[0]);
      this.productDetails._source.retailers = this.productDetails._source.retailers.filter(retailer => retailer.Price !== null);
      this.productDetails._source.retailers = _.sortBy(this.productDetails._source.retailers, (o) => {
        // console.log(o.Name.toLowerCase())
        if (o.Name.toLowerCase() === 'coolblue') {
          o.logo = 'assets/images/coolblue.png';
        } else if (o.Name.toLowerCase() === 'bol.com') {
          o.logo = 'assets/images/bolcom.png';
        } else if (o.Name.toLowerCase() === 'mediamarkt') {
          o.logo = 'assets/images/mediaic.png';
        } else {
          o.logo = 'assets/images/amazon.png';
        }
        return o.Price;
      });

      // this.productDetails.avgRating = Number((this.productDetails._source.retailers.reduce((total, next) => total + next.Rating, 0) / this.productDetails._source.retailers.length).toFixed(1));
      // console.log(this.productDetails)
    }, error => {
      console.error('Server is down', error);
    }).then(() => {
      this.cd.detectChanges();
    });
  }

}
