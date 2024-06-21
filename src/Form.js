import React, { useState,useEffect } from 'react';
import './Form.css'; 
import './App.css'; 


const Form = () => {
    const initialFormData = {
      fullName: '',
      email: '',
      phoneNumber: '',
      position: '',
      experience: '',
      portfolioUrl: '',
      managementExperience: '',
      additionalSkills: [],
      interviewTime: '',
    };
  
    const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
      
        const initialData = {
          fullName: '',
          email: '',
          phoneNumber: '',
          position: '',
          experience: '',
          portfolioUrl: '',
          managementExperience: '',
          additionalSkills: [],
          interviewTime: '',
        };
        setFormData(initialData);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      if (type === 'checkbox') {
        const updatedSkills = checked
          ? [...formData.additionalSkills, value]
          : formData.additionalSkills.filter(skill => skill !== value);
        setFormData({
          ...formData,
          additionalSkills: updatedSkills
        });
      } else {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    };
  
    const validate = () => {
      const validationErrors = {};
  
  
      if (!formData.fullName.trim()) validationErrors.fullName = 'Full Name is required';
  
      if (!formData.email.trim()) {
        validationErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        validationErrors.email = 'Email address is invalid';
      }
  

      if (!formData.phoneNumber.trim()) {
        validationErrors.phoneNumber = 'Phone Number is required';
      } else if (!/^\d+$/.test(formData.phoneNumber)) {
        validationErrors.phoneNumber = 'Phone Number must be a valid number';
      }
  
      if ((formData.position === 'Developer' || formData.position === 'Designer') && (!formData.experience || formData.experience <= 0)) {
        validationErrors.experience = 'Relevant Experience is required and must be greater than 0';
      }
  
      if (formData.position === 'Designer' && !formData.portfolioUrl.trim()) {
        validationErrors.portfolioUrl = 'Portfolio URL is required';
      } else if (formData.position === 'Designer' && !/^https?:\/\/.*\.\w{2,}$/.test(formData.portfolioUrl)) {
        validationErrors.portfolioUrl = 'Portfolio URL is invalid';
      }
  
      if (formData.position === 'Manager' && !formData.managementExperience.trim()) {
        validationErrors.managementExperience = 'Management Experience is required';
      }
  
      if (formData.additionalSkills.length === 0) {
        validationErrors.additionalSkills = 'At least one skill must be selected';
      }
  
      if (!formData.interviewTime.trim()) {
        validationErrors.interviewTime = 'Preferred Interview Time is required';
      }
  
      setErrors(validationErrors);
  
      return Object.keys(validationErrors).length === 0;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const isValid = validate();
  
      if (isValid) {
        setSubmittedData(formData);
        setFormData(initialFormData);
      }
    };
  
    return (
      <div className="container">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Full Name:</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>
  
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
  
          <div className="form-group">
            <label>Phone Number:</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>
  
          <div className="form-group">
            <label>Applying for Position:</label>
            <select name="position" value={formData.position} onChange={handleChange}>
              <option value="">Select Position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
  
          {(formData.position === 'Developer' || formData.position === 'Designer') && (
            <div className="form-group">
              <label>Relevant Experience (years):</label>
              <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
              {errors.experience && <span className="error-message">{errors.experience}</span>}
            </div>
          )}
  
          {formData.position === 'Designer' && (
            <div className="form-group">
              <label>Portfolio URL:</label>
              <input type="text" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} />
              {errors.portfolioUrl && <span className="error-message">{errors.portfolioUrl}</span>}
            </div>
          )}
  
          {formData.position === 'Manager' && (
            <div className="form-group">
              <label>Management Experience:</label>
              <textarea name="managementExperience" value={formData.managementExperience} onChange={handleChange}></textarea>
              {errors.managementExperience && <span className="error-message">{errors.managementExperience}</span>}
            </div>
          )}
  
          <div className="form-group">
            <label>Additional Skills:</label>
            <div>
              <label>
                <input type="checkbox" name="additionalSkills" value="JavaScript" checked={formData.additionalSkills.includes('JavaScript')} onChange={handleChange} />
                JavaScript
              </label>
              <label>
                <input type="checkbox" name="additionalSkills" value="CSS" checked={formData.additionalSkills.includes('CSS')} onChange={handleChange} />
                CSS
              </label>
              <label>
                <input type="checkbox" name="additionalSkills" value="Python" checked={formData.additionalSkills.includes('Python')} onChange={handleChange} />
                Python
              </label>
              
              <label>
                <input type="checkbox" name="additionalSkills" value="React" checked={formData.additionalSkills.includes('React')} onChange={handleChange} />
                React
              </label>
              <label>
                <input type="checkbox" name="additionalSkills" value="Leadership" checked={formData.additionalSkills.includes('Leadership')} onChange={handleChange} />
                Leadership
              </label>
              <label>
                <input type="checkbox" name="additionalSkills" value="Communication" checked={formData.additionalSkills.includes('Communication')} onChange={handleChange} />
                Communication
              </label>
            </div>
            {errors.additionalSkills && <span className="error-message">{errors.additionalSkills}</span>}
          </div>
  
          <div className="form-group">
            <label>Preferred Interview Time:</label>
            <input type="datetime-local" name="interviewTime" value={ formData.interviewTime} onChange={handleChange} />
            {errors.interviewTime && <span className="error-message">{errors.interviewTime}</span>}
          </div>
  
          <button type="submit">Submit</button>
        </form>
  
        {submittedData && (
          <div className="summary">
            <h2>Submitted Data</h2>
            <p><strong>Full Name:</strong> {submittedData.fullName}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
            <p><strong>Applying for Position:</strong> {submittedData.position}</p>
            {(submittedData.position === 'Developer' || submittedData.position === 'Designer') && (
              <p><strong>Relevant Experience:</strong> {submittedData.experience}</p>
            )}
            {submittedData.position === 'Designer' && (
              <p><strong>Portfolio URL:</strong> {submittedData.portfolioUrl}</p>
            )}
            {submittedData.position === 'Manager' && (
              <p><strong>Management Experience:</strong> {submittedData.managementExperience}</p>
            )}
            <p><strong>Additional Skills:</strong> {submittedData.additionalSkills.join(', ')}</p> 
            <p><strong>Preferred Interview Time:</strong>  {submittedData.interviewTime}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default Form;