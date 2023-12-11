import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from "react-native-vector-icons/FontAwesome";
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { useRoute } from "@react-navigation/native";
import logo from "../assets/icons8-carrot-94.png";
import TagModal from "./tagModal";


function PatronProfileEditPage({ navigation }) {

  const route = useRoute()
  const access = route.params?.access

  const [errors, setErrors] = useState({});

  const [currentUserName, setCurrentUserName] = useState({});

  const [firstName, setFirstName] = useState({});
  const [lastName, setLastName] = useState({});

  const [currentGender, setCurrentGender] = useState({});
  const [currentPrice, setCurrentPrice] = useState({});
  const [currentZip, setCurrentZip] = useState({});
  const [currentRestrictions, setCurrentRestrictions] = useState({});
  const [currentAllergies, setCurrentAllergies] = useState({});
  const [currentTastes, setCurrentTastes] = useState({});
  const [currentCalorieLimit, setCurrentCalorieLimit] = useState({});
  const [currentDisliked, setCurrentDisliked] = useState({});

  const [allergyTags, setAllergyTags] = useState([]);
  const [dietaryRestrictionTags, setDietaryRestrictionTags] = useState([]);
  const [dislikedIngredients, setDislikedIngredients] = useState([]);
  const [patronTasteTags, setPatronTasteTags] = useState([]);

  const [defaultRestrictionTags, setDefaultRestrictionTags] = useState([]);
  const [defaultTasteTags, setDefaultTasteTags] = useState([]);
  const [defaultAllergyTags, setDefaultAllergyTags] = useState([]);
  const [defaultIngredientTags, setDefaultIngredientTags] = useState([]);

  const [selectedRestrictionTags, setSelectedRestrictionTags] = useState([]);
  const [selectedAllergyTags, setSelectedAllergyTags] = useState([]);
  const [selectedTasteTags, setSelectedTasteTags] = useState([]);
  const [selectedIngredientTags, setSelectedIngredientTags] = useState([]);

  const [isTasteTagsModalVisible, setIsTasteTagsModalVisible] = useState(false);
  const [isRestrictionTagsModalVisible, setIsRestrictionTagsModalVisible] =
    useState(false);
  const [isAllergyTagsModalVisible, setIsAllergyTagsModalVisible] =
    useState(false);
  const [isIngredientTagsModalVisible, setIsIngredientTagsModalVisible] =
    useState(false);

  const [dob, setDob] = useState({});

  const [patronId, setPatronId] = useState({});

  const handleGetData = async () => {

    try {
      const response = await fetch("http://localhost:8000/patrons/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        const data = await response.json();

        console.log(data)

        setFirstName(data[0].name.split(" ", 1));
        setLastName(data[0].name.split(" ").slice(1).join(" "));

        setCurrentGender(data[0].gender);
        setCurrentPrice(data[0].price_max);
        setCurrentZip(data[0].zipcode);
        setCurrentRestrictions(data[0].patron_restriction_tag);
        setCurrentAllergies(data[0].patron_allergy_tag);
        setCurrentTastes(data[0].patron_taste_tag);
        setCurrentCalorieLimit(data[0].calorie_limit);
        setCurrentDisliked(data[0].disliked_ingredients);
        setPatronId(data[0].id)
        setDob(data[0].dob);
      }
    }
    catch (error) {
      console.error("Error:", error);
    }

  }

  const fetchDefaultTags = async () => {
    try {
      const response = await fetch(`http://localhost:8000/patrons/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        const patronRestrictionTags =
          responseData[0].patron_restriction_tag.map((tag) => ({
            key: tag.id,
            value: tag.title,
          }));

        const patronTasteTags = responseData[0].patron_taste_tag.map((tag) => ({
          key: tag.id,
          value: tag.title,
        }));

        const patronAllergyTags = responseData[0].patron_allergy_tag.map(
          (tag) => ({
            key: tag.id,
            value: tag.title,
          })
        );

        const patronIngredientTags = responseData[0].disliked_ingredients.map(
          (tag) => ({
            key: tag.id,
            value: tag.title,
          })
        );

        setDefaultRestrictionTags(patronRestrictionTags);
        setDefaultTasteTags(patronTasteTags);
        setDefaultAllergyTags(patronAllergyTags);
        setDefaultIngredientTags(patronIngredientTags);
      } else {
        console.error(await response.json());
      }
    } catch (error) {
      console.error("Error fetching default taste tags", error);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    fetchDefaultTags();
  }, []);

  useEffect(() => {
    setSelectedRestrictionTags(defaultRestrictionTags.map((tag) => tag.key));
    setSelectedTasteTags(defaultTasteTags.map((tag) => tag.key));
    setSelectedAllergyTags(defaultAllergyTags.map((tag) => tag.key));
    setSelectedIngredientTags(defaultIngredientTags.map((tag) => tag.key));
  }, [
    defaultTasteTags,
    defaultRestrictionTags,
    defaultAllergyTags,
    defaultIngredientTags,
  ]);

  const openTasteTagsModal = () => {
    setIsTasteTagsModalVisible(true);
  };

  const closeTasteTagsModal = () => {
    setIsTasteTagsModalVisible(false);
  };

  const openRestrictionTagsModal = () => {
    setIsRestrictionTagsModalVisible(true);
  };

  const closeRestrictionTagsModal = () => {
    setIsRestrictionTagsModalVisible(false);
  };

  const openAllergyTagsModal = () => {
    setIsAllergyTagsModalVisible(true);
  };

  const closeAllergyTagsModal = () => {
    setIsAllergyTagsModalVisible(false);
  };

  const openIngredientTagsModal = () => {
    setIsIngredientTagsModalVisible(true);
  };

  const closeIngredientTagsModal = () => {
    setIsIngredientTagsModalVisible(false);
  };

  function updateInfo() {
    handleUpdateInfo();
  }

  const handleTasteTagSelect = (selectedTasteTag) => {
    const isSelected = selectedTasteTags.includes(selectedTasteTag.key);

    if (isSelected) {
      setSelectedTasteTags(
        selectedTasteTags.filter((tagKey) => tagKey !== selectedTasteTag.key)
      );
    } else {
      setSelectedTasteTags([...selectedTasteTags, selectedTasteTag.key]);
    }
  };

  const handleRestrictionTagSelect = (selectedRestrictionTag) => {
    const isSelected = selectedRestrictionTags.includes(
      selectedRestrictionTag.key
    );

    if (isSelected) {
      setSelectedRestrictionTags(
        selectedRestrictionTags.filter(
          (tagKey) => tagKey !== selectedRestrictionTag.key
        )
      );
    } else {
      setSelectedRestrictionTags([
        ...selectedRestrictionTags,
        selectedRestrictionTag.key,
      ]);
    }
  };

  const handleAllergyTagSelect = (selectedAllergyTag) => {
    const isSelected = selectedAllergyTags.includes(selectedAllergyTag.key);

    if (isSelected) {
      setSelectedAllergyTags(
        selectedAllergyTags.filter(
          (tagKey) => tagKey !== selectedAllergyTag.key
        )
      );
    } else {
      setSelectedAllergyTags([...selectedAllergyTags, selectedAllergyTag.key]);
    }
  };

  const handleIngredientSelect = (selectedIngredientTag) => {
    const isSelected = selectedIngredientTags.includes(
      selectedIngredientTag.key
    );

    if (isSelected) {
      setSelectedIngredientTags(
        selectedIngredientTags.filter(
          (tagKey) => tagKey !== selectedIngredientTag.key
        )
      );
    } else {
      setSelectedIngredientTags([
        ...selectedIngredientTags,
        selectedIngredientTag.key,
      ]);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/restaurants/tags/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const dietary_tags = data.restrictiontags.map((tag) => ({
          key: tag.id,
          value: tag.title,
        }));

        const allergy_tags = data.allergytags.map((tag) => ({
          key: tag.id,
          value: tag.title,
        }));

        const patron_taste_tags = data.tastetags.map((tag) => ({
          key: tag.id,
          value: tag.title,
        }));

        const ingredient_tags = data.ingredienttags.map((tag) => ({
          key: tag.id,
          value: tag.title,
        }));

        setDietaryRestrictionTags(dietary_tags);
        setAllergyTags(allergy_tags);
        setPatronTasteTags(patron_taste_tags);
        setDislikedIngredients(ingredient_tags);
      })
      .catch((error) => {
        console.error("Errors:", error);
      });
  }, []);

  const handleUpdateInfo = async () => {


    var restrictionTagIds = [];
    var allergyTagIds = [];
    var tasteTagIds = [];
    var dislikedIngredientsTagIds = [];

    for (var i = 0; i < currentRestrictions.length; i++) {
      restrictionTagIds.push(currentRestrictions[i].id)
    }

    for (var i = 0; i < currentAllergies.length; i++) {
      allergyTagIds.push(currentAllergies[i].id)
    }

    for (var i = 0; i < currentTastes.length; i++) {
      tasteTagIds.push(currentTastes[i].id)
    }

    for (var i = 0; i < currentDisliked.length; i++) {
      dislikedIngredientsTagIds.push(currentDisliked[i].id)
    }


    const data = {
      name: firstName + " " + lastName,
      price_max: parseFloat(currentPrice),
      gender: currentGender,
      zipcode: currentZip,
      dob: dob,
      patron_restriction_tag: selectedRestrictionTags,
      patron_allergy_tag: selectedAllergyTags,
      patron_taste_tag: selectedTasteTags,
      disliked_ingredients: selectedIngredientTags,
      calorie_limit: parseInt(currentCalorieLimit)
    }

    console.log(data)

    fetch("http://localhost:8000/patrons/" + patronId + "/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": ("Bearer " + access)
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        response.json()
        if (response.status == "200" || response.status == "201") {
          navigation.navigate("Patron Settings Page", { access: access });
        }
        else {
          alert("There was an issue.")
          console.log(response.status)
        }
      })

  }



  return (
    <View style={styles.container}>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navbarItem}
          onPress={() => navigation.navigate("Patron Settings Page", { access })}
        >
          <Icon name="gear" size={24} color="#000000" />
        </TouchableOpacity>
        <View style={styles.navbarItem}>
          <Image source={logo} style={{ width: 30, height: 30 }} />
          <Text style={styles.navbarText}>Patron Profile Edit</Text>
        </View>
        <View style={styles.navbarItem}>
          <TouchableOpacity style={styles.navbarItem}
            onPress={() => navigation.navigate("Bookmark", { access })}
          >
            <Icon name="bookmark" size={25} color="#000000" />
          </TouchableOpacity>
        </View>

      </View>
      <ScrollView>
        <View style={styles.mainContent}>

          <Text style={styles.otherText}>First Name:</Text>

          <TextInput
            style={styles.input}
            placeholder={`${firstName}`}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />

          <Text style={styles.otherText}>Last Name:</Text>

          <TextInput
            style={styles.input}
            placeholder={`${lastName}`}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />

          <Text style={styles.otherText}>Gender:</Text>

          <Picker
            selectedValue={`${currentGender}`}
            style={{ height: 40, width: "60%", }}
            onValueChange={(itemValue, itemIndex) =>
              setCurrentGender(itemValue)
            }>

            <Picker.Item label="Gender" value="" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Other" value="Other" />

          </Picker>

          <Text style={styles.text}>Price Preference:</Text>

          <TextInput
            style={styles.input}
            placeholder="Max Price (in USD)"
            value={currentPrice}
            onChangeText={(text) => setCurrentPrice(text)}
          />

          <Text style={styles.otherText}>Zipcode:</Text>

          <TextInput
            style={styles.input}
            placeholder={`${currentZip}`}
            value={currentZip}
            onChangeText={(text) => setCurrentZip(text)}
          />

          <Text style={styles.otherText}>Calorie Limit:</Text>

          <TextInput
            style={styles.input}
            placeholder={`${currentCalorieLimit}`}
            value={currentCalorieLimit}
            onChangeText={(text) => setCurrentCalorieLimit(text)}
          />

                <TouchableOpacity
                  onPress={openRestrictionTagsModal}
                  style={styles.tasteTagsButton}
                >
                  <Text style={styles.modalSelectTag}>
                    Select Restriction Tags
                  </Text>
                </TouchableOpacity>

                <TagModal
                  visible={isRestrictionTagsModalVisible}
                  tags={dietaryRestrictionTags}
                  selectedTags={selectedRestrictionTags}
                  onSelect={handleRestrictionTagSelect}
                  onClose={closeRestrictionTagsModal}
                />

                <TouchableOpacity
                  onPress={openTasteTagsModal}
                  style={styles.tasteTagsButton}
                >
                  <Text style={styles.modalSelectTag}>Select Taste Tags</Text>
                </TouchableOpacity>
                <TagModal
                  visible={isTasteTagsModalVisible}
                  tags={patronTasteTags}
                  selectedTags={selectedTasteTags}
                  onSelect={handleTasteTagSelect}
                  onClose={closeTasteTagsModal}
                />

                <TouchableOpacity
                  onPress={openAllergyTagsModal}
                  style={styles.tasteTagsButton}
                >
                  <Text style={styles.modalSelectTag}>Select Allergy Tags</Text>
                </TouchableOpacity>
                <TagModal
                  visible={isAllergyTagsModalVisible}
                  tags={allergyTags}
                  selectedTags={selectedAllergyTags}
                  onSelect={handleAllergyTagSelect}
                  onClose={closeAllergyTagsModal}
                />

                <TouchableOpacity
                  onPress={openIngredientTagsModal}
                  style={styles.tasteTagsButton}
                >
                  <Text style={styles.modalSelectTag}>
                    Select Disliked Ingredients{" "}
                  </Text>
                </TouchableOpacity>

                <TagModal
                  visible={isIngredientTagsModalVisible}
                  tags={dislikedIngredients}
                  selectedTags={selectedIngredientTags}
                  onSelect={handleIngredientSelect}
                  onClose={closeIngredientTagsModal}
                />

          {/*todo*/}
          {/* <Text style={styles.label}>Restrictions:</Text>

        <MultipleSelectList 
              setSelected={(val) => setCurrentRestrictions(val)} 
              data={restrictionsTags} 
              save="key"
              //onSelect={() => alert(ingredSelect)} 
              label="Restrictions"
              defaultOption={currentRestrictions}
              boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
              dropdownStyles={{backgroundColor: '#FECA83'}}
            />
          

        <Text style={styles.label}>Allergies:</Text>

        <MultipleSelectList 
              setSelected={(val) => setCurrentAllergies(val)} 
              data={allergyTags} 
              save="key"
              //onSelect={() => alert(ingredSelect)} 
              label="Allergies"
              defaultOption={currentRestrictions}
              boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
              dropdownStyles={{backgroundColor: '#FECA83'}}
            />

        <Text style={styles.label}>Tastes:</Text>

        <MultipleSelectList 
              setSelected={(val) => setCurrentTastes(val)} 
              data={tasteTags} 
              save="key"
              //onSelect={() => alert(ingredSelect)} 
              label="Tastes"
              defaultOption={currentRestrictions}
              boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
              dropdownStyles={{backgroundColor: '#FECA83'}}
            /> */}


          <TouchableOpacity
            style={[styles.button]}
            onPress={() => updateInfo()}
          >
            <Text style={styles.buttonText}>Update Info</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Patron Homepage", { access })}
        >
          <Icon name="home" size={26} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Search", { access })}
        >
          <Icon name="search" size={24} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarItem}
          onPress={() => navigation.navigate("Menu Item History", { access })}
        >
          <Icon name="book" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    flexDirection: "row",
    fontWeight: "bold",
  },
  input: {
    width: '60%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#FFA500",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
    width: "20%",
  },
  buttonText: {
    padding: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 20,
    marginBottom: 12,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFA500",
    padding: 10,
  },
  navbarItem: {
    backgroundColor: "#FFA500",
    alignItems: "center",
    flexDirection: "row", // Align icon and text horizontally
  },
  navbarText: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  mainContent: {
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "top",
    alignItems: "center",
    flex: 2,
  },
  otherText: {
    paddingTop: 5,

  },
  text: {
    paddingTop: 15,
  },
  buttonContainer: {
    flex: "end",
    flexDirection: "row",
    backgroundColor: "#FFA500",
    width: "100%",
    justifyContent: "space-around",
    padding: 10,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  tasteTagsButton: {
    backgroundColor: "rgba(255, 165, 0, 0.5)",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    width: "40%",
  },
  modalSelectTag: {
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "left",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 200,
  },
});

export default PatronProfileEditPage;