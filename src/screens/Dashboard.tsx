import React, { useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { useNavigation } from '@react-navigation/native'

const Dashboard: React.FC = () => {
  const { user, signOut } = useContext(AuthContext)

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={styles.whiteText}> Welcome {user.displayName}! </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Rooms')}
      >
        <Text style={styles.whiteText}> Look for rooms </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.whiteText}> SignOut</Text>
      </TouchableOpacity>
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

  whiteText: {
    color: '#ddd',
    fontSize: 20,
    textAlign: 'center',
  },

  button: {
    width: Dimensions.get('window').width / 1.5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#fda10e',
    marginVertical: 25,
  },
})

export default Dashboard
