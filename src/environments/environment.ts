// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   elasticSearchUrl: "http://111.93.162.238:9200/",
//   searchIndex: "test-comparison4",
//   searchType: "test-comparison4",
//   noOfRecoreds: 9
// };

export const environment = {
  production: true,
  elasticSearchUrl: 'http://111.93.162.238:9200/',
  searchIndex: 'new-test-comparison',
  searchType: 'new-test-comparison',
  noOfRecoreds: 9
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
