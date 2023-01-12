async function expense(e) {
  e.preventDefault();

  try {
    const expenseData = {
      price: e.target.price.value,
      desc: e.target.desc.value,
      categ: e.target.categ.value,
    };
    const token = sessionStorage.getItem("token");
    const res = await axios.post(
      'http://localhost:3000/expense/add',
      expenseData,{headers:{"Authorization":token}}
    );
    console.log(res);
    showUserExpense()
  } catch (err) {
    console.log(err)
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // const parentElement = 

    showUserExpense();
  } catch (err) {
    console.log(err);
  }
});

async function showUserExpense() {
  const token = sessionStorage.getItem("token");
  const parentElement = document.getElementById("list");
  const parentPremium = document.getElementById("razor-button")
  const childPremium = document.getElementById('rzp-button1')
  const parentLeaderBoard = document.getElementById('leaderBoardConitaner')
  try {
    const expenseData = await axios.get(
      'http://localhost:3000/expense/get',{headers:{"Authorization":token}}
    );
    console.log(expenseData,'expense data')
    let data = expenseData.data.message;
    if (expenseData.status === 200) {
      // console.log(expenseData.data.message)
      if(expenseData.data.premium === 1){
        parentPremium.removeChild(childPremium)
        let textNode = document.createTextNode("Premium User");
        parentPremium.appendChild(textNode);
        let leaderButton = document.createElement('button')
        leaderButton.id = 'leaderBoard'
        leaderButton.textContent = 'Leader Board'
        parentLeaderBoard.appendChild(leaderButton)
        leaderButton.onclick = leaderBoard
      }

      parentElement.innerHTML = ''
      data.forEach((info) => {
        console.log(info, "data");
        const li = document.createElement("li")
        li.id = `${info.id}`
        li.className = 'litext'
        li.appendChild(
          document.createTextNode(`${info.price}- ${info.desc}-${info.categ}`)
        );
        parentElement.appendChild(li)

        let delBtn = document.createElement("button")
        delBtn.id = "delete"
        delBtn.className='libtn'
        delBtn.appendChild(document.createTextNode("delete"))
        delBtn.onclick = function() {
            delData(info.id)
        }  
        li.appendChild(delBtn)
        parentElement.appendChild(li)
      });
    }
  } catch (err) {
    console.log(err)
  }
}

async function delData(infoId) {
    console.log(infoId,'delete ID')
    try{
        const token = sessionStorage.getItem('token')
        const delres = await axios.delete(`http://localhost:3000/expense/delData/${infoId}`,{headers:{"Authorization":token}})
        if(delres.status === 200){
            let ul = document.getElementById("list")
            let li = document.getElementById(infoId)
            ul.removeChild(li)
        }
        }catch(err){
			console.log(err);
		};		
}

document.getElementById('rzp-button1').onclick = async function (e) {
  const token = sessionStorage.getItem("token")
  const response  = await axios.get('http://localhost:3000/purchase/premium', {headers:{"Authorization":token}})
  console.log(response,'razorpay resoponse');
  var options =
  {
   "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
   "name": "Test Company",
   "order_id": response.data.order.id, // For one time payment
   "prefill": {
     "name": "Test User",
     "email": "test.user@example.com",
     "contact": "7003442036"
   },
   "theme": {
    "color": "#3399cc"
   },
   // This handler function will handle the success payment
   "handler": function (response) {
       console.log(response);
       axios.post('http://localhost:3000/purchase/update',{
           order_id: options.order_id,
           payment_id: response.razorpay_payment_id,
       }, { headers: {"Authorization" : token} }).then(() => {
           alert('You are a Premium User Now')
           showUserExpense()
       }).catch(() => {
           alert('Something went wrong. Try Again!!!')
       })
   },
};

const rzp1 = new Razorpay(options);
rzp1.open();
e.preventDefault();

rzp1.on('payment.failed', function (response){
alert(response.error.code);
alert(response.error.description);
});
}

async function leaderBoard(e){
  e.preventDefault()
  console.log('clicked on leaderBoard button')
  const token = sessionStorage.getItem("token")
  const response  = await axios.get('http://localhost:3000/purchase/showleaderboard', {headers:{"Authorization":token}})
  console.log(response.data.data);
  let userPrices = response.data.data
    userPrices.forEach(userPrice => {
      const name = userPrice.user.name;
      const totalPrice = userPrice.totalPrice;

      const leaderli = document.createElement("li")
      leaderli.className = 'litext'
      leaderli.appendChild(
        document.createTextNode(`${name}- ${totalPrice}`)
      );  
    document.getElementById("leaderList").appendChild(leaderli)
    });
    
}