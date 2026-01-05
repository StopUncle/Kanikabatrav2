import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../components/ui/Button';
import { AvatarWithRewards } from '../../components/avatar';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { useAuthStore } from '../../stores/authStore';

const MAX_LENGTH = 280;

export default function CreateScreen() {
  const user = useAuthStore((state) => state.user);
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const remainingChars = MAX_LENGTH - content.length;
  const isOverLimit = remainingChars < 0;
  const canPost = content.trim().length > 0 || image;

  const pickImage = async () => {
    haptics.light();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      haptics.success();
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    haptics.light();
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera access is required to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      haptics.success();
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = async () => {
    if (!canPost || isOverLimit) {
      haptics.error();
      return;
    }

    setIsPosting(true);
    haptics.medium();

    // Simulate posting delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    haptics.success();
    setIsPosting(false);

    // Reset form
    setContent('');
    setImage(null);

    Alert.alert('Posted!', 'Your post has been shared successfully.', [
      { text: 'OK', style: 'default' }
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Create</Text>
        <Button
          title="Post"
          onPress={handlePost}
          disabled={!canPost || isOverLimit}
          loading={isPosting}
          size="sm"
        />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Composer */}
          <View style={styles.composer}>
            <AvatarWithRewards
              size={48}
              avatarUrl={user?.avatar_url}
              isCurrentUser={true}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="What's happening?"
                placeholderTextColor={colors.tertiary}
                multiline
                maxLength={MAX_LENGTH + 20}
                value={content}
                onChangeText={setContent}
                onFocus={() => haptics.light()}
              />
            </View>
          </View>

          {/* Image Preview */}
          {image && (
            <View style={styles.imagePreview}>
              <Image source={{ uri: image }} style={styles.image} />
              <Pressable
                style={styles.removeImage}
                onPress={() => {
                  haptics.light();
                  setImage(null);
                }}
              >
                <Text style={styles.removeIcon}>✕</Text>
              </Pressable>
            </View>
          )}

          {/* Character Counter */}
          <View style={styles.footer}>
            <Text
              style={[
                styles.charCount,
                remainingChars <= 20 && styles.charCountWarning,
                isOverLimit && styles.charCountError,
              ]}
            >
              {remainingChars}
            </Text>
          </View>
        </ScrollView>

        {/* Action Bar */}
        <View style={styles.actionBar}>
          <View style={styles.mediaButtons}>
            <Pressable style={styles.mediaButton} onPress={pickImage}>
              <Text style={styles.mediaIcon}>🖼️</Text>
              <Text style={styles.mediaLabel}>Gallery</Text>
            </Pressable>

            <Pressable style={styles.mediaButton} onPress={takePhoto}>
              <Text style={styles.mediaIcon}>📷</Text>
              <Text style={styles.mediaLabel}>Camera</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.md,
  },
  composer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    fontSize: typography.lg,
    color: colors.primary,
    lineHeight: 26,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  imagePreview: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
  },
  removeImage: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: borderRadius.full,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIcon: {
    color: colors.primary,
    fontSize: 14,
  },
  footer: {
    alignItems: 'flex-end',
  },
  charCount: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  charCountWarning: {
    color: colors.warning,
  },
  charCountError: {
    color: colors.error,
  },
  actionBar: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  mediaButtons: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  mediaButton: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  mediaIcon: {
    fontSize: 24,
  },
  mediaLabel: {
    fontSize: typography.xs,
    color: colors.secondary,
  },
});
