import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import InfoTip from '../js/info-tip.jsx';

storiesOf('InfoTip', module)
  .add('default', () => (
    <InfoTip>
      <p>
        <a href="http://sims.wikia.com/wiki/Reticulating_splines">meaningless phrase</a>
      </p>
    </InfoTip>
  ));
  