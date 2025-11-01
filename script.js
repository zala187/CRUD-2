var form = document.getElementById("myForm"),
  fileInput = document.getElementById("imgInput"),
  imgPreview = document.getElementById("person"),
  userName = document.getElementById("name"),
  age = document.getElementById("age"),
  city = document.getElementById("city"),
  email = document.getElementById("email"),
  phone = document.getElementById("phone"),
  post = document.getElementById("post"),
  sDate = document.getElementById("sDate"),
  submitBtn = document.querySelector(".submit"),
  modal = document.getElementById("exampleModal"), // ✅ fixed
  modalTitle = document.querySelector("#exampleModal .modal-title"),
  userInfo = document.getElementById("data");

let getData = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile"))
  : [];
let isEdit = false,
  editId;

fileInput.onchange = function () {
  imgPreview.src = URL.createObjectURL(fileInput.files[0]);
};

function showInfo() {
  userInfo.innerHTML = "";
  getData.forEach((element, index) => {
    let row = `<tr class="employeeDetails">
      <td>${index + 1}</td>
      <td><img src="${element.picture}" width="50" height="50"></td>
      <td>${element.employeeName}</td>
      <td>${element.employeeAge}</td>
      <td>${element.employeeCity}</td>
      <td>${element.employeeEmail}</td>
      <td>${element.employeePhone}</td>
      <td>${element.employeePost}</td>
      <td>${element.startDate}</td>
      <td id="btnButton">
        <button class="btn btn-warning btn-sm"  onclick="viewInfo(${index})"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg></button>

        <button class="btn btn-warning btn-sm"  onclick="editInfo(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteInfo(${index})">Delete</button>
      </td>
    </tr>`;
    userInfo.innerHTML += row;
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const information = {
    picture: imgPreview.src ? imgPreview.src : "./person.png",
    employeeName: userName.value,
    employeeAge: age.value,
    employeeCity: city.value,
    employeeEmail: email.value,
    employeePhone: phone.value,
    employeePost: post.value,
    startDate: sDate.value,
  };
  if (!isEdit) {
    getData.push(information);
  } else {
    getData[editId] = information;
    isEdit = false;
  }
  localStorage.setItem("userProfile", JSON.stringify(getData));

  form.reset();
  imgPreview.src = "./person.png";
  submitBtn.innerText = "Submit";
  modalTitle.innerText = "Fill the form";

  let modalObj = bootstrap.Modal.getInstance(modal);
  modalObj.hide();

  showInfo();
});
function viewInfo(id){
    
   

    const information = getData[id];
    imgPreview.src = information.picture;
  userName.value = information.employeeName;
  age.value = information.employeeAge;
  city.value = information.employeeCity;
  email.value = information.employeeEmail;
  phone.value = information.employeePhone;
  post.value = information.employeePost;
  sDate.value = information.startDate;

   form.querySelectorAll("input").forEach((input) => {
    input.disabled = true;
  });

  submitBtn.computedStyleMap.display = "none";
  modalTitle.innerText = "Employee Details";
  let modalObj = new bootstrap.Modal(modal);
  modalObj.show();

} 
function deleteInfo(id) {
  getData.splice(id, 1);
  localStorage.setItem("userProfile", JSON.stringify(getData));
  showInfo();
}
function editInfo(id){
    isEdit = true;
    editId = id;

    const information = getData[id];
    imgPreview.src = information.picture;
  userName.value = information.employeeName;
  age.value = information.employeeAge;
  city.value = information.employeeCity;
  email.value = information.employeeEmail;
  phone.value = information.employeePhone;
  post.value = information.employeePost;
  sDate.value = information.startDate;

  submitBtn.innerText = "Update";
  modalTitle.innerText = "Edit Employee";
  let modalObj = new bootstrap.Modal(modal);
  modalObj.show();

} 

modal.addEventListener("hidden.bs.modal", () => {
  form.reset();
  imgPreview.src = "./person.png";
  isEdit = false;
  submitBtn.innerText = "Submit";
  modalTitle.innerText = "Fill the form";
});

showInfo();
