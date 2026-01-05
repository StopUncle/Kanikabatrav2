import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Camera, Instagram, Globe } from 'lucide-react-native';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SettingsHeader } from '../../components/ui/SettingsHeader';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { useAuthStore } from '../../stores/authStore';
import { imageService } from '../../services/imageService';

// Simple X (Twitter) icon component
function XIcon({ size, color }: { size: number; color: string }) {
  return (
    <Text style={{ fontSize: size * 0.7, fontWeight: '900', color }}>𝕏</Text>
  );
}

// Simple TikTok text icon
function TikTokIcon({ size, color }: { size: number; color: string }) {
  return (
    <Text style={{ fontSize: size * 0.5, fontWeight: '700', color }}>TT</Text>
  );
}

const BIO_MAX_LENGTH = 160;

export default function EditProfileScreen() {
  const { user, updateProfile } = useAuthStore();

  const [name, setName] = useState(user?.full_name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [instagram, setInstagram] = useState(user?.instagram_handle || '');
  const [twitter, setTwitter] = useState(user?.twitter_handle || '');
  const [tiktok, setTiktok] = useState(user?.tiktok_handle || '');
  const [website, setWebsite] = useState(user?.website_url || '');
  const [avatarUri, setAvatarUri] = useState<string | null>(user?.avatar_url || null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Sync form state when user data changes (e.g., after profile update elsewhere)
  useEffect(() => {
    if (user) {
      setName(user.full_name || '');
      setBio(user.bio || '');
      setInstagram(user.instagram_handle || '');
      setTwitter(user.twitter_handle || '');
      setTiktok(user.tiktok_handle || '');
      setWebsite(user.website_url || '');
      setAvatarUri(user.avatar_url || null);
    }
  }, [user]);

  // Clean handle input (remove @ prefix if present)
  const cleanHandle = (handle: string): string => {
    return handle.replace(/^@/, '').trim();
  };

  // Validate URL format
  const isValidUrl = (url: string): boolean => {
    if (!url.trim()) return true; // Empty is valid
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      return !!urlObj.hostname;
    } catch {
      return false;
    }
  };

  const handleSave = async () => {
    // Validate inputs
    if (!name.trim()) {
      haptics.error();
      Alert.alert('Error', 'Name is required');
      return;
    }

    if (bio.length > BIO_MAX_LENGTH) {
      haptics.error();
      Alert.alert('Error', `Bio must be ${BIO_MAX_LENGTH} characters or less`);
      return;
    }

    if (website && !isValidUrl(website)) {
      haptics.error();
      Alert.alert('Error', 'Please enter a valid website URL');
      return;
    }

    setIsSaving(true);
    haptics.medium();

    const { error } = await updateProfile({
      full_name: name.trim(),
      bio: bio.trim() || null,
      instagram_handle: cleanHandle(instagram) || null,
      twitter_handle: cleanHandle(twitter) || null,
      tiktok_handle: cleanHandle(tiktok) || null,
      website_url: website.trim() || null,
    });

    if (error) {
      haptics.error();
      setIsSaving(false);
      Alert.alert('Error', error);
      return;
    }

    haptics.success();
    setIsSaving(false);
    Alert.alert('Success', 'Profile updated successfully', [
      { text: 'OK', onPress: () => router.replace('/(tabs)/profile') }
    ]);
  };

  const handleTakePhoto = async () => {
    setIsUploadingAvatar(true);
    haptics.light();

    const image = await imageService.takePhoto();
    if (!image) {
      setIsUploadingAvatar(false);
      return;
    }

    await uploadAndSaveAvatar(image.uri);
  };

  const handlePickFromLibrary = async () => {
    setIsUploadingAvatar(true);
    haptics.light();

    const image = await imageService.pickImage();
    if (!image) {
      setIsUploadingAvatar(false);
      return;
    }

    await uploadAndSaveAvatar(image.uri);
  };

  const uploadAndSaveAvatar = async (uri: string) => {
    if (!user) {
      setIsUploadingAvatar(false);
      return;
    }

    // Upload to storage
    const { url, error } = await imageService.uploadAvatar(user.id, uri);

    if (error || !url) {
      haptics.error();
      setIsUploadingAvatar(false);
      Alert.alert('Upload Failed', error || 'Could not upload image');
      return;
    }

    // Delete old avatar if exists
    if (user.avatar_url) {
      await imageService.deleteAvatar(user.avatar_url);
    }

    // Update profile with new avatar URL
    const { error: updateError } = await updateProfile({ avatar_url: url });

    if (updateError) {
      haptics.error();
      setIsUploadingAvatar(false);
      Alert.alert('Error', updateError);
      return;
    }

    setAvatarUri(url);
    haptics.success();
    setIsUploadingAvatar(false);
  };

  const handleChangePhoto = () => {
    haptics.light();
    Alert.alert(
      'Change Photo',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: () => void handleTakePhoto() },
        { text: 'Choose from Library', onPress: () => void handlePickFromLibrary() },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <SettingsHeader title="Edit Profile" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Avatar size="xl" name={name} source={avatarUri} />
            {isUploadingAvatar ? (
              <View style={styles.avatarLoading}>
                <ActivityIndicator size="small" color={colors.accent} />
              </View>
            ) : (
              <Pressable
                style={({ pressed }) => [
                  styles.cameraButton,
                  pressed && styles.cameraButtonPressed,
                ]}
                onPress={handleChangePhoto}
              >
                <Camera size={16} color={colors.background} strokeWidth={2.5} />
              </Pressable>
            )}
          </View>
          <Pressable onPress={handleChangePhoto} disabled={isUploadingAvatar}>
            <Text style={[styles.changePhotoText, isUploadingAvatar && styles.changePhotoDisabled]}>
              {isUploadingAvatar ? 'Uploading...' : 'Change Photo'}
            </Text>
          </Pressable>
        </View>

        {/* Form */}
        <Card style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={colors.tertiary}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Bio</Text>
              <Text style={[styles.charCount, bio.length > BIO_MAX_LENGTH && styles.charCountError]}>
                {bio.length}/{BIO_MAX_LENGTH}
              </Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about yourself..."
              placeholderTextColor={colors.tertiary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={BIO_MAX_LENGTH + 10}
            />
          </View>
        </Card>

        {/* Social Links */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Social Links</Text>
        </View>
        <Card style={styles.formCard}>
          <View style={styles.inputGroup}>
            <View style={styles.socialInputRow}>
              <View style={styles.socialIcon}>
                <Instagram size={18} color={colors.secondary} />
              </View>
              <View style={styles.socialInputWrapper}>
                <Text style={styles.socialPrefix}>@</Text>
                <TextInput
                  style={styles.socialInput}
                  value={instagram}
                  onChangeText={setInstagram}
                  placeholder="instagram_handle"
                  placeholderTextColor={colors.tertiary}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.inputGroup}>
            <View style={styles.socialInputRow}>
              <View style={styles.socialIcon}>
                <XIcon size={18} color={colors.secondary} />
              </View>
              <View style={styles.socialInputWrapper}>
                <Text style={styles.socialPrefix}>@</Text>
                <TextInput
                  style={styles.socialInput}
                  value={twitter}
                  onChangeText={setTwitter}
                  placeholder="twitter_handle"
                  placeholderTextColor={colors.tertiary}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.inputGroup}>
            <View style={styles.socialInputRow}>
              <View style={styles.socialIcon}>
                <TikTokIcon size={18} color={colors.secondary} />
              </View>
              <View style={styles.socialInputWrapper}>
                <Text style={styles.socialPrefix}>@</Text>
                <TextInput
                  style={styles.socialInput}
                  value={tiktok}
                  onChangeText={setTiktok}
                  placeholder="tiktok_handle"
                  placeholderTextColor={colors.tertiary}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.inputGroup}>
            <View style={styles.socialInputRow}>
              <View style={styles.socialIcon}>
                <Globe size={18} color={colors.secondary} />
              </View>
              <TextInput
                style={styles.websiteInput}
                value={website}
                onChangeText={setWebsite}
                placeholder="https://yourwebsite.com"
                placeholderTextColor={colors.tertiary}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
              />
            </View>
          </View>
        </Card>

        <Button
          title="Save Changes"
          onPress={handleSave}
          loading={isSaving}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  avatarSection: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.background,
  },
  cameraButtonPressed: {
    opacity: 0.8,
  },
  changePhotoText: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.accent,
  },
  changePhotoDisabled: {
    color: colors.tertiary,
  },
  avatarLoading: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.background,
  },
  formCard: {
    padding: 0,
    overflow: 'hidden',
  },
  inputGroup: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.secondary,
  },
  input: {
    fontSize: typography.md,
    color: colors.primary,
    padding: 0,
  },
  textArea: {
    minHeight: 80,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  sectionHeader: {
    paddingHorizontal: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.sm,
    fontWeight: typography.semibold,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  charCount: {
    fontSize: typography.xs,
    color: colors.tertiary,
  },
  charCountError: {
    color: colors.error,
  },
  socialInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  socialIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialPrefix: {
    fontSize: typography.md,
    color: colors.tertiary,
    marginRight: 2,
  },
  socialInput: {
    flex: 1,
    fontSize: typography.md,
    color: colors.primary,
    padding: 0,
  },
  websiteInput: {
    flex: 1,
    fontSize: typography.md,
    color: colors.primary,
    padding: 0,
  },
});
