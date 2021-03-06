import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { firestore } from '../firebase/config'
import { useNavigation } from '@react-navigation/native'

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<string[]>([])
  const [roomName, setRoomName] = useState('')

  const [modal, setModal] = useState(false)

  const roomsCollection = firestore.collection('rooms')

  const navigation = useNavigation()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleCreateRoom() {
    if (roomName.length > 0) {
      roomsCollection.doc(roomName).set({})

      setRoomName('')
      setModal(false)
    } else {
      setModal(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      const result = await roomsCollection.get()

      let array: string[] = []

      result.docs.forEach((doc) => {
        array.push(doc.id)
      })

      setRooms(array)
    })()
  }, [handleCreateRoom, roomsCollection])

  return (
    <View style={styles.container}>
      <Text style={[styles.whiteText, styles.heading]}>
        {' '}
        Chat<Text style={styles.orangeText}>Friends</Text>{' '}
      </Text>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Chat', { item })}
          >
            <Text style={styles.whiteText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => setModal(true)}>
        <Text style={styles.whiteText}> Create room </Text>
      </TouchableOpacity>
      <Modal
        visible={modal}
        transparent={true}
        onRequestClose={() => setModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Room's name"
              placeholderTextColor="#ddd"
              value={roomName}
              onChangeText={(text) => setRoomName(text)}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleCreateRoom}
            >
              <AntDesign name="check" size={26} color="#ddd" />
              <Text style={styles.whiteText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#111',
  },

  whiteText: {
    color: '#ddd',
    textAlign: 'center',
  },

  button: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#fda10e',
    marginHorizontal: 10,
    width: Dimensions.get('window').width / 2,
    marginBottom: 10,
  },

  heading: {
    color: '#ddd',
    fontSize: 40,
    marginVertical: Dimensions.get('window').height / 6,
  },

  orangeText: {
    color: '#fda10e',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },

  modalContent: {
    backgroundColor: '#555',
    height: Dimensions.get('window').height / 7,
    padding: 10,
  },

  input: {
    padding: 10,
    borderBottomColor: '#fda10e',
    borderBottomWidth: 1,
    color: '#ddd',
  },

  doneButton: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
})

export default Rooms
