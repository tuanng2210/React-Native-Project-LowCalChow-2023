// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome"; // Import the FontAwesome icons

// function RestaurantHomepage({ navigation }) {
//   return (
//     <View style={styles.container}>
//       {/* Sidebar */}
//       <View style={styles.sidebar}>
//         {/* Analytics */}
//         <TouchableOpacity
//           style={styles.sidebarItem}
//           onPress={() => navigation.navigate("Analytics")}
//         >
//           <Icon name="line-chart" size={24} color="#fff" />{" "}
//           {/* Add icon here */}
//           <Text style={styles.sidebarItemText}>Analytics</Text>
//         </TouchableOpacity>
//         {/* Account */}
//         <TouchableOpacity
//           style={styles.sidebarItem}
//           onPress={() => navigation.navigate("Account")}
//         >
//           <Icon name="user" size={24} color="#fff" /> {/* Add icon here */}
//           <Text style={styles.sidebarItemText}>Account</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Main content */}
//       <View style={styles.mainContent}>
//         <Text style={styles.mainHeading}>Welcome to Your Dashboard</Text>
//         {/* Add more content and sections here */}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "row",
//   },
//   sidebar: {
//     width: 250,
//     backgroundColor: "#FF9800",
//     padding: 20,
//   },
//   restaurantLogo: {
//     width: 150, // Adjust the logo size as needed
//     height: 150,
//     resizeMode: "contain",
//   },
//   sidebarItem: {
//     backgroundColor: "#FF9800",
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     alignItems: "center",
//     marginBottom: 12,
//     flexDirection: "row", // Align icon and text horizontally
//   },
//   sidebarItemText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginLeft: 10, // Add some spacing between icon and text
//   },
//   mainContent: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   mainHeading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
// });

// export default RestaurantHomepage;
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the FontAwesome icons

function RestaurantHomepage({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        {/* Analytics */}
        <TouchableOpacity
          style={styles.sidebarItem}
          onPress={() => navigation.navigate("Analytics")}
        >
          <Icon name="line-chart" size={24} color="#fff" />
          <Text style={styles.sidebarItemText}>Analytics</Text>
        </TouchableOpacity>
        {/* Account */}
        <TouchableOpacity
          style={styles.sidebarItem}
          onPress={() => navigation.navigate("Account")}
        >
          <Icon name="user" size={24} color="#fff" />
          <Text style={styles.sidebarItemText}>Account</Text>
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View style={styles.mainContent}>
        <Text style={styles.mainHeading}>Welcome to Your Dashboard</Text>
        {/* Add more content and sections here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 250,
    backgroundColor: "#FF9800",
    padding: 20,
  },
  restaurantLogo: {
    width: 150, // Adjust the logo size as needed
    height: 150,
    resizeMode: "contain",
  },
  sidebarItem: {
    backgroundColor: "#FF9800",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 12,
    flexDirection: "row", // Align icon and text horizontally
  },
  sidebarItemText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10, // Add some spacing between icon and text
  },
  mainContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default RestaurantHomepage;
