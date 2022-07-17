export default function SelectedLanguage({ $target }) {
  const $selected = document.createElement('div')
  $selected.className = 'SelectedLanguage'
  $target.appendChild($selected)

  this.state = {
    data: [],
  }

  this.setState = (next) => {
    this.state = {
      ...this.state,
      ...next,
    }
    this.render()
  }

  this.render = () => {
    $selected.innerHTML = `
          <ul>
              ${this.state.data.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        `
  }
  this.render()
}
