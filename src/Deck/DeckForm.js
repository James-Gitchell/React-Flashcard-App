import React from "react";


// used for both creating and editing deck
// generic placeholder

export default function DeckForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  submitLabel,
  cancelLabel,
  deckTitle,
}) {
  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  return (
    <div className="w-75 p-3">
    <form onSubmit={onSubmit} >
      <div className="form-group">
        <h2>{deckTitle}</h2>
        <label htmlFor="name">Name</label>
        <input
          className="form-control"
          type="text"
          id="name"
          name="name"
          required={true}
          onChange={handleChange}
          value={formData.name}
          placeholder="Deck Name"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          onChange={handleChange}
          value={formData.description}
          required={true}
          placeholder="Brief description of the deck"
        ></textarea>
      </div>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        {cancelLabel}
      </button>
      <button type="submit" className="btn btn-primary" style={{margin: '3px'}}>
        {submitLabel}
      </button>
    </form>
    </div>
  );
}
