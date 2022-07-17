import { getItem, setItem, removeItem } from './storage.js'

export default function SearchInput({ $target, onSearch }) {
  const TEMPLATE = '<input type="text">'
  const $searchInput = document.createElement('input')
  const $searchList = document.createElement('div')
  $searchInput.placeholder = '고양이를 검색해보세요.|'
  $searchInput.className = 'SearchInput'
  $target.appendChild($searchInput)
  $searchInput.focus()
  $target.appendChild($searchList)
  this.cache = getItem('keywords_cache', [])

  console.log(this.cache)
  this.state = {
    data: [],
  }

  this.setState = (nextData) => {
    this.state = {
      ...this.state,
      ...nextData,
    }
    this.render()
  }

  this.render = () => {
    if (this.cache.length > 0) {
      console.log(this.cache)
      $searchList.innerHTML = `
      <ul>
        ${this.cache
          .map(
            (item, idx) => `
          <li id=${idx}>
            <h2>${item}<h2>
          </li>
        `
          )
          .join('')}
      <ul>
      `
    }
  }

  $searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value)
      const searchList = [...this.cache]
      console.log(searchList)

      if (searchList[searchList.length - 1] !== e.target.value) {
        if (searchList.lengh >= 5) {
          searchList.shift()
        }
        searchList.push(e.target.value)
        removeItem('keywords_cache')
        setItem('keywords_cache', searchList)
      }
    }
  })

  $searchInput.addEventListener('click', (e) => {
    e.target.value = ''
  })

  $searchList.addEventListener('click', (e) => {
    const $h2 = e.target.closest('h2')
    console.log($h2.textContent)
    if ($h2.textContent) {
      $searchInput.value = $h2.textContent
      onSearch($h2.textContent)
    }
  })

  this.render()
}

// class SearchInput {
//   constructor({ $target, onSearch }) {
//     const $searchInput = document.createElement("input");
//     this.$searchInput = $searchInput;
//     this.$searchInput.placeholder = "고양이를 검색해보세요.|";

//     $searchInput.className = "SearchInput";
//     $target.appendChild($searchInput);

//     $searchInput.addEventListener("keyup", e => {
//       if (e.keyCode === 13) {
//         onSearch(e.target.value);
//       }
//     });

//     console.log("SearchInput created.", this);
//   }
//   render() {}
// }
