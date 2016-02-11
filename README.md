# minimal angular like $http service
angular style $http service but whitout all the dependencies from the original angular $http module
- smaller code
- reduced to core functionality
- only requires Promises polyfill for IE8+ (or FF43, Safari8)
- for those who like promises style ajaxrequests

See https://docs.angularjs.org/api/ng/service/$http for basic usage

TODO add shortcut methods
TODO optimize for using $http in unittests