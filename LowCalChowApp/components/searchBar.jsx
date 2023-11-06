import React, { useState, useEffect } from "react";
import { View, Keyboard, Button, ActivityIndicator, TextInput, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";

const Home =() => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [fakeData, setFakeData] = useState();

    // get data from api endpoint
    useEffect(() => {
      const getData = async () => {
        const apiResponse = await fetch(
          "http://localhost:8000/patrons/searchhistory/"
        );
        const data = await apiResponse.json();
        setFakeData(data);
      };
      getData();
    }, []);
    return (
        <View style={styles.root}>
          {!clicked && <Text style={styles.title}>Search for a Menu Item</Text>}
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
          {!fakeData ?( <ActivityIndicator size="large" />)
    :(
              <List
                searchPhrase={searchPhrase}
                data={fakeData}
                setClicked={setClicked}
              />
    
         ) }
        </View>
      );
};
function Search({ navigation, route }) {
    const { access } = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity style={styles.navbarItem}
                    onPress={() => navigation.navigate("Patron Settings Page", { access })}
                >
                    <Icon name="gear" size={24} color="#000000" />
                    <Text style={styles.navbarText}></Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navbarItem}
                    onPress={() => navigation.navigate("Bookmark", { access })}
                >
                    <Icon name="bookmark" size={25} color="#000000" />
                    <Text style={styles.navbarText}></Text>
                </TouchableOpacity>
                <Text style={styles.title}>Search</Text>
                <TouchableOpacity
                    style={styles.navbarItem}
                    onPress={() => navigation.navigate("Patron Homepage", { access })}
                >
                    <Icon name="home" size={24} color="#000000" />
                    <Text style={styles.navbarText}></Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navbarItem}
                    onPress={() => navigation.navigate("Search", { access })}
                >
                    <Icon name="search" size={24} color="#000000" />
                    <Text style={styles.navbarText}></Text>
                </TouchableOpacity>
            </View>
            <View style={styles.mainContent}>
                <Home />

                {/*{!clicked && <Text style={styles.title}> Quick Search </Text>}
                <SearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={setSearchPhrase}
                    clicked={clicked}
                    setClicked={setClicked}
                />
                <Text style={styles.title}>Advanced Search</Text>*/}
            </View>

        </View>

    );
};
const Results = ({ message, results }) => (
    <View style={styles.title}>
      <Text style={styles.mainContent}>{message}</Text>
      <Text style={styles.mainContent}>{results}</Text>
    </View>
  );
  
  // the filter
  const List = ( props ) => {
    const renderResults = ({ results }) => {
      // when no input, show all
      if (props.searchPhrase === "") {
        return <Results name={results} />;
      }
      // filter of the name
      if (results.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return <Results name={results}  />;
      }
      
    };
   
    return (
      <View style={styles.mainContent}>
        <View
          onStartShouldSetResponder={() => {
            props.setClicked(false);
          }}
        >
          <FlatList
            data={props.data}
            renderResults={renderResults}
            keyExtractor={(results) => results.id}
          />
        </View>
        </View>
    );
  };
const AdvancedSearch = ({ }) => {
    return (
        <View style={styles.container}>

        </View>
    );
};

const SearchBar = (props) => {
return(
        <View style={styles.container}>
            <View
                style={
                    !props.clicked
                        ? styles.searchBar__unclicked
                        : styles.searchBar__clicked
                }
            >
                <Feather
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={props.searchPhrase}
                    onChangeText={props.setSearchPhrase}
                    onFocus={() => {
                        props.setClicked(true);
                    }}
                />
            {props.clicked && (
                <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              props.setSearchPhrase("")
          }}/>
        )}
      </View>
      {props.clicked && (
        <View>
          <Button
            title="Submit"
            onPress={() => {
              Keyboard.dismiss();
              props.setClicked(false);
            }}
                    ></Button>
                </View>
            )}
            </View>   
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    mainContent: {
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: "top",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    navbar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#FFA500",
        padding: 10
    },
    navbarItem: {
        backgroundColor: "#FFA500",
        alignItems: "left",
        flexDirection: "row", // Align icon and text horizontally
    },
    navbarText: {
        color: "#000000",
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: 10,
    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#f0f8ff",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#b0c4de",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
});
export default Search;