import React, {useState} from 'react';
import './CreateAlertForm.css';

function CreateAlertForm(properties) {
    const {homeService} = properties;

    const [formData, setFormData] = useState({
        type: 'video',
        category: 'city',
        title: '',
        description: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formData.title !== '' || formData.description !== '') {
            homeService.createAlert(formData.type, formData.category, formData.title, formData.description).then(r => {})
        }

        setFormData({
            type: 'video',
            category: 'city',
            title: '',
            description: '',
        });
    };

    return (
        <div className="Home">
            <form onSubmit={handleSubmit}>
                <div className="form-entry">
                    <label htmlFor="type">Type</label>
                    <select name="type" onChange={handleChange} value={formData.type} className="entry">
                        <option value="video">Video</option>
                        <option value="co2">CO2 level</option>
                        <option value="sound">Sound level</option>
                    </select>
                </div>

                <div className="form-entry">
                    <label htmlFor="category">Type</label>
                    <select name="category" onChange={handleChange} value={formData.category}
                            className="entry">
                        <option value="city">City</option>
                        <option value="company">Company</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-entry">
                    <label htmlFor="title">Title</label>
                    <input className="entry" onChange={handleChange} value={formData.title}
                           name="title"></input>
                </div>

                <div className="form-entry">
                    <label for="description">Description</label>
                    <textarea className="entry" onChange={handleChange} value={formData.description}
                              name="description"></textarea>
                </div>

                <button className="form-entry" type="submit">Launch an alert</button>
            </form>
        </div>
    );
}

export default CreateAlertForm;
