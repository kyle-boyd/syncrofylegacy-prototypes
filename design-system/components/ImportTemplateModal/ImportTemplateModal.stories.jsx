import React, { useState } from 'react';
import ImportTemplateModal from './ImportTemplateModal';

export default {
  title: 'Components/ImportTemplateModal',
  component: ImportTemplateModal,
};

export const Default = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Open</button>
      <ImportTemplateModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Import template"
      >
        Select a template file to import.
      </ImportTemplateModal>
    </>
  );
};
