import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Modal, TextInput, Pressable, ActivityIndicator, Share } from 'react-native';
import { Paths, File } from 'expo-file-system';
import { logger } from '../../lib/logger';
import * as Sharing from 'expo-sharing';
import { Eye, Lock, Users, Download, Trash2, AlertTriangle, X } from 'lucide-react-native';
import { router } from 'expo-router';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { SettingsHeader } from '../../components/ui/SettingsHeader';
import { SettingsToggle } from '../../components/ui/SettingsToggle';
import { haptics } from '../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../lib/theme';
import { useAuthStore } from '../../stores/authStore';

export default function PrivacyScreen() {
  const { user, signOut, deleteAccount, exportUserData } = useAuthStore();
  const [profileVisible, setProfileVisible] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);

  // Delete account modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportData = async () => {
    if (!user) return;

    haptics.medium();
    setIsExporting(true);

    const result = await exportUserData();

    if (result.success && result.data) {
      try {
        // Format data as JSON
        const jsonData = JSON.stringify(result.data, null, 2);
        const fileName = `dark-mirror-data-export-${new Date().toISOString().split('T')[0]}.json`;

        // Create file using new expo-file-system v19 API
        const file = new File(Paths.document, fileName);
        file.write(jsonData); // write() is synchronous in expo-file-system v19

        // Check if sharing is available
        const sharingAvailable = await Sharing.isAvailableAsync();

        if (sharingAvailable) {
          setIsExporting(false);
          haptics.success();
          await Sharing.shareAsync(file.uri, {
            mimeType: 'application/json',
            dialogTitle: 'Export Your Data',
          });
        } else {
          // Fallback to Share API for text
          setIsExporting(false);
          haptics.success();
          await Share.share({
            message: jsonData,
            title: 'Your Data Export',
          });
        }
      } catch (shareError) {
        logger.error('Error sharing data:', shareError);
        setIsExporting(false);
        haptics.error();
        Alert.alert('Export Error', 'Could not share the export file');
      }
    } else {
      setIsExporting(false);
      haptics.error();
      Alert.alert('Export Failed', result.error || 'Failed to export data');
    }
  };

  const handleDeleteAccount = () => {
    haptics.warning();
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = async () => {
    if (deleteConfirmation !== 'DELETE' || !user) return;

    setIsDeleting(true);
    haptics.warning();

    const result = await deleteAccount();

    if (result.success) {
      haptics.success();
      await signOut();
      setShowDeleteModal(false);
      // Navigate to login screen
      router.replace('/(auth)/login');
    } else {
      setIsDeleting(false);
      haptics.error();
      Alert.alert('Deletion Failed', result.error || 'Failed to delete account. Please try again.');
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteConfirmation('');
  };

  return (
    <View style={styles.container}>
      <SettingsHeader title="Privacy" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <Card style={styles.card}>
            <SettingsToggle
              icon={<Eye size={20} color={colors.primary} strokeWidth={2} />}
              label="Public Profile"
              description="Others can view your profile"
              value={profileVisible}
              onValueChange={setProfileVisible}
            />
            <SettingsToggle
              icon={<Lock size={20} color={colors.primary} strokeWidth={2} />}
              label="Show Progress"
              description="Display quiz scores and course progress"
              value={showProgress}
              onValueChange={setShowProgress}
            />
            <SettingsToggle
              icon={<Users size={20} color={colors.primary} strokeWidth={2} />}
              label="Allow Messages"
              description="Receive direct messages from others"
              value={allowMessages}
              onValueChange={setAllowMessages}
            />
          </Card>
        </View>

        {/* Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Data</Text>
          <Card style={styles.card}>
            <View style={styles.dataRow}>
              <View style={styles.dataIconContainer}>
                <Download size={20} color={colors.primary} strokeWidth={2} />
              </View>
              <View style={styles.dataInfo}>
                <Text style={styles.dataTitle}>Export Data</Text>
                <Text style={styles.dataDescription}>
                  Download a copy of your data
                </Text>
              </View>
              <Button
                title={isExporting ? 'Exporting...' : 'Export'}
                variant="secondary"
                size="sm"
                onPress={handleExportData}
                disabled={isExporting}
              />
            </View>
          </Card>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitleDanger}>Danger Zone</Text>
          <Card style={styles.dangerCard}>
            <View style={styles.dataRow}>
              <View style={styles.dangerIconContainer}>
                <Trash2 size={20} color={colors.error} strokeWidth={2} />
              </View>
              <View style={styles.dataInfo}>
                <Text style={styles.dangerTitle}>Delete Account</Text>
                <Text style={styles.dataDescription}>
                  Permanently delete your account and data
                </Text>
              </View>
            </View>
            <Button
              title="Delete Account"
              variant="ghost"
              onPress={handleDeleteAccount}
              style={styles.deleteButton}
            />
          </Card>
        </View>
      </ScrollView>

      {/* Delete Account Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={closeDeleteModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Pressable
              style={styles.modalClose}
              onPress={closeDeleteModal}
              accessibilityLabel="Close"
              accessibilityRole="button"
            >
              <X size={24} color={colors.tertiary} />
            </Pressable>

            <View style={styles.modalIconContainer}>
              <AlertTriangle size={32} color={colors.error} />
            </View>

            <Text style={styles.modalTitle}>Delete Your Account?</Text>
            <Text style={styles.modalDescription}>
              This action is permanent and cannot be undone. All your data, progress, subscriptions, and messages will be permanently deleted.
            </Text>

            <View style={styles.modalInputContainer}>
              <Text style={styles.modalInputLabel}>
                Type <Text style={styles.modalInputHighlight}>DELETE</Text> to confirm:
              </Text>
              <TextInput
                style={styles.modalInput}
                value={deleteConfirmation}
                onChangeText={setDeleteConfirmation}
                placeholder="Type DELETE"
                placeholderTextColor={colors.tertiary}
                autoCapitalize="characters"
                autoCorrect={false}
              />
            </View>

            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalCancelButton}
                onPress={closeDeleteModal}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.modalDeleteButton,
                  deleteConfirmation !== 'DELETE' && styles.modalDeleteButtonDisabled,
                ]}
                onPress={confirmDeleteAccount}
                disabled={deleteConfirmation !== 'DELETE' || isDeleting}
              >
                {isDeleting ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <Text style={[
                    styles.modalDeleteText,
                    deleteConfirmation !== 'DELETE' && styles.modalDeleteTextDisabled,
                  ]}>
                    Delete Forever
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.secondary,
    paddingHorizontal: spacing.xs,
  },
  sectionTitleDanger: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.error,
    paddingHorizontal: spacing.xs,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  dangerCard: {
    borderColor: colors.error,
    borderWidth: 1,
    gap: spacing.md,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  dataIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.errorMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataInfo: {
    flex: 1,
    gap: 2,
  },
  dataTitle: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  dangerTitle: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.error,
  },
  dataDescription: {
    fontSize: typography.sm,
    color: colors.tertiary,
  },
  deleteButton: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.errorMuted,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.errorMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  modalDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  modalInputContainer: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  modalInputLabel: {
    fontSize: typography.sm,
    color: colors.secondary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  modalInputHighlight: {
    fontWeight: typography.bold,
    color: colors.error,
  },
  modalInput: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.md,
    color: colors.primary,
    textAlign: 'center',
    letterSpacing: 2,
  },
  modalActions: {
    width: '100%',
    flexDirection: 'row',
    gap: spacing.md,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  modalDeleteButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDeleteButtonDisabled: {
    backgroundColor: colors.tertiary,
    opacity: 0.5,
  },
  modalDeleteText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  modalDeleteTextDisabled: {
    color: colors.secondary,
  },
});
