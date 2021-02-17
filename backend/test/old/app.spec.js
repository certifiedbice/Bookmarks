const app = require('../src/app');
const { assert } = require('chai');

describe('App', () => {
  	it('GET / responds with 200 containing the bookmarks array', () => {
	return supertest(app)
		.get('/bookmarks')
		.set({'Authorization': `bearer ${process.env.API_TOKEN}`})
		.expect(200);
  	});
	it('POST / responds with 200 containing the POST obj', () => {
		return supertest(app)
			.post('/bookmarks')
			.set({'Authorization': `bearer ${process.env.API_TOKEN}`})
			.send({"title":"bookymarkymark","content":"some content"})
			.expect(201)
			.then(res=>{
				assert(typeof res.body.id)==='string',
				assert(typeof res.body.title)==='string',
				assert(typeof res.body.content)==='string'
			});
	});
});

