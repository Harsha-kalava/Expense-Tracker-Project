async function login(e){
    try{
        e.preventDefault()
        console.log('login button clicked')
        const userLoginData = {
            email : e.target.email.value,
            password : e.target.password.value
        }
        console.log(userLoginData)
    
        const res = await axios.post('http://localhost:3000/user/login',userLoginData)
        console.log(res,'response')
        const parent = document.getElementById('success')
        if(res.status === 200){
            console.log('successfully created')
            const para = document.createElement("p");
            const textNode = document.createTextNode("Login successfull!!!");
            para.appendChild(textNode);
            parent.appendChild(para)

            await setTimeout(function() {
                document.getElementById('success').style.display = 'none';
              }, 2000); // 5000 milliseconds = 5 seconds 
        }

    }
    catch(err){
        
    }
    
}