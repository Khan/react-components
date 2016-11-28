import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import BlurInput from '../js/blur-input.jsx';

storiesOf('BlurInput', module)
  .add('default', () => (
    <BlurInput
      value='sample value'
      onChange={action('on-change')}
    />
  ));
  