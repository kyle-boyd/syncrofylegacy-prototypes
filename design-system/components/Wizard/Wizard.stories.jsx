import React from 'react';
import Wizard from './Wizard';
import TextInput from '../TextInput';

export default {
  title: 'Components/Wizard',
  component: Wizard,
};

export const ThreeSteps = () => {
  const [v1, setV1] = React.useState('');
  const [v2, setV2] = React.useState('');
  return (
    <Wizard
      header="Setup Wizard"
      steps={[
        { title: 'Step 1', label: 'Name', page: <TextInput name="s1" label="Name" value={v1} onChange={setV1} placeholder="Your name" /> },
        { title: 'Step 2', label: 'Email', page: <TextInput name="s2" label="Email" value={v2} onChange={setV2} placeholder="Email" /> },
        { title: 'Step 3', label: 'Review', page: <p>Review and confirm.</p> },
      ]}
      onConfirm={() => window.alert('Done!')}
      onCancel={() => window.alert('Cancel')}
    />
  );
};
