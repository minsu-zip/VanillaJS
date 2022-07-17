export default function Suggestion({ $target, onEnter }) {
  const $suggestion = document.createElement('div')
  $suggestion.className = 'Suggestion'
  $target.appendChild($suggestion)

  this.state = {
    data: [],
    inputValue: '',
    selectedNumber: 0,
  }

  this.setState = (next) => {
    this.state = {
      ...this.state,
      ...next,
    }
    this.render()
  }

  this.render = () => {
    // data와 입력값을 매칭하여 동일한 부분만 추출 (대소문자 상관X)
    const matchedText = this.state.data.map((item) =>
      item.match(new RegExp(this.state.inputValue, 'i'))
    )

    // data와 입력값을 매칭하여 하이라이팅 처리 -> 기존 입력값
    const items = this.state.data.map(
      (item, index) =>
        `${item.replace(
          new RegExp(`(${this.state.inputValue})`, 'i'),
          `<span class="Suggestion__item--matched">${matchedText[index]}</span>`
        )}`
    )

    $suggestion.innerHTML = `
            <ul>
                ${items
                  .map(
                    (data, id) => `
                ${
                  id === this.state.selectedNumber
                    ? `<li class='Suggestion__item--selected'>${data}</li>`
                    : `<li>${data}</li>`
                }
                `
                  )
                  .join('')}
            </ul>
            `
    $suggestion.style.display = this.state.data.length > 0 ? 'block' : 'none'
  }

  $suggestion.addEventListener('click', (e) => {
    const $li = e.target.closest('li')
    if ($li) {
      alert($li.textContent)
      onEnter($li.textContent)
    }
  })

  // 키보드 이벤트
  window.addEventListener('keyup', (event) => {
    const { selectedNumber } = this.state
    const { data } = this.state

    switch (event.key) {
      case 'ArrowUp':
        if (selectedNumber === 0) {
          this.setState({
            selectedNumber: data.length - 1,
          })
        } else {
          this.setState({
            selectedNumber: selectedNumber - 1,
          })
        }
        break
      case 'ArrowDown':
        if (selectedNumber === data.length - 1) {
          this.setState({
            selectedNumber: 0,
          })
        } else {
          this.setState({
            selectedNumber: selectedNumber + 1,
          })
        }
        break
      case 'Enter':
        if (data.length > 0) {
          console.log(data[selectedNumber])
          alert(data[selectedNumber])
          onEnter(data[selectedNumber])
        }
        break
      default:
        break
    }
  })

  this.render()
}
