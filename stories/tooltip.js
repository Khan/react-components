import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Tooltip from '../js/tooltip.jsx';

storiesOf('Tooltip', module)
  .add('default', () => (
    <Tooltip
      horizontalPosition="left"
      horizontalAlign="left"
      verticalPosition="bottom"
      arrowSize={10}
      borderColor="#ccc"
      show
    >
      <div>reticulating splines!</div>
      <p>
        <a href="http://sims.wikia.com/wiki/Reticulating_splines">meaningless phrase</a>
      </p>
    </Tooltip>
  ));
  