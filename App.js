import { StatusBar } from 'expo-status-bar';
import { Image, ActionSheetIOS, StyleSheet, Text, Linking, View, Pressable, SafeAreaView, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();



const FRIENDS = [
  {
    id: '1',
    name: 'Ralphie',
    number: '+19293197775',
    email: 'r_john710@yahoo.com',
    address: {
      street: '5124 Nokota Pl',
      city: 'Greensboro',
      state: 'NC',
      zip: '27405'
    },
    avatar: 'https://ui-avatars.com/api/?name=Ralphi+John'
  },
  {
    id: '2',
    name: 'Zie',
    number: '+13367088057',
    email: 'jaziah0326@icloud.com',
    address: {
      street: '19 Aspen Dr',
      city: 'Greensboro',
      state: 'NC',
      zip: '27409'
    },
    avatar: 'https://i.pravatar.cc/100'
  },
  {
    id: '3',
    name: 'Jae',
    number: '+13362304202',
    email: 'jae7810@icloud.com',
    address: {
      street: '106-34 156th st',
      city: 'Jamaica',
      state: 'NY',
      zip: '11434'
    },
    avatar: 'https://ui-avatars.com/api/?name=Jalah+John'
  },
];

const Friend = ({ name, number, }) => (
  <Pressable style={styles.friendRow} onPress={() => Linking.openURL('tel:' + number)}>
    <Text>{name}</Text>
  </Pressable>
);

export default function App() {

  const showFriend = ({ item }) => (
    <Friend info={item} />
  );
  
  const detectLongPress = (info) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: info.name,
        options: ['Cancel', 'Call', 'Message', 'Email', 'Directions'],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          Linking.openURL('tel:' + info.number)
        } else if (buttonIndex === 2) {
          Linking.openURL('sms:' + info.number)
        } else if (buttonIndex === 3) {
          Linking.openURL('mailto:' + info.email)
        } else if (buttonIndex === 4) {
          let address = info.address.street + '+' + info.address.city + '+' + info.address.state + '+' + info.address.zip
          Linking.openURL('maps://app?daddr=' + address)
        }
      }
    )
  }

  const Friend = ({ info }) => (
    <Pressable style={styles.friendRow} onLongPress={() => detectLongPress(info)} onPress={() => Linking.openURL('tel:' + info.number)}>
      <Image style={styles.avatar} source={{uri: info.avatar,}} />
      <Text>{info.name}</Text>
    </Pressable>
  );

  const HomeScreen = () => {
    return (
        <SafeAreaView>
            <FlatList
                data={FRIENDS}
                renderItem={showFriend}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
  }

  const NewFriendScreen = ({ navigation, route }) => {
    return <Text>This is where the form will go.</Text>;
  };

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation, route }) => ({
                title: 'Homeez',
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate('New Friend')}
                    title="Add"
                  />
                ),
              })}
            />
            <Stack.Screen name="New Friend" component={NewFriendScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
            
const styles = StyleSheet.create({
  friendRow: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lightgrey',
    marginTop: 10,
    marginBottom: 0,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: 'lightgrey',
    borderRadius: 50,
    marginRight: 15
  },
});


