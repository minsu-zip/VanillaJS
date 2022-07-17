import { request } from './api.js'

export default function ImageInfo({ $target }) {
  const $imageInfo = document.createElement('div')
  $imageInfo.className = 'ImageInfo'
  $target.appendChild($imageInfo)

  this.state = {
    visible: false,
    image: null,
    data: {},
  }

  this.setState = async (nextData) => {
    if (nextData.visible) {
      const { data } = await request(`/cats/${nextData.image.id}`)
      this.state = {
        ...nextData,
        data,
      }
    }

    this.render()
  }

  this.render = () => {
    if (this.state.visible) {
      const { name, url, temperament, origin } = this.state.data

      $imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`
      $imageInfo.style.display = 'block'
    } else {
      $imageInfo.style.display = 'none'
    }
  }

  $imageInfo.addEventListener('click', (e) => {
    if (e.target.className === 'ImageInfo') {
      $imageInfo.style.display = 'none'
    }
    const $close = e.target.closest('.close')
    if ($close) {
      $imageInfo.style.display = 'none'
    }
  })

  this.render()
}

// class ImageInfo {
//   $imageInfo = null;
//   data = null;

//   constructor({ $target, data }) {
//     const $imageInfo = document.createElement("div");
//     $imageInfo.className = "ImageInfo";
//     this.$imageInfo = $imageInfo;
//     $target.appendChild($imageInfo);

//     this.data = data;

//     this.render();
//   }

//   setState(nextData) {
//     this.data = nextData;
//     this.render();
//   }

//   render() {
//     if (this.data.visible) {
//       const { name, url, temperament, origin } = this.data.image;

//       this.$imageInfo.innerHTML = `
//         <div class="content-wrapper">
//           <div class="title">
//             <span>${name}</span>
//             <div class="close">x</div>
//           </div>
//           <img src="${url}" alt="${name}"/>
//           <div class="description">
//             <div>성격: ${temperament}</div>
//             <div>태생: ${origin}</div>
//           </div>
//         </div>`;
//       this.$imageInfo.style.display = "block";
//     } else {
//       this.$imageInfo.style.display = "none";
//     }
//   }
// }
