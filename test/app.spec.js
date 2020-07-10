const app = require('../src/app')

describe('App', () => {
  	it('GET / responds with 200 containing the bookmarks array', () => {
	return supertest(app)
		.get('/bookmarks')
		.expect(200, {})
  	})
	it('POST / responds with 200 containing the POST obj', () => {
		return supertest(app)
			.get('/bookmarks')
			.expect(200, {
				"id": "d1f5d667-e93c-4a2e-98a0-386b50e03642",
				"title": "bookymarkymark",
				"content": "some content"
			})
	})
})

