function forgot(e){
    e.preventDefault()
    console.log('forgot button clicked')

    console.log(e.target.name,'target');
    const form = new FormData(e.target);

    const userDetails = {
        email: form.get("email"),

    }
    console.log(userDetails,'user details')
    axios.post('http://localhost:3000/password/forgotpassword',userDetails).then(response => {
        if(response.status === 202){
            const parentElement = document.getElementById('success')   
            const para = document.createElement("p");
            const textNode = document.createTextNode("Reset mail sent. Please check your email");
            para.appendChild(textNode);
            parentElement.appendChild(para)

            setTimeout(function() {
                document.getElementById('success').style.display = 'none';
                location.reload()
            }, 2000); // 5000 milliseconds = 5 seconds
                
            
        } else {
            throw new Error('Something went wrong!!!')
        }
    }).catch(err => {
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })
}




// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'test@example.com', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })