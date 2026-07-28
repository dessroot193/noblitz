function homePage() {
  const homePageButton = document.getElementsByClassName(
    "cc-button-component cc-button-secondary cc-button-x-large cc-bg-secondary cc-button-align-start",
  )[0];
  if (homePageButton) {
    if (homePageButton.href) {
      const href = homePageButton.href.split("&");
      const base = href[2];
      if (base.split("=")[1] < timeControl[0]) {
        href[2] = href[2].split("=")[0] + "=" + timeControl[0];
        href[3] = href[3].split("=")[0] + "=" + timeControl[0];
      }
      homePageButton.href = href.join("&");
      homePageButton.children[1].textContent = `Play ${timeControl[0] / 60}+${timeControl[1]}`;
    }
  }
}
homePage();
