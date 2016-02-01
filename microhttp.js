(function(window){
	'use strict';

	$httpProvider = {
		defaults : {
			method			: 'get',
			url 			: '',
			params 			: null,
			data 			: null,
			headers 		: { 'Accept' : 'application/json, text/plain, * / *'},
			cache 			: null,
			timeout 		: null,
			responseType 	: 'json'
		}
	};
	$http = function(options){
		var ops = _.extend({},$httpProvider.defaults);

		switch(ops.headers.method){
			case 'post':
			case 'put':
			case 'patch':
				if(!ops.headers['Content-Type'])
					ops.headers['Content-Type'] = 'application/json';
				break;
		}
		return new Promise(function(resolve,reject){
			var ajax = new XMLHttpRequest();
			//parse params
			var url = ops.url;
			if(ops.params){
				var params = [];
				for (var param in ops.params) {
					params.push(param + '=' + encodeURIComponent( ops.params[param]) );
				};
				url += '?' + params.join('&');
			}

			ajax.open(ops.method, url , true);
			//set headers
			for (var field in ops.headers) {
				ajax.setRequestHeader( field, ops.headers[field] );
			};
			ajax.onreadystatechange = function(){
				if(this.readyState == 4){
					if(this.status == 200){
						if(ops.responseType == 'json')
								resolve(JSON.parse(this.responseText));
						resolve(this.responseText);
					} else{
						reject(this);
					}
				}
			}
			if(ops.headers['Content-Type'] == 'application/json' && typeof(ops.data) == 'string'){
				//parse json
				ops.data = JSON.stringify( ops.data );
			}

			ajax.send(ops.data);
		});
	};
})(window);