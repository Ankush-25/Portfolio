import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Initialize EmailJS with your public key
      emailjs.init('bG8eDAoVZEVxArEZM');
      
      // Send the email using EmailJS
      await emailjs.send(
        'service_zjwppet', // Your service ID
        'template_9lk8knc', // Your template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }
      );
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }

    class ShareButtons {
      constructor(message, url) {
        this.message = encodeURIComponent(message);
        this.url = encodeURIComponent(url);
      }
    
      shareWhatsApp() {
        const whatsappUrl = `https://wa.me/?text=${this.message}%20${this.url}`;
        window.open(whatsappUrl, "_blank");
      }
    
      shareLinkedIn() {
        // LinkedIn mainly shares URLs; messages are usually not accepted
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${this.url}`;
        window.open(linkedInUrl, "_blank");
      }
    
      shareTwitter() {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${this.message}%20${this.url}`;
        window.open(twitterUrl, "_blank");
      }
    }
    
    // Usage
    const fullMessage = formData.message + " " + window.location.href;
    const sharer = new ShareButtons(fullMessage, window.location.href);
    sharer.shareWhatsApp();
    

  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-form"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Your Name"
                required
              />
              <label htmlFor="name">Your Name</label>
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Your Email"
                required
              />
              <label htmlFor="email">Your Email</label>
            </div>

            <div className="form-group">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
              <label htmlFor="message">Your Message</label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <div className="form-message success">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="form-message error">
                Oops! Something went wrong. Please try again later.
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
