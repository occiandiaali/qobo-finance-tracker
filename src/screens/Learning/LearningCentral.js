import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {withTheme} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
const img = {
  uri: 'https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055__340.jpg',
};

const LearningCentral = ({theme, navigation}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{paddingTop: 8}}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View
            style={{
              marginRight: 4,
              marginTop: 8,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#6666ff',
            }}>
            <Image
              source={img}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </View>
          <View
            style={{
              marginRight: 4,
              marginTop: 8,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#6666ff',
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__340.jpg',
              }}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </View>
          <View
            style={{
              marginRight: 4,
              marginTop: 8,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#6666ff',
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072__340.jpg',
              }}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </View>
          <View
            style={{
              marginRight: 4,
              marginTop: 8,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#6666ff',
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287__340.jpg',
              }}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </View>
          <View
            style={{
              marginRight: 4,
              marginTop: 8,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#6666ff',
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
              }}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </View>
          <View
            style={{
              marginRight: 4,
              marginTop: 8,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: '#6666ff',
            }}>
            <Image
              source={img}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </View>
        </ScrollView>
      </View>

      <View style={{flexDirection: 'row', marginTop: 24}}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View
            style={{
              width: 200,
              height: 220,
              borderRadius: 20,
              backgroundColor: '#6666ff',
              margin: 8,
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
              }}
              style={{width: 200, height: 220, borderRadius: 20}}
            />
          </View>
          <View
            style={{
              width: 200,
              height: 220,
              borderRadius: 20,
              backgroundColor: '#6666ff',
              margin: 8,
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
              }}
              style={{width: 200, height: 220, borderRadius: 20}}
            />
          </View>
          <View
            style={{
              width: 200,
              height: 220,
              borderRadius: 20,
              backgroundColor: '#6666ff',
              margin: 8,
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
              }}
              style={{width: 200, height: 220, borderRadius: 20}}
            />
          </View>
          <View
            style={{
              width: 200,
              height: 220,
              borderRadius: 20,
              backgroundColor: '#6666ff',
              margin: 8,
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
              }}
              style={{width: 200, height: 220, borderRadius: 20}}
            />
          </View>
          <View
            style={{
              width: 200,
              height: 220,
              borderRadius: 20,
              backgroundColor: '#6666ff',
              margin: 8,
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
              }}
              style={{width: 200, height: 220, borderRadius: 20}}
            />
          </View>
          <View
            style={{
              width: 200,
              height: 220,
              borderRadius: 20,
              backgroundColor: '#6666ff',
              margin: 8,
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
              }}
              style={{width: 200, height: 220, borderRadius: 20}}
            />
          </View>
        </ScrollView>
      </View>

      <View style={{flexDirection: 'row', marginTop: 24}}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View
            style={{
              width: 200,
              height: 220,
              borderRadius: 20,
              backgroundColor: '#6666ff',
              margin: 8,
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
              }}
              style={{width: 200, height: 220, borderRadius: 20}}
            />
          </View>
          <View
            style={{
              width: 200,
              height: 220,
              borderRadius: 20,
              backgroundColor: '#6666ff',
              margin: 8,
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
              }}
              style={{width: 200, height: 220, borderRadius: 20}}
            />
          </View>
          <View
            style={{
              width: 200,
              height: 220,
              borderRadius: 20,
              backgroundColor: '#6666ff',
              margin: 8,
            }}>
            <Image
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
              }}
              style={{width: 200, height: 220, borderRadius: 20}}
            />
          </View>
          <View
            style={{
              width: 200,
              height: 220,
              borderRadius: 20,
              backgroundColor: '#6666ff',
              margin: 8,
            }}
          />
          <View
            style={{
              width: 200,
              height: 220,
              borderRadius: 20,
              backgroundColor: '#6666ff',
              margin: 8,
            }}
          />
          <View
            style={{
              width: 200,
              height: 220,
              borderRadius: 20,
              backgroundColor: '#6666ff',
              margin: 8,
            }}
          />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default withTheme(LearningCentral);
