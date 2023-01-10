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
    showUserExpense();
  } catch (err) {
    console.log(err);
  }
});

async function showUserExpense() {
  const token = sessionStorage.getItem("token");
  const parentElement = document.getElementById("list");
  try {
    const expenseData = await axios.get(
      'http://localhost:3000/expense/get',{headers:{"Authorization":token}}
    );
    console.log(expenseData,'expense data')
    let data = expenseData.data.message;
    if (expenseData.status === 200) {
      // console.log(expenseData.data.message)
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
        const delres = await axios.delete(`http://localhost:3000/expense/delData/${infoId}`,{headers:{"authorization":token}})
        if(delres.status === 200){
            let ul = document.getElementById("list")
            let li = document.getElementById(infoId)
            ul.removeChild(li)
        }
        }catch(err){
			console.log(err);
		};		
}