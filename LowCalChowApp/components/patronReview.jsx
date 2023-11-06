import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating';

const ReviewForm = ({ isVisible, onClose, onSubmit }) => {
  
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const handleReviewSubmit = () => {
        onSubmit(rating, review);
        onClose();
    };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <TextInput
          placeholder="Enter your review"
          value={review}
          onChangeText={setReview}
          style={styles.input}
        />
        <Button title="Submit Review" onPress={handleReviewSubmit} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ReviewForm;
