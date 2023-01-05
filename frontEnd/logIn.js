function login(e){
    e.preventDefault()
    console.log('login button clicked')
    const userLoginData = {
        email : e.target.email.value,
        password : e.target.password.value
    }
    console.log(userLoginData)

    axios.post('http://localhost:3000/user/login',userLoginData)
    .then(res=>{
        console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })
}