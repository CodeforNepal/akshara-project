let superstatic = require('superstatic');
let connect = require('connect');

let PORT = 8080;

let config = {
	public: '/build'
};

let app = connect().use(superstatic(config));

app.listen(PORT, () => {
	console.log('Production server started at ' + PORT);
});
