import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Sortable from '../js/sortable.jsx';

const components = [
  <div draggable={true} key="1">1</div>,
  <div draggable={true} key="2">2</div>,
  <div draggable={true} key="3">3</div>,
  <div draggable={true} key="4">4</div>
];

storiesOf('sortable', module)
  .add('default', () => (
    <Sortable
      components={components}
     onReorder={action('onReorder')}
     className="sidebar-list"
     verify={() => true}
    />
  ));
  