export default function SearchResult({ $target, onClick }) {
  const $searchResult = document.createElement('div')
  $searchResult.className = 'SearchResult'
  $target.appendChild($searchResult)

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
    if (this.state.data.length === 0) {
      $searchResult.innerHTML = '<h2>검색된 결과가 없습니다.</h2>'
      return
    }
    $searchResult.innerHTML = this.state.data
      .map(
        (cat) => `
        <div class="item">
          <img src=${cat.url} alt=${cat.name} />
        </div>
      `
      )
      .join('')

    $searchResult.querySelectorAll('.item').forEach(($item, index) => {
      $item.addEventListener('click', () => {
        onClick(this.state.data[index])
      })
    })
  }

  this.render()
}

// class SearchResult {
//   $searchResult = null;
//   data = null;
//   onClick = null;

//   constructor({ $target, initialData, onClick }) {
//     this.$searchResult = document.createElement("div");
//     this.$searchResult.className = "SearchResult";
//     $target.appendChild(this.$searchResult);

//     this.data = initialData;
//     this.onClick = onClick;

//     this.render();
//   }

//   setState(nextData) {
//     this.data = nextData;
//     this.render();
//   }

//   render() {
//     this.$searchResult.innerHTML = this.data
//       .map(
//         cat => `
//           <div class="item">
//             <img src=${cat.url} alt=${cat.name} />
//           </div>
//         `
//       )
//       .join("");

//     this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
//       $item.addEventListener("click", () => {
//         this.onClick(this.data[index]);
//       });
//     });
//   }
// }
