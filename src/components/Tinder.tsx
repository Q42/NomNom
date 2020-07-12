import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StyleSheet, View, Image, Platform} from 'react-native';
// @ts-ignore
import Swiper from 'react-native-deck-swiper';

const recipes = [
  {id: '1', name: 'Lekker voedsel', image: require('../assets/food-1.jpg')},
  {id: '2', name: 'Mooi spul', image: require('../assets/food-2.jpg')},
  {id: '3', name: 'Je weet', image: require('../assets/food-3.jpg')},
];

interface ICard {
  id: string;
  name: string;
  image: any;
}

const Tinder = () => {
  const [index, setIndex] = useState<number>(0);

  const onSwiped = () => {
    setIndex(index + 1);
  };

  return (
    <View style={styles.container}>
      <Swiper
        useViewOverflow={Platform.OS === 'ios'}
        backgroundColor={'#fff'}
        cards={recipes}
        cardIndex={index}
        renderCard={(card: ICard) => <Card card={card} />}
        onSwiped={onSwiped}
        stackSize={3}
        stackScale={10}
        stackSeparation={24}
        disableTopSwipe
        disableBottomSwipe
        animateCardOpacity
      />
    </View>
  );
};

interface ICardProps {
  card: ICard;
}

const Card = ({card}: ICardProps) => (
  <View style={styles.card}>
    <Image style={styles.cardImage} source={card.image} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 0.6,
    borderRadius: 10,
    shadowRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 0},
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cardImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default Tinder;
