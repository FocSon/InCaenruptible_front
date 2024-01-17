import React, {useState} from 'react';
import './CreateAlertForm.css';
import {createAlert} from "../service/HomeService";

function CreateAlertForm(properties) {
    const {customCallback} = properties;

    const [formData, setFormData] = useState({
        type: 'stream',
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
        console.log('Form submitted with data:', formData);

        if(formData.title !== '' || formData.description !== '') {
            createAlert(formData.type, formData.category, formData.title, formData.description).then((result) => {

                if(customCallback) {
                    console.log(result);
                    customCallback(result);
                }
            });

        }

        setFormData({
            type: 'stream',
            category: 'city',
            title: '',
            description: '',
        });
    };

    return (
        <div className="Home">
            <form onSubmit={handleSubmit}>
                <div className="form-entry">
                    <label for="type">Type</label>
                    <select name="type" onChange={handleChange} value={formData.type} className="entry">
                        <option value="stream">Live stream</option>
                        <option value="co2">CO2 level</option>
                        <option value="sound">Sound level</option>
                    </select>
                </div>

                <div className="form-entry">
                    <label for="category">Type</label>
                    <select name="category" onChange={handleChange} value={formData.category}
                            className="entry">
                        <option value="city">City</option>
                        <option value="company">Company</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-entry">
                    <label for="title">Title</label>
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
