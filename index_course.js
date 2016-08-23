var elasticsearch = require('elasticsearch');
var fs = require('fs');
var async = require('async');
var path = require('path');
var _ = require('underscore');
var settings =  require(path.join(__dirname,'conf/indexCourseSettings.json'));

// contents 번호
var contentsNum = "45";

// define index name, typeName
var indexName = "enook"; 
var typeName = "course";

// elasticsearch connect
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'warning'
});

var pages = require(path.join(__dirname,'course_files',contentsNum,'pages.json'));

//bulk function
var eachPageIndex = function(page,cb){
  var filePath = _.values(page)[0].replace(/contents/,"course_files");
  var pathArr = filePath.split("/")
  var fileNm = pathArr[pathArr.length-1] + ".page";
  fs.readFile(path.join(__dirname,filePath,fileNm),'utf8' , function (err, data) {
    var bulkCmds = [];
    
    _.each(JSON.parse(data).contentLayers, function(content){
      var jsonContents = {pageId : content.pageId, paragraph : content.content}
      bulkCmds.push({index: {_index :indexName, _type: typeName}});
      bulkCmds.push(jsonContents);
    });
    client.bulk({body: bulkCmds}, function (error, response) {
      if(error){
        cb(err);
      } 
      cb();
    });
  });
}


async.series([
  // index setting
  function(callback){
    // create index
    client.indices.create({
      index: indexName,
      body: {
        "index": settings.setting
      }
    },function(err){
      if(err){
        callback(err);
      }else{
        // mapping
        client.indices.putMapping({
          index:indexName, type:typeName,
          body:settings.mapping
        },function(){
          if(err){
            callback(err);
          }else{
            callback();
          }
        });
      }
    });
  },
  // index files
  function(callback){
    // get pages path data from page.json
    var pages = require(path.join(__dirname,'course_files',contentsNum,'pages.json'));
    async.eachSeries(pages, eachPageIndex, function(err){
      if(err){
        console.log(err.message);
        callback(err);
      }
      callback();
    });
  }
],
function(err) {
  if(err){
    console.log(err.message) 
  }
  console.log("contents "+contentsNum+" 색인이 완료되었습니다.");
});

