let dialog = document.createElement("dialog");
document.body.appendChild(dialog);

// Customized Alert Function
export function cusAlert(message) {
  // Set up the button in dialog
  dialog.innerHTML = `<p>${message}</p> <button id="ok">OK</button>`;

  let button = document.getElementById("ok");
  button.addEventListener("click", () => {
    dialog.close();
  });

  // Show the dialog
  dialog.showModal();
}

// Customized Confirm Function
export function cusConfirm(message) {
  dialog.innerHTML = `<p>${message}</p> <button id="ok">OK</button> <button id="cancel">Cancel</button>`;

  dialog.showModal();

  let okbutton = document.getElementById("ok");
  let cancelbutton = document.getElementById("cancel");
  return new Promise((resolve) => {
    okbutton.onclick = () => {
      dialog.close();
      resolve(true);
    };

    cancelbutton.onclick = () => {
      dialog.close();
      resolve(false);
    };
  });
}

export function cusPrompt(message) {
  dialog.innerHTML = `<p>${message}</p><input type="text"> <button id="ok">OK</button><button id="cancel">Cancel</button>`;

  dialog.showModal();

  let okbutton = document.getElementById("ok");
  let cancelbutton = document.getElementById("cancel");
  let input = document.querySelector("input");

  return new Promise((resolve) => {
    okbutton.onclick = () => {
      input.focus();
      dialog.close();
      resolve(input.value);
    };

    cancelbutton.onclick = () => {
      dialog.close();
      resolve(false);
    };
  });
}
