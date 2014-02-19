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

};/**
 * ChangeOrgApiException
 *
 * Library exception wrapper.
 * 
 * @package ChangeOrgApi
 * @author 	Rick Buczynski <richard.buczynski@gmail.com>
 */

var ChangeOrgApiException=function(message) {

	return {
		name	 	: 'ChangeOrgApiException',
		'message' 	: message,
		toString 	: function() {
			return this.name+': '+this.message;
		}
	};

};/**
 * ChangeOrgApiClient
 *
 * A standardized object for transporting Change.org API developer credentials.
 *
 * @see https://github.com/change/api_docs/blob/master/v1/documentation/authentication.md
 *
 * @package ChangeOrgApi
 * @author 	Rick Buczynski <richard.buczynski@gmail.com>
 */

var ChangeOrgApiClient=function(data) {

	this._data={};

	/**
	 * Get default client properties.
	 * 
	 * @return object
	 */
	this._getDefaults=function() {
		return {
			api_key	: '',
			secret 	: ''
		};
	};

	/**
	 * Get the client API key.
	 * 
	 * @return string
	 */
	this.getApiKey=function() {
		return this._data.api_key;
	};

	/**
	 * Get the client secret.
	 * 
	 * @return string
	 */
	this.getSecret=function() {
		return this._data.secret;
	};

	/**
	 * Set the client API key.
	 * 
	 * @param string apiKey
	 * @return ChangeOrgApiClient
	 */
	this.setApiKey=function(apiKey) {
		this._data[api_key]=apiKey;

		return this;
	};

	/**
	 * Set the client secret.
	 * 
	 * @param string secret
	 * @return ChangeOrgApiClient
	 */
	this.setSecret=function(secret) {
		this._data[secret]=secret;

		return this;
	};

	/**
	 * Initialization
	 ******************/
 	this._data=this._getDefaults();

 	if(typeof data=='object') {
		for(var key in data) {
			this._data[key]=data[key];
		}
	}

};/**
 * ChangeOrgApiPetitionConnection
 *
 * A standardized connection object for interacting with the Change.org API.
 * 
 * @package ChangeOrgApi
 * @author 	Rick Buczynski <richard.buczynski@gmail.com>
 */

