function makeBookmarksArray() {
		return [
			{
				id: 1,
				title: 'Title1',
				link: 'http://1.com',
				rating: '1',
				content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?'
			},
			{
				id: 2,
				title: 'Title2',
				link: 'http://2.com',
				rating: '2',
				content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.'
			},
			{
				id: 3,
				title: 'Title3',
				link: 'http://3.com',
				rating: '3',
				content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.'
			},
			{
				id: 4,
				title: 'Title4',
				link: 'http://4.com',
				rating: '4',
				content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, consequuntur. Cum quo ea vero, fugiat dolor labore harum aut reprehenderit totam dolores hic quaerat, est, quia similique! Aspernatur, quis nihil?'
			},
			{
				id: 5,
				title: 'Title5',
				link: 'http://5.com',
				rating: '5',
				content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet soluta fugiat itaque recusandae rerum sed nobis. Excepturi voluptas nisi, labore officia, nobis repellat rem ab tempora, laboriosam odio reiciendis placeat?'
			},
		];
	}
	
function makeMaliciousBookmark() {
	const maliciousBookmark = {
		id: 911,
		title: 'Naughty naughty very naughty <script>alert("xss");</script>',
		link: 'http://5.com',
		rating: '5',
		content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
	}
	const expectedBookmark = {
		...maliciousBookmark,
		title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
		link: 'http://5.com',
		rating: '5',
		content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
	}
	return {
		maliciousBookmark,
		expectedBookmark,
	}
}

module.exports = {
	makeBookmarksArray,
	makeMaliciousBookmark,
}