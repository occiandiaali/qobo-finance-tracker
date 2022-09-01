import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, Modal, Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    backgroundColor: '#9999ff', //'#fff',
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
  },
  presserText: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 8,
  },
});

const CustomDropDown = ({label, data, onSelect}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleDropDown = () => setVisible(prev => !prev);

  const onItemPress = item => {
    setSelected(item);
    onSelect(item.value);
    setVisible(false);
  };

  const renderItem = ({item}) => (
    <Pressable style={styles.item} onPress={() => onItemPress(item)}>
      <Text style={{fontSize: 16, fontWeight: '700', color: '#fff'}}>
        {item.label}
      </Text>
    </Pressable>
  );

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
    <Pressable style={styles.presser} onPress={toggleDropDown}>
      {renderDropdown()}
      <Text style={styles.presserText}>
        {selected ? selected.label : label}
      </Text>

      <Icon
        style={{right: 16}}
        name={visible ? 'chevron-up' : 'chevron-down'}
        size={25}
        color="#7777ff"
      />
    </Pressable>
  );
};

export default CustomDropDown;
