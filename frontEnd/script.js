function signup(e){
    e.preventDefault()
    console.log(' signup button clicked')
    const userSignupData = {
        name : e.target.name.value,
        email : e.target.email.value,
        password : e.target.password.value
    }
    console.log(userSignupData)
    axios.post('http://localhost:3000/user/signup',userSignupData)
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log('error occurred here',err)
    })
}
