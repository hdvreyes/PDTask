import MainView from "./Main/MainView";
import DetailView from "./Detail/DetailView";

/**
 * Will define the screens here.
 * We're using react-native-navigation as our navigation dependency
 * We need to define/register the screens prior to be able to use them
 * There are 3 parameters:
 * title: String - Will serve as the title of the screen [Optional]
 * name: String - This will be the unique identifier [Required]
 * view: String - The actual component to render [Required]
 */
// For additional screen, append them here
export const screens = [
  {
    title: "Main",
    name: "com.screen.MainView",
    view: MainView
  },
  {
    title: "Details",
    name: "com.screen.DetailView",
    view: DetailView
  }
];
