// Edit task function 
function edit_Task(btn) {
  var li = btn.parentElement;
  var span = li.querySelector('span');
  var oldText = span.textContent;
  // Create input box
  var input = document.createElement('input');
  input.type = 'text';
  input.value = oldText;
  input.style.flex = '1';
  input.style.fontSize = '1.2rem';
  // Replace span with input
  li.replaceChild(input, span);
  btn.textContent = 'Save';
  btn.onclick = function() {
    var newText = input.value.trim();
    if (newText === "") {
      alert("Task cannot be empty");
      return;
    }
    // Restore span with new text
    var newSpan = document.createElement('span');
    newSpan.textContent = newText;
    newSpan.setAttribute('data-task', newText);
    li.replaceChild(newSpan, input);
    btn.textContent = 'Edit';
    btn.onclick = function() { edit_Task(btn); };
    // Update checkbox data-task
    var checkbox = li.querySelector('input[type="checkbox"]');
    if (checkbox) checkbox.setAttribute('data-task', newText);
    saveinco();
  };
}
window.onload = function () {
  let saved = localStorage.getItem("data");
  let saved1 = localStorage.getItem("data1");

  
  document.getElementsByClassName("inco")[0].innerHTML = '<h3 id="yet" class="section-title">TO DO</h3>' + (saved ? saved : "");
  document.getElementsByClassName("co")[0].innerHTML = '<h3 id="done" class="section-title">DONE</h3>' + (saved1 ? saved1 : "");

  
  var incoDiv = document.getElementsByClassName("inco")[0];
  var editBtns = incoDiv.querySelectorAll('button#editBtn');
  editBtns.forEach(function(btn) {
    btn.onclick = function() { edit_Task(btn); };
  });
};


function Task() {
  var inputValue = document.getElementById("input1").value;
  var inputDate = document.getElementById("inputDate").value;
  var inputTime = document.getElementById("inputTime").value;
  if(inputValue === "") {
    alert("Enter your task correctly");
    return;
  }
  document.getElementById("input1").value = "";
  document.getElementById("inputDate").value = "";
  document.getElementById("inputTime").value = "";
  var var1 = document.createElement("li");
  var1.innerHTML = `<input type="checkbox" onclick="task_com(this)" data-task="${inputValue}">
    <span data-task="${inputValue}">${inputValue}</span>
    <div class='task-meta'><small>${inputDate ? inputDate : ''} ${inputTime ? inputTime : ''}</small></div>
    <button id="editBtn" onclick="edit_Task(this)">Edit</button>
    <button id="gh" onclick="del_Task(this)">X</button>`;
  var var3 = document.getElementsByClassName("inco")[0];
  var3.appendChild(var1);
  saveinco();

}

function del_Task(btn){
    btn.parentElement.remove();
    saveinco();
}

function task_com(span){
    var var5 = span.getAttribute("data-task");
    del_Task(span);
    var var2 = document.getElementsByClassName("co")[0];
    var var4 = document.createElement("li");
    var4.innerHTML = `<span>${var5}</span>
    <button id="gh" onclick="del_Task(this)" onclick ="saveinco()">X</button>`;
    var2.appendChild(var4);
    saveinco();
}
function saveinco(){
 
  var incoDiv = document.getElementsByClassName("inco")[0];
  var coDiv = document.getElementsByClassName("co")[0];
  var incoTasks = "";
  var coTasks = "";
 
  Array.from(incoDiv.children).forEach(function(child) {
    if (child.tagName === "LI") incoTasks += child.outerHTML;
  });
  Array.from(coDiv.children).forEach(function(child) {
    if (child.tagName === "LI") coTasks += child.outerHTML;
  });
  localStorage.setItem("data", incoTasks);
  localStorage.setItem("data1", coTasks);
}