var ChangeOrgApiConnection=function(options) {

	this._api='https://api.change.org';
	this._data={};
	/* @var _connection XMLHttpRequest */
	this._connection=null;
	this._params={};
	this._proxy='';

	/**
	 * Get default connection options.
	 * 
	 * @return object
	 */
	this._getDefaults=function() {
		return {
			content_type	: 'application/x-www-form-urlencoded',
			endpoint 		: '',
			method 			: 'GET',
			onSuccess 		: ChangeOrgApiUtils.lambda
		};
	};

	/**
	 * Get the real [full] endpoint as a URL.
	 * 
	 * @param boolean endpointOnly
	 * @return string
	 */
	this._getEndpoint=function(endpointOnly) {
		var params=[];

		for(var key in this._params)
			params.push(key+'='+encodeURIComponent(this._params[key]));

		params=(params.length?'?':'')+params.join('&');

		return (
			(endpointOnly?'':this._api)
			+this._data.endpoint
			+params
		);
	};

	/**
	 * Get the proxy URL for the given request.
	 * 
	 * @param object data
	 * @return string
	 */
	this._getEndpointProxied=function(data) {
		return ChangeOrgApiUtils.addParams(this._proxy,{
			r : this._getEndpoint(),
			p : data,
			m : this._data.method,
		 	c : this._data.content_type,
		 	d : ChangeOrgApiUtils.debugMode?'1':'0'
	 	});
	};

	/**
	 * Create a new connection.
	 * 
	 * @param object data
	 * @return XMLHttpRequest
	 */
	this._getXmlHttpRequest=function(data) {
		var object=new XMLHttpRequest();

		var self=this;
		object.onreadystatechange=function() {
			if(self.getIsDone()) {
				var response=new ChangeOrgApiResponse(self);
				data.onSuccess.call(null,response);
			}
		};

		return object;
	};

	/**
	 * Prepare the connection.
	 * 
	 * @return ChangeOrgApiConnection
	 */
	this._prepareConnection=function() {
		this._connection=this._getXmlHttpRequest(this._data);

		return this;
	};

	/**
	 * Get the underlying connection object.
	 * 
	 * @return XMLHttpRequest
	 */
	this.getConnection=function() {
		return this._connection;
	};

	/**
	 * Get the request content type.
	 * 
	 * @return string
	 */
	this.getContentType=function() {
		return this._data.content_type;
	};

	/**
	 * Get the request endpoint.
	 * 
	 * @param boolean withParams
	 * @return string
	 */
	this.getEndpoint=function(withParams) {
		return (withParams?this._getEndpoint(true):this._data.endpoint);
	};

	/**
	 * Check if the request headers have been received.
	 * 
	 * @return boolean
	 */
	this.getHasReceivedHeaders=function() {
		return (this._connection.readyState===2);
	};

	/**
	 * Check if the request has completed.
	 * 
	 * @return boolean
	 */
	this.getIsDone=function() {
		return (this._connection.readyState===4);
	};

	/**
	 * Check if the request is loading.
	 * 
	 * @return boolean
	 */
	this.getIsLoading=function() {
		return (this._connection.readyState===3);
	};

	/**
	 * Check if the request has been opened.
	 * 
	 * @return boolean
	 */
	this.getIsOpened=function() {
		return (this._connection.readyState===1);
	};

	/**
	 * Check if the request has not been sent.
	 * 
	 * @return boolean
	 */
	this.getIsUnsent=function() {
		return (this._connection.readyState===0);
	};

	/**
	 * Get the request method.
	 * 
	 * @return string
	 */
	this.getMethod=function() {
		return this._data.method;
	};

	/**
	 * Get the request success handler.
	 * 
	 * @return function
	 */
	this.getOnSuccess=function() {
		return this._data.onSuccess;
	};

	/**
	 * Get the request URL parameters.
	 * @return object
	 */
	this.getParams=function() {
		return this._params;
	};

	/**
	 * Get the parsed response.
	 * 
	 * @return object|null
	 */
	this.getResponse=function() {
		var response=null;

		try {
			response=JSON.parse(this._connection.responseText);
		}
		catch(error) {
			response=null;
		}

		return response;
	};

	/**
	 * Get the raw connection ready state.
	 * 
	 * @return number
	 */
	this.getReadyState=function() {
		return this._connection.readyState;
	};

	/**
	 * Get the connection status.
	 * 
	 * @return string
	 */
	this.getStatus=function() {
		return this._connection.status;
	}

	/**
	 * Send the request.
	 * 
	 * @param string data
	 * @return ChangeOrgApiConnection
	 */
	this.send=function(data) {
		if(!this._connection || this.getIsUnsent())
			this._prepareConnection();

		if(!this.getIsOpened()) {
			var endpoint=this._getEndpoint();

			if(this._proxy) {
				endpoint=this._getEndpointProxied(data);
				this._data.method='GET';
			}

			this._connection.open(this._data.method,endpoint,true);
		}

		if(this._connection.setRequestHeader)
			this._connection.setRequestHeader('Content-type',this._data.content_type);
		
		this._connection.send(data);

		return this;
	};

	/**
	 * Set the API URL.
	 * 
	 * @param string url
	 */
	this.setApi=function(url) {
		this._api=url;

		return this;
	}

	/**
	 * Set the request content type.
	 * 
	 * @param string contentType
	 * @return ChangeOrgApiConnection
	 */
	this.setContentType=function(contentType) {
		this._data.content_type=contentType;

		return this;
	};

	/**
	 * Set the request endpoint.
	 * 
	 * @param string endpoint
	 * @param object params
	 * @return ChangeOrgApiConnection
	 */
	this.setEndpoint=function(endpoint,params) {
		this._data.endpoint=endpoint;

		if(typeof params=='object')
			this._params=params;

		return this;
	};

	/**
	 * Set the request method.
	 * 
	 * @param string method
	 * @return ChangeOrgApiConnection
	 */
	this.setMethod=function(method) {
		this._data.method=method.toUpperCase();

		return this;
	};

	/**
	 * Set the request success handler.
	 * 
	 * @param object callback
	 * @return ChangeOrgApiConnection
	 */
	this.setOnSuccess=function(callback) {
		if(typeof callback=='function')
			this._data.onSuccess=callback;

		return this;
	};

	/**
	 * Set the request URL parameters.
	 * 
	 * @param object params
	 * @return ChangeOrgApiConnection
	 */
	this.setParams=function(params) {
		this._params=params;

		return this;
	};

	/**
	 * Initialization
	 ******************/
 	this._data=this._getDefaults();

	if(typeof options=='object') {
		for(var key in options) {
			if(typeof this._data[key]!='undefined')
				this._data[key]=options[key];
		}
	}

	if(ChangeOrgApiUtils.proxy)
		this._proxy=ChangeOrgApiUtils.proxy;

};/**
 * ChangeOrgApiRequest
 *
 * A standardized request object for interacting with the Change.org API.
 * 
 * @package ChangeOrgApi
 * @author 	Rick Buczynski <richard.buczynski@gmail.com>
 */

