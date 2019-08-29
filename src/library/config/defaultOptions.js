import R from "res/R";

export const defaultOptions = {
  statusBar: {
    drawBehind: true,
    visible: true,
    style: "light"
  },
  topBar: {
    visible: true,
    navigatorStyle: { navBarHidden: false },
    clipToBounds: true,
    drawBehind: true,
    animate: false,
    backButton: { color: R.colors.white }, // Android
    buttonColor: R.colors.white, // iOS
    background: {
      color: R.colors.primary
    },
    title: {
      color: R.colors.white,
      fontSize: 15,
      component: {
        padding: 10
      }
    },
    elevation: 0,
    noBorder: true
  },
  bottomTabs: {
    visible: false,
    animate: false,
    drawBehind: true
  }
}
