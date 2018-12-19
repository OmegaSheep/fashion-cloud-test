var INDEX = require('./index.js');

// I made these in a hurry. Would rather invest in a real framework like Mocha.
// Notably this also boots up the server.

// ALSO THESE ARE NOT SYNCHRONOUS, SO THIS PRETTY MUCH JUST TESTS THAT THEY DON'T ERROR OUT.
// Meaningful tests need more time.
INDEX.testUpsert();
INDEX.testReturnAll();
INDEX.testDeleteAll();
INDEX.testReturnOne();
INDEX.testDeleteOne();
