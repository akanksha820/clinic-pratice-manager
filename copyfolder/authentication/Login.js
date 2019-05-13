import React from 'react'
import axios from '../config/axios'
import { Redirect } from 'react-router-dom'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password: '',
            redirect : false,
            notice : ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        e.persist()
        this.setState(() =>({
            [e.target.name] : e.target.value
        }))
    }

    handleSubmit(e){
        e.preventDefault()
        const formData = {
            email : this.state.email,
            password : this.state.password
        }
        axios.post('/users/login' , formData)
            .then((response) => {
                axios.defaults.headers['x-auth'] = response.data.token
                localStorage.setItem('token' , response.data.token)
                this.props.handleIsAuthentication(true)
                this.setState(()=>({
                    redirect : true
                }))   
            })
            .catch(err => console.log(err))
    }
    render(){
        if(this.state.redirect){
            return (<Redirect to = "/"/>)
        }
        return(
            <div>
                <h2>Login</h2>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        Email-id
                        <input type = "text" onChange = {this.handleChange}
                        value = {this.state.email} name = "email"/>
                    </label><br/>
                    <label>
                        password
                        <input type = "password" onChange = {this.handleChange}
                        value = {this.state.password} name = "password"/>
                    </label><br/>
                    <input type = "submit"/>
                </form>
            </div>
        )
    }
}
export default Login