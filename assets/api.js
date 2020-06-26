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

userAction();
