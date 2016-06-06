import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MultiButtonGroup from '../js/multi-button-group.jsx';

storiesOf('MultiButtonGroup', module)
  .add('default', () => (
    <MultiButtonGroup
      values='red'
      buttons={[
        {value: 'red', content: 'red'},
        {value: 'green', content: 'green'},
        {value: 'blue', content: 'blue'}
      ]}
      onChange={action('on-change')}
    />
  ));
  