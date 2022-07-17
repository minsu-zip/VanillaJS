export default function ProductListPage({ $target, onClick }) {
  const $productList = document.createElement('div')
  $productList.className = 'ProductListPage'
  $target.appendChild($productList)

  this.state = {
    productList: [],
  }

  this.setState = (next) => {
    this.state = {
      ...this.state,
      ...next,
    }
    this.render()
  }

  this.render = () => {
    $productList.innerHTML = `
        <h1>상품목록</h1>
        <ul>
          ${this.state.productList
            .map(
              ({ id, name, imageUrl, price }) => `
          <li class='Product' id=${id}>
              <img src=${imageUrl}>
              <div class="Product__info">
                  <div>${name}</div>
                  <div>${price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원~</div>
          </li>`
            )
            .join('')}
          </ul>
        `
  }

  $productList.addEventListener('click', (e) => {
    const $li = e.target.closest('li')
    if ($li) {
      const id = $li.id
      if (id) {
        onClick(id)
      }
    }
  })

  this.render()
}
