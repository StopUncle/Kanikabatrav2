// Screenshot Uploader Component
// Allows users to upload conversation screenshots for OCR analysis

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, ImagePlus, X, Lock, Scan } from 'lucide-react-native';
import { GlassCard } from '../ui/GlassCard';
import { colors, spacing, typography, borderRadius, gradients, shadows } from '../../lib/theme';
import { haptics } from '../../lib/haptics';
import { ocrService, ImageSource, OCRResult } from '../../services/ocrService';
import { useAuthStore } from '../../stores/authStore';

interface ScreenshotUploaderProps {
  onImageSelected: (source: ImageSource) => void;
  onTextExtracted: (result: OCRResult) => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

export function ScreenshotUploader({
  onImageSelected,
  onTextExtracted,
  onError,
  disabled = false,
}: ScreenshotUploaderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const tier = useAuthStore((state) => state.user?.subscription_tier ?? 'free');
  const isPremiumFeature = tier === 'free';

  const handlePickImage = async () => {
    if (disabled || isPremiumFeature) return;

    haptics.light();

    try {
      const result = await ocrService.pickScreenshot();

      if (result) {
        setSelectedImage(result.uri || null);
        onImageSelected(result);

        // Auto-process OCR
        await processOCR(result);
      }
    } catch (error: unknown) {
      onError(error instanceof Error ? error.message : 'Failed to pick image');
    }
  };

  const processOCR = async (source: ImageSource) => {
    setIsProcessing(true);

    try {
      const result = await ocrService.extractText(source);

      if (result.success) {
        onTextExtracted(result);
      } else {
        onError(result.error || 'Failed to extract text');
      }
    } catch (error: unknown) {
      onError(error instanceof Error ? error.message : 'OCR processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    haptics.light();
    setSelectedImage(null);
  };

  // Premium gate overlay
  if (isPremiumFeature) {
    return (
      <GlassCard variant="medium" style={styles.container}>
        <View style={styles.lockedContainer}>
          <View style={styles.lockedIcon}>
            <Lock size={32} color={colors.accent} />
          </View>
          <Text style={styles.lockedTitle}>Screenshot Analysis</Text>
          <Text style={styles.lockedDescription}>
            Upload conversation screenshots for instant power dynamics analysis
          </Text>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>Premium Feature</Text>
          </View>
        </View>
      </GlassCard>
    );
  }

  return (
    <GlassCard variant="medium" style={styles.container}>
      {selectedImage ? (
        // Image preview
        <View style={styles.previewContainer}>
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />

          {isProcessing ? (
            <View style={styles.processingOverlay}>
              <ActivityIndicator size="large" color={colors.accent} />
              <Text style={styles.processingText}>Analyzing text...</Text>
            </View>
          ) : (
            <Pressable style={styles.clearButton} onPress={handleClear}>
              <X size={20} color={colors.primary} />
            </Pressable>
          )}
        </View>
      ) : (
        // Upload prompt
        <Pressable
          onPress={handlePickImage}
          style={({ pressed }) => [
            styles.uploadArea,
            pressed && styles.uploadAreaPressed,
          ]}
          disabled={disabled}
        >
          <LinearGradient
            colors={gradients.aurora}
            style={styles.uploadGradient}
          >
            <View style={styles.uploadContent}>
              <View style={styles.iconContainer}>
                <Scan size={40} color={colors.accent} />
              </View>

              <Text style={styles.uploadTitle}>Upload Screenshot</Text>
              <Text style={styles.uploadDescription}>
                Select a conversation screenshot to analyze power dynamics
              </Text>

              <View style={styles.uploadHint}>
                <ImagePlus size={16} color={colors.secondary} />
                <Text style={styles.uploadHintText}>Tap to select image</Text>
              </View>
            </View>
          </LinearGradient>
        </Pressable>
      )}

      {/* API not configured indicator */}
      {!ocrService.isAvailable() && (
        <View style={styles.mockBadge}>
          <Text style={styles.mockBadgeText}>API Not Configured</Text>
        </View>
      )}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  uploadArea: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  uploadAreaPressed: {
    opacity: 0.8,
  },
  uploadGradient: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  uploadContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(201, 169, 97, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.glow,
  },
  uploadTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  uploadDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
    maxWidth: 250,
  },
  uploadHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  uploadHintText: {
    fontSize: typography.sm,
    color: colors.secondary,
  },
  previewContainer: {
    position: 'relative',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.lg,
    resizeMode: 'cover',
  },
  clearButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,10,10,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    marginTop: spacing.sm,
    fontSize: typography.sm,
    color: colors.secondary,
  },
  lockedContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  lockedIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(201, 169, 97, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  lockedTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  lockedDescription: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
    maxWidth: 250,
  },
  premiumBadge: {
    backgroundColor: colors.accentMuted,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  premiumBadgeText: {
    fontSize: typography.xs,
    fontWeight: typography.semibold,
    color: colors.accent,
  },
  mockBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: 'rgba(249, 115, 22, 0.9)',
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  mockBadgeText: {
    fontSize: typography.xs,
    fontWeight: typography.medium,
    color: colors.primary,
  },
});
