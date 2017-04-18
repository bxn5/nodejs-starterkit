module.exports = {
	path: '/logs',

	maxSize: 1024 * 1024 * 10, // 10 MB

	settings: {
	  levels: {
	    dev: 1,
	    info: 1,
	    server: 1,
	    api: 0,
	    error: 0
	  },

	  colors: {
	    dev: 'green',
	    info: 'blue',
	    server: 'yellow',
	    api: 'magenta',
	    error: 'red'
	  }
	},

	styles: {
	  black: [30, 39],
	  red: [31, 39],
	  green: [32, 39],
	  yellow: [33, 39],
	  blue: [34, 39],
	  magenta: [35, 39],
	  cyan: [36, 39],
	  white: [37, 39],
	  gray: [90, 39],
	  grey: [90, 39]
	}
}