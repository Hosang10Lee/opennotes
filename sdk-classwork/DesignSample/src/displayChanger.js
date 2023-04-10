function displayChanger(id, display) {
  document.getElementById(id).style.display = display;
}

function mainDisplayChanger(idToShow) {
  const mains = document.getElementsByClassName("main");
  const mainArray = [].slice.call(mains);
  if (mainArray.includes(document.getElementById(idToShow))) {
    for (let i = 0; i < mainArray.length; i++) {
      if (mainArray[i].id === idToShow) {
        console.log('Set display as flex:', idToShow);
        displayChanger(idToShow, 'flex');
      } else {
        displayChanger(mainArray[i].id, 'none');
      }
    }
  }
}