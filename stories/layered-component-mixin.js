import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import DragTarget from '../js/drag-target.jsx';

storiesOf('LayeredComponentMixin', module)
  .add('default', () => (
    <DragTarget onDrop={action('on-drop')}>
      sample message
    </DragTarget>
  ));
  