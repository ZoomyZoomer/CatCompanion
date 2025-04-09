import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

type typingProps = {
    text: string;
    speed: number;
    fade: boolean;
}

const TypingText = ({ text, speed = 100, fade } : typingProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      setIndex((prevIndex) => prevIndex + 1);
    }, speed);

    if (index >= text.length) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [index, text, speed]);

  return (
    <View style={styles.container}>
      <Text style={[styles.typingText, {opacity: fade ? 0.5 : 1}]}>{displayedText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%'
  },
  typingText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default TypingText;
