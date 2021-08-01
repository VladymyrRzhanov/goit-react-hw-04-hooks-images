import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal');

const Modal = ({ onClose, modalImg, tags }) => {
  useEffect(() => {
    const modalClose = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', modalClose);
    return () => window.removeEventListener('keydown', modalClose);
  });

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={modalImg} alt={tags} />
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;

// export default class Modal extends Component {
//   static propTypes = {
//     onClose: PropTypes.func.isRequired,
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', this.modalClose);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.modalClose);
//   }

//   modalClose = e => {
//     const { onClose } = this.props;
//     if (e.code === 'Escape') {
//       onClose();
//     }
//   };

//   handleBackdropClick = e => {
//     const { onClose } = this.props;
//     if (e.currentTarget === e.target) {
//       onClose();
//     }
//   };

//   render() {
//     const { modalImg, tags } = this.props;
//     return createPortal(
//       <div className={s.overlay} onClick={this.handleBackdropClick}>
//         <div className={s.modal}>
//           <img src={modalImg} alt={tags} />
//         </div>
//       </div>,
//       modalRoot,
//     );
//   }
// }
