export default function ProductDetailPage({ $target }) {
  const $productDetail = document.createElement('div')
  $productDetail.className = 'ProductDetailPage'
  $target.appendChild($productDetail)

  this.state = {
    productId: {},
    selectedOptions: [],
    selectedStock: [],
  }

  this.setState = (next) => {
    console.log(next.selectedOptions)
    this.state = {
      ...this.state,
      ...next,
    }
    this.render()
  }

  this.render = () => {
    const { productId, selectedOptions, selectedStock } = this.state
    if (Object.keys(productId).length === 0) return

    $productDetail.innerHTML = `
        <h1>${productId.name} 상품 정보</h1>
        <div class="ProductDetail">
          <img src=${productId.imageUrl}>
          <div class="ProductDetail__info">
          <h2>${productId.name}</h2>
          <div class="ProductDetail__price">${productId.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원~</div>
          <select>
              <option>선택하세요.</option>
              ${productId.productOptions
                .map(
                  ({ id, name, price, stock }) =>
                    `${porductInformation(productId, id, name, price, stock)}`
                )
                .join('')}
          </select>
          <div class="ProductDetail__selectedOptions">
          ${
            selectedOptions.length > 0
              ? `<h3>선택된 상품</h3>
            <ul>${selectedOptions
              .map(
                ({ name, price, id }) => `
                <li>${name} ${(productId.price + price)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                    <div><input type="number" id=${id} value="1">개</div>
                </li>`
              )
              .join('')}
            </ul>
            <div class="ProductDetail__totalPrice">${totalPrice()}원</div>
            <button class="OrderButton">주문하기</button>
            `
              : ''
          }
          </div>
        </div>
        `
  }
  //             <li>
  //               커피잔 100개 번들 10,000원 <div><input type="number" value="10">개</div>
  //             </li>
  const porductInformation = (productId, id, name, price, stock) => {
    if (stock > 0) {
      if (price > 0) {
        return `<option id=${id} value=${id}>${productId.name} ${name} (+${price
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원)</option>`
      } else {
        return `<option id=${id} value=${id}>${productId.name} ${name}</option>`
      }
    } else {
      return `<option id=${id} disabled>(품절) ${productId.name} ${name}</option>`
    }
  }

  const totalPrice = () => {
    const sum = this.state.selectedOptions.reduce(
      (acc, cur) => acc + (this.state.productId.price + cur.price),
      0
    )
    return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  $productDetail.addEventListener('change', (e) => {
    // select 이벤트
    const $select = e.target.closest('select')
    if ($select) {
      const selectedId = Number($select.value)
      if (selectedId) {
        const selectedOption = this.state.productId.productOptions.find(
          ({ id }) => id === selectedId
        )

        // 상품 중복 선택 판별
        const options = [...this.state.selectedOptions]
        const check = options.every((item) => item.id !== selectedOption.id)
        if (check) {
          this.setState({
            selectedOptions: [...this.state.selectedOptions, selectedOption],
            selectedStock: [
              ...this.state.selectedStock,
              { id: selectedOption.id, cnt: 1 },
            ],
          })
        }
      }
    }

    // 수량 이벤트
    const $input = e.target.closest('input')
    if ($input) {
      const item = this.state.selectedOptions.find(
        ({ id }) => id === Number($input.id)
      )
      if ($input.value > item.stock) {
        alert('수량 초과')
        $input.value = item.stock
      } else if ($input.value < 1) {
        $input.value = 1
      } else if (isNaN($input.value)) {
        $input.value = 1
      }
    }
  })

  this.render()
}
