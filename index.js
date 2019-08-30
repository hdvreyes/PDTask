/**
 * @format
 */
import { Navigation } from "react-native-navigation";
import { screens } from "./src/screens/screens";
import defaultOptions from "library/config/defaultOptions";
import { Provider } from 'react-redux';
import storeConfiguration from './src/redux/storeConfiguration';
const store = storeConfiguration();

/**
 * This function will iterate thru the screens 
 * and register the components for react-native-navigation
 */
registerComponents = () => {
  screens.map(screen => {
    // Register the components with redux to React Native Navigation
    Navigation.registerComponentWithRedux(screen.name, () => screen.view, Provider, store);
  });
}

launchApp = () => {
  // Register the views/components
  registerComponents();

  Navigation.events().registerAppLaunchedListener(() => {
    /**
     * Setup the default options [SEE: library/config/defaultOptions] 
     * for further configuration 
     * */ 
    Navigation.setDefaultOptions(defaultOptions);
    /**
     * Setup the root view
     */
    Navigation.setRoot({
      root: {
        stack: {
          children:[{
            component: {
              name: "com.screen.MainView", // SEE: "./src/screens/screens" for the list of defined screens
            }
          }]
        }      
      }
    });
  });
}

// Launch the App/MainView
launchApp();

