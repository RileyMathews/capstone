import React, { Component } from 'react'
import { Title, Container, Field, Label, Control, Input, Button, Checkbox } from 'bloomer'
import $ from 'jquery'


class LoginView extends Component {

    login = function () {
        const username = $("#login__username").val()
        const password = $("#login__password").val()

        fetch(`http://localhost:8088/users?gamertag=${username}`)
            .then(r => r.json())
            .then(users => {
                const user = users[0]
                if (user === undefined || user.password !== password) {
                    alert("Username or Password not found")

                } else if (password === user.password) {
                    // const remember = document.getElementById("checkbox")

                    // if (remember.checked === true) {
                    //     localStorage.setItem("userId", user.id)
                    // } else {
                    //     localStorage.clear()
                    // }

                    sessionStorage.setItem("userId", user.id)

                    this.props.setActiveUser(user.id)
                    this.props.setView("home")
                    this.props.getUserInformation()
                }
            })
    }.bind(this)

    render() {
        return (
            <Container>
                <Title>Welcome to this app</Title>
                <Field>
                    <Label>Username</Label>
                    <Control>
                        <Input type="text" id="login__username" placeholder='username' />
                    </Control>
                </Field>
                <Field>
                    <Label>Password</Label>
                    <Control>
                        <Input type="text" id="login__password" placeholder='password' />
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Checkbox id="checkbox"> Remember Me </Checkbox>
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Button isColor="primary" id="login__submit" onClick={this.login}>Login</Button>
                    </Control>
                </Field>


            </Container>
        )
    }
}

export default LoginView
