import React from "react";


//generic cardform and props are passed in to be used by other functions
export default function CardForm({
formData, setFormData, onSubmit, onCancel, submitLabel, cancelLabel, cardTitle, cardText,
}) {
  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <h1>
          <span>{cardTitle}</span>
          <span>:</span>
          <span> {cardText}</span>
        </h1>
        <label htmlFor="front">Front</label>
        <textarea
          rows="5"
          className="form-control"
          id="front"
          name="front"
          required={true}
          onChange={handleChange}
          value={formData.front}
          placeholder="Front side of the card"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          rows="5"
          className="form-control"
          id="back"
          name="back"
          onChange={handleChange}
          value={formData.back}
          required={true}
          placeholder="Brief description of the deck"
        ></textarea>
      </div>
      <button
        type="button"
        className="btn btn-secondary"
        style={{ margin: "3px" }}
        onClick={onCancel}
      >
        {cancelLabel}
      </button>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ margin: "3px" }}
      >
        {submitLabel}
      </button>
    </form>
  );
}
