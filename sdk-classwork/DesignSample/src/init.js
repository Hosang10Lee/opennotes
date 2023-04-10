function init() {
  SpatialNavigation.init();
  SpatialNavigation.add({
    selector: '.item'
  });
  SpatialNavigation.makeFocusable();

  addEventListeners();
  getDeviceInfo();
}

window.addEventListener('load', function () {
  init();
});