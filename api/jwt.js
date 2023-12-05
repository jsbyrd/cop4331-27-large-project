const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function ( login, id )
{
	return _createToken( login, id );
}

_createToken = function ( login, id )
{
	try
	{
		const user = {userId:id, login:login};

		// In order to expire with a value other than the default, use the 
		// following
		const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, 
			{ expiresIn: '30m'} );

		var ret = {accessToken: accessToken};
	}
	catch(e)
	{
		var ret = {error: e.message};
	}
	return ret;
}

exports.verify = function( token )
{
	var isError = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET, 
		(err, verifiedJwt) =>
	{
		if( err )
		{
			return true;
		}
		else
		{
			return false;
		}
	});

	return isError;
}

// thanks Kick Buttowski
exports.decode = function ( token )
{
	return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());;
}

exports.refresh = function( token )
{
	var ud = jwt.decode(token,{complete:true});

	var id = ud.payload._id;
	var login = ud.payload.login;

	return _createToken( login, id );
}
