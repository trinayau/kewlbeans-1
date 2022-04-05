const form = document.querySelector("form");
const title = document.getElementById("titleForm");
const description = document.getElementById("descriptionForm");
const content = document.getElementById("contentForm");
const gif = document.getElementById("gifForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = event.target.titleForm.value;
  const description = event.target.descriptionForm.value;
  const content = event.target.contentForm.value;
  const gif = event.target.gifForm.value;

  submitPost(title, description, content, gif);
//   form.reset();
//   redirectHome();
  console.log("Post sent")
});

charCount(title, "titleCount");
charCount(description, "descriptionCount");
charCount(content, "contentCount");

function charCount(formElement, formElementID) {
  formElement.addEventListener("input", event => { 
    const count = formElement.value.length;
    const maxLength = formElement.getAttribute("maxlength");
    document.getElementById(
       formElementID
     ).textContent = `${count}/${maxLength}`;
    if (`${count}` === `${maxLength}`) {
      document.getElementById(formElementID).style.color = "#ff1a1a";
    } else {
      document.getElementById(formElementID).style.color = "black";
    }
  });
}

function submitPost(title, description, content, gif) {
  const newPostElements = {
    title: title,
    description: description,
    content: content,
    gif: gif,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(newPostElements),
  };

  fetch("http://localhost:3000/reviews/newreview", options);
}

function redirectHome() {
  window.location.href = "index.html", options;
}