var ChangeOrgApiRequest=function(client) {

	/* @var _authKey string */
	this._authKey=null;
	/* @var _connection ChangeOrgApiConnection */
	this._connection=null;
	this._data={};
	this._useSignature=true;
	this._useAuthKeyInSignature=true;

	/**
	 * Get default options.
	 * 
	 * @return object
	 */
	this._getDefaults=function() {
		return {
			api_key 	: '',
			endpoint 	: '',
			timestamp 	: ''
		};
	};

	/**
	 * Add client information to the request.
	 *
	 * @return ChangeOrgApiRequest
	 */
	this.addClient=function() {
		this._data.api_key=this._client.getApiKey();

		return this;
	};

	/**
	 * Add bulk data to the request. Overwrites existing data.
	 * 
	 * @param object data
	 */
	this.addData=function(data) {
		if(typeof this._data=='object') {
			for(var key in data) {
				if(key=='auth_key')
					this.setAuthKey(data[key]);
				else
					this._data[key]=data[key];
			}
		}

		return this;
	};

	/**
	 * Sign the request and add the signature as a parameter.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/requests.md#request-signature
	 *
	 * @return ChangeOrgApiRequest
	 */
	this.addSignature=function() {
		try {
			if(!this.getClient().getSecret() && this.getSignatureRequiredFlag()) { // Mark signature with flag to sign server-side
				this._data.server_sign=1;
				this._data.include_auth_key=this.getSignatureAuthKeyRequiredFlag()?1:0;
			}
			else if(typeof this._data.rsig=='undefined' || !this._data.rsig.length) {
				var body=[], signature='';

				for(var key in this._data) {
					if(key!='rsig')
						body.push(key+'='+encodeURIComponent(this._data[key]));
				}

				this._data.rsig=
					CryptoJS.SHA256(
						body.join('&')
						+this.getClient().getSecret()
						+(this._useAuthKeyInSignature===true?this._authKey:'')
					);
			}
		}
		catch(error) { }

		return this;
	};

	/**
	 * Add the timestamp to the request.
	 *
	 * @return ChangeOrgApiRequest
	 */
	this.addTimestamp=function() {
		this._data.timestamp=this.newTimestamp();

		return this;
	};

	/**
	 * Build the request body.
	 * 
	 * @return string
	 */
	this.buildRequest=function() {
		this.addClient();
		this.addTimestamp();

		if(this._useSignature===true)
			this.addSignature();
		else if(typeof this._data.rsig!='undefined')
			delete this._data.rsig;

		var body=[];

		for(var key in this._data)
			body.push(key+'='+encodeURIComponent(this._data[key]));
		
		return body.join('&');
	};

	/**
	 * Get the stored authorization key.
	 * 
	 * @return string|null
	 */
	this.getAuthKey=function() {
		return this._authKey;
	};

	/**
	 * Get the stored client instance.
	 * 
	 * @return ChangeOrgApiClient
	 */
	this.getClient=function() {
		return this._client;
	};

	/**
	 * Get the resource connection.
	 * 
	 * @param object options
	 * @return ChangeOrgApiConnection
	 */
	this.getConnection=function(options) {
		if(!this._connection)
			this._connection=new ChangeOrgApiConnection(options);

		return this._connection;
	};

	/**
	 * Get request data.
	 * 
	 * @param string key
	 * @return mixed
	 */
	this.getData=function(key) {
		if(!key)
			return this._data;

		if(typeof this._data[key]!='undefined')
			return this._data[key];

		return null;
	};

	/**
	 * Get the request endpoint.
	 * 
	 * @return string
	 */
	this.getEndpoint=function() {
		return this._data.endpoint;
	};

	/**
	 * Get the request connection method.
	 * 
	 * @return string
	 */
	this.getMethod=function() {
		return this.getConnection().getMethod();
	};

	/**
	 * Get the authorization key signature flag.
	 * 
	 * @return boolean
	 */
	this.getSignatureAuthKeyRequiredFlag=function() {
		return this._useAuthKeyInSignature;
	};

	/**
	 * Get the signature flag.
	 * 
	 * @return boolean
	 */
	this.getSignatureRequiredFlag=function() {
		return this._useSignature;
	};

	/**
	 * Get the request timestamp.
	 * 
	 * @return string
	 */
	this.getTimestamp=function() {
		return this._data.timestamp;
	};

	/**
	 * Generate a new ISO-8601 timestamp.
	 * 
	 * @return string
	 */
	this.newTimestamp=function() {
		return (new Date()).toISOString().replace(/(\.[0-9]+)/,'');
	};

	/**
	 * Reset the connection object.
	 * 
	 * @return ChangeOrgApiRequest
	 */
	this.resetConnection=function() {
		this._connection=null;

		return this;
	};

	/**
	 * Remove the signature from the request.
	 * 
	 * @return ChangeOrgApiRequest
	 */
	this.removeSignature=function() {
		if(typeof this._data.rsig!='undefined')
			delete this._data.rsig;

		return this;
	};

	/**
	 * Submit the request.
	 * 
	 * @return ChangeOrgApiRequest
	 */
	this.send=function() {
		var connection=this.getConnection();

		connection.setEndpoint(this._data.endpoint);

		if(this._doFollowup===true)
			this._setFollowupCallback();
		
		this.getConnection().send(this.buildRequest());

		return this;
	};

	/**
	 * Set the authorization key.
	 * 
	 * @param string authKey
	 * @return ChangeOrgApiRequest
	 */
	this.setAuthKey=function(authKey) {
		this._authKey=authKey;

		return this;
	};

	/**
	 * Set the client.
	 * 
	 * @param ChangeOrgApiClient client
	 */
	this.setClient=function(client) {
		if(!(client instanceof ChangeOrgApiClient))
			throw new ChangeOrgApiException('Client must be an instance of ChangeOrgApiClient.');

		this._client=client;

		return this;
	};

	/**
	 * Set request data.
	 * 
	 * @param string key
	 * @param mixed value
	 */
	this.setData=function(key,value) {
		this._data[key]=value;

		return this;
	};

	/**
	 * Set the request endpoint.
	 * 
	 * @param string endpoint
	 */
	this.setEndpoint=function(endpoint) {
		this._data.endpoint=endpoint;

		return this;
	};

	/**
	 * Set the request connection method.
	 * 
	 * @param string method
	 * @return ChangeOrgApiRequest
	 */
	this.setMethod=function(method) {
		this.getConnection().setMethod(method);

		return this;
	};

	/**
	 * Set the request success handler.
	 * 
	 * @param function handler
	 * @return ChangeOrgApiRequest
	 */
	this.setOnSuccess=function(handler) {
		this.getConnection().setOnSuccess(handler);

		return this;
	};

	/**
	 * Set the authorization key signature flag.
	 * 
	 * @param boolean bool
	 * @return ChangeOrgApiRequest
	 */
	this.setSignatureAuthKeyRequiredFlag=function(bool) {
		this._useAuthKeyInSignature=bool;

		return this;
	};

	/**
	 * Set the signature flag.
	 * 
	 * @param boolean bool
	 * @return ChangeOrgApiRequest
	 */
	this.setSignatureRequiredFlag=function(bool) {
		this._useSignature=bool;

		return this;
	};

	/**
	 * Set the request timestamp.
	 * 
	 * @param string timestamp
	 * @return ChangeOrgApiRequest
	 */
	this.setTimestamp=function(timestamp) {
		this._data.timestamp=timestamp;

		return this;
	};

	/**
	 * Unset request data
	 * @param string key
	 * @return ChangeOrgApiRequest
	 */
	this.unsetData=function(key) {
		if(typeof this._data[key]!='undefined')
			delete this._data[key];

		return this;
	};

	/**
	 * Initialization
	 ******************/
	if(typeof CryptoJS=='undefined')
		throw new ChangeOrgApiException('ChangeOrgApiRequest cannot initialize because the required library CryptoJS was not found.');

	if(client)
		this.setClient(client);

	this._data=this._getDefaults();

};/**
 * ChangeOrgApiResponse
 *
 * A request response wrapper object.
 * 
 * @package ChangeOrgApi
 * @author 	Rick Buczynski <richard.buczynski@gmail.com>
 */

