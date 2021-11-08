import "../styles/LoginPage.css"
import {useForm} from "react-hook-form";
import cinema from '.././img/cinema.png';
import joinUs from '.././img/JoinUs.png';
import React, {useState} from 'react'
import {Api} from "../apiHandler/apiHandler";
import Cookies from 'universal-cookie';

const LoginPage = () => {
    const [state, setState] = useState({
        isLoginPage: true,
        messages: ""
    });

    const {register, errors, handleSubmit} = useForm({
        mode: "onBlur"
    });

    const {
        register: register2,
        errors: errors2,
        handleSubmit: handleSubmit2,
        watch
    } = useForm({
        mode: "onBlur"
    });

    function details() {
        setState(state => {
            return {
                isLoginPage: !state.isLoginPage,
                messages: ""
            };
        });
    }


    const onLoginSubmit = (data) => {
        Api.login(data.email, data.password).then(response => {
            if (response.status === 200) {
                if (response.data.message === 'success!') {
                    if (response.status === 200) {
                        const cookies = new Cookies();
                        cookies.set('user', response.data.id, {path: '/'});
                        window.location.href = '/';
                    }
                } else {
                    setState(prev => {
                        return {
                            isLoginPage: state.isLoginPage,
                            messages: response.data.message
                        }
                    });
                }
            }

        }).catch((error) => {
            if (error.response) {
                console.log(error.message);
                setState({
                    isLoginPage: state.isLoginPage,
                    messages: error.message
                });
            }
        });
    }

    // const onLoginSubmit = (data) => {
    //     console.log(data);
    //     axios.post(`/login`, {
    //             email: data.email,
    //             password: data.password
    //         }
    //     ).then((r) => {
    //         console.log(r.data);
    //         setState(state => {
    //             return {isLoginPage: state.isLoginPage, messages: state.messages};
    //         });
    //         location.href = '/';
    //     })
    //         .catch(error => {
    //             console.log(error.response);
    //         });
    // }

    const onRegisterSubmit = (data) => {
        console.log('Register');
        console.log(data);

        Api.register(
            data.email,
            data.name,
            data.password,
            data.surname,
            data.nationality,
            data.languages,
            data.dateOfBirth
        ).then(response => {
            if (response.status === 200) {
                console.log('Registered');
            }
        }).catch((error) => {
            if (error.message) {
                setState(prev => {
                    return {
                        isLoginPage: state.isLoginPage,
                        messages: error.message
                    }
                });
            }
        }).then(() => {
            window.location.href = '/login_page';
        });

    }

    return (
        <div className="container-login">
            {state.isLoginPage ?
                <>
                    <div className='login-photo'>
                        <img className='cinema-photo' src={cinema} alt={"this is cool image"}/>
                    </div>
                    <div className="input-container">
                        <div className='form-sign'>
                            <div className="btn-choose" onClick={details}>SIGN UP</div>
                            {state.messages}
                            <form key={1} onSubmit={handleSubmit(onLoginSubmit)} className="login-form">
                                <label htmlFor="email">email</label>
                                <input id='email' placeholder='Email' type="email"  {...register("email", {
                                    required: "required",
                                    pattern: {
                                        value: /\S+@\S+.\S+/,
                                        message: "Entered value does not match email format"
                                    }
                                })}/>
                                {/*{<span role="alert">{errors.email.message}</span>}*/}
                                <label htmlFor="password">password</label>
                                <input id="password" type="password" placeholder='Password'  {...register("password", {
                                    required: "required",
                                    minLength: {
                                        value: 8,
                                        message: "min length is 5"
                                    }
                                })} />
                                {/*{errors.password && <span role="alert">{errors.password.message}</span>}*/}
                                <button className="btn-sing-in" type="submit">LOGIN</button>
                            </form>


                        </div>
                    </div>
                </>
                :
                <>
                    <div className="input-container">
                        <div className="btn-choose" onClick={details}>SIGN IN</div>
                        <form key={2} className='form-register' onSubmit={handleSubmit2(onRegisterSubmit)}>

                            <input id='email' placeholder='Email' type="email"  {...register2("email", {
                                required: "required",
                                pattern: {
                                    value: /\S+@\S+.\S+/,
                                    message: "Entered value does not match email format"
                                }
                            })}/>

                            <input id="password" type="password" placeholder='Password'  {...register2("password", {
                                required: "required",
                                minLength: {
                                    value: 8,
                                    message: "min length is 8"
                                }
                            })} />
                            {/*{errors2.password && <span role="alert">{errors2.password.message}</span>}*/}

                            <input id="passwordConfirm" type="password"
                                   placeholder='Confirm Password'  {...register2("confirm", {
                                validate: (value) => value === watch('password') || "Passwords don't match.",
                                required: "required",
                                minLength: {
                                    value: 8,
                                    message: "min length is 8"
                                }
                            })} />


                            <input id='name' placeholder='Name' type="text"  {...register2("name", {
                                required: "required",
                            })}/>

                            <input id='surname' placeholder='Surname' type="text"  {...register2("surname", {
                                required: "required",
                            })}/>

                            <input className={'date-of-birth'} id='dateOfBirth' placeholder='Surname'
                                   type="date"  {...register2("dateOfBirth", {
                                required: "required",
                            })}/>


                            <input id='nationality' placeholder='Nationality'
                                   type="text"  {...register2("nationality", {
                                required: "required",
                            })}/>


                            <input id='languages' placeholder='Languages' type="text"  {...register2("languages", {
                                required: "required",
                            })}/>

                            <button className="btn-sing-in" type="submit">register</button>
                        </form>
                    </div>
                    <div className='login-photo'>
                        <img className='cinema-photo' src={joinUs} alt={"this is cool image"}/>
                    </div>
                </>
            }


        </div>
    );
};

export default LoginPage;
