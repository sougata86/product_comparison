import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch-browser';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {

  private client: Client;

  constructor() {
    if (!this.client) {
      this._connect();
    }
  }

  private _connect() {
    this.client = new Client({
      host: environment.elasticSearchUrl,
      // log: ['trace', 'debug']
    });
  }

  getAllDocuments(indexFrom, filterParam): any {

    let query: any = {
      'match_all': {}
    }

    if (filterParam.length > 0) {
      query = {
        'bool': {
          'must': filterParam
        }
      }
    }

    // console.log(JSON.stringify(query))

    return this.client.search({
      index: environment.searchIndex,
      type: environment.searchType,
      from: indexFrom,
      size: environment.noOfRecoreds,
      // size: 1000,
      body: {
        'sort': [
          { 'CalculatedRating': 'desc' }
        ],
        'query': query
      },
      filterPath: ['hits.total', 'hits.hits._id', 'hits.hits._source']
    });
  }

  getDocumentBySKU(sku) {
    return this.client.search({
      index: environment.searchIndex,
      type: environment.searchType,
      body: {
        'query': {
          'term': {
            'SKU.keyword': {
              'value': sku
            }
          }
        }
      },
      filterPath: ['hits.total', 'hits.hits._id', 'hits.hits._source']
    });
  }


  getDocumentByID(id) {
    return this.client.search({
      index: environment.searchIndex,
      type: environment.searchType,
      body: {
        'query': {
          'match': {
            '_id': id
          }
        }
      },
      filterPath: ['hits.total', 'hits.hits._id', 'hits.hits._source']
    });
  }

  top3Reviewedproducts(): any {
    return this.client.search({
      index: environment.searchIndex,
      type: environment.searchType,
      size: 3,
      body: {
        'sort': [
          { 'OverallReviews': 'desc' }
        ],
        'query': {
          'match_all': {}
        }
      },
      filterPath: ['hits.hits._id', 'hits.hits._source']
    });
  }

  getUniqueBrands(): any {
    return this.client.search({
      index: environment.searchIndex,
      type: environment.searchType,
      body: {
        "aggs": {
          "distinct_brands": {
            "terms": {
              "field": "Brand",
              "size": 1000
            }
          }
        }
      },
      filterPath: ['aggregations']
    });
  }

  getUniqueCapacity(): any {
    return this.client.search({
      index: environment.searchIndex,
      type: environment.searchType,
      body: {
        "aggs": {
          "distinct_capacity": {
            "terms": {
              "field": "Capacity.keyword",
              "size": 1000
            }
          }
        }
      },
      filterPath: ['aggregations']
    });
  }

  getUniqueEnergyClass(): any {
    return this.client.search({
      index: environment.searchIndex,
      type: environment.searchType,
      body: {
        "aggs": {
          "distinct_energyclass": {
            "terms": {
              "field": "EnergyClass.keyword",
              "size": 1000
            }
          }
        }
      },
      filterPath: ['aggregations']
    });
  }

  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'hello Sougata!'
    });
  }
}
