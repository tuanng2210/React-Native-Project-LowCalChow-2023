import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function Handshake() {
  
  const [responseData, setResponseData] = useState(null)

  const handleHandshake = () => {
    fetch('http://localhost:8000/restaurants/handshake/', {
        method: 'GET',
    })
    .then((response) => {
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        setResponseData(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Handshake</Text>
      <Button title="Handshake" onPress={handleHandshake} />
      {responseData ? (
        <View>
            <Text>Message: {responseData.message}</Text>
            <Text>Content: {responseData.content}</Text>
        </View>
       ) : (
        <Text>No data received yet.</Text>
       )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  output: {
    width: '90%',
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
});

export default Handshake;
