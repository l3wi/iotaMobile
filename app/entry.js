import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";

import { registerScreens } from "./loadRoutes";
import { store } from "./libs/store";
// screen related book keeping
registerScreens(store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: "auth", // unique ID registered with Navigation.registerScreen
    navigatorStyle: { navBarHidden: true }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  },
  drawer: {
    // optional, add this if you want a side menu drawer in your app
    left: {
      // optional, define if you want a drawer from the left
      screen: "menu", // unique ID registered with Navigation.registerScreen
      passProps: {} // simple serializable object that will pass as props to all top screens (optional)
    },
    disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
  },
  passProps: {} // simple serializable object that will pass as props to all top screens (optional)
});
// export default class Entry extends Component {
//   render() {
//     return (
//       <Wrapper>
//         <StatusBar backgroundColor="blue" barStyle="light-content" />
//         <SimpleApp />
//       </Wrapper>
//     );
//   }
// }

// const Wrapper = styled.View`
//     height: 100%;
//     width:100%;
// `;
