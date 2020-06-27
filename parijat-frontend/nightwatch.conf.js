module.exports = {
	src_folders: ['test/acceptance'],
	page_objects_path: './test/acceptance/pageObjects',
	webdriver : {
		start_process: true,
		server_path: "node_modules/.bin/chromedriver",
		port: 9515
	},
	test_settings: {
		default: {
			launch_url: 'http://0.0.0.0:8080',
			globals: {},
			desiredCapabilities: {
				browserName: 'chrome',
				javascriptEnabled: true,
				chromeOptions: {
					args: ['disable-gpu'],
					w3c: false
				}
			}
		}
	}
}
