import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ButtonGroup from '../js/button-group.jsx';

storiesOf('ButtonGroup', module)
  .add('default', () => (
    <ButtonGroup value="red"
      buttons={[
          {value: 'red', content: 'red'},
          {value: 'green', content: 'green'},
          {value: 'blue', content: 'blue'}
      ]}
      onChange={action('onchange')}
    />
  ));
  