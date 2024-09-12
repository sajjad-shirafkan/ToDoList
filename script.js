const itemForme=document.getElementById("item-form");
const itemInput=document.getElementById("input-item")
const InputInvalid=document.getElementById("input-invalid");
const listDo=document.getElementById("list-do");
const btnClear=document.getElementById("clear-items");
const filterBox=document.getElementById("filter");
const btnAddItem=document.getElementById("btn-add");
const btnEdite=document.getElementById("btn-Edite");
const btnChangeMode=document.getElementById("change-mode");
let isEditMode=false;
const btnCancelChange=document.getElementById("btn-cancel");
const btnAddListToBox=document.getElementById("add-list-to-box");
const BoxCopy=document.getElementById("BoxCopy");
const btnCopy=document.getElementById("copy-box");
const btnCangeAlign=document.getElementById("change-align");
const doBtns=document.getElementById("y-item");
const dontBtn=document.getElementById("x-item");






const showItem=()=>{
    const itemFormeLocalStoreg=getItemtoSorege();
   itemFormeLocalStoreg.forEach(item =>addItemTopage(item));
   

    
    changePeageUI();

}      
const getItemtoSorege=()=>{
    let itemFormeLocalStoreg;
    if(localStorage.getItem("items")===null){
        itemFormeLocalStoreg=[]
    }else{
        itemFormeLocalStoreg=JSON.parse(localStorage.getItem("items"));
    }
    return itemFormeLocalStoreg;
}
const checkItemToStoreg=item=>{
    let itemFormeLocalStoreg=getItemtoSorege();

   return itemFormeLocalStoreg.includes(item);
}
const addItem=e=>{
    e.preventDefault();

    const newItem = String(itemInput.value);
    itemInput.value="";
    // چک کردن برای خالی نبودن input
    if(newItem.trim() == ""){
        InputInvalid.display="block";
        textInterval("Fille Box","d-none","d-block");
        InputInvalid.style.display="block";
            InputInvalid.textContent='Fill the box';
            setTimeout(()=>{
                InputInvalid.style.display="none";
            },2000);
        return;
    }else{
        InputInvalid.innerText ="";
    }

    if(isEditMode){
        const itemToEdite = listDo.querySelector(".edit-mode");
        removeItemToStoreg(itemToEdite.textContent);
        itemToEdite.remove();
        btnCancelChange.classList.replace("d-inline","d-none");
        btnAddItem.classList.replace("btn-primary","btn-dark");
        btnAddItem.textContent="+ Add Item";
        isEditMode=false;
        doBtns.classList.replace("d-none","d-inline");
        dontBtn.classList.replace("d-none","d-inline");
    }else{
        if(checkItemToStoreg(newItem)){
            InputInvalid.style.display="block";
            InputInvalid.textContent='That Item Already';
            setTimeout(()=>{
                InputInvalid.style.display="none";
            },2000);
            
            return;
        }else{
            InputInvalid.textContent="";
        }
    }

    addItemTopage(newItem);
    addItemToLocalStoreg(newItem);
    changePeageUI();
    
}
const addItemTopage=(item)=>{
    const li = document.createElement('li');
    li.className="item-list";
    li.title="Click For Edit Item"
    li.textContent=item;
    const icon=creatIcon("bi bi-x fs-5 text-danger");
    icon.title="Delet Item"
    li.appendChild(icon);
    listDo.appendChild(li);
}
const textInterval=(txt,class1,class2)=>{
    InputInvalid.textContent=txt;
    InputInvalid.classList.replace(class1,class2);
    

}
const addItemToLocalStoreg=(item)=>{
    let itemFormeLocalStoreg;
    if(localStorage.getItem("items")===null){
        itemFormeLocalStoreg=[]
    }else{
        itemFormeLocalStoreg=JSON.parse(localStorage.getItem("items"));
    }
    itemFormeLocalStoreg.push(item);
    localStorage.setItem("items",JSON.stringify(itemFormeLocalStoreg));
}
const creatIcon=classes=>{
    const icon=document.createElement("i");
    icon.className=classes;
    return icon;
    
}
const clickinItems=e=>{
    if(e.target.classList.contains('bi-x')){
        removeItemToPage(e.target);
    }else{
        addItemToBoxForEdit(e.target);
        btnCancelChange.classList.replace("d-none","d-inline");
        doBtns.classList.replace("d-none","d-inline");
        dontBtn.classList.replace("d-none","d-inline");
        
    }

}
const removeItemToPage=item=>{
    item.parentElement.remove();
        changePeageUI();
        removeItemToStoreg(item.parentElement.textContent);

}
const addItemToBoxForEdit=item=>{
    isEditMode = true;
    listDo.querySelectorAll("li").forEach(item => item.classList.remove("edit-mode"));
        item.classList.add("edit-mode");
       const icon=creatIcon("bi bi-pencil-fill ps-2");
       itemInput.value= item.textContent;
       btnAddItem.classList.replace("btn-dark","btn-primary");
       btnAddItem.textContent="Change Item";
       btnAddItem.appendChild(icon) ;
}
const removeItemToStoreg=item=>{
    let itemFormeLocalStoreg=getItemtoSorege();
    itemFormeLocalStoreg=itemFormeLocalStoreg.filter((i)=> i !== item);
    localStorage.setItem("items",JSON.stringify(itemFormeLocalStoreg))
}
const itemsClear=()=>{
    listDo.innerHTML="";
    changePeageUI();
    localStorage.removeItem("items");
    
}
const changePeageUI=()=>{
    const item=listDo.querySelectorAll("li");
    if(item.length===0){
        btnClear.style.display="none";
        filterBox.style.display="none";
        doBtns.classList.replace("d-inline","d-none");
        dontBtn.classList.replace("d-inline","d-none");
        btnAddListToBox.classList.replace("d-block","d-none");
    }else{
        btnClear.style.display="block";
        filterBox.style.display="block";
        if(BoxCopy.classList.contains("d-none")){
            btnAddListToBox.classList.replace("d-none","d-block");

        }
       
        
    }
    
    item.forEach(item =>{
        if(item.textContent.indexOf("✅")!=-1){
            item.style.backgroundColor="#00940067";
        }else if(item.textContent.indexOf("❌")!=-1){
            item.style.backgroundColor="#e3000052";

        }
    });

    
}
const filterItem=e=>{
const item=listDo.querySelectorAll("li");
const txtSearch =e.target.value.toLowerCase();
item.forEach((item)=> {
const itemText=item.firstChild.textContent.toLowerCase();
if((itemText.indexOf(txtSearch) !== -1)){
    
    item.style.display="flex";
}else{
    item.style.display="none";

}
});
}
const AddListToTagP=(item)=>{
    const paragerafe = document.createElement('p');
    paragerafe.textContent=item;
    BoxCopy.appendChild(paragerafe);

}
const AddListToBox =()=>{
    const itemFormeLocalStoreg=getItemtoSorege();
   itemFormeLocalStoreg.forEach(item =>AddListToTagP(item));
}


