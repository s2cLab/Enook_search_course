var elasticsearch = require('elasticsearch');
var http = require('http');
var _ = require('underscore');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'warning'
});

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.query = function(req, res) {
  client.search({
    index : 'enook',
    size:100,
    body:{"query": {
        "multi_match": {
          "query":  req.query.q,
          "fields": [ "paragraph" ],
          "type":     "most_fields"
        }
      }
    }
  }).then(function (resp) {
    sendJsonResponse(res, 200, resp.hits);
  }, function (err) {
    sendJsonResponse(res, 404, err);
  });
}