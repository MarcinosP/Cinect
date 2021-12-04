import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";
import joinus from "../../img/JoinUs.png";
import "./Login.scss";

export class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        password2: "",
        name: "",
        surname: "",
        nationality: "",
        languages: "",
        dateOfBirth: new Date(),
    };

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { username, email, password, password2, name, surname, nationality, languages, dateOfBirth } = this.state;
        if (password !== password2) {
            this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
        } else {
            const newUser = {
                username,
                password,
                email,
                name,
                surname,
                nationality,
                languages,
                dateOfBirth,
            };
            this.props.register(newUser);
        }
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        const { username, email, password, password2, name, surname, nationality, languages, dateOfBirth } = this.state;
        return (
            <div className="login-container">
                <div className="login-form">
                    <div className="login-form-sub">
                        <h2 className="text-center">Register</h2>
                        <form onSubmit={this.onSubmit}>
                            <div className="input-label">
                                <label>Username</label>
                                <input type="text" className="login-input" name="username" onChange={this.onChange} value={username} />
                            </div>
                            <div className="input-label">
                                <label>Email</label>
                                <input type="email" className="login-input" name="email" onChange={this.onChange} value={email} />
                            </div>
                            <div className="input-label">
                                <label>Password</label>
                                <input type="password" className="login-input" name="password" onChange={this.onChange} value={password} />
                            </div>
                            <div className="input-label">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    className="login-input"
                                    name="password2"
                                    onChange={this.onChange}
                                    value={password2}
                                />
                            </div>
                            <div className="input-label">
                                <label>Name</label>
                                <input type="text" className="login-input" name="name" onChange={this.onChange} value={name} />
                            </div>
                            <div className="input-label">
                                <label>Surname</label>
                                <input type="text" className="login-input" name="surname" onChange={this.onChange} value={surname} />
                            </div>
                            <div className="input-label">
                                <label>Nationality</label>
                                <input
                                    type="text"
                                    className="login-input"
                                    name="nationality"
                                    onChange={this.onChange}
                                    value={nationality}
                                />
                            </div>
                            <div className="input-label">
                                <label>Languages</label>
                                <input type="text" className="login-input" name="languages" onChange={this.onChange} value={languages} />
                            </div>
                            <div className="input-label">
                                <label>Date of birth</label>
                                <input
                                    type="date"
                                    className="login-input"
                                    name="dateOfBirth"
                                    onChange={this.onChange}
                                    value={dateOfBirth}
                                />
                            </div>
                            <div className="w-100 text-center mt-5">
                                <button type="submit" className="btn btn-primary">
                                    Register
                                </button>
                            </div>
                            <p>
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="login-img">
                    <img className="cinema-img" src={joinus} alt={"this is cool image"} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);
