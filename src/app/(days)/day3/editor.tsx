import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import MarkdownDisplay from '@components/day3/MarkdownDisplay';

const template = `# 🎉 Fun with Markdown!

## 🚀 Introduction
Welcome to this **fun and exciting** markdown guide! Let's dive into the world of Markdown and discover how it makes text formatting cool and easy!

## 🎈 Basics: Add Some Flair

- **Bold and Beautiful:** Make your text stand out! Use \`**\` or \`__\`. Example: **Look at me!**
- *Sassy Italics:* Add a slant with \`*\` or \`_\`. Example: *I'm leaning!*

### 🍔 Let's List Some Fun Things!

1. 🌟 Star gazing
2. 🏖 Beach parties
3. 🍕 Pizza nights

- 🎮 Video games
- 📚 Reading a good book
- 🧘 Yoga time

## 🌈 Advanced Fun

### 🖼 Adding Images and Links

A cute pic: 

![Cute Cat](https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/6.jpg)

Visit a fun site: [Fun Site](https://example.com)

### 🎶 Code Block Party

\`\`\`javascript
// JavaScript party trick
function partyTime() {
    console.log("Let's dance 💃🕺!");
}
\`\`\`

## 🎤 Conclusion
Markdown is not just for formatting; it's for having fun while expressing yourself! Keep exploring and enjoy the markdown party! 🎊

> Enjoy crafting your own fun markdown documents! 🎨🎉
`;

const EditorScreen = () => {
  const [content, setContent] = useState(template);
  const [tab, setTab] = useState('edit');

  return (
    <View style={styles.page}>
      <View style={styles.tabsContainer}>
        <Pressable
          onPress={() => setTab('edit')}
          style={[
            styles.tab,
            { borderColor: tab === 'edit' ? 'mediumorchid' : 'gray' },
          ]}
        >
          <Text style={styles.tabText}>Edit</Text>
        </Pressable>
        <Pressable
          onPress={() => setTab('preview')}
          style={[
            styles.tab,
            { borderColor: tab === 'preview' ? 'mediumorchid' : 'gray' },
          ]}
        >
          <Text style={styles.tabText}>Preview</Text>
        </Pressable>
      </View>

      {tab === 'edit' ? (
        <TextInput
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={50}
          style={styles.input}
        />
      ) : (
        <MarkdownDisplay>{content}</MarkdownDisplay>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'whitesmoke',
    flex: 1,
    padding: 10,
  },
  input: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    paddingTop: 20,
    borderRadius: 10,
    fontSize: 16,
  },

  tabsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabText: {
    fontFamily: 'InterBold',
  },
});

export default EditorScreen;
