import SearchInput from './SearchInput.js'
import SearchResult from './SearchResult.js'
import ImageInfo from './ImageInfo.js'
import { request } from './api.js'

export default function App({ $target }) {
  this.state = {
    data: [],
  }

  const searchInput = new SearchInput({
    $target,
    onSearch: async (keyword) => {
      if (keyword.length > 0) {
        const { data } = await request(`/cats/search?q=${keyword}`)
        this.setState({
          data,
        })
      } else {
        this.setState({
          data: [],
        })
      }
    },
  })

  const searchResult = new SearchResult({
    $target,
    onClick: (image) => {
      imageInfo.setState({
        visible: true,
        image,
      })
    },
  })

  const imageInfo = new ImageInfo({
    $target,
  })

  this.setState = (nextData) => {
    this.state = {
      ...this.state,
      ...nextData,
    }
    searchResult.setState({
      data: this.state.data,
    })
  }
}

// class App {
//   $target = null;
//   data = [];

//   constructor($target) {
//     this.$target = $target;

//     this.searchInput = new SearchInput({
//       $target,
//       onSearch: keyword => {
//         api.fetchCats(keyword).then(({ data }) => this.setState(data));
//       }
//     });

//     this.searchResult = new SearchResult({
//       $target,
//       initialData: this.data,
//       onClick: image => {
//         this.imageInfo.setState({
//           visible: true,
//           image
//         });
//       }
//     });

//     this.imageInfo = new ImageInfo({
//       $target,
//       data: {
//         visible: false,
//         image: null
//       }
//     });
//   }

//   setState(nextData) {
//     console.log(this);
//     this.data = nextData;
//     this.searchResult.setState(nextData);
//   }
// }
