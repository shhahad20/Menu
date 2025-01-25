import React from "react";

interface EditField {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

interface EditSectionProps {
  title: string;
  fields: EditField[];
  onSave: () => void;
  onCancel: () => void;
}

const AccordionEditing: React.FC<EditSectionProps> = ({ title, fields, onSave, onCancel }) => {
  return (
    <div className="edit-section">
      <h3>{title}</h3>
      {fields.map((field, index) => (
        <div key={index} className="edit-field">
          <label>{field.label}</label>
          <input
            type="text"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            className="edit-input"
          />
        </div>
      ))}
      <div className="edit-buttons">
        <button className="save-btn" onClick={onSave}>
          Save
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AccordionEditing;
