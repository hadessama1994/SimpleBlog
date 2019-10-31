import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity,RefreshControl, ScrollView } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import api from '../services/api'
import InvertedFlatList from 'react-native-inverted-flat-list';


function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function SpotList({ tech, navigation }) {
    const [posts, setPosts] = useState([]);
    const [user, setUsers] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      
         wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);
  

    

    useEffect(() => {
        async function loadPosts() {
          
          const response = await api.get('/posts', {
                       
          });    
          setPosts(response.data.post);
        }
    
        loadPosts();
      }, []);
  
    function handleNavigate(id) {
        var res = id.replace("localhost", "192.168.1.8"); //substituir o local host pelo IP do pc se nao nao aparece a IMG
        return res
    }
  
    return (
      <View style={styles.container}>


<ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
          
          
        <FlatList
       
          style={styles.list}
          data={posts}
          keyExtractor={post => post._id}
          vertical
          showsHorizontalScrollIndicator={false}
          
          renderItem={({ item }) => (
            <View style={styles.listItem} >
              
              <View style ={styles.titleavatar}>
              <Avatar rounded source={{ uri: handleNavigate(item.avatarid.path) }} />
              <Text style={styles.title}>{item.title}</Text>
              </View>              
              
              <Text style={styles.text}>{item.posttext}</Text>
                           
            </View>
          )}
        />
        </ScrollView>
      </View>
       
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      
    },
  
    title: {
      fontSize: 20,
      color: '#444',
      fontWeight: 'bold',
      marginLeft: 5
      
    },

    text: {
        fontSize: 15,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 25,
      },
  
    bold: {
      fontWeight: 'bold'
    },
  
    list: {
      paddingHorizontal: 20,
      
      
      
     
      
    },
  
    listItem: {
      marginRight: 15,
      borderBottomEndRadius: 3,
      borderBottomWidth: 0.8,
      borderBottomColor: '#d6d7da',
      
      
      
      
    },
  
    thumbnail: {
      width: 200,
      height: 120,
      resizeMode: 'cover',
      borderRadius: 2,
      
      
    },
  
    company: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginTop: 10,
    },
  
    price: {
      fontSize: 15,
      color: '#999',
      marginTop: 5
    },
  
    button: {
      height: 32,
      backgroundColor: '#f05a5b',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      marginTop: 15,
    },
  
    buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 15,
    },
    
    titleavatar: {
        flexDirection: "row",
        marginTop: 10,

      },

    
  });
  
  export default withNavigation(SpotList);