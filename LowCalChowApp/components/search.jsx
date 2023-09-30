import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Search({ }) {
    return (
        <View style={styles.container}>
            <Text style={styles.mainHeading}>Search Page</Text>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    mainHeading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
})
export default Search;