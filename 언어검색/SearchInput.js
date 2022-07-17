export default function SearchInput({ $target, onKeyPress }) {
  const $searchInput = document.createElement('form')
  $searchInput.className = 'SearchInput'
  $target.appendChild($searchInput)

  this.state = {
    value: '',
  }
  this.setState = (next) => {
    this.state = {
      ...this.state,
      ...next,
    }
    this.render()
  }

  this.render = () => {
    $searchInput.innerHTML = `
        <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." autofocus value="${this.state.value}">
        `
  }

  // 키보드 이벤트
  $searchInput.addEventListener('keyup', (event) => {
    if (
      event.key !== 'ArrowUp' &&
      event.key !== 'ArrowDown' &&
      event.key !== 'Enter' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight'
    ) {
      console.log(event.target.value)
      if (event.target.className === 'SearchInput__input') {
        onKeyPress(event.target.value)
      }
    }
  })

  $searchInput.addEventListener('submit', (event) => {
    event.preventDefault()
  })

  this.render()
}
