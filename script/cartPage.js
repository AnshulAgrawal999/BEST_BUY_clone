

let url = `https://6398c0f229930e2bb3c11afd.mockapi.io/`;
console.log(url)
let item = document.getElementById("items");
let price;
let price_summary = document.getElementById("price_summary");
let carousel_card = document.querySelector(".card");
let originalPriceInput = document.querySelector('#original_price')
let discountedPriceInput = document.querySelector('#discounted_price')
let totalPriceInput = document.querySelector('#total_price_num')
let taxPriceInput = document.getElementById("tax_price")


let check_item = JSON.parse(localStorage.getItem("cartItem")) || null;
let cart_container = document.getElementById("cart_main_container");
let empty_container = document.getElementById("empty_main_container");

if(check_item == null){
       empty_container.style.display = "none"
}
else{
       cart_container.style.display = "flex";
}

async function cardItems(id) {
       let category = localStorage.getItem("searchVal");
       console.log(category)
       let request = await fetch(`https://6398c0f229930e2bb3c11afd.mockapi.io/${category}/${id}`);
       let data = await request.json();
       return data;
       // console.log(data)
}



let LSid = JSON.parse(localStorage.getItem('cartItem')) || [];


renderCards()

function getAsCard(item) {

       let obj = {};


       let items = document.createElement('div');
       items.setAttribute("class", "items");

       // 1st
       let item_detail = document.createElement('div');
       item_detail.setAttribute("class", "item_detail");

       let item_detail_image = document.createElement('img');
       item_detail_image.setAttribute("class", "item_detail_image");
       item_detail_image.src = item.img_src;

       let item_detail_title = document.createElement('p');
       item_detail_title.setAttribute("class", "item_detail_title");
       item_detail_title.innerText = item.title;

       item_detail.append(item_detail_image, item_detail_title);

       // 2nd
       let item_availability = document.createElement('div');
       item_availability.setAttribute("class", "item_availability");
       let form = document.createElement('form');
       let input1 = document.createElement('input');
       input1.setAttribute("class", "pickup");
       input1.setAttribute("type", "radio");
       input1.innerText = "Pickup at Aiea";
       let label1 = document.createElement('label');
       label1.setAttribute("for", "pickup");
       label1.setAttribute("name", "availability");
       label1.innerText = "Pickup at Aiea";

       let input2 = document.createElement('input');
       input2.setAttribute("class", "shipping");
       input2.setAttribute("type", "radio");
       let label2 = document.createElement('label');
       label2.setAttribute("for", "shipping");
       label2.setAttribute("name", "availability");
       label2.innerText = "Shipping to 96939";

       input1.append(label1);
       input2.append(label2);
       form.append(input1, label1, input2, label2);

       item_availability.append(form);

       // 3rd
       let item_action = document.createElement('div');
       item_action.setAttribute("class", "item_action");

       let item_action_quantity = document.createElement('select');
       item_action_quantity.setAttribute("class", "item_action_quantity");

       let option1 = document.createElement('option');
       option1.setAttribute("value", "1");
       option1.innerText = "1";

       let option2 = document.createElement('option');
       option2.setAttribute("value", "2");
       option2.innerText = "2";

       let option3 = document.createElement('option');
       option3.setAttribute("value", "3");
       option3.innerText = "3";

       let option4 = document.createElement('option');
       option4.setAttribute("value", "4");
       option4.innerText = "4";

       let option5 = document.createElement('option');
       option5.setAttribute("value", "5");
       option5.innerText = "5";

       item_action_quantity.append(option1, option2, option3, option4, option5);

       item_action_remove = document.createElement('button');
       item_action_remove.setAttribute("class", "item_action_remove");
       item_action_remove.innerText = "Remove";

       item_action.append(item_action_quantity, item_action_remove);

       // 4th
       let item_price = document.createElement('div');
       item_price.setAttribute("class", "item_price");
       item_price.innerText = item.price;



       items.append(item_detail, item_availability, item_action, item_price)
       return items;

}
let originalPrice = 0;
let itemArr = [];
let discountPrice = 0;
let op = 0;
async function renderCards() {
       let render_div = document.getElementById("render_cards");

       await LSid.forEach(id => {
              cardItems(id).then(data => {
                     originalPrice += +data.previous_price;
                     discountPrice += +data.price;
                     // let tax = (((dp) / 100) * 18).toFixed(2);

                     localStorage.setItem("op", JSON.stringify(originalPrice))
                     localStorage.setItem("dp", JSON.stringify(discountPrice))
                     // sessionStorage.setItem("tax", JSON.stringify(tax))
                     // calculateData(data)
                     updateOrderSummary()
                     render_div.append(getAsCard(data))

              })
       })

}
function calculateData(data) {
       let op = JSON.parse(localStorage.getItem('op') || 0)
       let dp = JSON.parse(localStorage.getItem('dp') || 0)
       // op += +data.previous_price;
       // dp += +data.price;

       // sessionStorage.setItem('op', JSON.stringify(op))
       // sessionStorage.setItem('dp', JSON.stringify(dp))
       // console.log('op', op, 'dp', dp)
       updateOrderSummary()
}

function updateOrderSummary(originalPrice, discountPrice) {
       let op = JSON.parse(localStorage.getItem('op'))
       let dp = JSON.parse(localStorage.getItem('dp'))
       let tax = (((dp) / 100) * 18).toFixed(2);
       
       originalPriceInput.innerText = `$${op.toFixed(2) }`;
       discountedPriceInput.innerText = `$${dp.toFixed(2) }`;
       taxPriceInput.innerText = `$${tax}`
       totalPriceInput.innerText = `$${(+dp + +tax).toFixed(2) }`;
       // console.log('originalPrice', op, 'discountPrice', dp)
}