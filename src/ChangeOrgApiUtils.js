/**
 * ChangeOrgApiUtils
 *
 * Common utilities.
 * 
 * @package ChangeOrgApi
 * @author 	Rick Buczynski <richard.buczynski@gmail.com>
 */

var ChangeOrgApiUtils={

	debugMode: false,
	lastTimestamp: 0,
	proxy: '',

	/**
	 * Append query parameters to the given URL.
	 * 
	 * @param string url
	 * @param mixed params
	 * @return string
	 */
	addParams: function(url,params) {
		if(typeof url=='string') {
			var body=[], parts=url.split('?');

			if(typeof params=='string')
				params=this.expandRequest(params);

			if(parts.length>1)
				params=this.extend(this.expandRequest(parts.pop()),params || {});

			for(var key in params)
				body.push(key+'='+encodeURIComponent(params[key]));

			return url.split('?').shift()+'?'+body.join('&');
		}
	},

	/**
	 * Bind values to the given input.
	 * 
	 * @param string input
	 * @param mixed data
	 * @return string
	 */
	bind: function(input,data) {
		if(typeof data=='string')
			data=[data];

		if(typeof input=='string' && typeof data=='object') {
			for(var key in data) {
				if(data instanceof Array)
					input=input.replace(new RegExp(':[a-zA-Z0-9_]+'),data[key]);
				else
					input=input.replace(new RegExp(':'+key,'g'),data[key]);
			}
		}

		return input;
	},

	/**
	 * Expand a request body into an object.
	 * 
	 * @param string data
	 * @param object targetForm
	 * @return object
	 */
	expandRequest: function(data,targetForm) {
		var parts=data.split('&'), pair, data={};

		for(var i=0;i<parts.length;i++) {
			if(!parts[0])
				continue;

			pair=parts[i].split('=');
			data[pair[0]]=decodeURIComponent(pair[1]);

			if(targetForm) {
				var element=document.createElement('input');
				element.type='hidden';
				element.name=pair[0];
				element.value=data[pair[0]];

				targetForm.appendChild(element);
			}
		}

		return data;
	},

	/**
	 * Merge multiple 1-dimensional objects.
	 * 
	 * @return object
	 */
	extend: function() {
		var objects=arguments, object={};

		for(var i=0;i<objects.length;i++) {
			if(objects[i]) {
				for(var property in objects[i])
			  		object[property]=objects[i][property];
			}
		}

		return object;
	},

	/**
	 * Generate a unique key.
	 * 
	 * @param string prefix
	 * @param string suffix
	 * @return string
	 */
	getKey: function(prefix,suffix) {
		if(!prefix)
			prefix='';

		if(!suffix)
			suffix='';

		var min=(this.lastTimestamp?this.lastTimestamp:(new Date()).getTime()),
			max=this.lastTimestamp=(new Date()).getTime()+1;

		return prefix+(Math.floor(Math.random()*(max-min+1))+min).toString()+suffix;
	},

	/**
	 * Generic use lambda.
	 * 
	 * @return void
	 */
	lamda: function() { },

};