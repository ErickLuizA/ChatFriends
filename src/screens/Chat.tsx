import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { firestore } from '../firebase/config'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { AuthContext } from '../context/AuthContext'

interface IMessage {
  message: string
  user: string
  timestamp: number
}

const Chat: React.FC<any> = ({ route }) => {
  const room = route?.params?.item

  const { user } = useContext(AuthContext)

  const roomsCollection = firestore.collection('rooms')

  const [messages, setMessages] = useState<IMessage[]>([])

  const [message, setMessage] = useState('')

  useEffect(() => {
    roomsCollection
      .doc(room)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        let array: IMessage[] = []

        snapshot.docs.forEach((doc) => {
          const data = doc.data() as IMessage

          array.push(data)
        })

        setMessages(array)
      })
  }, [room, roomsCollection])

  const handleSendMessage = () => {
    roomsCollection.doc(room).collection('messages').add({
      message,
      user: user.displayName,
      timestamp: new Date().getTime(),
    })

    setMessage('')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {' '}
        <Text style={styles.orangeText}>{room}</Text>Chat{' '}
      </Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item?.timestamp.toString()}
        renderItem={({ item }) => {
          const date = new Date(item?.timestamp)
          const formatedDate = `${date.getHours()}:${date.getMinutes()} `
          return (
            <View
              style={
                user.displayName === item.user
                  ? styles.userContainer
                  : styles.othersContainer
              }
            >
              <View style={styles.msgContainer}>
                <Text style={[styles.greyText, styles.user]}>
                  {' '}
                  ~{item?.user}{' '}
                </Text>
                <Text style={[styles.blackText, styles.msg]}>
                  {' '}
                  {item?.message}{' '}
                </Text>
                <Text style={[styles.greyText, styles.time]}>
                  {' '}
                  {formatedDate}{' '}
                </Text>
              </View>
            </View>
          )
        }}
      />
      <TextInput
        placeholder="Type a message"
        placeholderTextColor="grey"
        value={message}
        onChangeText={(text) => setMessage(text)}
        style={styles.input}
        onSubmitEditing={handleSendMessage}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },

  heading: {
    fontSize: 30,
    color: '#ddd',
    marginVertical: Dimensions.get('window').height / 18,
  },

  orangeText: {
    color: '#fda10e',
  },

  blackText: {
    color: '#111',
  },

  greyText: {
    color: 'grey',
  },

  userContainer: {
    width: Dimensions.get('window').width / 1.1,
    alignItems: 'flex-start',
  },

  othersContainer: {
    width: Dimensions.get('window').width / 1.1,
    alignItems: 'flex-end',
  },

  msgContainer: {
    backgroundColor: '#fafafa',
    padding: 10,
    borderRadius: 10,
    minWidth: Dimensions.get('window').width / 3,
    marginBottom: 10,
  },

  user: {
    textAlign: 'left',
  },

  msg: {
    textAlign: 'center',
  },

  time: {
    textAlign: 'right',
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#fda10e',
    margin: 10,
    width: Dimensions.get('window').width / 1.2,
    color: '#ddd',
  },
})

export default Chat
