import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase/config'

interface FormProps {
  type: string
}

const Form: React.FC<FormProps> = ({ type }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState(null)

  const navigation = useNavigation()

  const handleSubmit = async () => {
    setErrors(null)
    if (type === 'SignUp') {
      try {
        const user = await auth.createUserWithEmailAndPassword(email, password)

        await user.user?.updateProfile({
          displayName: username,
        })
      } catch (error) {
        setErrors(error.message)
      }
    } else {
      try {
        await auth.signInWithEmailAndPassword(email, password)
      } catch (error) {
        setErrors(error.message)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Chat
        <Text style={styles.orangeText}>Friends</Text>
      </Text>
      <View style={styles.formContainer}>
        {type === 'SignUp' && (
          <TextInput
            placeholder="Username"
            placeholderTextColor="#bbb"
            autoCapitalize="none"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
          />
        )}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#bbb"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#bbb"
          autoCapitalize="none"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        {errors && <Text style={styles.error}> {errors} </Text>}
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.whiteText}> {type} </Text>
        </TouchableOpacity>
        {type === 'SignUp' ? (
          <View style={styles.row}>
            <Text style={styles.whiteText}>Already have a account ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
              <Text style={[styles.orangeText, styles.orangeFontSize]}>
                SignIn
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.row}>
            <Text style={styles.whiteText}>Are you new here ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={[styles.orangeText, styles.orangeFontSize]}>
                SignUp
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 20,
  },

  heading: {
    color: '#ddd',
    fontSize: 40,
    marginBottom: 10,
  },

  orangeText: {
    color: '#fda10e',
  },

  whiteText: {
    color: '#ddd',
    fontSize: 20,
    textAlign: 'center',
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#fda10e',
    padding: 10,
    marginVertical: 5,
    width: Dimensions.get('window').width / 1.8,
    color: '#ddd',
  },

  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#fda10e',
    marginVertical: 25,
  },

  formContainer: {
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  orangeFontSize: {
    fontSize: 20,
  },

  error: {
    color: '#d22',
    textAlign: 'center',
  },
})

export default Form
