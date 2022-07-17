export default function IsLoading({ $target }) {
  const $loading = document.createElement('div')
  $loading.className = 'Modal Loading'
  $target.appendChild($loading)

  this.state = false

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (this.state) {
      $loading.style.display = 'block'
      $loading.innerHTML = `
            <div class="content">
                <img src="./assets/nyan-cat.gif">
            </div>
        `
    } else {
      $loading.style.display = 'none'
    }
  }

  this.render()
}
