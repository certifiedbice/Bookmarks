const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { makeBookmarksArray, makeMaliciousBookmark } = require('./bookmarks.fixtures')

before('make knex instance', () => {
	
	db = knex({
		client: 'pg',
		connection: process.env.TEST_DB_URL,
	})
	app.set('db', db)

})

after('disconnect from db', () => db.destroy())

before('clean the table', () => db('bookmarks').truncate())

afterEach('cleanup',() => db('bookmarks').truncate())

describe(`GET /api/bookmarks`, () => {
	
	context(`Given no bookmarks`, () => {
		it(`responds with 200 and an empty list`, () => {
			return supertest(app)
			.get('/api/bookmarks')
			.expect(200, [])
		})
	})

	context('Given there are bookmarks in the database', () => {
		const testBookmarks = makeBookmarksArray()

		beforeEach('insert bookmarks', () => {
			return db
			.into('api/bookmarks')
			.insert(testBookmarks)
		})

		it('responds with 200 and all of the bookmarks', () => {
			return supertest(app)
			.get('/api/bookmarks')
			.expect(200, testBookmarks)
		})
	})

	context(`Given an XSS attack bookmark`, () => {
		const maliciousBookmark = {
			id: 911,
			title: 'Naughty naughty very naughty <script>alert("xss");</script>',
			link: 'http://bookmark.com',
			rating: '5',
			content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
		}
		
		beforeEach('insert malicious article', () => {
			return db
				.into('bookmarks')
				.insert([ maliciousBookmark ])
		})
		
		it('removes XSS attack content', () => {
			return supertest(app)
				.get(`/api/bookmarks/${maliciousBookmark.id}`)
				.expect(200)
				.expect(res => {
					expect(res.body.title).to.eql('Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
					expect(res.body.content).to.eql(`Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`)
				})
		})
	})

})

describe.only(`GET /api/bookmarks/:bookmark_id`, () => {
	
	context(`Given no bookmarks`, () => {
		it(`responds with 404`, () => {
			const bookmarkId = 123456
			return supertest(app)
				.get(`/api/bookmarks/${bookmarkId}`)
				.expect(404, { error: { message: `Bookmark doesn't exist` } })
		})
	})

	context('Given there are bookmarks in the database', () => {
		const testBookmarks = makeBookmarksArray()
		
		before('insert bookmarks', () => {
			return db
				.into('bookmarks')
				.insert(testBookmarks)
	  	})

		it('responds with 200 and the specified bookmark', () => {
			const bookmarkId = 1
			const expectedBookmarks = testBookmarks[bookmarkId - 1]
			return supertest(app)
				.get(`/api/bookmarks/${bookmarkId}`)
				.expect(200, expectedBookmarks)
	  	})
	})

	context(`Given an XSS attack article`, () => {
		const maliciousBookmark = {
			id: 911,
			title: 'Naughty naughty very naughty <script>alert("xss");</script>',
			link: 'http://bookmark.com',
			link: 'rating',
			content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
		}
		
		beforeEach('insert malicious bookmark', () => {
			return db
				.into('bookmarks')
				.insert([ maliciousBookmark ])
		})
		
		it('removes XSS attack content', () => {
			return supertest(app)
				.get(`/api/bookmarks/${maliciousBookmark.id}`)
				.expect(200)
				.expect(res => {
					expect(res.body.title).to.eql('Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
					expect(res.body.content).to.eql(`Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`)
				})
		})
	})

})

describe.only(`POST /api/bookmarks`, () => {
	
	it(`creates a bookmark, responding with 201 and the new bookmark`,  function() {
		const newBookmark = {
			title: 'Test new booky marky mark',
			link: 'http://linkypoo',
			rating: '5',
			content: "testy contento"
		}

		return supertest(app)
			.post('/api/bookmarks')
			.send(newBookmark)
			.expect(201)
	       	.expect(res => {
         		expect(res.body.title).to.eql(newBookmark.title)
         		expect(res.body.link).to.eql(newBookmark.link)
         		expect(res.body.rating).to.eql(newBookmark.rating)
         		expect(res.body.content).to.eql(newBookmark.content)
				expect(res.body).to.have.property('id')
				expect(res.headers.location).to.eql(`/api/bookmarks/${res.body.id}`)
			})
			.then(postRes =>
				supertest(app)
				.get(`/api/bookmarks/${postRes.body.id}`)
				.expect(postRes.body)
			)
	})
	const requiredFields = ['title', 'link', 'rating', 'content']

	requiredFields.forEach(field => {
		const newBookmark = {
			title: 'Test new bookmark',
			link: 'http://bookmark.com',
			rating: '5',
			content: 'Test new bookmark content...'
		}

	it(`responds with 400 and an error message when the '${field}' is missing`, () => {
		delete newBookmark[field]

		return supertest(app)
			.post('/api/bookmarks')
			.send(newBookmark)
			.expect(400, {
				error: { message: `Missing '${field}' in request body` }
			})
		})
	})

	it('removes XSS attack content from response', () => {
		const { maliciousBookmark, expectedBookmark } = makeMaliciousBookmark()
		return supertest(app)
			.post(`/api/bookmarks`)
			.send(maliciousBookmark)
			.expect(201)
			.expect(res => {
				expect(res.body.title).to.eql(expectedBookmark.title)
				expect(res.body.link).to.eql(expectedBookmark.link)
				expect(res.body.rating).to.eql(expectedBookmark.rating)
				expect(res.body.content).to.eql(expectedBookmark.content)
			})
	})

})

describe.only(`DELETE /api/bookmarks/:bookmark_id`, () => {

	context(`Given no bookmarks`, () => {
		it(`responds with 404`, () => {
			const bookmarkId = 123456
			return supertest(app)
				.delete(`/api/bookmarks/${bookmarkId}`)
				.expect(404, { error: { message: `Bookmark doesn't exist` } })
		})
	})

	context('Given there are bookmark in the database', () => {
		const testBookmarks = makeBookmarksArray()
	
		beforeEach('insert bookmarks', () => {
			return db
				.into('bookmarks')
				.insert(testBookmarks)
	    })
	
		it('responds with 204 and removes the bookmark', () => {
			const idToRemove = 2
			const expectedBookmarks = testBookmarks.filter(bookmark => bookmark.id !== idToRemove)
			return supertest(app)
				.delete(`/api/bookmarks/${idToRemove}`)
				.expect(204)
				.then(res =>
					supertest(app)
					.get(`/api/bookmarks`)
					.expect(expectedBookmarks)
				)
		})
	})

})

describe.only(`PATCH /api/bookmarks/:bookmark_id`, () => {
	context(`Given no bookmarks`, () => {
		it(`responds with 404`, () => {
			const bookmarkId = 123456
			return supertest(app)
				.patch(`/api/bookmarks/${bookmarkId}`)
				.expect(404, { error: { message: `Bookmark doesn't exist` } })
		})
	})

	context('Given there are bookmarks in the database', () => {
		const testBookmarks = makeBookmarksArray()
		beforeEach('insert bookmarks', () => {
		  return db
		    .into('bookmarks')
		    .insert(testBookmarks)
		})
		it('responds with 204 and updates the bookmark', () => {
			const idToUpdate = 2
			const updateBookmark = {
		    	title: 'updated bookmark title',
		    	link: 'http://newbookmarklink.com',
		    	rating: '4',
		    	content: 'updated bookmark content',
			}
			const expectedBookmark = {
				...testBookmarks[idToUpdate - 1],
				...updateBookmark
			}
		  	return supertest(app)
		   		.patch(`/api/bookmarks/${idToUpdate}`)
		    	.send(updateBookmark)
				.expect(204)
				.then(res =>
					supertest(app)
						.get(`/api/bookmarks/${idToUpdate}`)
						.expect(expectedBookmark)
				)
		})
		it(`responds with 400 when no required fields supplied`, () => {
			const idToUpdate = 2
			return supertest(app)
			.patch(`/api/bookmarks/${idToUpdate}`)
			.send({ irrelevantField: 'foo' })
			.expect(400, {
				error: {
					message: `Request body must contain either 'title', 'link', 'rating' or 'content'`
				}
			})
		})
		it(`responds with 204 when updating only a subset of fields`, () => {
			const idToUpdate = 2
			const updateBookmark = {
				title: 'updated bookmark title',
			}
			const expectedBookmark = {
				...testBookmarks[idToUpdate - 1],
				...updateBookmark
			}
			
			return supertest(app)
				.patch(`/api/bookmarks/${idToUpdate}`)
				.send({
					...updateBookmark,
					fieldToIgnore: 'should not be in GET response'
				})
				.expect(204)
				.then(res =>
					supertest(app)
					.get(`/api/bookmarks/${idToUpdate}`)
					.expect(expectedBookmark)
				)
		})
		
	})
		
})