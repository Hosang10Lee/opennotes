let lastClickedId = null;
const itemArray = document.getElementsByClassName("item");

function addEventListeners() {
  for (let i = 0; i < itemArray.length; i++) {
    itemArray[i].addEventListener("mouseover", _onMouseOverEvent);
    itemArray[i].addEventListener("click", _onClickEvent);
    itemArray[i].addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
        _onClickEvent(e);
      }
    })
  }
  mainDisplayChanger("main1");
}

function _onClickEvent(e) {
  if (lastClickedId) {
    document.getElementById(lastClickedId).classList.remove("clicked");
  }
  document.getElementById(e.target.id).classList.add("clicked");
  lastClickedId = e.target.id;
  console.log(lastClickedId + " is clicked!")

  switch (e.target.id) {
    case "side1":
      mainDisplayChanger("main1");
      break;
    case "side2":
      mainDisplayChanger("main2");
      break;
    case "side3":
      mainDisplayChanger("main3");
      break;
    default:
      break;
  }
}

function _onMouseOverEvent(e) {
  for (let i = 0; i < itemArray.length; i++) {
    itemArray[i].blur();
  }
  document.getElementById(e.target.id).focus();
}
