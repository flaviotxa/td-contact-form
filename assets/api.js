const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const formId = urlParams.get("id");
const apiCode = urlParams.get("code");
const apiUrl = `https://${apiCode}.ngrok.io/forms/${formId}`;

const userAction = async () => {
  const response = await fetch(apiUrl);
  const form = await response.json();
  let { fields, title } = form;

  document.getElementById("form_title").innerHTML = title;
  var field_list = document.getElementById("field_list");

  fields.forEach((field) => {
    var li = document.createElement("li");

    li.innerHTML += `
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="${field._id}"
        >
          ${field.label}
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="${field._id}"
          type="${field.field_type}"
        /> 
      </div>`;

    field_list.appendChild(li);
  });
};

const submitForm = async (e) => {
  e.preventDefault();

  const field_list = document
    .getElementById("field_list")
    .getElementsByTagName("li");

  var fields = [];

  for (var i = 0; i < field_list.length; i++) {
    var input = field_list[i].getElementsByTagName("input");

    var field = {};

    field["id"] = input[0].id;
    field["field_value"] = input[0].value;

    fields.push(field);
  }

  var form_fields = {};
  form_fields["fields"] = fields;

  console.log(JSON.stringify(form_fields));

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form_fields),
  });

  document.getElementById(
    "center"
  ).innerHTML = `<p class="text-center text-gray-700 text-3xl font-bold">Thanks for the reply!</p>`;
};

var form = document.getElementById("form");
if (form.attachEvent) {
  form.attachEvent("submit", submitForm);
} else {
  form.addEventListener("submit", submitForm);
}

userAction();
