let data = JSON.parse(sessionStorage.getItem("data"))
email = data.email
id = data.id
console.log(email, id, "on dom")
async function expense(e) {
  e.preventDefault();

  try {
    const expenseData = {
      price: e.target.price.value,
      desc: e.target.desc.value,
      categ: e.target.categ.value,
    };
    const res = await axios.post(
      `http://localhost:3000/expense/add/${email}`,
      expenseData
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
  const parentElement = document.getElementById("list");
  try {
    const expenseData = await axios.get(
      `http://localhost:3000/expense/get/${id}`
    );
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
    console.log(infoId)
    try{
        const delres = await axios.delete(`http://localhost:3000/expense/delData/?user=${id}&li=${infoId}`)
        if(delres.status === 200){
            let ul = document.getElementById("list")
            let li = document.getElementById(infoId)
            ul.removeChild(li)
        }
        }catch(err){
			console.log(err);
		};		
}