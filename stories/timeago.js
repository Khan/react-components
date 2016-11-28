import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import TimeAgo from '../js/timeago.jsx';

storiesOf('TimeAgo', module)
  .add('default', () => (
    <TimeAgo time={new Date()} />
  ));
  