import React, { Component } from 'react'
import { signIn, signUp, fetchSchedules } from './whats_cookn_api.js';
import './Login.css';
export default class Login extends Component {

    state = {
        signInEmail: '',
        signInPassword: '',
        signUpEmail: '',
        signUpPassword: '',
        schedule_id: 1,
        schedules: null,
    }

    componentDidMount = async () => {
        const data = await fetchSchedules()

        this.setState({
            schedules: data.body
        })
    }

    handleSignUp = async (e) => {
        e.preventDefault();

        const user = await signUp({
            email: this.state.signUpEmail,
            password: this.state.signUpPassword,
            schedule_id: this.state.schedule_id
        });

        this.props.handleToken(user.body.token);
        this.props.history.push('/search');
    }

    handleSignIn = async (e) => {
        e.preventDefault();

        const user = await signIn({
            email: this.state.signInEmail,
            password: this.state.signInPassword
        });

        this.props.handleToken(user.body.token);
        this.props.history.push('/search');
    }

  
    
    render() {
        return (
            <div className='login-content'>
            <div className='form-signin'>
                <form onSubmit={this.handleSignIn} className='login-forms'>
                    <h3 className='form-signs'>Sign-in</h3>
                    <label>
                        
                        <input className='login-input' placeholder='Email'onChange={e => this.setState({ signInEmail: e.target.value})} value={this.state.signInEmail}/>
                    </label>
                    <label>
                        
                        <input className='login-input' placeholder='Password'type='password' onChange={e => this.setState({ signInPassword: e.target.value})} value={this.state.signInPassword}/>
                    </label>
                    <button>Submit</button>
                    
                </form>
                </div>

                <div className='form-signup'>
                <form onSubmit={this.handleSignUp} className='login-forms'>
                    <h3 className='form-signs'>Sign-up</h3>
                    <label>
                        
                        <input className='login-input' placeholder='Email'onChange={e => this.setState({ signUpEmail: e.target.value})} value={this.state.signUpEmail}/>
                    </label>
                    <label>
                        
                        <input className='login-input' placeholder='Password' type='password' onChange={e => this.setState({ signUpPassword: e.target.value})} value={this.state.signUpPassword}/>
                    </label>
                    
                    <select className='fav-select' name='scheduleId' onChange={e => this.setState({ schedule_id: e.target.value})} value={this.state.schedule_id}>
                        {
                            this.state.schedules && this.state.schedules.map((schedule) =>  {
                            return <option value = {schedule.id}>{schedule.name}</option>
                            })
                        }
                    </select> 
                   
                    <button>Submit</button>
                    
                </form>
                </div>
            </div>
        )
    }
}
