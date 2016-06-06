import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Modal from '../js/modal.jsx';

storiesOf('Modal', module)
  .add('default', () => (
    <Modal onClose={action('close')}>
      <div className="modal-header">
          Header
          <a href="javascript: void 0;"
             style={{float: "right", textDecoration: "none"}}
             onClick={action('close')}>
              &#215;
          </a>
      </div>
      <div className="modal-body">Body!</div>
    </Modal>
  ));
  