// Events
itemForme.addEventListener('submit', e=>{
    addItem(e);
    itemInput.focus();
    doBtns.classList.replace("d-inline","d-none");
    dontBtn.classList.replace("d-inline","d-none");
});
listDo.addEventListener("click",clickinItems);
btnClear.addEventListener("click",itemsClear);
filterBox.addEventListener("input",filterItem);
document.addEventListener("DOMContentLoaded",()=>{
    showItem();
    // Cheack Page Mode From Storage
   if(localStorage.getItem("dark-mode") =="dark"){
    document.body.classList.add("dark-mode");
   }else if(localStorage.getItem("dark-mode")==null){
       document.body.classList.remove("dark-mode");
   }
   if(localStorage.getItem("visit")!="yes"){
    localStorage.setItem("visit","yes");

   }
   
    

});
btnCancelChange.addEventListener("click",()=>{
    listDo.querySelectorAll("li").forEach(item => item.classList.remove("edit-mode"));
    itemInput.value="";
    btnCancelChange.classList.replace("d-inline","d-none");
    btnAddItem.classList.replace("btn-primary","btn-dark");
    btnAddItem.textContent="+ Add Item";
    doBtns.classList.replace("d-inline","d-none");
    dontBtn.classList.replace("d-inline","d-none");
    isEditMode=false;
});
btnChangeMode.addEventListener("click",()=>{
    console.log()
    if(localStorage.getItem("dark-mode") ==null){
        localStorage.setItem("dark-mode","dark");
        document.body.classList.add("dark-mode");
    }else{
        document.body.classList.remove("dark-mode");
        localStorage.removeItem("dark-mode");
    }
    
});
btnAddListToBox.addEventListener("click",()=>{
    BoxCopy.classList.replace("d-none","d-block");
    btnAddListToBox.classList.replace("d-block","d-none");
    AddListToBox();
});
BoxCopy.addEventListener("click",(e)=>{
    if(e.target.id=="close-box"){
        const item=BoxCopy.querySelectorAll("p");
        
        if(item.length!=0){

            btnAddListToBox.classList.replace("d-none","d-block");
        }
        changePeageUI();
        BoxCopy.classList.replace("d-block","d-none");
        BoxCopy.querySelectorAll("p").forEach(item => item.remove())
    }else if(e.target.id=="copy-box"){
        
       navigator.clipboard.writeText(BoxCopy.innerText);
       btnCopy.classList.replace("text-secondary","text-success");
       btnCopy.classList.replace("bi-clipboard-fill","bi-clipboard-check");
       setTimeout(()=>{
       btnCopy.classList.replace("text-success","text-secondary");
       btnCopy.classList.replace("bi-clipboard-check","bi-clipboard-fill");
       },2000);

    }else if(e.target.id=="update-box"){
        BoxCopy.querySelectorAll("p").forEach(item => item.remove());
        AddListToBox();
    }else if(e.target.id=="change-align"){
        if(BoxCopy.classList.contains("text-end")){
            BoxCopy.classList.remove("text-end");
            btnCangeAlign.classList.replace("bi-arrow-bar-left","bi-arrow-bar-right");
            btnCangeAlign.title="To Right";
        }else{
            btnCangeAlign.classList.replace("bi-arrow-bar-right","bi-arrow-bar-left");
            BoxCopy.classList.add("text-end");
            btnCangeAlign.title="To Left";
        }
    }
});
doBtns.addEventListener("click",(e)=>{
    const inpVal= String(itemInput.value);
    e.preventDefault();
    
    if(inpVal.indexOf("✅") == -1 && (inpVal.indexOf("❌"))== -1){
        itemInput.value+="✅";
        addItem(e);
        doBtns.classList.replace("d-inline","d-none");
        dontBtn.classList.replace("d-inline","d-none");
    }else if((inpVal.indexOf("❌"))!= -1){
       itemInput.value= String(itemInput.value).replace("❌","✅");
       addItem(e);
    }
    doBtns.classList.replace("d-inline","d-none");
    dontBtn.classList.replace("d-inline","d-none");
});
dontBtn.addEventListener("click",(e)=>{
    const inpVal= String(itemInput.value);
    e.preventDefault();
    
    if(inpVal.indexOf("✅") == -1 && (inpVal.indexOf("❌"))== -1){
        itemInput.value+="❌";
        addItem(e);
    }else if((inpVal.indexOf("✅"))!= -1){
       itemInput.value= String(itemInput.value).replace("✅","❌");
       addItem(e);
    }
    doBtns.classList.replace("d-inline","d-none");
    dontBtn.classList.replace("d-inline","d-none");
});
changePeageUI();
