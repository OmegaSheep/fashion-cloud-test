# fashioncloudtest

I used this repo as a starting point as I often do: https://github.com/heroku/node-js-getting-started

- Add an endpoint that returns the cached data for a given key **(_with additional requirements_)**

  - **POST /returnone `{"key": KEY GOES HERE }`**

- Add an endpoint that returns all stored keys in the cache

  - **GET /returnall**

- Add an endpoint that creates/updates the data for a given key

  - **POST /upsert `{"key": KEY GOES HERE, "data": VALUE GOES HERE }`**

- Add an endpoint that removes a given key from the cache

  - **POST /deleteone `{"key": KEY GOES HERE }`**

- Add an endpoint that removes all keys from the cache

  - **GET /deleteall**

**Boot up** `npm start`

**Tests** `npm test` (Notably I was pretty short on time to make these very diligent)

**I defined some constants inside of `/js/utility.js` that specify the TTL, maximum cache count and Mongo URI, rather than commit an environment variable file.**

**How did you solve the maximum item problem?**

You count the amount of items, and if you are not overwriting an existing item, and you have hit the maximum amount, then you delete the oldest item based on time stamp. This could be made much more efficient with better use of Mongooses count() selector but it has some quirks and I'm low on time.

You could also use the Capped Collections feature of Mongo to purge the oldest records when a limit is hit, but I realized after spending some time on it, that this feature does not support item deletion, so then you lose the ability to delete things manually.

**How did you solve the TTL problem?**

Every time you query an item with `/returnall` it compares server time and TTL on the record you select. If the difference is greater than the TTL then it performs a "Cache Miss" as if the item did not exist, and gives it new random data.
