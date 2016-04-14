import Request from 'request-promise';
import Package from '../package.json';

class MovieDB {
	constructor() {
		this.baseURL = 'http://www.omdbapi.com/';
		this.request = {
			uri: this.baseURL,
			json: true,
			resolveWithFullResponse: true
		};

		this.VERSION = Package.version;
	}

	search(query, options, callback) {

		// Marge options with query and any other parameters.
		const parameters = Object.assign(options, {
			s: query,
			r: 'json',
			page: options.page || 1
		});

		// Merge all keys to give request-promise an actual request.
		const request = Object.assign(this.request, { qs: parameters });

		let error,
			response,
			pagination = [];

		// Promise callback.
		Request(request).then((body) => response = body)
		.then(() => {

			// We only need the response body.
			let res = response.body;

			// Set error message.
			if (res.Error) {
				error = res.Error;
			}

			// Build pagination ID's. Might need to beef this up a bit.
			// Will look in to returning relative URL's.
			if (res.Response === 'True' && res.totalResults > 10) {

				// Calculate total pages based on search limit
				// This is strictly 10 at the time of writing.
				res.totalPages = Math.ceil(res.totalResults / 10);

				// Define the current page id.
				res.currentPage = parseInt(options.page) || 1;

				// If the optional page parameter is defined,
				// we can determine the previous and next pages.
				if (options.page) {
					if (options.page > 1) {
						pagination.push({ next: { id: (parseInt(options.page) + 1) } });
						pagination.push({ previous: { id: (parseInt(options.page) - 1) } });
					} else {
						pagination.push({ next: { id: (parseInt(options.page) + 1) } });
						if (pagination.previous) delete pagination.previous;
					}
				}

				// Create individual page ID's.
				pagination.pages = [];

				for (let i = 0; i < res.totalPages; i++) {
					pagination.pages.push({ id: (i + 1) });
				}
			}

			// Create custom object.
			const ResponseBody = {
				body: res.Search,
				pagination: pagination,
				totalResults: parseInt(res.totalResults)
			};

			// Callback.
			if (typeof callback === 'function') {
				return callback(error, ResponseBody);
			}
		});
	}

	get(id, options, callback) {
		const parameters = Object.assign(options, {
			i: id,
			r: 'json',
			plot: 'full'
		});

		const request = Object.assign(this.request, { qs: parameters });

		let error,
			response;

		Request(request).then((body) => response = body).catch((err) => error = err)
		.then(() => {
			if (typeof callback === 'function') {
				return callback(error, response.body);
			}
		});
	}
}

export default new MovieDB();
