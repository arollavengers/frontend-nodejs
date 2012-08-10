var vows = require('vows'),
  assert = require('assert');

var dispatcher = require('../lib/frontend/dispatcher');

vows.describe('dispatcher').addBatch({
    'A new dispatcher': {
        topic: function () {
            return dispatcher.create({
                forward_url: "http://localhost:8083/rest",
                statics_dir : "~/Projects/arollavengers/front-backbone"
            });
        },

        'should return an instance of Dispatcher' : function(d) {
            assert.instanceOf (d, dispatcher.Dispatcher);
        },

        'should have the specified url': function (d) {
            assert.equal (d.forward_url, 'http://localhost:8083/rest');
        },
        'should have the specified statics directory': function (d) {
            assert.equal (d.statics_dir, '~/Projects/arollavengers/front-backbone');
        }
    }
}).export(module); // Export the Suite