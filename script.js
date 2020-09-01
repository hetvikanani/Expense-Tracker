// var addtransaction = document.querySelector(".btn");
// addtransaction.addEventListener("click", expence);

// var text = document.querySelector("#text");
// var amount = document.querySelector("#amount");
// var addnewitem = document.querySelector("#list");
// var income = document.querySelector("#money-plus");
// var expense = document.querySelector("#money-minus");
// var final = document.querySelector("#balance");
// var a = 0;
// var b = 0;
// function perment(event) {
//   var del = event.target.parentElement.remove();
//   var taribennechode = event.target.parentElement.children;
//   var chutiya = taribennechode[0].innerHTML;
//   var price = chutiya.split("₹");

//   var stringprice = price[1];
//   var numberprice = parseInt(stringprice);
//   var del = a - numberprice;
//   income.innerHTML = del;

//   expense.innerHTML = b - numberprice;
// }
// function expence() {
//   text.innerHTML = text.value;
//   amount.innerHTML = amount.value;
//   // console.log(amount.value);
//   if (text.value !== "" && amount.value !== "") {
//     var li = document.createElement("li");
//     // if (+amount.value > 0) li.classList.add("plus");
//     // else li.classList.add("minus");
//     li.innerHTML = `${text.value}<span>₹${amount.value}</span><button class="delete-btn">x</button>`;
//     addnewitem.append(li);

//     plusminus();
//     final.innerHTML = `₹  ${a + b}`;
//     var cancle = document.querySelectorAll(".delete-btn");

//     for (var i = 0; i < cancle.length; i++) {
//       cancle[i].addEventListener("click", perment);
//     }
//   }
// }

// function plusminus() {
//   const stringamount = amount.value;
//   // const numberamount = parseInt(amount.value);  // first method
//   const numberamount = +amount.value; //second

//   // console.log(stringamount + 10, numberamount + 10);
//   if (amount.value > 0) {
//     a = a + parseInt(amount.value);
//     income.innerHTML = `₹${a}`;
//   } else {
//     b = b + parseInt(amount.value);
//     expense.innerHTML = `₹${b}`;
//   }
// }

var transiction = [];
var allList = document.querySelector("#list");
document.querySelector(".btn").addEventListener("click", getList);
var text = document.querySelector("#text");
var amount = document.querySelector("#amount");
var totalSpan = document.querySelector("#balance");
var moneyplus = document.querySelector("#money-plus");
var moneyminus = document.querySelector("#money-minus");

function getList() {
  if (text.value !== "" && amount.value !== "") {
    var newName = text.value;
    var newAmount = amount.value;
    var newTransiction = {
      id: randomid(),
      name: newName,
      amount: newAmount,
    };
    transiction.push(newTransiction);

    setList();
    totalBalance();
    totalIncomeExpense();
  } else {
    alert("Please enter both field");
  }
  text.value = "";
  amount.value = "";
  localStorage.setItem("list", JSON.stringify(transiction));
}
function randomid() {
  return Math.random() * 10000000000;
}
function setList() {
  var singlelist = document.createElement("li");
  if (parseInt(transiction[transiction.length - 1].amount) > 0)
    singlelist.classList.add("plus");
  else singlelist.classList.add("minus");
  singlelist.addEventListener("click", deleteItem);
  singlelist.innerHTML = `${
    transiction[transiction.length - 1].name
  }<span>₹${Math.abs(
    +transiction[transiction.length - 1].amount
  )}</span><button class="delete-btn" id=${
    transiction[transiction.length - 1].id
  }>x</button>`;

  allList.append(singlelist);
}

function totalBalance() {
  var total = 0;
  for (let i = 0; i < transiction.length; i++) {
    total = total + +transiction[i].amount;
  }
  totalSpan.innerHTML = "₹" + numberWithCommas(Math.abs(total));
}

function totalIncomeExpense() {
  var totalIncome = 0;
  var totalExpense = 0;

  for (let i = 0; i < transiction.length; i++) {
    if (parseInt(transiction[i].amount) > 0)
      totalIncome = totalIncome + parseInt(transiction[i].amount);
    else totalExpense = totalExpense + parseInt(transiction[i].amount);
  }
  moneyplus.innerHTML = "₹" + numberWithCommas(totalIncome);
  moneyminus.innerHTML = "₹" + numberWithCommas(Math.abs(totalExpense));
}

function deleteItem(event) {
  var temptransiction = [];
  for (let i = 0; i < transiction.length; i++) {
    if (transiction[i].id !== +event.target.id) {
      temptransiction.push(transiction[i]);
    }
  }
  transiction = temptransiction;
  event.target.parentElement.remove();
  totalIncomeExpense();
  totalBalance();
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function init() {
  console.log("sfds");
  transiction = arr;
  totalIncomeExpense();
  totalBalance();
  for (var i = 0; i < arr.length; i++) {
    var newli = document.createElement("li");
    newli.innerHTML = `${arr[i].name}<span>₹${Math.abs(
      +arr[i].amount
    )}</span><button class="delete-btn" id=${arr[i].id}>x</button>`;
    allList.append(newli);
  }
}
var arr = JSON.parse(localStorage.getItem("list"));
if (arr) {
  init();
}
