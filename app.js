
//variables
let myLeads = [];
let inputEl = document.getElementById("input-el");

//DOM
let saveTab = document.getElementById("input-btn");
let ulel = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") );
const deleteBtn = document.getElementById("delete-btn");
let savebtn = document.getElementById("input-tab");

//storing the data from the local storage of chrome
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderleads(myLeads);
}

//for delete btn
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    renderleads(myLeads)
})

//for tab button
savebtn.addEventListener("click",()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        renderleads(myLeads)
    })
});

//Storing the Data Given by the User
saveTab.addEventListener("click",()=>{
    myLeads.push(inputEl.value)
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    renderleads(myLeads)
});

//rendering the data given by the user
function renderleads(myLeads) {
    let listItems = "";
    for(let i=0;i<myLeads.length;i++){
        // Normal way is complicated and long
        // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        // Template String
        listItems += 
        `
        <li>
            <a target='_blank' href='${myLeads[i]}'>
                ${myLeads[i]}
            </a>
        </li>
        `
    }
    ulel.innerHTML = listItems;
}