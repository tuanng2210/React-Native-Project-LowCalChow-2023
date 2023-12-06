import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import TagModal from "./tagModal";
//import MultiSelect from 'react-native-multiple-select';

function EditMenu({route, navigation}){
    const mealID = route.params.id;

    const access = route.params.access;

    const restID = route.params.restaurantId;
    
    //all tags from databse
    const [allIngredTags, setAllIngredTags] = useState([]);
    const [allFoodType, setAllFoodType] = useState([]);
    const [allCookStyle, setAllCookStyle] = useState([]);
    const [allRestrictions, setAllRestrictions] = useState([]);
    const [allAllergy, setAllAllergy] = useState([]);
    const [allTaste, setAllTaste] = useState([]);
    const timeOfDay = [
      { key: 'Breakfast', value: 'Breakfast' },
      { key: 'Lunch', value: 'Lunch' },
      { key: 'Dinner', value: 'Dinner' },
      { key: 'Anytime', value: 'Anytime' },
    ];

    const [mealName, setMealName] = useState('');
    const [mealCalories, setCalories] = useState('');
    const [mealPrice, setPrice] = useState('');

    /*const [ingredSelect, setIngredSelect] = useState([]);
    const [foodTypeSelect, setfoodTypeSelect] = useState([]);
    const [cookStyleSelect, setcookStyleSelect] = useState([]);
    const [allergiesSelect, setallergiesSelect] = useState([]);
    const [tasteSelect, settasteSelect] = useState([]);
    const [restrictionSelect, setrestrictionSelect] = useState([]);*/
    const [timeOfDayAvailable, setTOD] = useState([]);
    
    //selected tags in modal
    const [selectedFoodTypeTags, setSelectedFoodTypeTags] = useState([]);
    const [selectedCookStyleTags, setSelectedCookStyleTags] = useState([])
    const [selectedRestrictionTags, setSelectedRestrictionTags] = useState([]);
    const [selectedAllergyTags, setSelectedAllergyTags] = useState([]);
    const [selectedTasteTags, setSelectedTasteTags] = useState([]);
    const [selectedIngredientTags, setSelectedIngredientTags] = useState([]);
    const [selectedTOD, setSelectedTOD] = useState([]);

    const [isTasteTagsModalVisible, setIsTasteTagsModalVisible] = useState(false);
    const [isRestrictionTagsModalVisible, setIsRestrictionTagsModalVisible] =
      useState(false);
    const [isAllergyTagsModalVisible, setIsAllergyTagsModalVisible] =
      useState(false);
    const [isIngredientTagsModalVisible, setIsIngredientTagsModalVisible] =
      useState(false);
    const [isCookStyleModalVisible, setIsCookStyleModalVisible] =
      useState(false);
    const [isFoodTypeModalVisible, setIsFoodTypeModalVisible] =
      useState(false);
    const [isTODModalVisible, setIsTODModalVisible] = useState(false);

    //the ones currently in menu on open edit
    const [presetFoodTypeTags, setPresetFoodTypeTags] = useState([]);
    const [presetCookStyleTags, setPresetCookStyleTags] = useState([]);
    const [presetRestrictionTags, setPresetRestrictionTags] = useState([]);
    const [presetAllergyTags, setPresetAllergyTags] = useState([]);
    const [presetTasteTags, setPresetTasteTags] = useState([]);
    const [presetIngredientsTags, setPresetIngredientsTags] = useState([]);
    const [presetTOD, setPresetTOD] = useState([]);

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

    const openCookStyleModal = () => {
      setIsCookStyleModalVisible(true);
    };

    const closeCookStyleModal = () => {
      setIsCookStyleModalVisible(false);
    };   

    const openFoodTypeModal = () => {
      setIsFoodTypeModalVisible(true);
    };
    const closeFoodTypeModal = () => {
      setIsFoodTypeModalVisible(false);
    };

    const openTODModal = () => {
      setIsTODModalVisible(true);
    };
    const closeTODModal = () => {
      setIsTODModalVisible(false);
    };

    function submitMeal(){
      {/*submit to database here then reset the page*/}
      handleUpdateMeal();
      navigation.navigate('Menu', {access: access, restaurantId: restID});
    }
    function deleteMeal(){
      handleDelMeal();
      navigation.navigate('Menu', {access: access, restaurantId: restID});
    }
    {/*Gets current meal info to be updated*/}
    const handlegetMeal = async () => {
      try {
        const response = await fetch(`http://localhost:8000/restaurants/${restID}/menuitems/${mealID}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access,
          },
        });
        if (response.status === 200) {
          const data = await response.json();

          console.log(data);
          setMealName(data.item_name);
          setCalories(data.calories);
          setPrice(data.price);
          const formcookStyleTags = {
            key: data.cook_style_tags.id,
            value: data.cook_style_tags.title,
          };          
          setPresetCookStyleTags(formcookStyleTags);
          const formfoodTypeTags = {
            key: data.food_type_tag.id,
            value: data.food_type_tag.title,
          };          
          setPresetFoodTypeTags(formfoodTypeTags);
          const formIngredsTags = data.ingredients_tag.map(item => ({
            key: item.id,
            value: item.title,
          }));
          setPresetIngredientsTags(formIngredsTags);
          //setallergiesSelect(getdata.menu_allergy_tag);
          const formAllergyTags = data.menu_allergy_tag.map(item => ({
            key: item.id,
            value: item.title,
          }));
          setPresetAllergyTags(formAllergyTags);
          //setrestrictionSelect(getdata.menu_restriction_tag);
          const formRestrictionTags = data.menu_restriction_tag.map(item => ({
            key: item.id,
            value: item.title,
          }));
          setPresetRestrictionTags(formRestrictionTags);
          const formTasteTags = data.taste_tags.map(item => ({
            key: item.id,
            value: item.title,
          }));
          setPresetTasteTags(formTasteTags);
          setPresetTOD(data.time_of_day_available);
        }
      }catch (error) {
        console.error("Error:", error);
      }
    } 
    useEffect (() => {
      handlegetMeal();

    }, []); 

    useEffect(() => {
      setSelectedRestrictionTags(presetRestrictionTags.map((tag) => tag.key));
      setSelectedTasteTags(presetTasteTags.map((tag) => tag.key));
      setSelectedAllergyTags(presetAllergyTags.map((tag) => tag.key));
      setSelectedIngredientTags(presetIngredientsTags.map((tag) => tag.key));
      setSelectedCookStyleTags([presetCookStyleTags.key]);
      setSelectedFoodTypeTags([presetFoodTypeTags.key]);
      setSelectedTOD(presetTOD.key);
      console.log('Set the presets');
    }, [
      presetAllergyTags,
      presetCookStyleTags,
      presetFoodTypeTags,
      presetIngredientsTags,
      presetRestrictionTags,
      presetTOD,
      presetTasteTags
    ]);

    {/*Send data to backend to add menu item */}
    const handleUpdateMeal = async () => {
      const data = {
        "item_name": mealName,
        "price": mealPrice,
        "calories": mealCalories,
        "food_type_tag": foodTypeSelect,
        "taste_tags": tasteSelect,
        "cook_style_tags": cookStyleSelect,
        "menu_restriction_tag": restrictionSelect,
        "menu_allergy_tag": allergiesSelect,
        "ingredients_tag": ingredSelect,
        "time_of_day_available": timeOfDayAvailable,
        "is_modifable": true
      }
      console.log(data);
      try{
        const response = await fetch(`http://localhost:8000/restaurants/${restID}/menuitems/${mealID}/`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
        body: JSON.stringify(data),
      });
        if (response.status === 200) {
          const data = await response.json();

        }
      }catch (error) {
        console.error("Error:", error);

    }
  } 
    {/*get the tags to put in drop down lists for menu create */}
    const handlegetfoodTags = async () => {
        try{
          const response = await fetch("http://localhost:8000/restaurants/foodtypetags/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access,
          },
          
        });
        if (response.status === 200) {
          const data = await response.json();
          const formTags = data.map(item => ({
            key: item.id,
            value: item.title,
          }));
          setAllFoodType(formTags);  
        }
      }catch (error) {
        console.error("Error:", error);
      }

      try {
        const response = await fetch("http://localhost:8000/restaurants/ingredienttags/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          const formTags = data.map(item => ({
            key: item.id,
            value: item.title,
          }));
          setAllIngredTags(formTags);  
        }
      }catch (error) {
        console.error("Error:", error);
      }

      try{
        const response = await fetch("http://localhost:8000/restaurants/cookstyletags/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
        
      });
      if (response.status === 200) {
        const data = await response.json();
        const formTags = data.map(item => ({
          key: item.id,
          value: item.title,
        }));
        setAllCookStyle(formTags);  
      }
    }catch (error) {
      console.error("Error:", error);
    }

    try {
      const response = await fetch("http://localhost:8000/restaurants/tastetags/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        const formTags = data.map(item => ({
          key: item.id,
          value: item.title,
        }));
        setAllTaste(formTags);  
      }
    }catch (error) {
      console.error("Error:", error);
    }

    try {
      const response = await fetch("http://localhost:8000/restaurants/restrictiontags/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        const formTags = data.map(item => ({
          key: item.id,
          value: item.title,
        }));
        setAllRestrictions(formTags);  
      }
    }catch (error) {
      console.error("Error:", error);
    }

    try {
      const response = await fetch("http://localhost:8000/restaurants/allergytags/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + access,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        const formTags = data.map(item => ({
          key: item.id,
          value: item.title,
        }));
        setAllAllergy(formTags);  
      }
    }catch (error) {
      console.error("Error:", error);
    }

    } 
    useEffect (() => {
      handlegetfoodTags();
    }, []);

    const handleDelMeal = async () => {
      try {
        const response = await fetch(`http://localhost:8000/restaurants/${restID}/menuitems/${mealID}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access,
          },
        });
        if (response.status === 200) {
        
        }
      }catch (error) {
          console.error("Error:", error);
      }
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
    const handleCookStyleSelect = (selectedCookStyleTag) => {
      const isSelected = selectedCookStyleTags.includes(
        selectedCookStyleTag.key
      );
  
      if (isSelected) {
        setSelectedCookStyleTags(
          selectedCookStyleTags.filter(
            (tagKey) => tagKey !== selectedCookStyleTag.key
          )
        );
      } else {
        setSelectedCookStyleTags([
          ...selectedCookStyleTags,
          selectedCookStyleTag.key,
        ]);
      }
    };
    const handleFoodTypeSelect = (selectedFoodTypeTag) => {
      const isSelected = selectedFoodTypeTags.includes(
        selectedFoodTypeTag.key
      );
  
      if (isSelected) {
        setSelectedFoodTypeTags(
          selectedFoodTypeTags.filter(
            (tagKey) => tagKey !== selectedFoodTypeTag.key
          )
        );
      } else {
        setSelectedFoodTypeTags([
          ...selectedFoodTypeTags,
          selectedFoodTypeTag.key,
        ]);
      }
    };
    const handleTODSelect = (selectedTODTag) => {
      const isSelected = selectedTOD.includes(
        selectedTODTag.key
      );
  
      if (isSelected) {
        setSelectedTOD(
          selectedTOD.filter(
            (tagKey) => tagKey !== selectedTODTag.key
          )
        );
      } else {
        setSelectedTOD([
          ...selectedTOD,
          selectedTODTag.key,
        ]);
      }
    };
    
    return (
      <ScrollView style = {{ flex: 1}}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Update Meal</Text>
    
          {/*Meal Name*/}
          <Text style={styles.label}>Meal Name:</Text>

          <TextInput
            style={styles.input}
            placeholder={`${mealName}`}
            value={mealName}
            onChangeText={(text) => setMealName(text)}
          />
    
          {/* Meal Description
          <TextInput
            style={styles.input}
            placeholder={`${description}`}
            value={description}
            onChangeText={(text) => setDescription(text)}
          /> */}

          {/*Meal Price*/}
          <Text style={styles.label}>Price of meal:</Text>

          <TextInput
            style={styles.input}
            placeholder="{mealPrice}"
            value={mealPrice}
            onChangeText={(text) => setPrice(text)}
          />

          {/*Meal Calories*/}
          <Text style={styles.label}>Meal's Calories:</Text>
          <TextInput
            style={styles.input}
            placeholder="{mealCalories}"
            value={mealCalories}
            onChangeText={(text) => setCalories(text)}
          />
          
    
          {/*Ingredients*/}
          <Text style={styles.normText}>Ingredients</Text>

          {/*<MultipleSelectList 
            setSelected={(val) => setIngredSelect(val)} 
            data={ingredientTags} 
            save="key"
            //onSelect={() => alert(ingredSelect)} 
            label="Ingredients"
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
            defaultOption={defaultOptions}
        />*/}
          <TouchableOpacity
              onPress={openIngredientTagsModal}
              style={styles.tasteTagsButton}
          >
          <Text style={styles.modalSelectTag}>
            Select Ingredients{" "}
          </Text>
          </TouchableOpacity>

          <TagModal
            visible={isIngredientTagsModalVisible}
            tags={allIngredTags}
            selectedTags={selectedIngredientTags}
            onSelect={handleIngredientSelect}
            onClose={closeIngredientTagsModal}
          />
    
        

          {/*Food Type*/}
          <Text style={styles.normText}>Type of food</Text>

         {/*} <SelectList 
            setSelected={(val) => setfoodTypeSelect(val)} 
            data={foodTypeTags} 
            save="key"
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
      />*/}
          <TouchableOpacity
            onPress={openFoodTypeModal}
            style={styles.tasteTagsButton}
          >
          <Text style={styles.modalSelectTag}>
            Select Food Type{" "}
          </Text>
          </TouchableOpacity>

          <TagModal
            visible={isFoodTypeModalVisible}
            tags={allFoodType}
            selectedTags={selectedFoodTypeTags}
            onSelect={handleFoodTypeSelect}
            onClose={closeFoodTypeModal}
          />
          

          {/*Cook Style*/}
          <Text style={styles.normText}>Cooking Style</Text>

          <TouchableOpacity
              onPress={openCookStyleModal}
              style={styles.tasteTagsButton}
          >
          <Text style={styles.modalSelectTag}>
            Select Cook Style{" "}
          </Text>
          </TouchableOpacity>

          <TagModal
            visible={isCookStyleModalVisible}
            tags={allCookStyle}
            selectedTags={selectedCookStyleTags}
            onSelect={handleCookStyleSelect}
            onClose={closeCookStyleModal}
          />

          {/*Allergies*/}
          <Text style={styles.normText}>Allergies</Text>

          {/*<MultipleSelectList 
            setSelected={(val) => setallergiesSelect(val)} 
            data={allergyTags} 
            save="key"
            //onSelect={() => alert(allergiesSelect)} 
            label="Allergies"
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
    />*/}
          <TouchableOpacity
              onPress={openAllergyTagsModal}
              style={styles.tasteTagsButton}
            >
            <Text style={styles.modalSelectTag}>Select Allergy Tags</Text>
            </TouchableOpacity>
            <TagModal
              visible={isAllergyTagsModalVisible}
              tags={allAllergy}
              selectedTags={selectedAllergyTags}
              onSelect={handleAllergyTagSelect}
              onClose={closeAllergyTagsModal}
            />

          {/*Taste*/}
          <Text style={styles.normText}>Taste Tags</Text>

          {/*<MultipleSelectList 
            setSelected={(val) => settasteSelect(val)} 
            data={tasteTags} 
            save="key"
            //onSelect={() => alert(foodTypeSelect)} 
            label="Taste Tags"
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
          />*/}

          <TouchableOpacity
              onPress={openTasteTagsModal}
              style={styles.tasteTagsButton}
          >
            <Text style={styles.modalSelectTag}>
                Select Taste Tags{" "}
              </Text>
          </TouchableOpacity>

          <TagModal
            visible={isTasteTagsModalVisible}
            tags={allTaste}
            selectedTags={selectedTasteTags}
            onSelect={handleTasteTagSelect}
            onClose={closeTasteTagsModal}
          />

      
          {/*Restrictions*/}
          <Text style={styles.normText}>Dietary Restrictions</Text>

          {/*<MultipleSelectList 
            setSelected={(val) => setrestrictionSelect(val)} 
            data={restrictionTags} 
            save="key"
            //onSelect={() => alert(foodTypeSelect)} 
            label="Restriction types"
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
        />*/}
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
          tags={allRestrictions}
          selectedTags={selectedRestrictionTags}
          onSelect={handleRestrictionTagSelect}
          onClose={closeRestrictionTagsModal}
        />
          {/*Time Of Day Available*/}
          <Text style={styles.normText}>When is this Meal Available?</Text>

          {/*<SelectList 
            setSelected={(val) => setTOD(val)} 
            data={timeOfDay} 
            save="key"
            defaultOption={timeOfDayAvailable}
            boxStyles={{backgroundColor: '#FDAA3A', borderRadius: 45}}
            dropdownStyles={{backgroundColor: '#FECA83'}}
      />*/}
          <TouchableOpacity
            onPress={openTODModal}
            style={styles.tasteTagsButton}
          >
            <Text style={styles.modalSelectTag}>
                Select when menu item is available
            </Text>
          </TouchableOpacity>

          <TagModal
            visible={isTODModalVisible}
            tags={timeOfDay}
            selectedTags={selectedTOD}
            onSelect={handleTODSelect}
            onClose={closeTODModal}
          />
          
    
          
    
          {/*<Button title="Back to Menu" onPress={() => navigation.navigate('Menu')}/>*/}
          <Button title="Update Meal" 
           onPress={() => submitMeal()}
           style={styles.button}
          />
          <Button title="Delete Meal" 
           onPress={() => deleteMeal()}
           style={styles.button}
          />
        </View>
        
        </SafeAreaView>
        </ScrollView>
 
      );
    }

    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
      RNPicker: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
      },
      title: {
        fontSize: 24,
        marginBottom: 16,
      },
      label: {
        fontSize: 18,
        textAlign: 'left',
        marginBottom: 6,
    },
      normText: {
        fontSize: 16,
        marginBottom: 9,
        marginTop: 18,
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
        backgroundColor: '44E342',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 12,
    },
      buttonText: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 16,
      },
      error: {
          color: 'red',
          fontSize: 20,
          marginBottom: 12,
      },  modalSelectTag: {
        fontSize: 15,
      },
      tasteTagsButton: {
        backgroundColor: "rgba(255, 165, 0, 0.5)",
        borderRadius: 8,
        padding: 10,
        marginVertical: 10,
      },
      modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
      },
    });
    export default EditMenu;
    