const BASE_URL = "http://localhost:3000"

document.addEventListener('DOMContentLoaded', () => {
  getQuotes()
  
  const form = document.querySelector('#new-quote-form')
  form.addEventListener('submit', createQuote)
})

function getQuotes() {
  fetch(`${BASE_URL}/quotes?_embed=likes`)
    .then(resp => resp.json())
    .then(quotes => {
      quotes.forEach(quote => {
        renderQuote(quote)
      })
    })
}

function renderQuote(quote) {
  const quoteList = document.querySelector('#quote-list')

  const li = document.createElement('li')
  li.className = 'quote-card'

  const blockquote = document.createElement('blockquote')
  blockquote.className = 'blockquote'

  const p = document.createElement('p')
  p.className = 'mb-0'
  p.innerText = quote.quote

  const footer = document.createElement('footer')
  footer.className = 'blockquote-footer'
  footer.innerText = quote.author

  const br = document.createElement('br')

  const likeBtn = document.createElement('button')
  likeBtn.className = 'btn-success'
  likeBtn.innerText = 'Likes: '
  const span = document.createElement('span')
  span.innerText = quote.likes.length
  likeBtn.appendChild(span)
  likeBtn.addEventListener('click', () => {
    createLike(quote)
  })

  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'btn-danger'
  deleteBtn.innerText = 'Delete'
  deleteBtn.addEventListener('click', () => {
    deleteQuote(quote, li)
  })

  blockquote.appendChild(p)
  blockquote.appendChild(footer)
  blockquote.appendChild(br)
  blockquote.appendChild(likeBtn)
  blockquote.appendChild(deleteBtn)

  li.appendChild(blockquote)

  quoteList.appendChild(li)
}

function createQuote(event) {
  event.preventDefault()

  const quoteInput = document.querySelector('#new-quote')
  const authorInput = document.querySelector('#author')

  const quote = quoteInput.value
  const author = authorInput.value

  fetch(`${BASE_URL
