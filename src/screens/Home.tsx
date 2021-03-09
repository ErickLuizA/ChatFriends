import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Home: React.FC = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Chat
        <Text style={styles.orangeText}>Friends</Text>
      </Text>
      <Text style={styles.whiteText}>
        The best place to talk with your friends
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signin')}
        >
          <Text style={styles.whiteText}>SignIn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.whiteText}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-around',
    backgroundColor: '#111',
    padding: 20,
  },

  heading: {
    color: '#ddd',
    fontSize: 40,
  },

  orangeText: {
    color: '#fda10e',
  },

  whiteText: {
    color: '#ddd',
    fontSize: 20,
    textAlign: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 100,
  },

  button: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#fda10e',
    marginHorizontal: 10,
  },
})

export default Home
