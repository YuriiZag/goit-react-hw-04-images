import { ImageGalleryItem } from 'components/image-gallery-item/image-gallery-item';

import { Loader } from 'components/loader/loader';
import {
  ErrorText,
  GalleryContainer,
  IdleText,
  ImageList,
} from './image-gallery.styled';
import { LoadMoreButton } from 'components/loadmore-button/button';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';

const API_KEY = '30973377-2fa9d5ab9ec6c16f13d3292f0';

export const ImageGallery = ({ request, openModal }) => {
  const [picsArray, setPicsArray] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (request === '') {
      setStatus('idle');
    } else {
      setStatus('pending');
      setPage(1);
      fetch(
        `https://pixabay.com/api/?q=${request}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Oops! Nothing found with search request ${request}`)
          );
        })
        .then(pictures => {
          const dataArray = pictures.hits.map(
            ({ id, tags, largeImageURL, previewURL }) => {
              return {
                id,
                tags,
                largeImageURL,
                previewURL,
              };
            }
          );
          if (dataArray.length > 0) {
            setStatus('resolved');
            setPicsArray(dataArray);
          } else {
            setStatus('rejected');
          }
        })
        .catch(error => {
          setStatus('rejected');
        });
    }
  }, [request]);

  useEffect(() => {
    if (request === '') {
      setStatus('idle');
    } else {
      setStatus('pending');

      fetch(
        `https://pixabay.com/api/?q=${request}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Oops! Nothing found with search request ${request}`)
          );
        })
        .then(pictures => {
          const dataArray = pictures.hits.map(
            ({ id, tags, largeImageURL, previewURL }) => {
              return {
                id,
                tags,
                largeImageURL,
                previewURL,
              };
            }
          );
          if (dataArray.length > 0) {
            setStatus('resolved');
            setPicsArray(prevState => [...prevState, ...dataArray]);
          } else {
            setStatus('rejected');
          }
        })
        .catch(error => {
          setStatus('rejected');
        });
    }
  }, [page]);

  const onLoadMoreCLick = e => {
    setPage(prevState => (prevState = prevState + 1));
  };

  const onClickHandler = e => {
    console.dir(e.target);
    const data = {
      fullSize: e.target.dataset.fullSize,
      tags: e.target.alt,
    };
    openModal(data);
  };

  console.log(picsArray);

  if (status === 'idle') {
    return <IdleText>Enter search request!</IdleText>;
  }

  if (status === 'rejected') {
    return (
      <ErrorText>Oops! Nothing found with search request "{request}"</ErrorText>
    );
  }

  if (status === 'resolved' || status === 'pending') {
    return (
      <GalleryContainer>
        <ImageList>
          {picsArray.map(({ id, tags, previewURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                label={tags}
                source={previewURL}
                id={id}
                fullSize={largeImageURL}
                onClickHandler={onClickHandler}
              ></ImageGalleryItem>
            );
          })}
        </ImageList>
        {status === 'pending' && <Loader></Loader>}
        {status === 'resolved' && (
          <LoadMoreButton
            onButtonClick={() => onLoadMoreCLick()}
          ></LoadMoreButton>
        )}
      </GalleryContainer>
    );
  }
};

// export class ImageGallery extends Component {
//   state = {
//     picsArray: [],
//     status: 'idle',
//     error: null,
//     page: 1,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.page !== this.state.page &&
//       prevProps.request === this.props.request
//     ) {
//       this.setState({
//         status: 'pending',
//       });
//       fetch(
//         `https://pixabay.com/api/?q=${this.props.request}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//       )
//         .then(response => {
//           if (response.ok) {
//             return response.json();
//           }
//           return Promise.reject(
//             new Error(
//               `Oops! Nothing found with search request ${this.props.request}`
//             )
//           );
//         })
//         .then(pictures => {
//           const dataArray = pictures.hits.map(
//             ({ id, tags, largeImageURL, previewURL }) => {
//               return {
//                 id,
//                 tags,
//                 largeImageURL,
//                 previewURL,
//               };
//             }
//           );
//           if (dataArray.length > 0) {
//             this.setState({
//               status: 'resolved',
//               picsArray: [...this.state.picsArray, ...dataArray],
//             });
//           } else {
//             this.setState({
//               status: 'rejected',
//             });
//           }
//         })
//         .catch(error => this.setState({ error: error, status: 'rejected' }));
//     }

//     if (prevProps.request !== this.props.request) {
//       this.setState({
//         status: 'pending',
//         page: 1,
//       });
//       fetch(
//         `https://pixabay.com/api/?q=${this.props.request}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//       )
//         .then(response => {
//           if (response.ok) {
//             return response.json();
//           }
//           return Promise.reject(
//             new Error(
//               `Oops! Nothing found with search request ${this.props.request}`
//             )
//           );
//         })
//         .then(pictures => {
//           const dataArray = pictures.hits.map(
//             ({ id, tags, largeImageURL, previewURL }) => {
//               return {
//                 id,
//                 tags,
//                 largeImageURL,
//                 previewURL,
//               };
//             }
//           );
//           if (dataArray.length > 0) {
//             this.setState({
//               status: 'resolved',
//               picsArray: dataArray,
//             });
//           } else {
//             this.setState({
//               status: 'rejected',
//             });
//           }
//         })
//         .catch(error => this.setState({ error: error, status: 'rejected' }));
//     }
//   }

//   onLoadMoreCLick = e => {
//     this.setState({ page: this.state.page + 1 });
//   };
//   onClickHandler = e => {
//     console.dir(e.target);
//     const data = {
//       fullSize: e.target.dataset.fullSize,
//       tags: e.target.alt,
//     };
//     this.props.openModal(data);
//   };

//   render() {
//     if (this.state.status === 'idle') {
//       return <IdleText>Enter search request!</IdleText>;
//     }

//     if (this.state.status === 'rejected') {
//       return (
//         <ErrorText>Oops! Nothing found with search request "{this.props.request}"</ErrorText>
//       );
//     }

//     if (this.state.status === 'resolved' || this.state.status === 'pending') {
//       return (
//         <GalleryContainer>
//           <ImageList>
//             {this.state.picsArray.map(
//               ({ id, tags, previewURL, largeImageURL }) => {
//                 return (
//                   <ImageGalleryItem
//                     key={id}
//                     label={tags}
//                     source={previewURL}
//                     id={id}
//                     fullSize={largeImageURL}
//                     onClickHandler={this.onClickHandler}
//                   ></ImageGalleryItem>
//                 );
//               }
//             )}
//           </ImageList>
//           {this.state.status === 'pending' && <Loader></Loader>}
//           {this.state.status === 'resolved' && (
//             <LoadMoreButton
//               onButtonClick={() => this.onLoadMoreCLick()}
//             ></LoadMoreButton>
//           )}
//         </GalleryContainer>
//       );
//     }
//   }
// }

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
