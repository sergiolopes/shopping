/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

'use strict';



var PrecacheConfig = [["/css/main.css","bf20abda703a79104518b8234c409a64"],["/icons/MaterialIcons-Regular.ttf","d70c3de3129495c146daaa248c542f2f"],["/icons/material.css","179a08fc87b3151141fcc68754fae82a"],["/img/entrada.jpg","2bf2d074604e06ac787220b65b5790cf"],["/img/icon.png","e3d3b42869afece41e961ffeacd4199b"],["/img/loja/adidas.jpg","f7cb887adaf21cd57ff00ce498c8bd8f"],["/img/loja/bacio-di-latte.jpg","f58ce31f03dd84de5ca9dd486ad6c370"],["/img/loja/brooksfield.jpg","61619d47eee6b3e51b38f33af76e762e"],["/img/loja/burberry.jpg","afb9a3c895ecf33127cd2fdd0717be98"],["/img/loja/cavalera.jpg","4c4d37494b5a75588a3213c93510876e"],["/img/loja/centauro.jpg","562ca5d5f35a46dffcb89ee1464b059f"],["/img/loja/farm.jpg","c33165d4682b2319bdaa50c60bfcecc1"],["/img/loja/forum.jpg","60730e2f90483a836a6682cc7c3b4dd7"],["/img/loja/galetos.jpg","b634ceef8a0a7600488a910c6b52c8d9"],["/img/loja/le-lis-blanc.jpg","ac0c6ad7ab33040dd0839a8f2c13d71e"],["/img/loja/ofner.jpg","b70c63821288421b0aa9bd8cbeeb6c56"],["/img/loja/pizza-hut.jpg","59c268fd55b2143513b9cde0de5b79ce"],["/img/loja/shoulder.jpg","bb3a18e610cda10d35fdf6490d5712b9"],["/img/loja/so-sapatos.jpg","119a35ba7f15743d29b5ec916532381a"],["/img/loja/tip-top.jpg","d66024b4a9b74479500151c66a3e3805"],["/index.html","6245120e16daec28532688b8cf0f3f9f"],["/js/main.js","e4aab9c47cc4cd2bbb4874e9f5dee8d1"],["/js/palestra.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/vendor/jquery.min.js","4a356126b9573eb7bd1e9a7494737410"],["/js/vendor/materialize-0.97.0.min.js","1effe2072986f2cb915e0b31ac19b4b5"],["/loja/adidas.html","c3f15bfac1dd39d28b75a668e99adb16"],["/loja/bacio-di-latte.html","31552b3005d1c0a5833c3ec94fd87d30"],["/loja/brooksfield.html","4e6e20809d8bb6b5161644fea0ab410b"],["/loja/burberry.html","07db8aee99e36ed016b7e862d7513c14"],["/loja/cavalera.html","8e0d36045221c1914013e55017c86479"],["/loja/centauro.html","6f120c2766ad8f34c561334644bbcef8"],["/loja/farm.html","0ffd61ce557c9056df657a9726d9c76c"],["/loja/forum.html","06de787243f28b02423dc8056657eb07"],["/loja/galetos.html","9429ae52f58b9293bff58b6e44af0697"],["/loja/le-lis-blanc.html","404bea31ef6c6bf3634cbb33aef45cd2"],["/loja/ofner.html","91e303f16a4f7f9ffee90b155747487c"],["/loja/pizza-hut.html","916409db46c30cf40bce2e65ffa1b8ec"],["/loja/shoulder.html","1437c0736ec4de6502dccc4051554f54"],["/loja/so-sapatos.html","7fa7d1e36e7daa131d4e595816256bb4"],["/loja/tip-top.html","774929853943f908d85e4a880a28d98e"],["/lojas.html","40d4d71900843657b4b1d1698d91c5ed"],["/pagar.html","3e7d97f4523a13d69a50e507c71eedb3"]];
var CacheNamePrefix = 'sw-precache-v1--' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var populateCurrentCacheNames = function (precacheConfig, cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl, ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  var now = Date.now();

  event.waitUntil(
    caches.keys().then(function(allCacheNames) {
      return Promise.all(
        Object.keys(CurrentCacheNamesToAbsoluteUrl).filter(function(cacheName) {
          return allCacheNames.indexOf(cacheName) == -1;
        }).map(function(cacheName) {
          var url = new URL(CurrentCacheNamesToAbsoluteUrl[cacheName]);
          // Put in a cache-busting parameter to ensure we're caching a fresh response.
          if (url.search) {
            url.search += '&';
          }
          url.search += 'sw-precache=' + now;
          var urlWithCacheBusting = url.toString();

          console.log('Adding URL "%s" to cache named "%s"', urlWithCacheBusting, cacheName);
          return caches.open(cacheName).then(function(cache) {
            var request = new Request(urlWithCacheBusting, {credentials: 'same-origin'});
            return fetch(request.clone()).then(function(response) {
              if (response.status == 200) {
                return cache.put(request, response);
              } else {
                console.error('Request for %s returned a response with status %d, so not attempting to cache it.',
                  urlWithCacheBusting, response.status);
                // Get rid of the empty cache if we can't add a successful response to it.
                return caches.delete(cacheName);
              }
            });
          });
        })
      ).then(function() {
        return Promise.all(
          allCacheNames.filter(function(cacheName) {
            return cacheName.indexOf(CacheNamePrefix) == 0 &&
                   !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            console.log('Deleting out-of-date cache "%s"', cacheName);
            return caches.delete(cacheName);
          })
        )
      });
    }).then(function() {
      if (typeof self.skipWaiting == 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim == 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command == 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method == 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    if (cacheName) {
      event.respondWith(
        // We can't call cache.match(event.request) since the entry in the cache will contain the
        // cache-busting parameter. Instead, rely on the fact that each cache should only have one
        // entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              return response || fetch(event.request).catch(function(e) {
                console.error('Fetch for "%s" failed: %O', urlWithoutIgnoredParameters, e);
              });
            });
          });
        }).catch(function(e) {
          console.error('Couldn\'t serve response for "%s" from cache: %O', urlWithoutIgnoredParameters, e);
          return fetch(event.request);
        })
      );
    }
  }
});

