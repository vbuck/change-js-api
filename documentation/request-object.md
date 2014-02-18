#Understanding the ChangeOrgApiRequest Object

How the Request is Built
------

```javascript
// ChangeOrgApiRequest.buildRequest
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
```

This method puts all the pieces together to make the request. It adds the necessary client information, timestamp, and signature (if required). It will be called every
time you submit a request to the Change.org API.

How the Request is Sent
------

```javascript
// ChangeOrgApiRequest.send
this.send=function() {
        var connection=this.getConnection();

        connection.setEndpoint(this._data.endpoint);

        this.getConnection().send(this.buildRequest());

        return this;
};
```

When a request is sent, a connection is established. That connection is a `ChangeOrgApiConnection` object (which is really just a wrapper for an `XMLHttpRequest` object). The endpoint specified in the request is set on the connection, and the constructed request body is sent to the opened connection.