// Export/Import Modal
// Encrypted backup and restore for rotation data

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import * as DocumentPicker from 'expo-document-picker';
import {
  X,
  Download,
  Upload,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Check,
} from 'lucide-react-native';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import {
  colors,
  spacing,
  typography,
  borderRadius,
} from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { useRotationStore } from '../../stores/rotationStore';

interface ExportModalProps {
  visible: boolean;
  onClose: () => void;
}

type Tab = 'export' | 'import';

export function ExportModal({ visible, onClose }: ExportModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('export');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [importedFile, setImportedFile] = useState<string | null>(null);

  const { exportData, importData, stats } = useRotationStore();

  const handleClose = () => {
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setImportedFile(null);
    setIsLoading(false);
    onClose();
  };

  const handleExport = async () => {
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }

    setIsLoading(true);
    haptics.medium();

    try {
      const encrypted = await exportData(password);

      // Save to file
      const filename = `rotation_backup_${new Date().toISOString().split('T')[0]}.dmb`;
      const filePath = `${FileSystem.cacheDirectory ?? ''}${filename}`;

      await FileSystem.writeAsStringAsync(filePath, encrypted);

      // Share
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(filePath, {
          mimeType: 'application/octet-stream',
          dialogTitle: 'Save Rotation Backup',
        });

        Alert.alert('Success', `Exported ${stats.total} prospects`);
        handleClose();
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
      }
    } catch (error: unknown) {
      Alert.alert('Export Failed', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets?.[0]) {
        const file = result.assets[0];
        const content = await FileSystem.readAsStringAsync(file.uri);
        setImportedFile(content);
        haptics.light();
      }
    } catch (error: unknown) {
      Alert.alert('Error', 'Failed to read file');
    }
  };

  const handleImport = async () => {
    if (!importedFile) {
      Alert.alert('No File', 'Please select a backup file first');
      return;
    }

    if (!password) {
      Alert.alert('Password Required', 'Enter the password used during export');
      return;
    }

    setIsLoading(true);
    haptics.medium();

    try {
      const result = await importData(importedFile, password);

      if (result.success) {
        Alert.alert('Success', `Imported ${result.count} new prospects`);
        handleClose();
      } else {
        Alert.alert('Import Failed', result.error || 'Unknown error');
      }
    } catch (error: unknown) {
      Alert.alert('Import Failed', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Backup & Restore</Text>
          <Pressable onPress={handleClose} style={styles.closeButton}>
            <X size={24} color={colors.primary} />
          </Pressable>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <Pressable
            onPress={() => {
              haptics.light();
              setActiveTab('export');
            }}
            style={[styles.tab, activeTab === 'export' && styles.tabActive]}
          >
            <Download size={18} color={activeTab === 'export' ? colors.accent : colors.secondary} />
            <Text style={[styles.tabText, activeTab === 'export' && styles.tabTextActive]}>
              Export
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              haptics.light();
              setActiveTab('import');
            }}
            style={[styles.tab, activeTab === 'import' && styles.tabActive]}
          >
            <Upload size={18} color={activeTab === 'import' ? colors.accent : colors.secondary} />
            <Text style={[styles.tabText, activeTab === 'import' && styles.tabTextActive]}>
              Import
            </Text>
          </Pressable>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {activeTab === 'export' ? (
            <ExportTab
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              isLoading={isLoading}
              onExport={handleExport}
              prospectCount={stats.total}
            />
          ) : (
            <ImportTab
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              isLoading={isLoading}
              importedFile={importedFile}
              onPickFile={handlePickFile}
              onImport={handleImport}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

// Export Tab Component
function ExportTab({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  isLoading,
  onExport,
  prospectCount,
}: {
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  isLoading: boolean;
  onExport: () => void;
  prospectCount: number;
}) {
  return (
    <>
      <GlassCard variant="medium" style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Shield size={20} color={colors.accent} />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Encrypted Backup</Text>
            <Text style={styles.infoDescription}>
              Your data will be encrypted with your password. Keep this password safe—without it, your backup cannot be restored.
            </Text>
          </View>
        </View>
      </GlassCard>

      <View style={styles.statsRow}>
        <Text style={styles.statsLabel}>Prospects to export:</Text>
        <Text style={styles.statsValue}>{prospectCount}</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordInput}>
          <Lock size={18} color={colors.tertiary} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            placeholderTextColor={colors.tertiary}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff size={18} color={colors.tertiary} />
            ) : (
              <Eye size={18} color={colors.tertiary} />
            )}
          </Pressable>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordInput}>
          <Lock size={18} color={colors.tertiary} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            placeholderTextColor={colors.tertiary}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          {password && confirmPassword && password === confirmPassword && (
            <Check size={18} color="#22C55E" />
          )}
        </View>
      </View>

      <Button
        variant="gradient"
        icon={isLoading ? undefined : <Download size={20} color={colors.background} />}
        onPress={onExport}
        disabled={isLoading || !password || !confirmPassword}
        style={styles.actionButton}
      >
        {isLoading ? 'Exporting...' : 'Export Backup'}
      </Button>
    </>
  );
}

// Import Tab Component
function ImportTab({
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isLoading,
  importedFile,
  onPickFile,
  onImport,
}: {
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  isLoading: boolean;
  importedFile: string | null;
  onPickFile: () => void;
  onImport: () => void;
}) {
  return (
    <>
      <GlassCard variant="medium" style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Upload size={20} color={colors.accent} />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Restore Backup</Text>
            <Text style={styles.infoDescription}>
              Import a previously exported backup file. New prospects will be added without overwriting existing data.
            </Text>
          </View>
        </View>
      </GlassCard>

      <Pressable onPress={onPickFile} style={styles.filePickerButton}>
        <Upload size={24} color={colors.accent} />
        <Text style={styles.filePickerText}>
          {importedFile ? 'File Selected ✓' : 'Select Backup File'}
        </Text>
        <Text style={styles.filePickerHint}>
          {importedFile ? 'Tap to select a different file' : '.dmb file'}
        </Text>
      </Pressable>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordInput}>
          <Lock size={18} color={colors.tertiary} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter backup password"
            placeholderTextColor={colors.tertiary}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff size={18} color={colors.tertiary} />
            ) : (
              <Eye size={18} color={colors.tertiary} />
            )}
          </Pressable>
        </View>
      </View>

      <Button
        variant="gradient"
        icon={isLoading ? undefined : <Upload size={20} color={colors.background} />}
        onPress={onImport}
        disabled={isLoading || !importedFile || !password}
        style={styles.actionButton}
      >
        {isLoading ? 'Importing...' : 'Restore Backup'}
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
  },
  closeButton: {
    padding: spacing.xs,
  },
  tabs: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentMuted,
  },
  tabText: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.secondary,
  },
  tabTextActive: {
    color: colors.accent,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  infoCard: {
    marginBottom: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  infoText: {
    flex: 1,
  },
  infoTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  infoDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
  },
  statsLabel: {
    fontSize: typography.md,
    color: colors.secondary,
  },
  statsValue: {
    fontSize: typography.lg,
    fontWeight: typography.bold,
    color: colors.accent,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: typography.md,
    color: colors.primary,
  },
  filePickerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  filePickerText: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginTop: spacing.sm,
  },
  filePickerHint: {
    fontSize: typography.xs,
    color: colors.tertiary,
    marginTop: spacing.xs,
  },
  actionButton: {
    marginTop: spacing.lg,
  },
});
