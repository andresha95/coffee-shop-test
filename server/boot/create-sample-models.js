// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var async = require('async');

module.exports = function(app) {
  // data sources
  var mongoDs = app.dataSources.mongoDs;
  var mysqlDs = app.dataSources.mysqlDs;

  // create all models
  async.parallel({
    reviewers: async.apply(createReviewers),
    coffeeShops: async.apply(createCoffeeShops)
  }, function(err, results) {
    if (err) throw err;

    createReviews(results.reviewers, results.coffeeShops, function(err) {
      if (err) throw err;
      console.log('> models created successfully');
    });
  });

  // create reviewers
  function createReviewers(cb) {
    mongoDs.automigrate('Reviewer', function(err) {
      if (err) return cb(err);

      app.models.Reviewer.create([
        {email: 'foo@bar.com', password: 'foobar', avatar: 'http://cs622429.vk.me/v622429899/d138/RxN6ixpIyZQ.jpg'},
        {email: 'john@doe.com', password: 'johndoe'},
        {email: 'jane@doe.com', password: 'janedoe'}
      ], cb);
    });
  }

  // create coffee shops
  function createCoffeeShops(cb) {
    mysqlDs.automigrate('CoffeeShop', function(err) {
      if (err) return cb(err);

      app.models.CoffeeShop.create([
        {name: 'Coffee Chocolate', city: 'Saint Petersburg', logo: 'http://s45.radikal.ru/i107/1608/07/fa7e94d2d19c.png'},
        {name: 'Coffee House', city: 'Gomel', logo: 'http://s020.radikal.ru/i709/1608/fe/b9ad41e8cc1e.png'},
        {name: 'Coffee Mania', city: 'Minsk', logo: 'http://s019.radikal.ru/i629/1608/f9/87e2114defdc.png'},
        {name: 'Donna Clara', city: 'Polotsk', logo: 'http://s018.radikal.ru/i504/1608/c6/25500abeedad.png'},
        {name: 'Mom Coffee', city: 'Kiev', logo: 'http://s020.radikal.ru/i720/1608/ca/59d63b9c2f38.png'},
        {name: 'COFFEE.RU', city: 'Moscow', logo: 'http://s001.radikal.ru/i193/1608/ab/8bfc6dfe61bd.png'}
      ], cb);
    });
  }

  // create reviews
  function createReviews(reviewers, coffeeShops, cb) {
    mongoDs.automigrate('Review', function(err) {
      if (err) return cb(err);

      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

      app.models.Review.create([
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 2),
          rating: 5,
          comments: 'Delicious coffee.',
          publisherId: reviewers[2].id,
          coffeeShopId: coffeeShops[3].id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS),
          rating: 5,
          comments: 'Affordable prices.',
          publisherId: reviewers[1].id,
          coffeeShopId: coffeeShops[4].id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 3),
          rating: 3,
          comments: 'Regular coffee shop.',
          publisherId: reviewers[0].id,
          coffeeShopId: coffeeShops[5].id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 4),
          rating: 5,
          comments: 'Very good coffee!',
          publisherId: reviewers[0].id,
          coffeeShopId: coffeeShops[0].id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 3),
          rating: 5,
          comments: 'Quite pleasant.',
          publisherId: reviewers[1].id,
          coffeeShopId: coffeeShops[0].id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 2),
          rating: 4,
          comments: 'It was ok.',
          publisherId: reviewers[1].id,
          coffeeShopId: coffeeShops[1].id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS),
          rating: 4,
          comments: 'I go here everyday.',
          publisherId: reviewers[2].id,
          coffeeShopId: coffeeShops[2].id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS),
          rating: 3,
          comments: 'So so.',
          publisherId: reviewers[0].id,
          coffeeShopId: coffeeShops[4].id
        }
      ], cb);
    });
  }
};
