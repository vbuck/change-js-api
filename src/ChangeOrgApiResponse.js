/**
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

};