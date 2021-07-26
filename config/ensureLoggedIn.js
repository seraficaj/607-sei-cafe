module.exports = function (req, res, next) {
	// Status code for 401 is Unauthorized
	if (!req.user) return res.status(401).json('Unauthorized');
    // A okay
	next();
};
