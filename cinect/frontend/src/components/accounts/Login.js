import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import cinema from "../../img/cinema.png";
import "./Login.scss";

export class Login extends Component {
    state = {
        username: "",
        password: "",
    };

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        const { username, password } = this.state;
        return (
            <div className="login-container">
                <div className="login-img">
                    <img className="cinema-img" src={cinema} alt={"this is cool image"} />
                </div>
                <div className="login-form">
                    <div className="login-form-sub">
                        <h2 className="text-center">Login</h2>
                        <form onSubmit={this.onSubmit}>
                            <div className="input-label">
                                <label>Username</label>
                                <input type="text" className="login-input" name="username" onChange={this.onChange} value={username} />
                            </div>

                            <div className="input-label">
                                <label>Password</label>
                                <input type="password" className="login-input" name="password" onChange={this.onChange} value={password} />
                            </div>

                            <div className="w-100 text-center mt-5">
                                <button type="submit" className="btn btn-primary mt-15">
                                    Login
                                </button>
                            </div>
                            <p>
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
