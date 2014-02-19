/**
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

};