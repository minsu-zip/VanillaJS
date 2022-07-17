export default function ImageView({ $target }) {
  const $image = document.createElement('div')
  $image.className = 'Modal ImageViewer'
  $target.appendChild($image)

  this.state = ''
  this.setState = (next) => {
    this.state = next
    this.render()
  }

  this.render = () => {
    if (this.state !== '') {
      $image.style.display = 'block'
      $image.innerHTML = `
            <div class='content'>
                <img src='https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public${this.state}'/>
            </div>
        `
    } else {
      $image.style.display = 'none'
    }
  }

  $image.addEventListener('click', (e) => {
    if (e.target.className === 'Modal ImageViewer') {
      this.setState('')
    }
  })

  window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      this.setState('')
    }
  })
  this.render()
}
