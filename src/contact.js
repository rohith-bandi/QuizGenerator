import React, { useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/contact', formData);
            alert('Message sent successfully');
        } catch (err) {
            alert('Error sending message');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <section id="" style={{ marginTop: '80px', flex: 1, fontSize: 15, padding: 0, paddingTop: '50px' }}>
                <div className="container">
                    <h3 className="text-uppercase text-center text-secondary mb-0">Contact Me</h3>
                    <hr className="star-dark mb-2" />
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <form id="contactForm" name="sentMessage" onSubmit={handleSubmit}>
                                <div>
                                    <div className="mb-0 form-floating pb-2">
                                        <input className="form-control" type="text" id="name" required placeholder="Name" value={formData.name} onChange={handleChange} />
                                        <label className="form-label">Name</label>
                                        <small className="form-text text-danger help-block"></small>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-0 form-floating pb-2">
                                        <input className="form-control" type="email" id="email" required placeholder="Email Address" value={formData.email} onChange={handleChange} />
                                        <label className="form-label">Email Address</label>
                                        <small className="form-text text-danger help-block"></small>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-0 form-floating pb-2">
                                        <input className="form-control" type="tel" id="phone" required placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                                        <label className="form-label">Phone Number</label>
                                        <small className="form-text text-danger help-block"></small>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-5 form-floating pb-2">
                                        <textarea className="form-control" id="message" required placeholder="Message" style={{ height: '150px' }} value={formData.message} onChange={handleChange}></textarea>
                                        <label className="form-label">Message</label>
                                        <small className="form-text text-danger help-block"></small>
                                    </div>
                                </div>
                                <div id="success"></div>
                                <div>
                                    <button className="btn btn-primary btn-xl" id="sendMessageButton" type="submit">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Contact;