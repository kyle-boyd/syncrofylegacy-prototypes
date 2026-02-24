import React from 'react';
import Accordion from './Accordion';
import Button from '../Button';

const containerStyle = { backgroundColor: '#eaeaea', padding: 16, display: 'flex', flexDirection: 'column' };
const wrapperStyle = { backgroundColor: '#fff' };
const content = <span>...with stuff in it</span>;

export default {
  title: 'Components/Accordion',
  component: Accordion,
};

export const Standard = () => (
  <div style={containerStyle}>
    <div style={wrapperStyle}>
      <Accordion title="Small Accordion" size="small">{content}</Accordion>
    </div>
    <div style={wrapperStyle}>
      <Accordion title="Default Accordion" name="default">{content}</Accordion>
    </div>
    <div style={wrapperStyle}>
      <Accordion title="Large Accordion" name="h4" size="large">{content}</Accordion>
    </div>
    <div style={wrapperStyle}>
      <Accordion title="Underline Accordion" name="underline" underline>{content}</Accordion>
    </div>
    <div style={wrapperStyle}>
      <Accordion title="Action Accordion" name="action" actionComponent={<Button text="Action!" onClick={() => {}} />}>
        {content}
      </Accordion>
    </div>
    <div style={wrapperStyle}>
      <Accordion title="Reverse Accordion" name="right" chevronRight>{content}</Accordion>
    </div>
    <div style={wrapperStyle}>
      <Accordion title="Subtitle Accordion" subTitle="(4 items)">{content}</Accordion>
    </div>
  </div>
);