var ChangeOrgApiResponse=function(data) {

	this._data={};

	/**
	 * Get response data.
	 * 
	 * @param string key
	 * @return mixed
	 */
	this.getData=function(key) {
		if(!key)
			return this._data;
		
		if(typeof this._data[key]!='undefined')
			return this._data[key];

		return null;
	};

	/**
	 * Set the response data.
	 * 
	 * @param object data
	 * @return ChangeOrgApiResponse
	 */
	this.setData=function(data) {
		try {
			if(data instanceof ChangeOrgApiConnection)
				this._data=data.getResponse();
			else if(typeof data=='string')
				this._data=JSON.parse(data);
			else if(typeof data=='object')
				this._data=data;
			else
				throw new ChangeOrgApiException('Data format not recognized.');
		}
		catch(error) {
			this._data={};
		}

		return this;
	}

	/**
	 * Initialization
	 ******************/
	this.setData(data);

};/**
 * ChangeOrgApiPetition Interface
 *
 * Provides an interface for petitions on Change.org.
 *
 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions.md
 * 
 * @package ChangeOrgApi
 * @author 	Rick Buczynski <richard.buczynski@gmail.com>
 */

var ChangeOrgApiPetition=function(client) {

	/* @var _authorization ChangeOrgApiAuthorization */
	this._authorization=null;
	/* @var _callback function */
	this._callback=null;
	/* @var _client ChangeOrgApiClient */
	this._client=null;
	this._endpoints=[
		'/v1/petitions/:petition_id/signatures',			// addSignature
		'/v1/petitions/:petition_id/signatures',			// getSignatures
		'/v1/petitions/:petition_id/signatures/recent',		// getRecentSignatures
		'/v1/petitions/:petition_id/targets',				// getTargets
		'/v1/petitions/:petition_id/reasons',				// getReasons
		'/v1/petitions/:petition_id/updates',				// getUpdates
		'/v1/petitions',									// getPetitions
		'/v1/petitions/:petition_id',						// getPetition
		'/v1/petitions/get_id'								// getPetitionId
	];

	/**
	 * Get default request options.
	 *
	 * @todo Future use.
	 * 
	 * @return object
	 */
	this._getDefaults=function() {
		return {};
	};

	/**
	 * Adds a signature to a petition.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/signatures.md#post-signatures
	 * 
	 * @param object data
	 * @param function callback
	 * @return ChangeOrgApiPetition
	 */
	this.addSignature=function(data,callback) {
		if(typeof data.auth_key=='undefined')
			throw new ChangeOrgApiException('An authorization key is required to sign a petition.');

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('POST')
			.addData(data)
			.setEndpoint(this.getEndpoint(0,data))
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();

		return this;
	};

	/**
	 * Get a petition authorization instance.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/auth_keys.md
	 * 
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.getAuthorization=function() {
		if(!this._authorization) {
			this._authorization=new ChangeOrgApiPetitionAuthorization(this._client);
		}

		return this._authorization;
	};

	/**
	 * Get the stored client instance.
	 * 
	 * @return ChangeOrgApiClient
	 */
	this.getClient=function() {
		return this._client;
	};

	/**
	 * Get the prepared endpoint for a requested resource.
	 * 
	 * @param number index
	 * @param mixed data
	 * @return string
	 */
	this.getEndpoint=function(index,data) {
		if(typeof this._endpoints[index]=='undefined')
			return false;

		return ChangeOrgApiUtils.bind(this._endpoints[index],data);
	};

	/**
	 * Returns information about the specified petition.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions.md#get-petitionspetition_id
	 * 
	 * @param number|object data
	 * @param function callback
	 * @return ChangeOrgApiPetition
	 */
	this.get=function(data,callback) {
		if(typeof data=='number' || typeof data=='string')
			data={petition_id:data};

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(7,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();

		return this;
	};

	/**
	 * Returns the unique Change.org ID for the specified petition.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions.md#get-petitionsget_id
	 * 
	 * @param string|object data
	 * @param function callback
	 * @return ChangeOrgApiPetition
	 */
	this.getPetitionId=function(data,callback) {
		if(typeof data=='string')
			data={petition_url:data};

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(8,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();

		return this;
	};

	/**
	 * Returns the array of petition data objects corresponding to the petition IDs submitted.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions.md#get-petitions
	 * 
	 * @param string|object data
	 * @param function callback
	 * @return ChangeOrgApiPetition
	 */
	this.getPetitions=function(data,callback) {
		if(typeof data=='number')
			return this.getPetition(data,callback);

		if(typeof data=='string')
			data={petition_ids:data};

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(6,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();

		return this;
	};

	/**
	 * Returns an array of the 10 most recent signatures on a petition.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/signatures.md#get-signatures-recent
	 * 
	 * @param object data
	 * @param function callback
	 * @return ChangeOrgApiPetition
	 */
	this.getRecentSignatures=function(data,callback) {
		if(typeof data=='number' || typeof data=='string')
			data={petition_id:data};
		
		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(2,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();
	};

	/**
	 * Returns signatures on a petition.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/signatures.md#signatures-on-petitions
	 * 
	 * @param object data
	 * @param function callback
	 * @return ChangeOrgApiPetition
	 */
	this.getSignatures=function(data,callback) {
		if(typeof data=='number' || typeof data=='string')
			data={petition_id:data};
		
		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(1,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();

		return this;
	};

	/**
	 * Returns the reasons given by signers of a petition for having signed.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/reasons.md
	 * 
	 * @param object data
	 * @param function callback
	 * @return ChangeOrgApiPetition
	 */
	this.getReasons=function(data,callback) {
		if(typeof data=='number' || typeof data=='string')
			data={petition_id:data};

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(4,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();

		return this;
	};

	/**
	 * Returns the target(s) of a petition.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/targets.md
	 * 
	 * @param object data
	 * @param function callback
	 * @return ChangeOrgApiPetition
	 */
	this.getTargets=function(data,callback) {
		if(typeof data=='number' || typeof data=='string')
			data={petition_id:data};

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(3,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();

		return this;
	};

	/**
	 * Returns the news updates on a petition.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/updates.md
	 * 
	 * @param object data
	 * @param function callback
	 * @return ChangeOrgApiPetition
	 */
	this.getUpdates=function(data,callback) {
		if(typeof data=='number' || typeof data=='string')
			data={petition_id:data};
		
		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(5,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();
	};

	/**
	 * Set the request callback.
	 * 
	 * @param function callback
	 * @return ChangeOrgApiPetition
	 */
	this.setCallback=function(callback) {
		this._callback=callback;

		return this;
	};

	/**
	 * Set the client.
	 * 
	 * @param ChangeOrgApiClient client
	 * @return ChangeOrgApiUser
	 */
	this.setClient=function(client) {
		if(!(client instanceof ChangeOrgApiClient))
			throw new ChangeOrgApiException('Client must be an instance of ChangeOrgApiClient.');

		this._client=client;

		return this;
	};

	/**
	 * Initialization
	 ******************/
 	if(client)
		this.setClient(client);
};/**
 * ChangeOrgApiPetitionAuthorization Interface
 *
 * Provides an interface for petition authorization on Change.org.
 * 
 * @package ChangeOrgApi
 * @author 	Rick Buczynski <richard.buczynski@gmail.com>
 */

var ChangeOrgApiPetitionAuthorization=function(client) {

	/* @var _authorizationCallback function */
	this._authorizationCallback=ChangeOrgApiUtils.lambda;
	/* @var _client ChangeOrgApiClient */
	this._client=null;
	/* @var _client ChangeOrgApiConnection */
	this._connection=null;
	this._data={};
	this._doFollowup=false;
	this._endpoint='/v1/petitions/:petition_id/auth_keys';
	this._petition_id='';

	/**
	 * Resolve the authorization callback before sending the request.
	 * 
	 * @return function
	 */
	this._getAuthorizationCallback=function() {
		if(this._doFollowup===true)
			return this._getFollowupCallback(this._authorizationCallback);

		return this._authorizationCallback;
	};

	/**
	 * Get default request options.
	 * 
	 * @return object
	 */
	this._getDefaults=function() {
		return {
			callback_endpoint 	: '',
			requester_email 	: '',
			source 				: '',
			source_description 	: ''
		};
	};

	/**
	 * Get the follow-up callback wrapper.
	 * 
	 * @param function originalCallback
	 * @return function
	 */
	this._getFollowupCallback=function(originalCallback) {
		var self=this;

		return function(response) {
			self.setFollowupFlag(false);

			if(response.getData('status')!='granted' || !response.getData('auth_key'))
				self.authorize(originalCallback);
			else
				originalCallback.call(originalCallback,response);
		};
	};

	/**
	 * Sends a request for a petition authorization key on behalf of an individual.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/petitions/auth_keys.md#post-petitionspetition_idauth_keys
	 * 
	 * @param function callback
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.authorize=function(callback) {
		this.setCallback(callback);

		var request=new ChangeOrgApiRequest(this._client);

		request.addData(this._data)
			.setMethod('POST')
			.setEndpoint(ChangeOrgApiUtils.bind(this._endpoint,this._petition_id))
			.setSignatureAuthKeyRequiredFlag(false)
			.setOnSuccess(this._getAuthorizationCallback())
			;

		request.send();

		return this;
	};

	/**
	 * Get the request callback endpoint.
	 * 
	 * @return string
	 */
	this.getCallbackEndpoint=function() {
		return this._data.callback_endpoint;
	};

	/**
	 * Get the stored client instance.
	 * 
	 * @return ChangeOrgApiClient
	 */
	this.getClient=function() {
		return this._client;
	};

	/**
	 * Get the request endpoint.
	 * 
	 * @param object data
	 * @return string
	 */
	this.getEndpoint=function(data) {
		return ChangeOrgApiUtils.bind(this._endpoint,data);
	};

	/**
	 * Get the request follow-up flag.
	 * 
	 * @return boolean
	 */
	this.getFollowupFlag=function() {
		return this._doFollowup;
	}

	/**
	 * Get the requester.
	 * 
	 * @return string
	 */
	this.getRequesterEmail=function() {
		return this._data.requester_email;
	};

	/**
	 * Get the request source.
	 * 
	 * @return string
	 */
	this.getSource=function() {
		return this._data.source;
	};

	/**
	 * Get the request source description.
	 * 
	 * @return string
	 */
	this.getSourceDescription=function() {
		return this._data.source_description;
	};

	/**
	 * Set the request callback.
	 * 
	 * @param function callback
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.setCallback=function(callback) {
		if(typeof callback=='function')
			this._authorizationCallback=callback;

		return this;
	};

	/**
	 * Set the request callback endpoint.
	 * 
	 * @param string endpoint
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.setCallbackEndpoint=function(endpoint) {
		this._data.callback_endpoint=endpoint;

		return this;
	};

	/**
	 * Set the client.
	 * 
	 * @param ChangeOrgApiClient
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.setClient=function(client) {
		if(!(client instanceof ChangeOrgApiClient))
			throw new ChangeOrgApiException('Client must be an instance of ChangeOrgApiClient.');

		this._client=client;

		return this;
	};

	/**
	 * Set the request follow-up flag.
	 *
	 * @param boolean bool
	 * @return ChangeOrgApiRequest
	 */
	this.setFollowupFlag=function(bool) {
		this._doFollowup=bool;

		return this;
	};

	/**
	 * Set the petition ID.
	 * 
	 * @param number id
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.setPetitionId=function(id) {
		this._petition_id=id;
		
		return this;
	};

	/**
	 * Set the requester.
	 * 
	 * @param string email.
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.setRequesterEmail=function(email) {
		this._data.requester_email=email;

		return this;
	};

	/**
	 * Set the request source.
	 * 
	 * @param string source
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.setSource=function(source) {
		this._data.source=source;

		return this;
	};

	/**
	 * Set the request source description.
	 * 
	 * @param string description
	 * @return ChangeOrgApiPetitionAuthorization
	 */
	this.setSourceDescription=function(description) {
		this._data.source_description=description;

		return this;
	};

	/**
	 * Initialization
	 ******************/
 	this._data=this._getDefaults();

 	if(client)
 		this.setClient(client);

};/**
 * ChangeOrgApiOrganization Interface
 *
 * Provides an interface for organizations on Change.org.
 *
 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/organizations.md
 *
 * @package ChangeOrgApi
 * @author 	Rick Buczynski <richard.buczynski@gmail.com>
 */

var ChangeOrgApiOrganization=function(client) {

	/* @var _callback function */
	this._callback=null;
	/* @var _client ChangeOrgApiClient */
	this._client=null;
	this._endpoints=[
		'/v1/organizations/:organization_id',				// get
		'/v1/organizations/:organization_id/petitions',		// getPetitions
		'/v1/organizations/get_id'							// getId
	];

	/**
	 * Get default request options.
	 *
	 * @todo Future use.
	 * 
	 * @return object
	 */
	this._getDefaults=function() {
		return {};
	};

	/**
	 * Get the stored client instance.
	 * 
	 * @return ChangeOrgApiClient
	 */
	this.getClient=function() {
		return this._client;
	};

	/**
	 * Get the prepared endpoint for a requested resource.
	 * 
	 * @param number index
	 * @param mixed data
	 * @return string
	 */
	this.getEndpoint=function(index,data) {
		if(typeof this._endpoints[index]=='undefined')
			return false;

		return ChangeOrgApiUtils.bind(this._endpoints[index],data);
	};

	/**
	 * Returns information about the specified organization.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/organizations.md#get-organizationsorganization_id
	 * 
	 * @param number|object data
	 * @param function callback
	 * @return ChangeOrgApiOrganization
	 */
	this.get=function(data,callback) {
		if(typeof data=='number')
			data={organization_id:data};

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(0,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();

		return this;
	};

	/**
	 * Returns the unique Change.org ID for the specified organization.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/organizations.md#get-organizationsget_id
	 * 
	 * @param string|object data
	 * @param function callback
	 * @return ChangeOrgApiOrganization
	 */
	this.getId=function(data,callback) {
		if(typeof data=='string')
			data={organization_url:data};

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(2,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();

		return this;
	};

	/**
	 * Returns the array of petitions that were created by the specified organization.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/organizations.md#get-organizationsorganization_idpetitions
	 * 
	 * @param number|object data
	 * @param function callback
	 * @return ChangeOrgApiOrganization
	 */
	this.getPetitions=function(data,callback) {
		if(typeof data=='number')
			data={organization_id:data};

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(1,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();
	};

	/**
	 * Set the request callback.
	 * 
	 * @param function callback
	 * @return ChangeOrgApiOrganization
	 */
	this.setCallback=function(callback) {
		this._callback=callback;

		return this;
	};

	/**
	 * Set the client.
	 * 
	 * @param ChangeOrgApiClient client
	 * @return ChangeOrgApiOrganization
	 */
	this.setClient=function(client) {
		if(!(client instanceof ChangeOrgApiClient))
			throw new ChangeOrgApiException('Client must be an instance of ChangeOrgApiClient.');

		this._client=client;

		return this;
	};

	/**
	 * Initialization
	 ******************/
 	if(client)
		this.setClient(client);
};/**
 * ChangeOrgApiUser Interface
 *
 * Provides an interface for users on Change.org.
 *
 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/users.md
 *
 * @package ChangeOrgApi
 * @author 	Rick Buczynski <richard.buczynski@gmail.com>
 */

var ChangeOrgApiUser=function(client) {

	/* @var _callback function */
	this._callback=null;
	/* @var _client ChangeOrgApiClient */
	this._client=null;
	this._endpoints=[
		'/v1/users/:user_id',						// get
		'/v1/users/:user_id/petitions',				// getPetitions
		'/v1/users/:user_id/signatures/petitions',	// getSignedPetitions
		'/v1/users/get_id'							// getId
	];

	/**
	 * Get default request options.
	 *
	 * @todo Future use.
	 * 
	 * @return object
	 */
	this._getDefaults=function() {
		return {};
	};

	/**
	 * Get the stored client instance.
	 * 
	 * @return ChangeOrgApiClient
	 */
	this.getClient=function() {
		return this._client;
	};

	/**
	 * Get the prepared endpoint for a requested resource.
	 * 
	 * @param number index
	 * @param mixed data
	 * @return string
	 */
	this.getEndpoint=function(index,data) {
		if(typeof this._endpoints[index]=='undefined')
			return false;

		return ChangeOrgApiUtils.bind(this._endpoints[index],data);
	};

	/**
	 * Returns information about the specified user.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/users.md#get-usersuser_id
	 * 
	 * @param number|object data
	 * @param function callback
	 * @return ChangeOrgApiUser
	 */
	this.get=function(data,callback) {
		if(typeof data=='number')
			data={user_id:data};

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(0,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();
	};

	/**
	 * Returns the unique Change.org ID for the specified user.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/users.md#get-usersget_id
	 * 
	 * @param string|object data
	 * @param function callback
	 * @return ChangeOrgApiUser
	 */
	this.getId=function(data,callback) {
		if(typeof data=='string')
			data={user_url:data};

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(3,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();
	};

	/**
	 * Returns the array of petitions that were created by the specified user.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/users.md#get-usersuser_idpetitions
	 * 
	 * @param number|object data
	 * @param function callback
	 * @return ChangeOrgApiUser
	 */
	this.getPetitions=function(data,callback) {
		if(typeof data=='number')
			data={user_id:data};

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(1,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();
	};

	/**
	 * Returns the array of petitions that were signed by the specified user.
	 *
	 * @see https://github.com/change/api_docs/blob/master/v1/documentation/resources/users.md#get-usersuser_idsignaturespetitions
	 * 
	 * @param number|object data
	 * @param function callback
	 * @return ChangeOrgApiUser
	 */
	this.getSignedPetitions=function(data,callback) {
		if(typeof data=='number')
			data={user_id:data};

		var request=new ChangeOrgApiRequest(this.getClient())
			.setMethod('GET')
			.addData(data)
			.setEndpoint(this.getEndpoint(2,data))
			.setSignatureRequiredFlag(false)
			;

		if(callback)
			request.setOnSuccess(callback);
		else if(this._callback)
			request.setOnSuccess(this._callback);

		request.send();
	};

	/**
	 * Set the request callback.
	 * 
	 * @param function callback
	 * @return ChangeOrgApiUser
	 */
	this.setCallback=function(callback) {
		this._callback=callback;

		return this;
	};

	/**
	 * Set the client.
	 * 
	 * @param ChangeOrgApiClient client
	 * @return ChangeOrgApiPetition
	 */
	this.setClient=function(client) {
		if(!(client instanceof ChangeOrgApiClient))
			throw new ChangeOrgApiException('Client must be an instance of ChangeOrgApiClient.');

		this._client=client;

		return this;
	};

	/**
	 * Initialization
	 ******************/
 	if(client)
		this.setClient(client);
};