const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const formId = urlParams.get("id");

const userAction = async () => {
  const response = await fetch(`http://localhost:3333/forms/${formId}`);
  const form = await response.json();
  let { fields, title } = form;

  document.getElementById("form_title").innerHTML = title;
  var field_list = document.getElementById("field_list");

  fields.forEach((field) => {
    var li = document.createElement("li");

    li.innerHTML += `<label>${field.label} </label>
      <div>
        <input
          id="${field._id}"
          name="element_1"
          type="${field.field_type}"
          maxlength="255"
          value=""
        />
      </div>`;

    field_list.appendChild(li);
  });
};

const submitForm = async (e) => {
  if (e.preventDefault) e.preventDefault();

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

  const response = await fetch(`http://localhost:3333/forms/${formId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form_fields),
  });

  document.body.innerHTML = "<p>Thanks for the reply!</p>";
};

var form = document.getElementById("form");
if (form.attachEvent) {
  form.attachEvent("submit", submitForm);
} else {
  form.addEventListener("submit", submitForm);
}

userAction();
