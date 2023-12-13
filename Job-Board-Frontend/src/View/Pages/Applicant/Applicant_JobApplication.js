import React from 'react';
import '../styles.css'; // Import your CSS file for styling

const JobApplicationForm = () => {
    return (
        <form>
            <fieldset>
                <legend>Personal Details</legend>

                <div className="form-group">
                    <salutation>
                        Salutation
                        <br />
                        <select name="salutation">
                            <option>--None--</option>
                            <option>Mr.</option>
                            <option>Ms.</option>
                            <option>Mrs.</option>
                            <option>Dr.</option>
                            <option>Prof.</option>
                        </select>
                    </salutation>
                </div>

                <div className="form-group">
                    <label>
                        First name:
                        <input type="text" name="firstName" />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Last name:
                        <input type="text" name="lastName" />
                    </label>
                </div>

                <div className="form-group">
                    Gender:
                    <label>
                        <input type="radio" name="gender" value="male" /> Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="female" /> Female
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Email:
                        <input type="email" name="email" />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Date of Birth:
                        <input type="date" name="birthDate" />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Address:
                        <br />
                        <textarea name="address" cols="30" rows="3"></textarea>
                    </label>
                </div>

                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>

            </fieldset>
        </form>
    );
};

export default JobApplicationForm;

