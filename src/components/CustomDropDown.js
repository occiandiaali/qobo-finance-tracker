import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '96%',
    height: '50%',
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  overlay: {
    width: '100%',
    height: '50%',
    top: '35%',
    borderRadius: 20,
  },
  presser: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    // zIndex: 1,
  },
  presserText: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 8,
    // textAlign: 'center',
  },
});

const CustomDropDown = ({label, data, onSelect}) => {
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [selected, setSelected] = useState(null);
  const DropDownButton = useRef();

  const toggleDropDown = () => setVisible(prev => !prev);
  //   const openDropDown = () => {
  //     DropDownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
  //       setDropdownTop(py + h);
  //     });
  //     setVisible(true);
  //   };
  // const toggleDropDown = () => (visible ? setVisible(false) : openDropDown());

  //   const renderDropdown = () => {
  //     if (visible) {
  //       return <Text style={styles.dropdown}>DropDown renders here...</Text>;
  //     }
  //   };
  const onItemPress = item => {
    setSelected(item);
    onSelect(item.value);
    setVisible(false);
  };

  const renderItem = ({item}) => (
    <Pressable style={styles.item} onPress={() => onItemPress(item)}>
      <Text style={{fontSize: 16}}>{item.label}</Text>
    </Pressable>
  );

  //   const renderDropdown = () => {
  //     return (
  //       <Modal visible={visible} transparent animationType="none">
  //         <Pressable
  //           // ref={DropDownButton}
  //           style={styles.overlay}
  //           onPress={() => setVisible(false)}>
  //           <View style={styles.dropdown}>
  //             <FlatList
  //               data={data}
  //               renderItem={renderItem}
  //               keyExtractor={(item, index) => index.toString()}
  //             />
  //           </View>
  //         </Pressable>
  //       </Modal>
  //     );
  //   };

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <Pressable
          // ref={DropDownButton}
          style={styles.overlay}
          onPress={() => setVisible(false)}>
          <View style={styles.dropdown}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Pressable>
      </Modal>
    );
  };

  return (
    <Pressable
      //  ref={DropDownButton}
      style={styles.presser}
      onPress={toggleDropDown}>
      {renderDropdown()}
      <Text style={styles.presserText}>
        {selected ? selected.label : label}
      </Text>
      {/* <Icon name="chevron-down" size={35} color="#900" /> */}
      {/* <Icon name="chevron-down-circle-outline" size={25} color="#4444ff" /> */}
      {visible ? (
        <Icon style={{right: 16}} name="chevron-up" size={25} color="#7777ff" />
      ) : (
        <Icon
          style={{right: 16}}
          name="chevron-down"
          size={25}
          color="#7777ff"
        />
      )}
    </Pressable>
  );
};

export default CustomDropDown;
