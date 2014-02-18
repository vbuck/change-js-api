/**
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
	this.addSignature=function(clear) {
		try {
			if(typeof this._data.rsig=='undefined' || !this._data.rsig.length) {
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

};