function checkTimeControl(element, timeControl) {
  if (element.href) {
    const href = element.href.split("&");
    const base = href[2];
    if (base.split("=")[1] < timeControl[0]) {
      href[2] = href[2].split("=")[0] + "=" + timeControl[0];
      href[3] = href[3].split("=")[0] + "=" + timeControl[0];
    }
    element.href = href.join("&");
    element.children[1].textContent = "Play";
  }
}

const timeControl = [900, 10];

const homePageButton = document.getElementsByClassName(
  "cc-button-component cc-button-secondary cc-button-x-large cc-bg-secondary cc-button-align-start",
)[0];

if (homePageButton) {
  checkTimeControl(homePageButton, timeControl);
}
const selectorButton = document.getElementsByClassName(
  "cc-dropdown-button-component cc-dropdown-button-x-large cc-dropdown-button-secondary cc-bg-secondary cc-dropdown-button-full",
)[0];
selectorButton.addEventListener("click", () => {
  const playOnlineSelector = document.getElementsByClassName(
    "time-selector-section-component",
  );
  if (playOnlineSelector) {
    for (section of playOnlineSelector) {
      if ("BulletBlitz".includes(section.children[0].children[1].textContent)) {
        section.remove();
      }
    }
  }
});
