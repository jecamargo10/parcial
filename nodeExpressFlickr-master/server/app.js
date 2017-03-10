// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const flickr = require("flickrapi");
const fs = require("fs");

const app = express();
var color= ["red","orange", "yellow", "green", "blue","indigo", "violet" ];


// Assumes that there are two files containing the keys
// $PROJECT_HOME/server/api_key.txt
// $PROJECT_HOME/server/api_secret.txt
function getApiKeys(callback, errorcallback) {
	fs.readFile(path.resolve(__dirname,"./api_key.txt"), "utf-8", (err, api_key) => {
		if (err) {
			errorcallback(err);
			return;
		}
		fs.readFile(path.resolve(__dirname,"./api_secret.txt"), "utf-8",(err, api_secret) => {
			if (err) {
				errorcallback(err);
				return;
			}
			callback(api_key.trim(), api_secret.trim());
		});
	});
}

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Searches Flickr for a specific query
app.get('/flickr/:query', function (req, res) {


	console.log("Flickr call query=" + req.params['query'] );
	getApiKeys((api_key, api_secret) => {
		const Flickr = require("flickrapi"),
		flickrOptions = {
			api_key: api_key.trim(),
			secret: api_secret.trim()
		};
		console.log(api_key);
		console.log(api_secret);
		Flickr.tokenOnly(flickrOptions, function(error, flickr) {
			console.log("tokenOnly");
			if (error) {
				res.send(error);
				return;
			}
			var agregado =0;

			// we can now use "flickr" as our API object,
			// but we can only call public methods and access public data
			function retorno(mypPhotosToLook,callback){
				var something = [];
				for (var i = 0; i < color.length; i++) {
					console.log("Indice i "+i);

					var devolver =  interna(i,function(picReturn){
						return callback(picReturn);
					});
					function interna (i,call){
						flickr.photos.search({
							safe:1,
							sort:"relevance",
							text:(req.params["query"]+ '_' +color[i]),
						}, (err, data) => {
							if (err) res.send(err);

							for (var j = 0; j < 3; j++) {
								agregado=	agregado+1;
								something.push(	data.photos.photo[j])	;
								if (agregado === 21 &&  j +1===3)
								{
									mypPhotosToLook=something;
									return call (mypPhotosToLook);
								}
							}
						});
					}
				}			}
				var picReturn = [];
				var devolver =  retorno({},function(picReturn){
					console.log("Enviando " + picReturn);
					console.log("SOMEthing ");

					res.send(picReturn) ;
				});
				//}
			});

		}, (err) => {
			console.log(err);
			res.send("Error!");
		})
	});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


module.exports = app;
